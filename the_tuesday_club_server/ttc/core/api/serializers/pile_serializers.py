from datetime import datetime
from decimal import Decimal
from ninja import Schema
from uuid import UUID
from typing import List, Optional

from core.models import PileItem

class AlbumQuantity(Schema):
    album_id: UUID
    quantity: int  # Antal af det pågældende album

class AddToPileRequest(Schema):
    albums: List[AlbumQuantity]  # Liste af albummer med ID og quantity


class UnsentPileItemSchema(Schema):
    unique_key: str
    pile_item_id: UUID
    album_id: UUID
    album_name: str
    artist_name: str
    quantity: int
    price: Decimal
    added_to_pile: datetime
    pile_status: str
    user_id: str
    
class PileItemUpdateResponse(Schema):
    album_id: str
    label_name: str
    album_name: str
    artist_name: str
    identifier: int
    identifier_type: str
    format_name: str
    pile_ids: List[str]
    total_quantity: int
    pile_status: str