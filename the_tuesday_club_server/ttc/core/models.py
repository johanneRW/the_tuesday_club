import uuid
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords
from core.managers import PileItemClosedOrderManager, PileItemManager, PileItemOrderManager
from project.custom_storages import MediaStorage


def uuid_str():
    return str(uuid.uuid4())


class User(AbstractUser):
    id = models.CharField(primary_key=True, default=uuid_str)
    history = HistoricalRecords()


class Artist(models.Model):
    artist_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    artist_name = models.CharField(max_length=255)

    def __str__(self):
        return self.artist_name
    

class Label(models.Model):
    label_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    label_name = models.CharField(max_length=255,unique=True)

    def __str__(self):
        return self.label_name


class AlbumImage(models.Model):
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    album_id = models.OneToOneField(
        'Album', on_delete=models.CASCADE, unique=True, related_name='album_image'
    )
    image = models.ImageField(upload_to='uploads/',storage=MediaStorage(),null=True)  # Filen gemmes i bucket i "media/uploads/"


class Album(models.Model):
    album_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    album_name = models.CharField(max_length=255)
    artist_id = models.ForeignKey(Artist, on_delete=models.CASCADE, db_column='artist_id')
    label_id = models.ForeignKey(Label, on_delete=models.CASCADE, db_column='label_id')
   
    def __str__(self):
        return self.album_name


class AlbumReleaseYear(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_year = models.DateField()
    
    
class AlbumEANcode(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_ean_code=models.BigIntegerField(unique=True)
        
    
class AlbumUPC(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_upc=models.BigIntegerField(unique=True)


class AlbumFormat(models.Model):
    album_format=models.CharField(unique=True, max_length=255)
        
        
class AlbumUnitFormat(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_units=models.CharField(max_length=255)
    album_format_id=models.ForeignKey(AlbumFormat, on_delete=models.CASCADE, db_column='album_format_id')
    
    
class AlbumAdditionalInfo(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_additional_info=models.CharField(max_length=255)
    
    
class Genre(models.Model):
    genre = models.CharField(unique=True, max_length=255)


class AlbumGenre(models.Model):
    album_id = models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    genre_id = models.ForeignKey(Genre, on_delete=models.CASCADE, db_column='genre_id')


class AlbumPrice(models.Model):
    album_id = models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    price_start_date = models.DateField()
    album_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('album_id', 'price_start_date')


class Address(models.Model):
    user_id= models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="address"
    )
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.IntegerField()
    country = models.CharField(max_length=100)
    history = HistoricalRecords()

    def __str__(self):
        return f"{self.street}, {self.city}, {self.postal_code}, {self.country}"
    

class PileStatus(models.TextChoices):
    OPEN = ("open", "Åben")
    CLOSED = ("closed", "Lukket")
    ORDERED = ("ordered", "Bestilt")
    RECEIVED = ("received", "Modtaget")
    SENT = ("sent", "Afsendt")


class Pile(models.Model):
    pile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='user_id')
    pile_start_date = models.DateTimeField()
    history = HistoricalRecords()

    class Meta:
        unique_together = ('pile_id', 'user_id')


class PileItem(models.Model):
    pile_item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pile_id = models.ForeignKey(Pile, on_delete=models.CASCADE, db_column='pile_id')
    album_id= models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    pile_status = models.CharField(choices=PileStatus)
    added_to_pile = models.DateTimeField()
    pile_item_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    history = HistoricalRecords()

    # Custom Manager
    objects = PileItemManager()
    admin_objects = PileItemOrderManager()
    admin_adresses_objects=PileItemClosedOrderManager()
    
    class Meta:
        unique_together = ('pile_id','album_id')


class AlbumView(models.Model):
    album_id = models.UUIDField(primary_key=True)
    album_name = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255, null=True, blank=True)
    album_units = models.IntegerField(null=True, blank=True)
    album_format_id = models.IntegerField(null=True, blank=True)
    format_name = models.CharField(max_length=50, null=True, blank=True)
    label_name = models.CharField(max_length=255, null=True, blank=True)
    album_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_start_date = models.DateField(null=True, blank=True)
    album_image = models.CharField(max_length=255)

    class Meta:
        managed = False  # Django administrerer ikke viewet
        db_table = 'album_view'  # Navn på viewet i databasen


class AdminAlbumView(models.Model):
    album_id = models.UUIDField(primary_key=True)
    album_name = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)
    album_units = models.IntegerField(null=True, blank=True)
    album_format_id = models.IntegerField(null=True, blank=True)
    format_name = models.CharField(max_length=50)
    label_name = models.CharField(max_length=255, null=True, blank=True)
    album_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_start_date = models.DateField(null=True, blank=True)
    album_ean_code = models.BigIntegerField( null=True, blank=True)
    album_upc = models.BigIntegerField( null=True, blank=True)

    class Meta:
        managed = False  
        db_table = 'admin_album_view'


class UnsentPileItem(models.Model):
    unique_key = models.CharField(max_length=255, primary_key=True)
    pile_item_id = models.UUIDField()
    album_id = models.UUIDField()
    album_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    added_to_pile = models.DateTimeField()
    pile_id = models.UUIDField()
    pile_status = models.CharField(max_length=255)
    user_id = models.IntegerField()

    class Meta:
        managed = False 
        db_table = 'unsent_pile_items_view'  