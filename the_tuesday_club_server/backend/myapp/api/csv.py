from typing import List
from ninja import Router, File, Form
from ninja.files import UploadedFile
from django.http import JsonResponse
import tempfile
from myapp.utils.csv_importer import import_csv_to_multiple_tables
from myapp.models import Album, AlbumImage, Label
from .serializers.filter_serializers import (LabelNameSchema)
from django.contrib.auth.decorators import login_required


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
#@login_required
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
    
    
    
@router.post("/upload_image")
#@login_required
def upload_image(
    request,
    image: UploadedFile = File(...),
):
    """Uploader og indlæser en CSV-fil."""
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
        return JsonResponse({"error": str(e)}, status=500)