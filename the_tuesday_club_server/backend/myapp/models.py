from django.db import models

class Artist(models.Model):
    artist_id = models.CharField(primary_key=True, max_length=255)
    artist_name = models.CharField(max_length=255)

    def __str__(self):
        return self.artist_name


class Label(models.Model):
    label_id = models.CharField(primary_key=True, max_length=255)
    label_name = models.CharField(max_length=255)

    def __str__(self):
        return self.label_name


class AlbumImage(models.Model):
    image_id = models.CharField(primary_key=True, max_length=255)
    image_name = models.CharField(max_length=255)
    album_id = models.OneToOneField(
        'Album', on_delete=models.CASCADE, unique=True, related_name='album_image'
    )


class Album(models.Model):
    album_id = models.CharField(primary_key=True, max_length=255)
    album_name = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, db_column='artist_id')
    label = models.ForeignKey(Label, on_delete=models.CASCADE, db_column='label_id')
    album_year = models.DateField()

    def __str__(self):
        return self.album_name


class AlbumPrice(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, db_column='album_id')
    price_start_date = models.IntegerField()
    album_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('album', 'price_start_date')


class MemberRole(models.Model):
    roles_id = models.IntegerField(primary_key=True)
    roles_name = models.CharField(max_length=255)

    def __str__(self):
        return self.roles_name


class MemberStatus(models.Model):
    member_status_id = models.IntegerField(primary_key=True)
    member_status_name = models.CharField(max_length=255)

    def __str__(self):
        return self.member_status_name


class Member(models.Model):
    member_id = models.CharField(primary_key=True, max_length=255)
    member_name = models.CharField(max_length=255)
    member_address = models.CharField(max_length=255)
    member_email = models.EmailField()
    member_status = models.OneToOneField(MemberStatus, on_delete=models.CASCADE, db_column='member_status_id')
    member_role = models.OneToOneField(MemberRole, on_delete=models.CASCADE, db_column='member_role_id')

    def __str__(self):
        return self.member_name


class MemberPassword(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True, db_column='member_id')
    member_password = models.CharField(max_length=255)


class PileStatus(models.Model):
    status_id = models.IntegerField(primary_key=True)
    pile_status_name = models.CharField(max_length=255)

    def __str__(self):
        return self.pile_status_name


class Pile(models.Model):
    pile_id = models.CharField(max_length=255)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, db_column='member_id')
    pile_status = models.ForeignKey(PileStatus, on_delete=models.CASCADE, db_column='pile_status_id')
    pile_start_date = models.DateTimeField()

    class Meta:
        unique_together = ('pile_id', 'member')


class PileItem(models.Model):
    pile = models.OneToOneField(Pile, on_delete=models.CASCADE, db_column='pile_id')
    album = models.OneToOneField(Album, on_delete=models.CASCADE, primary_key=True, db_column='album_id')
    added_to_pile = models.DateTimeField()
    pile_item_price = models.DecimalField(max_digits=10, decimal_places=2)

