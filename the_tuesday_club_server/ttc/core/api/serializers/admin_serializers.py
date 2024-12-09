from typing import List
from uuid import UUID
from ninja import Schema


class PileItemSchema(Schema):
    album_id: UUID
    pile_ids: List[UUID]
    label_name: str
    album_name: str
    artist_name: str
    identifier: int
    identifier_type: str
    total_quantity: int
    format_name:str
    
    
class PileItemUpdateSchema(Schema):
    album_id: UUID

class UpdateStatusResponse(Schema):
    updated_count: int


class AlbumItemSchema(Schema):
    album_name: str
    artist_name: str
    format: str
    quantity: int
    price: float

class UserSummarySchema(Schema):
    user_id:str
    first_name: str
    last_name: str
    address: str
    total_quantity: int
    total_price: float
    items: List[AlbumItemSchema]
