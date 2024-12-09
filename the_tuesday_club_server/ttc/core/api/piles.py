from typing import List
from django.http import JsonResponse
from ninja import Router
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from ..utils.helpers import get_user_from_session_key
from .serializers.pile_serializers import AddToPileRequest, UnsentPileItemSchema
from core.models import Pile, PileItem, Album, PileStatus 
from django.db.models import Q, Count

router = Router()


@router.post("/add-to-pile/")
def add_to_pile(request, data: AddToPileRequest):
    # Få brugeren fra session
    user_or_none = get_user_from_session_key(request)
    if user_or_none is None:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    pile_status = PileStatus.OPEN

    # Opret en ny pile
    pile = Pile.objects.create(
        user_id=user_or_none,
        pile_start_date=now()
    )

    added = []
    errors = []

    # Iterer over albums og deres quantity
    for album_data in data.albums:
        try:
            album = get_object_or_404(Album, album_id=album_data.album_id)

            # Tilføj albummet som pile-item med quantity
            PileItem.objects.create(
                pile_id=pile,
                album_id=album,
                added_to_pile=now(),
                pile_item_price=album.albumprice_set.order_by("-price_start_date").first().album_price,
                quantity=album_data.quantity,
                pile_status=pile_status,
            )
            added.append({"album_id": str(album_data.album_id), "quantity": album_data.quantity})
        except Album.DoesNotExist:
            errors.append({"field": "album_id", "message": f"Album with id {album_data.album_id} not found."})
        except Exception as e:
            errors.append({"field": "general", "message": str(e)})

    if errors:
        return JsonResponse({"errors": errors}, status=400)

    return JsonResponse({
        "pile_id": str(pile.pile_id),
        "added": added,
    }, status=201)
    



@router.get("/pile-items", response=List[UnsentPileItemSchema])
def get_pile_items(request):
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    # Hent data fra modellen
    pile_items = PileItem.objects.unsent_items().filter(user_id=user.id)
    return pile_items



@router.patch("/close-pile/")
def close_pile(request):
    # Hent bruger fra session
    user = get_user_from_session_key(request)
    if not user:
        return JsonResponse({"error": "You are not logged in."}, status=401)

    received_status = PileStatus.RECEIVED
    closed_status = PileStatus.CLOSED

    # Find og opdater alle pile-items for brugeren, der har status "received"
    pile_items_to_update = PileItem.objects.filter(
        pile_id__user_id=user.id,
        pile_status=received_status
    )

    updated_count = pile_items_to_update.update(pile_status=closed_status)

    # Find alle piles, hvor alle items nu er "closed"
    piles_with_all_closed_items = (
        Pile.objects.annotate(
            open_items_count=Count(
                'pileitem',
                filter=~Q(pileitem__pile_status=closed_status)  # Items, der ikke er "closed"
            )
        )
        .filter(user_id=user.id, open_items_count=0)  # Kun piles uden åbne items
    )

    return JsonResponse({
        "message": f"Updated {updated_count} pile items with status 'received' to 'closed'.",
        "closed_piles": piles_with_all_closed_items.count()
    }, status=200)