from decimal import Decimal
from typing import Optional, List
from uuid import UUID
from ninja import NinjaAPI, Schema
from django.core.paginator import Paginator
from myapp.models import AlbumView, Label 
from pydantic import BaseModel
from django.db import IntegrityError
from ninja.errors import HttpError
from ninja import Router


router = Router()


class LabelNameSchema(Schema):
    label_name: str


#endpoint til at hente alle labels uanset om de har albums tilknyttet eller ej
@router.get("/labels/all", response=List[LabelNameSchema])
def list_labels(request):
    labels = (
        Label.objects.values_list('label_name', flat=True)
        .distinct()
        .order_by('label_name')  # Sorter alfabetisk
    )
    label_data = [{"label_name": label} for label in labels]
    return label_data


# Schema for input-data til oprettelse af et nyt label
class LabelCreateSchema(Schema):
    label_name: str

# POST-endpoint til oprettelse af et nyt label
@router.post("/labels", response=LabelNameSchema)
def create_label(request, payload: LabelCreateSchema):
    try:
        # Opret et nyt Label-objekt, hvis label_name er unikt
        label = Label.objects.create(label_name=payload.label_name)
        return {"label_name": label.label_name}
    except IntegrityError:
        # Returner en fejl, hvis label_name allerede findes
        raise HttpError(400, f"Label '{payload.label_name}' already exists.")
