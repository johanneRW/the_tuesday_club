from typing import List
from django.db.models import Min, Max
from ninja import Router
from core.models import AlbumView
from .serializers.filter_serializers import (
    LabelNameSchema,
    FormatNameSchema,
    AlbumUnitsSchema,
    ArtistNameSchema,
    PriceRangeSchema,
)

router = Router()

@router.get("/labels", response=List[LabelNameSchema])
def list_labels(request):
    labels = (
        AlbumView.objects.values_list('label_name', flat=True)
        .distinct()
        .order_by('label_name')  # Sorter alfabetisk
    )
    label_data = [{"label_name": label} for label in labels]
    return label_data

@router.get("/formats", response=List[FormatNameSchema])
def list_formats(request):
    formats = (
        AlbumView.objects.values_list('format_name', flat=True)
        .distinct()
        .order_by('format_name')  # Sorter alfabetisk
    )
    format_data = [{"format_name": fmt} for fmt in formats]
    return format_data

@router.get("/units", response=List[AlbumUnitsSchema])
def list_units(request):
    units = (
        AlbumView.objects
        .extra(select={'units_as_int': 'CAST(album_units AS INTEGER)'})
        .values_list('album_units', flat=True)
        .distinct()
        .order_by('units_as_int')  # Sorter i stigende
    )
    unit_data = [{"album_units": unit} for unit in units]
    return unit_data

@router.get("/artists", response=List[ArtistNameSchema])
def list_artists(request):
    artists = (
        AlbumView.objects.values_list('artist_name', flat=True)
        .distinct()
        .order_by('artist_name')  # Sorter alfabetisk
    )
    artist_data = [{"artist_name": artist} for artist in artists]
    return artist_data

@router.get("/price-range", response=PriceRangeSchema)
def price_range(request):
    price_data = AlbumView.objects.aggregate(
        min_price=Min('album_price'), 
        max_price=Max('album_price')
    )
    return price_data
