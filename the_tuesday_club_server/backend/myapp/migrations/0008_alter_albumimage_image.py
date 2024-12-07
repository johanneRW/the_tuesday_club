# Generated by Django 5.1.2 on 2024-12-07 13:36

import backend.custom_storages
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_unsentpileitem_albumimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='albumimage',
            name='image',
            field=models.ImageField(null=True, storage=backend.custom_storages.MediaStorage(), upload_to='uploads/'),
        ),
    ]