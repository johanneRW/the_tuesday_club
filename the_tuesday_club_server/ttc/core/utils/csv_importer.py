import csv
import re
from typing import List, Optional
import uuid
from datetime import date
from ..models import AlbumAdditionalInfo, AlbumEANcode, AlbumFormat, AlbumGenre, AlbumReleaseYear, AlbumUPC, AlbumUnitFormat, Artist, Genre, Label, Album, AlbumPrice
from .helpers import get_column_value, parse_date 


def get_or_create_label(label_name: str) -> Label:
    # Find eller opret det specifikke Label baseret på label_name
    label, created = Label.objects.get_or_create(
        label_name=label_name,
        defaults={'label_id': uuid.uuid4()}
    )
    if created:
        print(f"Oprettet nyt label: {label_name}")
    else:
        print(f"Bruger eksisterende label: {label_name}")
    return label


def get_or_create_artist(artist_name: str) -> Artist:
    # Opret eller hent Artist
    artist, created = Artist.objects.get_or_create(
        artist_name=artist_name,
        defaults={'artist_id': uuid.uuid4()}
    )
    if created:
        print(f"Oprettet Artist: {artist}")
    else:
        print(f"Fundet eksisterende Artist: {artist}")
    return artist


def find_album(ean_code: Optional[str], upc: Optional[str]) -> Optional[Album]:
    # Tjek for eksisterende album baseret på EAN eller UPC
    album = None
    if ean_code:
        album = Album.objects.filter(albumeancode__album_ean_code=ean_code).first()
    elif upc:
        album = Album.objects.filter(albumupc__album_upc=upc).first()
    return album


def update_or_create_album(
    album: Optional[Album], 
    title: str,
    artist: Artist,
    label: Label,
    current_price: Optional[float],
) -> Album:
    # Hvis albummet allerede eksisterer, tjek prisen og opdater om nødvendigt
    if album:
        print(f"Fundet eksisterende album baseret på EAN/UPC: {album}")
        if current_price is not None:
            latest_price_entry = AlbumPrice.objects.filter(album_id=album).order_by('-price_start_date').first()
            if latest_price_entry is None or latest_price_entry.album_price != current_price:
                AlbumPrice.objects.create(
                    album_id=album,
                    album_price=current_price,
                    price_start_date=date.today()
                )
                print(f"Opdateret pris for Album: {album} til {current_price} med startdato {date.today()}")
            else:
                print(f"Pris for Album: {album} er uændret.")
    else:
        # Hvis albummet ikke eksisterer, opret det
        album = Album.objects.create(
            album_name=title,
            artist_id=artist,
            label_id=label,
            album_id=uuid.uuid4()
        )
        print(f"Oprettet nyt Album: {album}")
        # Album pris for nyt album
        AlbumPrice.objects.create(
            album_id=album,
            album_price=current_price,
            price_start_date=date.today()
        )
        print(f"Sat startpris for nyt Album: {album} til {current_price}")
    
    return album


def update_or_create_release_year(album: Album, release: Optional[str]) -> Optional[AlbumReleaseYear]:
    # Album Release Year
    if release:
        album_release_year, updated = AlbumReleaseYear.objects.update_or_create(
            album_id=album,
            defaults={'album_year': parse_date(release)}
        )
        print(f"Sat udgivelsesår for album: {album}")
        return album_release_year


def update_or_create_album_ean(album: Album, ean_code: Optional[str]) -> Optional[AlbumEANcode]:
    # Album EAN
    if ean_code:
        album_ean_code, updated = AlbumEANcode.objects.update_or_create(
            album_id=album,
            defaults={'album_ean_code': int(ean_code)}
        )
        print(f"Sat EAN-kode for album: {album}")
        return album_ean_code


def update_or_create_album_upc(album: Album, upc: Optional[str]) -> Optional[AlbumUPC]:
    # Album UPC
    if upc:
        album_upc, updated = AlbumUPC.objects.update_or_create(
            album_id=album,
            defaults={'album_upc': int(upc)}
        )
        print(f"Sat UPC-kode for album: {album}")
        return album_upc


