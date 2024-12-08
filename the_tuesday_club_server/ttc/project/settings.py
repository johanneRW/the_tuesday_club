"""
Django settings for ttc project.

Generated by 'django-admin startproject' using Django 5.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
import ast
from pathlib import Path
from dotenv import load_dotenv
# Import dj-database-url at the beginning of the file.
import dj_database_url

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = 'RENDER' not in os.environ

ALLOWED_HOSTS = ast.literal_eval(os.getenv("ALLOWED_HOSTS"))

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:    
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# Application definition

INSTALLED_APPS = [
    'core', 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'storages',
    'simple_history',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # For CORS
    "django.contrib.sessions.middleware.SessionMiddleware",  # Session håndtering
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",  # CSRF-beskyttelse
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Bruger autentifikation
    "django.contrib.messages.middleware.MessageMiddleware",
    'simple_history.middleware.HistoryRequestMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# Replace the SQLite DATABASES configuration with PostgreSQL:
DATABASES = {
    'default': dj_database_url.config(        
                                      # Replace this value with your local database's connection string.        
                                      default=os.environ.get("DATABASE_URL"),      
                                      conn_max_age=600    
                                      )}


AUTH_USER_MODEL = "core.User"

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Copenhagen'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'
if not DEBUG:    # Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    # Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
    # and renames the files with unique names for each version to support long-term caching
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SESSION_ENGINE = "django.contrib.sessions.backends.db" 
SESSION_COOKIE_NAME = "sessionid"
SESSION_COOKIE_SECURE = 'secure'    # Påkrævet for HTTPS

CORS_ALLOW_CREDENTIALS = True  # Tillader cookies

if DEBUG:
    SESSION_COOKIE_SAMESITE = 'None'  # For cross-origin
    SESSION_COOKIE_AGE = 60 * 60 * 24 * 30  # 30 dage
    CORS_ALLOW_ALL_ORIGINS = True
else:
    SESSION_COOKIE_SAMESITE = 'None'  # For cross-origin
    SESSION_COOKIE_AGE = 60 * 60  # 1 time
    CORS_ALLOWED_ORIGINS = ast.literal_eval(os.environ.get("CORS_ALLOWED_ORIGINS"))

""" CORS_ALLOW_HEADERS = [
    "Authorization",
    "Content-Type",
    "X-CSRFToken",
    "Set-Cookie",
] """

# Linode Object Storage-konfiguration
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_STORAGE_BUCKET_NAME = 'thetuesdayclub'
AWS_S3_ENDPOINT_URL = 'https://se-sto-1.linodeobjects.com'  # Erstat "your-region"
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',  # Cache kontrol for bedre ydelse
}
AWS_LOCATION = 'media/'  # Folder i bucket for mediafiler
AWS_DEFAULT_ACL = 'public-read'

#DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
DEFAULT_FILE_STORAGE = 'project.custom_storages.MediaStorage'



# Valgfri: Hvis du også bruger S3 til statiske filer
#STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
#STATIC_URL = f'{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/static/'

# Media URL
MEDIA_URL = f'{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/{AWS_LOCATION}'