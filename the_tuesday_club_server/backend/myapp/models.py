from django.contrib.auth.models import User
import uuid
from django.db import models

class Artist(models.Model):
    artist_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    artist_name = models.CharField(max_length=255)

    def __str__(self):
        return self.artist_name


class Label(models.Model):
    label_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    label_name = models.CharField(max_length=255)

    def __str__(self):
        return self.label_name


class AlbumImage(models.Model):
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    image_name = models.CharField(max_length=255)
    album_id = models.OneToOneField(
        'Album', on_delete=models.CASCADE, unique=True, related_name='album_image'
    )


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
    album_ean_code=models.IntegerField(unique=True)
        
    
class AlbumUPC(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_upc=models.IntegerField(unique=True)


class AlbumFormat(models.Model):
    album_format=models.CharField(unique=True, max_length=255)
        
        
class AlbumUnitFormat(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_units=models.CharField(max_length=255)
    album_format_id=models.ForeignKey(AlbumFormat, on_delete=models.CASCADE, db_column='album_format_id')
    
    
class AlbumAdditionalInfo(models.Model):
    album_id = models.OneToOneField(Album, on_delete=models.CASCADE, db_column='album_id')
    album_additional_info=models.CharField(max_length=255)
       

class AlbumPrice(models.Model):
    album_id = models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    price_start_date = models.DateField()
    album_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('album_id', 'price_start_date')


class Address(models.Model):
    user_id= models.OneToOneField(User, on_delete=models.CASCADE, related_name="addresses")
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.IntegerField()
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.postal_code}, {self.country}"


class PileStatus(models.Model):
    pile_status_name = models.CharField(max_length=255)

    def __str__(self):
        return self.pile_status_name


class Pile(models.Model):
    pile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    pile_status = models.ForeignKey(PileStatus, on_delete=models.CASCADE, db_column='pile_status_id')
    pile_start_date = models.DateTimeField()

    class Meta:
        unique_together = ('pile_id', 'user_id')


class PileItem(models.Model):
    pile_item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pile_id = models.ForeignKey(Pile, on_delete=models.CASCADE, db_column='pile_id')
    album_id= models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    added_to_pile = models.DateTimeField()
    pile_item_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        unique_together = ('pile_id','album_id')