def update_or_create_album_format(
    album: Album, 
    format_value: Optional[str], 
    units: Optional[str],
    media: Optional[str],
) -> Optional[AlbumUnitFormat]:
    # Album Format og AlbumUnitFormat
    if format_value:
        format_value = format_value.lower().strip()  # Ensret til små bogstaver og fjern overskydende mellemrum

        # Matcher formater som "12\"", "12in", "12inch"
        if re.match(r"^\d+\s*(\"|in|inch)$", format_value):
            #units = None  # Sætter units til None, da det hele er media
            media = format_value  # Brug hele værdien som media
        
        # Matcher formater som "LP", ", "Vinyl", hvor der kun er tekst
        elif re.match(r"^([a-zA-Z]\d|[a-zA-Z\s]+)$", format_value):
            if units is None:
                units = 1
            media = format_value  # Brug hele teksten som media
        
        # Matcher formater som "2LP", hvor der både er tal og bogstaver
        else:
            match = re.match(r"(\d+)\s*([a-zA-Z]+)", format_value)
            if match:
                units = match.group(1)  # Eksempel: '2' fra "2LP"
                media = match.group(2).strip()  # Eksempel: 'LP' fra "2LP"
    
    if units is None:
        raise Exception("mangler en units")

    if media:
        # Opret eller hent albumformat baseret på media
        album_format, _ = AlbumFormat.objects.get_or_create(album_format=media)
        if units:
            album_unit_format, updated = AlbumUnitFormat.objects.update_or_create(
                album_id=album,
                defaults={
                    'album_units': units,
                    'album_format_id': album_format
                }
            )
            print(f"Sat format og enheder for album: {album}")
        else:
            # Hvis der ikke er enheder, gem kun medieformatet
            album_unit_format, updated = AlbumUnitFormat.objects.update_or_create(
                album_id=album,
                defaults={
                    'album_units': "",  # Ingen enheder angivet
                    'album_format_id': album_format
                }
            )
            print(f"Sat format for album uden specifikke enheder: {album}")
        
        return album_unit_format


def update_or_create_album_additional_info(album: Album, additional_info: Optional[str]) -> Optional[AlbumAdditionalInfo]:
    # Album Additional Info
    if additional_info:
        album_additional_info, updated = AlbumAdditionalInfo.objects.update_or_create(
            album_id=album,
            defaults={'album_additional_info': additional_info}
        )
        print(f"Sat yderligere info for album: {album}")
        return album_additional_info


def update_or_create_album_genre(album: Album, genre_value: Optional[str]) -> Optional[AlbumGenre]:
    # Tilføj genre, hvis den findes
    if genre_value:
        genre, _ = Genre.objects.get_or_create(genre=genre_value)
        album_genre, updated = AlbumGenre.objects.get_or_create(
            album_id=album,
            genre_id=genre
        )
        print(f"Tilføjet genre {genre} til album {album}")
        return album_genre


def get_start_row(lines: List[str]) -> int:
    start_row = None

    for i, line in enumerate(lines):
        if "artist" in line.lower():
            start_row = i
            break

    if start_row is None:
        raise ValueError("Kunne ikke finde kolonnen 'artist' i CSV-filen.")

    print(f"Starter importering fra linje: {start_row + 1}")

    return start_row


def import_csv_to_multiple_tables(csv_file_path, label_name):
    label = get_or_create_label(label_name)
    
    # Åbn CSV-filen og find startlinjen baseret på "artist"-kolonnen
    with open(csv_file_path, mode='r') as file:
        lines = file.readlines()        
        start_row = get_start_row(lines)
        # Indlæs filen fra startlinjen
        csv_reader = csv.DictReader(lines[start_row:])
        
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
            genre_value = get_column_value(row, 'genre') 

            if not artist_name:
                print('Springer over tom række', row)
                continue

            artist = get_or_create_artist(artist_name)
            album = find_album(ean_code, upc)
            current_price = float(price_value) if price_value else None
            album = update_or_create_album(album, title, artist, label, current_price)
            
            update_or_create_release_year(album, release)
            update_or_create_album_ean(album, ean_code)
            update_or_create_album_upc(album, upc)
            update_or_create_album_format(album, format_value, units, media)
            update_or_create_album_additional_info(album, additional_info)
            update_or_create_album_genre(album, genre_value)        

    print("Importen er færdig!")
