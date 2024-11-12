from decimal import Decimal
from uuid import UUID
from ninja import NinjaAPI
from typing import List, Optional
from ninja import Schema
from myapp.models import Album, AlbumUnitFormat, AlbumPrice

api = NinjaAPI()

# Skema til albumdata
class AlbumSchema(Schema):
    album_id: UUID 
    album_name: str
    artist_name: Optional[str]
    units: Optional[str]
    format: Optional[str]
    label_name: Optional[str]
    album_price: Optional[Decimal]  

@api.get("/albums", response=List[AlbumSchema])
def list_albums(request):
    # Hent alle albums
    albums = Album.objects.all()
    
    album_data = []
    for album in albums:

        album_id = album.album_id
        album_name = album.album_name

        artist_name = album.artist_id.artist_name if album.artist_id else None

        label_name = album.label_id.label_name if album.label_id else None

        album_unit_format = AlbumUnitFormat.objects.filter(album_id=album).first()
        
        units = album_unit_format.album_units if album_unit_format else None
        format_name = (
            album_unit_format.album_format_id.album_format
            if album_unit_format and album_unit_format.album_format_id
            else None
        )

        # Hent den seneste AlbumPrice data, baseret på dato
        album_price_instance = AlbumPrice.objects.filter(album_id=album).order_by('-price_start_date').first()
        album_price = album_price_instance.album_price if album_price_instance else None

        # Byg albumdata med de definerede variabler
        album_data.append({
            "album_id": album_id,
            "album_name": album_name,
            "artist_name": artist_name,
            "units": units,
            "format": format_name,
            "label_name": label_name,
            "album_price": album_price,
        })
    
    return album_data
