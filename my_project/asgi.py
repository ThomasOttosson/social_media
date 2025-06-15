"""
ASGI config for my_project project.

Exposes the ASGI callable as a module-level variable named ``application``.

For more details, see:
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os  # Module for interacting with the operating system

from django.core.asgi import get_asgi_application  # ASGI application

# Set default Django settings module environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_project.settings')

# Get ASGI application callable to be used by ASGI servers
application = get_asgi_application()
