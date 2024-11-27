from decimal import Decimal
from typing import Optional, List
from uuid import UUID
from ninja import  Schema


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