from decimal import Decimal
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





class PileItemClosedOrderManager(models.Manager):
    def closed_items_grouped_by_user(self):
        from core.models import PileStatus
        from decimal import Decimal
        from django.db.models import F, Sum

        # Queryset der henter data fra de relevante relationer
        queryset = (
            self.filter(pile_status=PileStatus.CLOSED)
            .select_related(
                'pile_id__user_id',  # Bruger via Pile
                'album_id__artist_id',  # Kunstner via Album
                'album_id__label_id',  # Label via Album
                'album_id__albumunitformat__album_format_id'  # Albumformat via AlbumUnitFormat
            )
            .annotate(
                total_price_per_item=F('quantity') * F('pile_item_price'),  # Pris pr. item
                album_units=F('album_id__albumunitformat__album_units')  # Hent album_units
            )
            .values(
                'pile_id__user_id',  # Bruger ID
                'pile_id__user_id__first_name',  # Fornavn
                'pile_id__user_id__last_name',  # Efternavn
                'pile_id__user_id__address__street',  # Adresse detaljer
                'pile_id__user_id__address__city',
                'pile_id__user_id__address__postal_code',
                'pile_id__user_id__address__country',
                'album_id',  # Album ID
                'album_id__album_name',  # Albumnavn
                'album_id__artist_id__artist_name',  # Kunstnernavn
                'album_id__albumunitformat__album_format_id__album_format',  # Albumformat
                'pile_item_price',  # Pris pr. item
                'album_units',  # Album enheder
                'quantity',  # Antal pr. pile item
            )
        )

        # Organiser data pr. bruger
        grouped_data = {}
        for item in queryset:
            user_id = item['pile_id__user_id']
            if user_id not in grouped_data:
                grouped_data[user_id] = {
                    'user_id': user_id,
                    'first_name': item['pile_id__user_id__first_name'],
                    'last_name': item['pile_id__user_id__last_name'],
                    'address': f"{item['pile_id__user_id__address__street']}, "
                               f"{item['pile_id__user_id__address__city']}, "
                               f"{item['pile_id__user_id__address__postal_code']}, "
                               f"{item['pile_id__user_id__address__country']}",
                    'total_quantity': 0,
                    'total_price': Decimal("0"),
                    'items': {}
                }

            # Unik nøgle til gruppering: album_id og pris
            album_key = (item['album_id'], item['pile_item_price'])
            if album_key not in grouped_data[user_id]['items']:
                grouped_data[user_id]['items'][album_key] = {
                    'album_name': item['album_id__album_name'],
                    'artist_name': item['album_id__artist_id__artist_name'],
                    'format': item['album_id__albumunitformat__album_format_id__album_format'],
                    'album_units': item['album_units'],
                    'quantity': 0,
                    'price_per_item': item['pile_item_price'],
                    'total_price': Decimal("0")
                }

            # Opdater mængde og pris for eksisterende album
            grouped_data[user_id]['items'][album_key]['quantity'] += item['quantity']
            grouped_data[user_id]['items'][album_key]['total_price'] += (
                item['quantity'] * item['pile_item_price']
            )

            # Opdater brugerens samlede mængde og pris
            grouped_data[user_id]['total_quantity'] += item['quantity']
            grouped_data[user_id]['total_price'] += item['quantity'] * item['pile_item_price']

        # Konverter items til en liste for hver bruger
        for user_id in grouped_data:
            grouped_data[user_id]['items'] = list(grouped_data[user_id]['items'].values())

        return list(grouped_data.values())
