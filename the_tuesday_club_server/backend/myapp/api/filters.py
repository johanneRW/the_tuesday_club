from decimal import Decimal
from typing import Optional, List
from uuid import UUID
import uuid
from django.db.models import Min, Max, Q
from ninja import NinjaAPI, Schema
from myapp.models import AlbumView
from ninja import Router, File, Form


router = Router()

class LabelNameSchema(Schema):
    label_name: str

#endpoint til at få labels der har plader tilknyttet
@router.get("/labels", response=List[LabelNameSchema])
def list_labels(request):
    labels = (
        AlbumView.objects.values_list('label_name', flat=True)
        .distinct()
        .order_by('label_name')  # Sorter alfabetisk
    )
    label_data = [{"label_name": label} for label in labels]
    return label_data


class FormatNameSchema(Schema):
    format_name: str

@router.get("/formats", response=List[FormatNameSchema])
def list_formats(request):
    formats = (
        AlbumView.objects.values_list('format_name', flat=True)
        .distinct()
        .order_by('format_name')  # Sorter alfabetisk
    )
    format_data = [{"format_name": fmt} for fmt in formats]
    return format_data


class AlbumUnitsSchema(Schema):
    album_units: str
    
@router.get("/units", response=List[AlbumUnitsSchema])
def list_units(request):
    units = (
        AlbumView.objects
        .extra(select={'units_as_int': 'CAST(album_units AS INTEGER)'})  # SQL-kastning til integer
        .values_list('album_units', flat=True)
        .distinct()
        .order_by('units_as_int')  # Sorter i stigende rækkefølge
    )
    unit_data = [{"album_units": unit} for unit in units]
    return unit_data


class ArtistNameSchema(Schema):
    artist_name: str
    
@router.get("/artists", response=List[ArtistNameSchema])
def list_artists(request):
    artists = (
        AlbumView.objects.values_list('artist_name', flat=True)
        .distinct()
        .order_by('artist_name')  # Sorter alfabetisk
    )
    artist_data = [{"artist_name": artist} for artist in artists]
    return artist_data


class PriceRangeSchema(Schema):
    min_price: float
    max_price: float

@router.get("/price-range", response=PriceRangeSchema)
def price_range(request):
    price_data = AlbumView.objects.aggregate(
        min_price=Min('album_price'), 
        max_price=Max('album_price')
    )
    return price_data

