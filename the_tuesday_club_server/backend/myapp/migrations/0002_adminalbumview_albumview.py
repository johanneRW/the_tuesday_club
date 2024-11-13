# Generated by Django 5.1.2 on 2024-11-13 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminAlbumView',
            fields=[
                ('album_id', models.UUIDField(primary_key=True, serialize=False)),
                ('album_name', models.CharField(max_length=255)),
                ('artist_name', models.CharField(max_length=255)),
                ('album_units', models.IntegerField(blank=True, null=True)),
                ('album_format_id', models.IntegerField(blank=True, null=True)),
                ('format_name', models.CharField(max_length=50)),
                ('label_name', models.CharField(blank=True, max_length=255, null=True)),
                ('album_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('price_start_date', models.DateField(blank=True, null=True)),
                ('album_ean_code', models.BigIntegerField(blank=True, null=True)),
                ('album_upc', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'admin_album_view',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AlbumView',
            fields=[
                ('album_id', models.UUIDField(primary_key=True, serialize=False)),
                ('album_name', models.CharField(max_length=255)),
                ('artist_name', models.CharField(blank=True, max_length=255, null=True)),
                ('album_units', models.IntegerField(blank=True, null=True)),
                ('album_format_id', models.IntegerField(blank=True, null=True)),
                ('format_name', models.CharField(blank=True, max_length=50, null=True)),
                ('label_name', models.CharField(blank=True, max_length=255, null=True)),
                ('album_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('price_start_date', models.DateField(blank=True, null=True)),
                ('album_image', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'album_view',
                'managed': False,
            },
        ),
    ]
