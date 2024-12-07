from django.db import models
from django.db.models import F, Value, CharField
from django.db.models.functions import Concat


class PileItemManager(models.Manager):
    def unsent_items(self):
        return (
            self.get_queryset()
            .exclude(pile_id__pile_status_id__pile_status_name='afsendt')  # Exkluder "afsendt"
            .select_related('pile_id', 'album_id', 'pile_id__pile_status_id')  # Optimér relationer
            .annotate(
                unique_key=Concat(
                    F('pile_id__pile_id'), Value('_'), F('album_id__album_id'), output_field=CharField()
                ),
                #pile_id=F('pile_id__pile_id'),
                album_name=F('album_id__album_name'),
                artist_name=F('album_id__artist_id__artist_name'),
                price=F('pile_item_price'),
                pile_status=F('pile_id__pile_status__pile_status_name'),
                user_id=F('pile_id__user_id'),
            )
            .values(
                'unique_key',
                'pile_item_id',
                'album_id',
                'album_name',
                'artist_name',
                'quantity',
                'price',
                'added_to_pile',
                'pile_id',
                'pile_status',
                'user_id',
            )
        )
