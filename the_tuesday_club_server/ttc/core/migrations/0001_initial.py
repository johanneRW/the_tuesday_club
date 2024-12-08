# Generated by Django 5.1.2 on 2024-12-08 15:05

import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import project.custom_storages
import simple_history.models
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
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
        migrations.CreateModel(
            name='UnsentPileItem',
            fields=[
                ('unique_key', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('pile_item_id', models.UUIDField()),
                ('album_id', models.UUIDField()),
                ('album_name', models.CharField(max_length=255)),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('added_to_pile', models.DateTimeField()),
                ('pile_id', models.UUIDField()),
                ('pile_status', models.CharField(max_length=255)),
                ('user_id', models.IntegerField()),
            ],
            options={
                'db_table': 'unsent_pile_items_view',
                'managed': False,
            },
        ),
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
                ('label_name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
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
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='address', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AlbumAdditionalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_additional_info', models.CharField(max_length=255)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumEANcode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_ean_code', models.BigIntegerField(unique=True)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumImage',
            fields=[
                ('image_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(null=True, storage=project.custom_storages.MediaStorage(), upload_to='uploads/')),
                ('album_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='album_image', to='core.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumReleaseYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_year', models.DateField()),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumUnitFormat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_units', models.CharField(max_length=255)),
                ('album_format_id', models.ForeignKey(db_column='album_format_id', on_delete=django.db.models.deletion.CASCADE, to='core.albumformat')),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumUPC',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_upc', models.BigIntegerField(unique=True)),
                ('album_id', models.OneToOneField(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='artist_id',
            field=models.ForeignKey(db_column='artist_id', on_delete=django.db.models.deletion.CASCADE, to='core.artist'),
        ),
        migrations.CreateModel(
            name='AlbumGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
                ('genre_id', models.ForeignKey(db_column='genre_id', on_delete=django.db.models.deletion.CASCADE, to='core.genre')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalAddress',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('street', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=100)),
                ('postal_code', models.IntegerField()),
                ('country', models.CharField(max_length=100)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user_id', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical address',
                'verbose_name_plural': 'historical addresss',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalPile',
            fields=[
                ('pile_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False)),
                ('pile_status', models.CharField(choices=[('open', 'Åben'), ('closed', 'Lukket'), ('ordered', 'Bestilt'), ('received', 'Modtaget'), ('sent', 'Afsendt')])),
                ('pile_start_date', models.DateTimeField()),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user_id', models.ForeignKey(blank=True, db_column='user_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical pile',
                'verbose_name_plural': 'historical piles',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalUser',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(db_index=True, error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.UUIDField(db_index=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical user',
                'verbose_name_plural': 'historical users',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.AddField(
            model_name='album',
            name='label_id',
            field=models.ForeignKey(db_column='label_id', on_delete=django.db.models.deletion.CASCADE, to='core.label'),
        ),
        migrations.CreateModel(
            name='Pile',
            fields=[
                ('pile_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('pile_status', models.CharField(choices=[('open', 'Åben'), ('closed', 'Lukket'), ('ordered', 'Bestilt'), ('received', 'Modtaget'), ('sent', 'Afsendt')])),
                ('pile_start_date', models.DateTimeField()),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('pile_id', 'user_id')},
            },
        ),
        migrations.CreateModel(
            name='HistoricalPileItem',
            fields=[
                ('pile_item_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False)),
                ('added_to_pile', models.DateTimeField()),
                ('pile_item_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('album_id', models.ForeignKey(blank=True, db_column='album_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='core.album')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('pile_id', models.ForeignKey(blank=True, db_column='pile_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='core.pile')),
            ],
            options={
                'verbose_name': 'historical pile item',
                'verbose_name_plural': 'historical pile items',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='AlbumPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_start_date', models.DateField()),
                ('album_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
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
                ('quantity', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('album_id', models.ForeignKey(db_column='album_id', on_delete=django.db.models.deletion.CASCADE, to='core.album')),
                ('pile_id', models.ForeignKey(db_column='pile_id', on_delete=django.db.models.deletion.CASCADE, to='core.pile')),
            ],
            options={
                'unique_together': {('pile_id', 'album_id')},
            },
        ),
    ]
