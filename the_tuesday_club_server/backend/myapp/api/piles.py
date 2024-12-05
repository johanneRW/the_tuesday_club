from django.http import JsonResponse
from ninja import Router
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from .users import get_user_from_session_key
from .serializers.pile_serializers import AddToPileRequest
from myapp.models import Pile, PileItem, Album, PileStatus

router = Router()

# skift til dette kode hvis request begynder at fungere som det skal
""" @router.post("/add-to-pile/")
def add_to_pile(request, data: AddToPileRequest):
   
    if not request.user.is_authenticated:
        return {"error": "User not authenticated"}
    
    user = request.user

    # Find status for "ikke bestilt" (eller opret den, hvis den ikke eksisterer)
    pile_status, _ = PileStatus.objects.get_or_create(pile_status_name="Ikke bestilt")

    
    pile, created = Pile.objects.create(
        user_id=user,
        pile_status=pile_status,
        defaults={"pile_start_date": now()}, 
    )"""


@router.post("/add-to-pile/")
def add_to_pile(request, data: AddToPileRequest):
    user_or_none = get_user_from_session_key(request)
    if user_or_none is None:
        # Returnér 401, hvis brugeren ikke er logget ind
        return 401, {"error": "You are not logged in."}
    
    print(user_or_none)

    # Find status for "ikke bestilt" (eller opret den, hvis den ikke eksisterer)
    pile_status, _ = PileStatus.objects.get_or_create(pile_status_name="Ikke bestilt")

    # Opret en ny pile
    pile = Pile.objects.create(
        user_id=user_or_none,
        pile_status=pile_status,
        pile_start_date=now()
    )

    
    added = []
    errors = []

    # Iterer over album_ids fra forespørgslen
    for album_id in data.album_ids:
        try:
            album = get_object_or_404(Album, album_id=album_id)

            # Tilføj albummet som pile-item
            PileItem.objects.create(
                pile_id=pile,
                album_id=album,
                added_to_pile=now(),
                pile_item_price=album.albumprice_set.order_by("-price_start_date").first().album_price
            )
            added.append(str(album_id))
        except Album.DoesNotExist:
            errors.append({"field": "album_id", "message": f"Album with id {album_id} not found."})
        except Exception as e:
            errors.append({"field": "general", "message": str(e)})

    # Returner fejl eller succesrespons
    if errors:
        return JsonResponse({"errors": errors}, status=400)

    return JsonResponse({
        "pile_id": str(pile.pile_id),
        "added": added,
    }, status=201)
