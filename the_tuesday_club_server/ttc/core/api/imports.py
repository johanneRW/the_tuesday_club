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
from core.utils.coverart import get_barcode_data
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
    
"""    
#skal ikke implemters men dele skal formtlig benyttes senere til at hente og gemme billeder  
@router.post("/upload_image")
#@login_required
def upload_image(
    request,
    image: UploadedFile = File(...),
):
    
    album = Album.objects.get(album_id="383568e1-3b4c-441b-94c7-ea1d5a7ea230")
    
    try:
        album_image = AlbumImage.objects.create(
            album_id=album,
            image=image,
        )
        return {"message": "Filen er indlæst og behandlet korrekt."}
    except ValueError as ve:
        return JsonResponse({"error": str(ve)}, status=400)
    except Exception as e:
        raise 
        return JsonResponse({"error": str(e)}, status=500) """

@router.get("/find-image", response={200: FindImageOutput, 400: ErrorOutput})
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
    return JsonResponse({"disabled": True})
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
        return JsonResponse({"image_url": image_url})
