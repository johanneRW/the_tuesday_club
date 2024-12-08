from uuid import UUID
from ninja import Schema


class OpenPileItemSchema(Schema):
    album_id: UUID
    label_name: str
    album_name: str
    artist_name: str
    identifier: int
    identifier_type: str
    total_quantity: int
    format_name:str
