from decimal import Decimal
import os
from typing import Optional, List
from django.db.models import  Q
from django.core.paginator import Paginator
from ninja import Router
from core.models import AlbumView
from .serializers.album_serializers import (PaginatedAlbumSchema)
from django.conf import settings
from django.db.models import BooleanField, Case, Value, When

router = Router()


def create_or_query(field_name: str, values: List[str]) -> Q:
    query = Q()
    for value in values:
        query |= Q(**{f"{field_name}__icontains": value})
    return query

""" @router.get("/albums", response=PaginatedAlbumSchema)
def list_albums(
    request,
    search_string: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    page: int = 1,
    page_size: int = 20
):
    albums = AlbumView.objects.all()
    
    # Filtrér baseret på tilgængelige søgeparametre
    if search_string:
        albums = albums.filter(Q(album_name__icontains=search_string)|Q(artist_name__icontains=search_string))

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
    
    albums = list(page_obj.object_list)
    for album in albums:
        if album.album_image:
            album.image_url = settings.MEDIA_URL + album.album_image
        else:
            album.image_url = None

    # Returnér paginerede resultater uden gentagelse af variabler
    return {
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number,
        "albums": albums,
    }
     """
     

@router.get("/albums", response=PaginatedAlbumSchema)
def list_albums(
    request,
    search_string: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    sort_by: Optional[str] = None,  # Valgfri parameter for sortering
    page: int = 1,
    page_size: int = 20
):
    albums = AlbumView.objects.all()
    
    # Filtrér baseret på tilgængelige søgeparametre
    if search_string:
        albums = albums.filter(Q(album_name__icontains=search_string)|Q(artist_name__icontains=search_string))

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

    # Tilføj annotation for at indikere, om et album har et billede
    albums = albums.annotate(
        has_image=Case(
            When(album_image__isnull=False, then=Value(True)),
            default=Value(False),
            output_field=BooleanField(),
        )
    )

    # Sorteringslogik baseret på `sort_by`
    if sort_by == "alphabetical":  # Hvis brugeren ønsker alfabetisk sortering
        albums = albums.order_by('album_name')
    else:  # Standard er "custom" sortering
        albums = albums.order_by('-has_image', '-price_start_date', 'album_name')

    # Paginér resultaterne
    paginator = Paginator(albums, page_size)
    page_obj = paginator.get_page(page)
    
    albums = list(page_obj.object_list)
    for album in albums:
        if album.album_image:
            album.image_url = settings.MEDIA_URL + album.album_image
        else:
            album.image_url = None

    # Returnér paginerede resultater
    return {
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number,
        "albums": albums,
    }
