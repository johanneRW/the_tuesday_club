from django.db import models
from django.db.models import F,Q, Value, CharField, Sum,  Case, When, BigIntegerField
from django.db.models.functions import Concat, Coalesce
from django.contrib.postgres.aggregates import ArrayAgg



class PileItemManager(models.Manager):
    def unsent_items_queryset(self):
        from core.models import PileStatus
        
        return (
            self.get_queryset()
            .exclude(Q(pile_status=PileStatus.SENT) | Q(pile_status=PileStatus.CLOSED))
            .select_related('album_id')
            .annotate(
                unique_key=Concat(
                    F('pile_item_id'), Value('_'), F('album_id__album_id'), output_field=CharField()
                ),
                album_name=F('album_id__album_name'),
                artist_name=F('album_id__artist_id__artist_name'),
                price=F('pile_item_price'),
                user_id=F('pile_id__user_id'),
            )
        )

    def unsent_items(self):
        return self.unsent_items_queryset().values(
            'unique_key',
            'pile_item_id',
            'album_id',
            'album_name',
            'artist_name',
            'quantity',
            'price',
            'added_to_pile',
            'pile_status',
            'user_id',
        )



class PileItemOrderManager(models.Manager):
    def pile_items_by_album_queryset(self, pile_status):
        """
        Henter pile items filtreret efter pile_status.
        """
        from core.models import PileStatus  # Importer PileStatus her, hvis det er nødvendigt

        return (
            self.get_queryset()
            .filter(pile_status=pile_status)  # Filtrer efter den specifikke pile_status
            .select_related(
                'album_id',
                'album_id__artist_id',
                'album_id__label_id',
                'album_id__albumunitformat__album_format_id',
            )
            .annotate(
                label_name=F('album_id__label_id__label_name'),
                album_name=F('album_id__album_name'),
                artist_name=F('album_id__artist_id__artist_name'),
                identifier=Coalesce(
                    F('album_id__albumupc__album_upc'),
                    F('album_id__albumeancode__album_ean_code'),
                    Value(0),
                    output_field=BigIntegerField()
                ),
                identifier_type=Case(
                    When(album_id__albumupc__album_upc__isnull=False, then=Value("UPC")),
                    When(album_id__albumeancode__album_ean_code__isnull=False, then=Value("EAN")),
                    default=Value("None"),
                    output_field=CharField()
                ),
                format_name=F('album_id__albumunitformat__album_format_id__album_format'),
                pile_ids=ArrayAgg('pile_id', distinct=True),
            )
        )

    def pile_items_by_album(self, pile_status):
        """
        Returnerer pile items baseret på pile_status, grupperet og annoteret.
        """
        return self.pile_items_by_album_queryset(pile_status).values(
            'album_id',  # Gruppér efter album
            'label_name',
            'album_name',
            'artist_name',
            'identifier',
            'identifier_type',
            'format_name',
            'pile_ids',
        ).annotate(
            total_quantity=Sum('quantity')  # Summer mængden for hvert album
        ).order_by('label_name', 'album_name')  # Sorter efter label og album

