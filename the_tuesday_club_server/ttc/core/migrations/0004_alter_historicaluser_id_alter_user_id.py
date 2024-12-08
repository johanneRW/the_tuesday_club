# Generated by Django 5.1.2 on 2024-12-08 15:24

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_historicaluser_id_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicaluser',
            name='id',
            field=models.CharField(db_index=True, default=core.models.uuid_str),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=core.models.uuid_str, primary_key=True, serialize=False),
        ),
    ]