from uuid import UUID
from ninja import NinjaAPI
from typing import List, Optional
from ninja import Schema
from myapp.models import Album, AlbumUnitFormat

api = NinjaAPI()

# Skema til albumdata, hvor album_id er et UUID
class AlbumSchema(Schema):
    album_id: UUID  # Opdateret til UUID
    album_name: str
    artist_name: Optional[str]
    units: Optional[str]
    format: Optional[str]
    label_name: Optional[str]

@api.get("/albums", response=List[AlbumSchema])
def list_albums(request):
    # Hent alle albums
    albums = Album.objects.all()
    
    # Byg albumdata med UUID-album_id
    album_data = [
        {
            "album_id": album.album_id,  # UUID bruges som det er
            "album_name": album.album_name,
            "artist_name": album.artist_id.artist_name if album.artist_id else None,
            "units": (album_unit_format.album_units if album_unit_format else None),
            "format": (album_unit_format.album_format_id.album_format 
                       if album_unit_format and album_unit_format.album_format_id else None),
            "label_name": album.label_id.label_name if album.label_id else None
        }
        for album in albums
        if (album_unit_format := AlbumUnitFormat.objects.filter(album_id=album).first())
    ]
    
    return album_data
