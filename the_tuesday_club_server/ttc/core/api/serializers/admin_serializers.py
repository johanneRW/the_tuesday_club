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
