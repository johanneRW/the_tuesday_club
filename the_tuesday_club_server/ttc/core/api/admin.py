from typing import List
from ninja import Router
from django.http import JsonResponse
from core.utils.csv_importer import import_csv_to_multiple_tables
from core.models import Album, AlbumImage, Label, PileItem
from core.api.serializers.admin_serializers import OpenPileItemSchema
from ..utils.helpers import get_user_from_session_key




router = Router()

@router.get("/open-pile-items", response=List[OpenPileItemSchema])
def get_open_pile_items(request):
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    
    open_pile_items = PileItem.admin_objects.open_pile_items_by_album()
    
    return list(open_pile_items)
