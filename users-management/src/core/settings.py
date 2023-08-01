from datetime import timedelta
import os
from configurations import Configuration
from pathlib import Path
from .env import env


class Base(Configuration):
    # Directory of django project
    BASE_DIR = Path(__file__).resolve().parent.parent

    # Quick-start development settings - unsuitable for production
    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = env('SECRET_KEY')

    # App host

    APP_HOST = env('APP_HOST')

    # Application definition

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'phonenumber_field',
        'rest_framework',
        'rest_framework_simplejwt',

        'users',
        'tokens',
    ]

    # Middlewares

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    # Urls

    ROOT_URLCONF = 'core.urls'

    # Templates

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [BASE_DIR / 'templates'],
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

    # Rest settings

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'tokens.authentication.CookieJWTAuthentication'
        ]
    }

    SIMPLE_JWT = {
        "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
        "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
        "ROTATE_REFRESH_TOKENS": True,
        "BLACKLIST_AFTER_ROTATION": True,
        "UPDATE_LAST_LOGIN": False,

        "ALGORITHM": "HS256",
        "SIGNING_KEY": SECRET_KEY,
        "VERIFYING_KEY": "",
        "AUDIENCE": None,
        "ISSUER": None,
        "JSON_ENCODER": None,
        "JWK_URL": None,
        "LEEWAY": 0,

        "AUTH_HEADER_TYPES": ("Bearer",),
        "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
        "USER_ID_FIELD": "id",
        "USER_ID_CLAIM": "user_id",
        "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

        "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
        "TOKEN_TYPE_CLAIM": "token_type",
        "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

        "JTI_CLAIM": "jti",

        "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
        "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
        "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

        "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
        "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
        "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
        "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
        "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
        "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",

        'AUTH_COOKIE_ACCESS': 'access_token',  # Cookie name. Enables cookies if value is set.
        'AUTH_COOKIE_REFRESH': 'refresh_token',  # Cookie name. Enables cookies if value is set.
        'AUTH_COOKIE_DOMAIN': None,  # A string like "example.com", or None for standard domain cookie.
        'AUTH_COOKIE_SECURE': False,  # Whether the auth cookies should be secure (https:// only).
        'AUTH_COOKIE_HTTP_ONLY': True,  # Http only cookie flag.It's not fetch by javascript.
        'AUTH_COOKIE_PATH': '/',  # The path of the auth cookie.
        'AUTH_COOKIE_SAMESITE': 'Lax',  # Whether to set the flag restricting cookie leaks on cross-site requests.

    }

    # WSGI settings

    WSGI_APPLICATION = 'core.wsgi.application'

    # Password validation

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

    # Email

    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = env('EMAIL_HOST')
    EMAIL_HOST_USER = env('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
    EMAIL_PORT = env('EMAIL_PORT')
    EMAIL_USE_SSL = env('EMAIL_USE_SSL')

    # Auth user model

    AUTH_USER_MODEL = 'users.User'

    # Internationalization

    LANGUAGE_CODE = 'en-us'

    TIME_ZONE = 'UTC'

    USE_I18N = True

    USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    STATIC_URL = 'static/'

    # Default primary key field type
    DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

    # Company name
    COMPANY_NAME = 'Eat Express'

    # Logging

    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s',
            },
            'simple': {
                'format': '%(levelname)s %(message)s',
            },
        },
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'formatter': 'simple',
            },
            'file': {
                'class': 'logging.FileHandler',
                'filename': BASE_DIR / 'logs.log',
                'formatter': 'verbose',
            },
        },
        'loggers': {
            'django': {
                'handlers': ['console', 'file'],
                'level': 'INFO',
            },
            'users': {
                'handlers': ['console', 'file'],
                'level': 'DEBUG',
            },
            'tokens': {
                'handlers': ['console', 'file'],
                'level': 'DEBUG',
            },
        },
    }


class Develop(Base):
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True

    ALLOWED_HOSTS = [
        'localhost',
        '127.0.0.1',
        '192.168.0.104'
    ]

    # Database
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'HOST': env('PG_HOST'),
            'PORT': env('PG_PORT'),
            'NAME': env('PG_DATABASE'),
            'USER': env('PG_USER'),
            'PASSWORD': env('PG_PASSWORD'),
        }
    }


class Test(Base):
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True

    ALLOWED_HOSTS = [
        'localhost',
        '127.0.0.1',
        '192.168.0.104'
    ]

    # Database
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': Base.BASE_DIR / 'db.sqlite3'
        }
    }
