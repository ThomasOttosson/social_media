from django.apps import AppConfig  # Import Django AppConfig base class


class AboutConfig(AppConfig):
    # Set the default auto field type for model primary keys
    default_auto_field = 'django.db.models.BigAutoField'

    # Specify the app name for Django to recognize
    name = 'about'
