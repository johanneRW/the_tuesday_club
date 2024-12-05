from ninja import Schema
from uuid import UUID
from typing import List

class AddToPileRequest(Schema):
    album_ids: List[UUID]  # Liste af album_id'er
