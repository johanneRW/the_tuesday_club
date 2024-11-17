from decimal import Decimal
from typing import Optional
from uuid import UUID
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
    
def create_or_query(field_name: str, values: list[str]) -> Q:
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
