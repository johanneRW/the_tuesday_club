from decimal import Decimal
from typing import Optional, List
from uuid import UUID
import uuid
from django.db.models import Min, Max, Q
from ninja import NinjaAPI, Schema
from django.core.paginator import Paginator
from myapp.models import AlbumView, Label 
from pydantic import BaseModel
from django.db import IntegrityError
from ninja.errors import HttpError
from ninja import Router, File, Form
from ninja.files import UploadedFile
from django.http import JsonResponse
import tempfile
from myapp.utils.csv_importer import import_csv_to_multiple_tables





api = NinjaAPI()
router = Router()

# Skema til albumdata
class AlbumSchema(Schema):
    album_id: UUID  
    album_name: str
    artist_name: Optional[str]
    album_units: Optional[int]
    format_name: Optional[str]
    label_name: Optional[str]
    album_price: Optional[Decimal]
    

# Skema til paginerede resultater
class PaginatedAlbumSchema(Schema):
    total_pages: int
    current_page: int
    albums: List[AlbumSchema]

def create_or_query(field_name: str, values: List[str]) -> Q:
    query = Q()
    for value in values:
        query |= Q(**{f"{field_name}__icontains": value})
    return query

@router.get("/albums", response=PaginatedAlbumSchema)
def list_albums(
    request,
    album_name: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    page: int = 1,
    page_size: int = 20
):
    albums = AlbumView.objects.all()
    
    # Filtrér baseret på tilgængelige søgeparametre
    if album_name:
        albums = albums.filter(album_name__icontains=album_name)

    filter_params = {
        'artist_name': request.GET.getlist('artist_name'),
        'album_units': request.GET.getlist('album_units'),
        'format_name': request.GET.getlist('format_name'),
        'label_name': request.GET.getlist('label_name'),
    }

    for field, values in filter_params.items():
        if values:
            albums = albums.filter(create_or_query(field, values))

    if min_price:
        albums = albums.filter(album_price__gte=min_price)

    if max_price:
        albums = albums.filter(album_price__lte=max_price)
        
    # Sorter albums alfabetisk efter `album_name` og `album_units`
    albums = albums.order_by('album_name', 'album_units')

    # Paginér resultaterne
    paginator = Paginator(albums, page_size)
    page_obj = paginator.get_page(page)

    # Returnér paginerede resultater uden gentagelse af variabler
    return {
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number,
        "albums": list(page_obj.object_list),
    }
    
    

class LabelNameSchema(Schema):
    label_name: str

#endpoint til at få labels der har plader tilknyttet
@router.get("/labels", response=List[LabelNameSchema])
def list_labels(request):
    labels = (
        AlbumView.objects.values_list('label_name', flat=True)
        .distinct()
        .order_by('label_name')  # Sorter alfabetisk
    )
    label_data = [{"label_name": label} for label in labels]
    return label_data


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


# Schema for input-data til oprettelse af et nyt label
class LabelCreateSchema(Schema):
    label_name: str

# POST-endpoint til oprettelse af et nyt label
@router.post("/labels", response=LabelNameSchema)
def create_label(request, payload: LabelCreateSchema):
    try:
        # Opret et nyt Label-objekt, hvis label_name er unikt
        label = Label.objects.create(label_name=payload.label_name)
        return {"label_name": label.label_name}
    except IntegrityError:
        # Returner en fejl, hvis label_name allerede findes
        raise HttpError(400, f"Label '{payload.label_name}' already exists.")





class FormatNameSchema(Schema):
    format_name: str

@router.get("/formats", response=List[FormatNameSchema])
def list_formats(request):
    formats = (
        AlbumView.objects.values_list('format_name', flat=True)
        .distinct()
        .order_by('format_name')  # Sorter alfabetisk
    )
    format_data = [{"format_name": fmt} for fmt in formats]
    return format_data


class AlbumUnitsSchema(Schema):
    album_units: str
    
@router.get("/units", response=List[AlbumUnitsSchema])
def list_units(request):
    units = (
        AlbumView.objects
        .extra(select={'units_as_int': 'CAST(album_units AS INTEGER)'})  # SQL-kastning til integer
        .values_list('album_units', flat=True)
        .distinct()
        .order_by('units_as_int')  # Sorter i stigende rækkefølge
    )
    unit_data = [{"album_units": unit} for unit in units]
    return unit_data


class ArtistNameSchema(Schema):
    artist_name: str
    
@router.get("/artists", response=List[ArtistNameSchema])
def list_artists(request):
    artists = (
        AlbumView.objects.values_list('artist_name', flat=True)
        .distinct()
        .order_by('artist_name')  # Sorter alfabetisk
    )
    artist_data = [{"artist_name": artist} for artist in artists]
    return artist_data


class PriceRangeSchema(Schema):
    min_price: float
    max_price: float

@router.get("/price-range", response=PriceRangeSchema)
def price_range(request):
    price_data = AlbumView.objects.aggregate(
        min_price=Min('album_price'), 
        max_price=Max('album_price')
    )
    return price_data


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

