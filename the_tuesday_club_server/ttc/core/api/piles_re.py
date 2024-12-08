from django.http import JsonResponse
from ninja import Router
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from .serializers.pile_serializers import AddToPileRequest
from core.models import Pile, PileItem, Album, PileStatus

router = Router()

# skift til dette kode hvis request begynder at fungere som det skal
@router.post("/add-to-pile/")
def add_to_pile(request, data: AddToPileRequest):
   
    if not request.user.is_authenticated:
        return {"error": "User not authenticated"}
    
    user = request.user

    pile_status = PileStatus.OPEN

    pile, created = Pile.objects.create(
        user_id=user,
        pile_status=pile_status,
        defaults={"pile_start_date": now()}, 
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
                quantity=album_data.quantity
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