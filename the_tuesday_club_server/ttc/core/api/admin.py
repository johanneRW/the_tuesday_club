from typing import List
from ninja import Router
from django.http import JsonResponse
from core.utils.csv_importer import import_csv_to_multiple_tables
from core.models import Album, AlbumImage, Label, PileItem, PileStatus
from core.api.serializers.admin_serializers import OpenPileItemSchema
from core.api.serializers.admin_serializers import PileItemUpdateSchema, UpdateStatusResponse
from ..utils.helpers import get_user_from_session_key




router = Router()

@router.get("/open-pile-items", response=List[OpenPileItemSchema])
def get_open_pile_items(request):
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    
    open_pile_items = PileItem.admin_objects.open_pile_items_by_album()
    
    return list(open_pile_items)




@router.patch("/update-pile-items-status", response=UpdateStatusResponse)
def update_pile_items_status(request, items: List[PileItemUpdateSchema]):
    # Hent listen af åbne pile items
    open_pile_items = PileItem.admin_objects.open_pile_items_by_album()

    # Ekstraher album_id fra de åbne pile items
    valid_album_ids = {item["album_id"] for item in open_pile_items}

    # Ekstraher album_id fra input
    requested_album_ids = {item.album_id for item in items}

    # Find de album_id'er, som både er åbne og i inputlisten
    matching_album_ids = valid_album_ids.intersection(requested_album_ids)

    if not matching_album_ids:
        return JsonResponse(
            {"error": "No matching open pile items found for the given album IDs."},
            status=400,
        )

        # Opdater status til "bestilt" for matching pile items
    updated_count = PileItem.objects.filter(album_id__in=matching_album_ids).update(
        pile_status=PileStatus.ORDERED
    )

    return {"updated_count": updated_count}
