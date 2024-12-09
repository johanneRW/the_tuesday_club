from typing import List
from ninja import Router
from django.http import JsonResponse
from core.utils.csv_importer import import_csv_to_multiple_tables
from core.models import Album, AlbumImage, Label, PileItem, PileStatus
from core.api.serializers.admin_serializers import PileItemSchema, UserSummarySchema
from core.api.serializers.admin_serializers import PileItemUpdateSchema, UpdateStatusResponse
from ..utils.helpers import get_user_from_session_key




router = Router()

@router.get("/open-pile-items", response=List[PileItemSchema])
def get_open_pile_items(request):
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    
    open_pile_items = PileItem.admin_objects.pile_items_by_album(PileStatus.OPEN)
    
    return list(open_pile_items)

@router.get("/orderd-pile-items", response=List[PileItemSchema])
def get_open_pile_items(request):
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    
    orderd_pile_items = PileItem.admin_objects.pile_items_by_album(PileStatus.ORDERED)
    
    return list(orderd_pile_items)


@router.get("/closed-pile-items-summary/", response=List[UserSummarySchema])
def get_closed_pile_items_summary(request):
    order_summery= PileItem.admin_adresses_objects.closed_items_grouped_by_user()
    
    return list(order_summery)




@router.patch("/update-pile-items-status-orderd", response=UpdateStatusResponse)
def update_pile_items_status(request, items: List[PileItemUpdateSchema]):
    # Hent listen af åbne pile items
    open_pile_items = PileItem.admin_objects.pile_items_by_album(PileStatus.OPEN)

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



@router.patch("/update-pile-items-status-received", response=UpdateStatusResponse)
def update_pile_items_status_received(request, items: List[PileItemUpdateSchema]):
    # Hent listen af pile items, der har status "ORDERED"
    ordered_pile_items = PileItem.admin_objects.pile_items_by_album(PileStatus.ORDERED)

    # Ekstraher album_id fra pile items med status "ORDERED"
    valid_album_ids = {item["album_id"] for item in ordered_pile_items}

    # Ekstraher album_id fra input
    requested_album_ids = {item.album_id for item in items}

    # Find de album_id'er, som både er "ORDERED" og i inputlisten
    matching_album_ids = valid_album_ids.intersection(requested_album_ids)

    if not matching_album_ids:
        return JsonResponse(
            {"error": "No matching ordered pile items found for the given album IDs."},
            status=400,
        )

    # Opdater status til "RECEIVED" for matching pile items
    updated_count = PileItem.objects.filter(album_id__in=matching_album_ids).update(
        pile_status=PileStatus.RECEIVED
    )

    return {"updated_count": updated_count}











