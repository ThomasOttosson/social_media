from django.apps import AppConfig  # Base class for app configuration


class UsersConfig(AppConfig):
    """
    Configuration for the 'users' app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        # Import signals module to register signal handlers on app ready
        import users.signals
