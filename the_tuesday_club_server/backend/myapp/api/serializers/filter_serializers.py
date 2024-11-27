from ninja import Schema

class LabelNameSchema(Schema):
    label_name: str

class FormatNameSchema(Schema):
    format_name: str

class AlbumUnitsSchema(Schema):
    album_units: str

class ArtistNameSchema(Schema):
    artist_name: str

class PriceRangeSchema(Schema):
    min_price: float
    max_price: float
