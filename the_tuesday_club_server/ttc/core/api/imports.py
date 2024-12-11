from io import BytesIO
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import F, BigIntegerField, Value
from django.db.models.functions import Coalesce
from ninja import Router, File, Form
from ninja.files import UploadedFile
from django.http import JsonResponse
import tempfile

import requests
from core.utils.csv_importer import import_csv_to_multiple_tables
from core.models import Album, AlbumImage, Label
from core.utils.coverart import get_musicbrainz_data
from .serializers.imports_serializers import ErrorOutput, FindImageOutput
from .serializers.filter_serializers import (LabelNameSchema)


router = Router()


#endpoint til at hente alle labels uanset om de har albums tilknyttet eller ej
@router.get("/labels/all", response=List[LabelNameSchema])
def list_labels(request):
    labels = (
        Label.objects.values_list('label_name', flat=True)
        .distinct()
        .order_by('label_name')  # Sorter alfabetisk
    )
    label_data = [{"label_name": label} for label in labels]
    return label_data




@router.post("/upload_csv")
def upload_csv(
    request,
    file: UploadedFile = File(...),
    label_name: str = Form(...)
):
    """Uploader og indlæser en CSV-fil."""
    try:
        # Gem CSV-filen midlertidigt
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)

        # Kald den opdaterede importeringsfunktion med label_name
        import_csv_to_multiple_tables(temp_file.name, label_name)

        return {"message": "Filen er indlæst og behandlet korrekt."}
    except ValueError as ve:
        return JsonResponse({"error": str(ve)}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

#ikke den mest robuste løsning men virker for de flestte albums, som alternativ til barcodeLocup
@router.get("/find-image", response={200: FindImageOutput, 400: ErrorOutput})
def find_image(request, album_id: str):
    def save_image_fail(album):
        # Gem markering af at billede ikke kunne findes
        album_image, created = AlbumImage.objects.get_or_create(album_id=album)
        album_image.image = None
        album_image.fetch_status = "failed"
        album_image.save()

    album = get_object_or_404(Album, album_id=album_id)
    data = get_musicbrainz_data(album.artist_id.artist_name, album.album_name)
    mbid = None
    
    try:
        for rel in data["releases"]:
            for media in rel["media"]:
                if media["format"] == "Digital Media":
                    mbid = rel["id"]             
    except (KeyError, IndexError, TypeError):
        save_image_fail(album)
        return JsonResponse({"error": "could not find mbid in data"}, status=404)
        
    if mbid is not None:
        print("mbid", mbid)
        image_data_url = f"https://coverartarchive.org/release/{mbid}"
        try:
            image_data = requests.get(image_data_url)
            image_data.raise_for_status()
            image_url = image_data.json()["images"][0]["thumbnails"]["250"]
        except (requests.HTTPError, AttributeError, KeyError, IndexError):
            save_image_fail(album)
            return JsonResponse({"error": f"no cover art for mbid {mbid}"}, status=404)    
        
        try:
            image = requests.get(image_url)
            print(image_url, image.status_code)
            image.raise_for_status()
        except requests.HTTPError:
            save_image_fail(album)
            return JsonResponse({"error": f"could not retrieve cover art for mbid {mbid}"}, status=404)    
        
        album_image, created = AlbumImage.objects.get_or_create(album_id=album)
        album_image.image.save(f"{album.album_id}.png", BytesIO(image.content))
        album_image.fetch_status = None
        album_image.save()
    
        return JsonResponse({"image_url": album_image.image.url})
    
    save_image_fail(album)
    return JsonResponse({"error": "no mbid found"}, status=404)        


#udkommenteret fordi react-implentering spamede barcodeLookup, så ip og key er "band", og betalt plan er for ret dyr"
""" @router.get("/find-image", response={200: FindImageOutput, 400: ErrorOutput})
def find_image(request, album_id: str):
    album_qs = Album.objects.annotate(
        identifier=Coalesce(
            F('albumupc__album_upc'),
            F('albumeancode__album_ean_code'),
            Value(0),
            output_field=BigIntegerField()
        ),
    )
    album = get_object_or_404(album_qs, album_id=album_id)
    print("album", album)
    #return JsonResponse({"disabled": True})
    data = get_barcode_data(album.identifier)
    try:
        image_url = data["products"][0]["images"][0]
    except (IndexError, KeyError):
        return JsonResponse({"error": "ingen billede i barcode data"})
    else:
        image = requests.get(image_url, stream=True)
        img_temp = BytesIO(image.content)
        album_image, created = AlbumImage.objects.get_or_create(album_id=album)
        album_image.image.save(f"{album.identifier}.png", File(img_temp))
        album_image.save()
        return JsonResponse({"image_url": image_url}) """