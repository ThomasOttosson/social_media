from django.apps import AppConfig  # Import base class for app configuration


class HelloWorldConfig(AppConfig):
    """
    Configuration class for the 'hello_world' Django app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hello_world'
