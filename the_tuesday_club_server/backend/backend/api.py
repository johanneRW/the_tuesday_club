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

 # Anvend den generiske create_or_query til felter med flere værdier
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

    """ 
    # Håndtering af flere værdier for artist_name
    artist_names = request.GET.getlist('artist_name')  # Hent alle artist_name-parametre som en liste
    if artist_names:
        artist_query = Q()
        for artist in artist_names:
            artist_query |= Q(artist_name__icontains=artist)  # OR-betingelse for hver artist_name
        albums = albums.filter(artist_query)
        print("Filtered by artist_name:", albums.query)  # Debug

    # Håndtering af flere værdier for album_units
    album_units = request.GET.getlist('album_units')  # Hent alle album_units-parametre som en liste
    if album_units:
        units_query = Q()
        for unit in album_units:
            units_query |= Q(album_units__iexact=str(unit))  # Brug __iexact og konverter til streng
        albums = albums.filter(units_query)
        print("Filtered by album_units:", albums.query)  # Debug

    # Håndtering af flere værdier for format_name
    format_names = request.GET.getlist('format_name')  # Hent alle format_name-parametre som en liste
    if format_names:
        format_query = Q()
        for fmt in format_names:
            format_query |= Q(format_name__icontains=fmt)  # OR-betingelse for hver format_name
        albums = albums.filter(format_query)
        print("Filtered by format_name:", albums.query)  # Debug

    # Håndtering af flere værdier for label_name
    label_names = request.GET.getlist('label_name')  # Hent alle label_name-parametre som en liste
    if label_names:
        label_query = Q()
        for label in label_names:
            label_query |= Q(label_name__icontains=label)  # OR-betingelse for hver label_name
        albums = albums.filter(label_query)
        print("Filtered by label_name:", albums.query)  # Debug
    """
    # Filtrering af prisinterval
    if min_price:
        albums = albums.filter(album_price__gte=min_price)
        print("Filtered by min_price:", albums.query)  # Debug

    if max_price:
        albums = albums.filter(album_price__lte=max_price)
        print("Filtered by max_price:", albums.query)  # Debug

    # Returner filtrerede albumdata
    """ album_data = [
        {
            "album_id": album.album_id,  
            "album_name": album.album_name,
            "artist_name": album.artist_name,
            "album_units": album.album_units,
            "format_name": album.format_name,
            "label_name": album.label_name,
            "album_price": album.album_price
        }
        for album in albums
    ] """
    
    #return album_data
    return albums
