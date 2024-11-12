from decimal import Decimal
from typing import List, Optional
from uuid import UUID
from ninja import NinjaAPI, Schema
from myapp.models import AlbumView 

api = NinjaAPI()

# Skema til albumdata
class AlbumSchema(Schema):
    album_id: UUID  
    album_name: str
    artist_name: Optional[str]
    units: Optional[int]
    format: Optional[str]
    label_name: Optional[str]
    album_price: Optional[Decimal]

@api.get("/albums", response=List[AlbumSchema])
def list_albums(request):
    # Hent alle albums fra viewet
    albums = AlbumView.objects.all()

    # Konstruer og returner albumdata direkte fra viewet
    album_data = [
        {
            "album_id": album.album_id,  
            "album_name": album.album_name,
            "artist_name": album.artist_name,
            "units": album.album_units,
            "format": album.format_name,
            "label_name": album.label_name,
            "album_price": album.album_price
        }
        for album in albums
    ]
    
    return album_data
