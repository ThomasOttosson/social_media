from django.apps import AppConfig  # Import AppConfig base class


class BlogConfig(AppConfig):
    # Specify the default auto field type for model primary keys
    default_auto_field = 'django.db.models.BigAutoField'

    # Define the application name for Django
    name = 'blog'
