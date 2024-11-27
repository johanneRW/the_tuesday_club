from decimal import Decimal
from typing import Optional, List
from uuid import UUID
from django.db.models import  Q
from ninja import NinjaAPI, Schema
from django.core.paginator import Paginator
from ninja import Router
from myapp.models import AlbumView


router = Router()


# Skema til albumdata
class AlbumSchema(Schema):
    album_id: UUID  
    album_name: str
    artist_name: Optional[str]
    album_units: Optional[int]
    format_name: Optional[str]
    label_name: Optional[str]
    album_price: Optional[Decimal]
    

# Skema til paginerede resultater
class PaginatedAlbumSchema(Schema):
    total_pages: int
    current_page: int
    albums: List[AlbumSchema]

def create_or_query(field_name: str, values: List[str]) -> Q:
    query = Q()
    for value in values:
        query |= Q(**{f"{field_name}__icontains": value})
    return query

@router.get("/albums", response=PaginatedAlbumSchema)
def list_albums(
    request,
    album_name: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    page: int = 1,
    page_size: int = 20
):
    albums = AlbumView.objects.all()
    
    # Filtrér baseret på tilgængelige søgeparametre
    if album_name:
        albums = albums.filter(album_name__icontains=album_name)

    filter_params = {
        'artist_name': request.GET.getlist('artist_name'),
        'album_units': request.GET.getlist('album_units'),
        'format_name': request.GET.getlist('format_name'),
        'label_name': request.GET.getlist('label_name'),
    }

    for field, values in filter_params.items():
        if values:
            albums = albums.filter(create_or_query(field, values))

    if min_price:
        albums = albums.filter(album_price__gte=min_price)

    if max_price:
        albums = albums.filter(album_price__lte=max_price)
        
    # Sorter albums alfabetisk efter `album_name` og `album_units`
    albums = albums.order_by('album_name', 'album_units')

    # Paginér resultaterne
    paginator = Paginator(albums, page_size)
    page_obj = paginator.get_page(page)

    # Returnér paginerede resultater uden gentagelse af variabler
    return {
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number,
        "albums": list(page_obj.object_list),
    }
    