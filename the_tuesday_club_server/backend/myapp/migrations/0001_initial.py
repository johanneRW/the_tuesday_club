# Generated by Django 5.1.2 on 2024-11-06 18:03

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('album_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('album_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='AlbumFormat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_format', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('artist_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('artist_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('label_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('label_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PileStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pile_status_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=100)),
                ('postal_code', models.IntegerField()),
                ('country', models.CharField(max_length=100)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AlbumAdditionalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_additional_info', models.CharField(max_length=255)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumEANcode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_ean_code', models.BigIntegerField(unique=True)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumImage',
            fields=[
                ('image_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image_name', models.CharField(max_length=255)),
                ('album_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='album_image', to='myapp.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumReleaseYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_year', models.DateField()),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumUnitFormat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_units', models.CharField(max_length=255)),
                ('album_format_id', models.ForeignKey(db_column='album_format_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.albumformat')),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumUPC',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_upc', models.BigIntegerField(unique=True)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='artist_id',
            field=models.ForeignKey(db_column='artist_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.artist'),
        ),
        migrations.CreateModel(
            name='AlbumGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
                ('genre_id', models.ForeignKey(db_column='genre_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.genre')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='label_id',
            field=models.ForeignKey(db_column='label_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.label'),
        ),
        migrations.CreateModel(
            name='Pile',
            fields=[
                ('pile_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('pile_start_date', models.DateTimeField()),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('pile_status', models.ForeignKey(db_column='pile_status_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.pilestatus')),
            ],
            options={
                'unique_together': {('pile_id', 'user_id')},
            },
        ),
        migrations.CreateModel(
            name='AlbumPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_start_date', models.DateField()),
                ('album_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
            ],
            options={
                'unique_together': {('album_id', 'price_start_date')},
            },
        ),
        migrations.CreateModel(
            name='PileItem',
            fields=[
                ('pile_item_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('added_to_pile', models.DateTimeField()),
                ('pile_item_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.album')),
                ('pile_id', models.ForeignKey(db_column='pile_id', on_delete=django.db.models.deletion.CASCADE, to='myapp.pile')),
            ],
            options={
                'unique_together': {('pile_id', 'album_id')},
            },
        ),
    ]
