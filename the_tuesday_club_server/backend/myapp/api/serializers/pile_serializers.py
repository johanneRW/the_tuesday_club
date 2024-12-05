from ninja import Schema
from uuid import UUID
from typing import List

class AlbumQuantity(Schema):
    album_id: UUID
    quantity: int  # Antal af det pågældende album

class AddToPileRequest(Schema):
    albums: List[AlbumQuantity]  # Liste af albummer med ID og quantity
