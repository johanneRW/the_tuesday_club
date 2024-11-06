import csv
import re
import uuid
from datetime import date
from django.apps import apps
from itertools import islice
from datetime import date
from ..models import AlbumAdditionalInfo, AlbumEANcode, AlbumFormat, AlbumReleaseYear, AlbumUPC, AlbumUnitFormat, Artist, Label, Album, AlbumPrice
from .helpers import get_column_value, parse_date 

""" def parse_date(value):
    month, day, year = value.split("/")
    return date(year=int(year), month=int(month), day=int(day)) """

def import_csv_to_multiple_tables(csv_file_path, start_row=0):
    # Find eller opret en fast Label til test
    test_label, created = Label.objects.get_or_create(
        label_name='Test Label2', 
        defaults={'label_id': uuid.uuid4()}
    )
    if created:
        print("Oprettet fast test-label: Test Label")

    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(list(file)[start_row:])
        
        for row in csv_reader:
            row = {k.lower(): v for k, v in row.items()}  # Konverter alle kolonnenavne til små bogstaver

            # Find relevante værdier ved hjælp af get_column_value
            artist_name = get_column_value(row, 'artist')
            title = get_column_value(row, 'title')
            release = get_column_value(row, 'release')
            ean_code = get_column_value(row, 'ean_code')
            upc = get_column_value(row, 'upc')
            format_value = get_column_value(row, 'format')
            units = get_column_value(row, 'units')
            media = get_column_value(row, 'media')
            additional_info = get_column_value(row, 'additional_info')
            price_value = get_column_value(row, 'price')

            # Spring rækker over uden kunstnernavn
            if not artist_name:
                print('Springer over tom række', row)
                continue

            # Opret eller hent Artist
            artist, created = Artist.objects.get_or_create(
                artist_name=artist_name,
                defaults={'artist_id': uuid.uuid4()}
            )
            if created:
                print(f"Oprettet Artist: {artist}")
            else:
                print(f"Fundet eksisterende Artist: {artist}")

            # Brug det faste test-label for alle albums
            label = test_label

            # Tjek for eksisterende album baseret på EAN eller UPC
            album = None
            if ean_code:
                album = Album.objects.filter(albumeancode__album_ean_code=ean_code).first()
            elif upc:
                album = Album.objects.filter(albumupc__album_upc=upc).first()

            current_price = float(price_value) if price_value else None

            # Hvis albummet allerede eksisterer, tjek prisen og opdater om nødvendigt
            if album:
                print(f"Fundet eksisterende album baseret på EAN/UPC: {album}")
                if current_price is not None:
                    latest_price_entry = AlbumPrice.objects.filter(album_id=album).order_by('-price_start_date').first()

                    if latest_price_entry is None or latest_price_entry.album_price != current_price or latest_price_entry.price_start_date != date.today():
                        AlbumPrice.objects.create(
                            album_id=album,
                            album_price=current_price,
                            price_start_date=date.today()
                        )
                        print(f"Opdateret pris for Album: {album} til {current_price} med startdato {date.today()}")
                    else:
                        print(f"Pris for Album: {album} er uændret.")
                continue  # Spring til næste række, da albummet allerede findes

            # Hvis albummet ikke eksisterer, opret det
            album = Album.objects.create(
                album_name=title,
                artist_id=artist,
                label_id=label,
                album_id=uuid.uuid4()
            )
            print(f"Oprettet nyt Album: {album}")

            # Album Release Year
            if release:
                AlbumReleaseYear.objects.update_or_create(
                    album_id=album,
                    defaults={'album_year': parse_date(release)}
                )
                print(f"Sat udgivelsesår for album: {album}")

            # Album EAN
            if ean_code:
                AlbumEANcode.objects.update_or_create(
                    album_id=album,
                    defaults={'album_ean_code': int(ean_code)}
                )
                print(f"Sat EAN-kode for album: {album}")

            # Album UPC
            if upc:
                AlbumUPC.objects.update_or_create(
                    album_id=album,
                    defaults={'album_upc': int(upc)}
                )
                print(f"Sat UPC-kode for album: {album}")

            # Album Format og AlbumUnitFormat
            if format_value:
                # Brug regex til at finde antal enheder og formatbetegnelsen separat
                match = re.match(r"(\d+)\s*(\"|inch|lp|cd|vinyl)?", format_value.lower())
                if match:
                    units = match.group(1)  # Eksempel: '12'
                    media = match.group(2) if match.group(2) else ""  # Eksempel: '"'

            if media:
                # Opret eller hent albumformat baseret på medie
                album_format, _ = AlbumFormat.objects.get_or_create(album_format=media)
                if units:
                    AlbumUnitFormat.objects.update_or_create(
                        album_id=album,
                        defaults={
                            'album_units': units,
                            'album_format_id': album_format
                        }
                    )
                    print(f"Sat format og enheder for album: {album}")

            # Album Additional Info
            if additional_info:
                AlbumAdditionalInfo.objects.update_or_create(
                    album_id=album,
                    defaults={'album_additional_info': additional_info}
                )
                print(f"Sat yderligere info for album: {album}")

            # Album pris for nyt album
            if current_price is not None:
                AlbumPrice.objects.create(
                    album_id=album,
                    album_price=current_price,
                    price_start_date=date.today()
                )
                print(f"Sat startpris for nyt Album: {album} til {current_price}")

    print("Importen er færdig!")
