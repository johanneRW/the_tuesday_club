from decimal import Decimal
from typing import Optional
from uuid import UUID
from django.db.models import Min, Max
from typing import List
from ninja import NinjaAPI, Schema
from django.db.models import Q
from myapp.models import AlbumView 

api = NinjaAPI()

# Skema til albumdata
class AlbumSchema(Schema):
    album_id: UUID  
    album_name: str
    artist_name: Optional[str]
    album_units: Optional[int]
    format_name: Optional[str]
    label_name: Optional[str]
    album_price: Optional[Decimal]
    
def create_or_query(field_name: str, values: List[str]) -> Q:
    query = Q()
    for value in values:
        query |= Q(**{f"{field_name}__icontains": value})
    return query

@api.get("/albums", response=list[AlbumSchema])
def list_albums(
    request,
    album_name: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
):
    # Debug: Udskriv alle GET-parametre
    print("Raw GET parameters:", request.GET)

    # Start med alle albums fra viewet
    albums = AlbumView.objects.all()
    
    # Filtrér baseret på tilgængelige søgeparametre
    if album_name:
        albums = albums.filter(album_name__icontains=album_name)
        print("Filtered by album_name:", albums.query)  # Debug


    filter_params = {
        'artist_name': request.GET.getlist('artist_name'),
        'album_units': request.GET.getlist('album_units'),
        'format_name': request.GET.getlist('format_name'),
        'label_name': request.GET.getlist('label_name'),
    }

    for field, values in filter_params.items():
        if values:
            albums = albums.filter(create_or_query(field, values))
            print(f"Filtered by {field}:", albums.query)  # Debug

    if min_price:
        albums = albums.filter(album_price__gte=min_price)
        print("Filtered by min_price:", albums.query)  # Debug

    if max_price:
        albums = albums.filter(album_price__lte=max_price)
        print("Filtered by max_price:", albums.query)  # Debug
        
    return albums



class LabelNameSchema(Schema):
    label_name: str

# Endpoint for unikke `label_name`
@api.get("/labels", response=List[LabelNameSchema])
def list_labels(request):
    labels = AlbumView.objects.values_list('label_name', flat=True).distinct()
    label_data = [{"label_name": label} for label in labels]
    return label_data


class FormatNameSchema(Schema):
    format_name: str

# Endpoint for unikke `format_name`
@api.get("/formats", response=List[FormatNameSchema])
def list_formats(request):
    formats = AlbumView.objects.values_list('format_name', flat=True).distinct()
    format_data = [{"format_name": fmt} for fmt in formats]
    return format_data


class AlbumUnitsSchema(Schema):
    album_units: str
    
# Endpoint for unikke `album_units`
@api.get("/units", response=List[AlbumUnitsSchema])
def list_units(request):
   
    units = (
        AlbumView.objects
        .extra(select={'units_as_int': 'CAST(album_units AS INTEGER)'})  # SQL-kastning til integer
        .order_by('units_as_int')  # Sorter i stigende rækkefølge
        .values_list('album_units', flat=True)  # Hent kun de sorterede, unikke værdier
        .distinct()
    )

    # Byg listen over album_units objekter til returnering
    unit_data = [{"album_units": unit} for unit in units]
    return unit_data


class ArtistNameSchema(Schema):
    artist_name: str
    
# Endpoint for unikke `artist_name`
@api.get("/artists", response=List[ArtistNameSchema])
def list_artists(request):
    artists = AlbumView.objects.values_list('artist_name', flat=True).distinct()
    artist_data = [{"artist_name": artist} for artist in artists]
    return artist_data


class PriceRangeSchema(Schema):
    min_price: float
    max_price: float

# Endpoint for prisinterval (min og max `album_price`)
@api.get("/price-range", response=PriceRangeSchema)
def price_range(request):
    price_data = AlbumView.objects.aggregate(min_price=Min('album_price'), max_price=Max('album_price'))
    return price_data

