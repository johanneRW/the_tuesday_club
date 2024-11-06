import csv
import uuid
from datetime import date
from django.apps import apps
from itertools import islice
from datetime import date
from ..models import AlbumAdditionalInfo, AlbumEANcode, AlbumFormat, AlbumReleaseYear, AlbumUPC, AlbumUnitFormat, Artist, Label, Album, AlbumPrice

def parse_date(value):
    month, day, year = value.split("/")
    return date(year=int(year), month=int(month), day=int(day))

def import_csv_to_multiple_tables(csv_file_path, start_row=0):
    # Find eller opret en fast Label til test
    test_label, created = Label.objects.get_or_create(
        label_name='Test Label2', 
        defaults={'label_id': uuid.uuid4()}
    )
    if created:
        print("Oprettet fast test-label: Test Label")

    with open(csv_file_path, mode='r') as file:
        # Spring de første rækker over og start fra `start_row`
        csv_reader = csv.DictReader(list(file)[start_row:])
        
        for row in csv_reader:
            if row['Artist'] == '':
                print('Springer over tom række', row)
                continue
            
            # Opret eller hent Artist
            artist, created = Artist.objects.get_or_create(
                artist_name=row['Artist'],
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
            ean_code = row.get("EAN code")
            upc = row.get("UPC")
            if ean_code:
                album = Album.objects.filter(albumeancode__album_ean_code=ean_code).first()
            elif upc:
                album = Album.objects.filter(albumupc__album_upc=upc).first()

            # Tjek pris kolonne for at finde aktuel pris
            price_column = 'Price' if 'Price' in row else 'Pris' if 'Pris' in row else None
            current_price = float(row[price_column]) if price_column else None

            # Hvis albummet allerede eksisterer, tjek prisen og opdater om nødvendigt
            if album:
                print(f"Fundet eksisterende album baseret på EAN/UPC: {album}")
                
                # Tjek pris og opdater om nødvendigt
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
                album_name=row['Title'],
                artist_id=artist,
                label_id=label,
                album_id=uuid.uuid4()
            )
            print(f"Oprettet nyt Album: {album}")

            # Album Release Year
            if row.get('Release'):
                AlbumReleaseYear.objects.update_or_create(
                    album_id=album,
                    defaults={'album_year': parse_date(row['Release'])}
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
            if row.get('Format'):
                # Håndter format som "2LP"
                units = ''.join([char for char in row['Format'] if char.isdigit()])
                media = ''.join([char for char in row['Format'] if not char.isdigit()])
            elif row.get('Units') and row.get('Media'):
                # Håndter separate kolonner
                units = row['Units']
                media = row['Media']
            else:
                units = None
                media = None

            if media:
                album_format, _ = AlbumFormat.objects.get_or_create(
                    album_format=media
                )
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
            if row.get('Additional Info'):
                AlbumAdditionalInfo.objects.update_or_create(
                    album_id=album,
                    defaults={'album_additional_info': row['Additional Info']}
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
            else:
                print("Ingen pris fundet i kolonnen 'Price' eller 'Pris'.")

    print("Importen er færdig!")
