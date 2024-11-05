import csv
import uuid
from datetime import date
from django.apps import apps 
from itertools import islice 
from datetime import date
from ..models import Artist, Label, Album, AlbumPrice

def parse_date(value):
    month, day, year = value.split("/")
    return date(year=int(year), month=int(month), day=int(day))

def import_csv_to_multiple_tables(csv_file_path, start_row=0):
    # Find eller opret en fast Label til test
    test_label, created = Label.objects.get_or_create(
        label_name='Test Label', 
        defaults={'label_id': uuid.uuid4()} 
    )
    if created:
        print("Oprettet fast test-label: Test Label")

    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        
        # Spring de første rækker over og start fra `start_row`
        for row in islice(csv_reader, start_row, None):
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

            # Opret Album og bind til Artist og fast Label
            album, created = Album.objects.get_or_create(
                album_name=row['Title'],
                artist_id=artist,  # Sætter foreign key til artist
                label_id=label,    # Brug den faste test-label som foreign key
                defaults={
                    'album_id': uuid.uuid4(),  # Generer et nyt ID for Album, hvis den oprettes
                    'album_year': parse_date(row['Release'])
                }
            )
            if created:
                print(f"Oprettet Album: {album}")
            else:
                print(f"Fundet eksisterende Album: {album}")

            # Album pris
            current_price = float(row['Price']) 
            latest_price_entry = AlbumPrice.objects.filter(album_id=album).order_by('-price_start_date').first()

            if latest_price_entry is None or latest_price_entry.album_price != current_price:
                # Hvis der ikke er en pris, eller prisen har ændret sig, opret en ny prispost
                AlbumPrice.objects.create(
                    album_id=album,
                    album_price=current_price,
                    price_start_date=date.today()  # Sæt startdato til dags dato
                )
                print(f"Opdateret pris for Album: {album} til {current_price} med startdato {date.today()}")
            else:
                print(f"Pris for Album: {album} er uændret.")

    print("Importen er færdig!")
