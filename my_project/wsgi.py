"""
WSGI config for my_project project.

Exposes the WSGI callable as a module-level variable named ``application``.

For more information, see:
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os  # Operating system module for environment variables

from django.core.wsgi import get_wsgi_application  # WSGI application


# Set the default Django settings module for the 'my_project' project
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_project.settings')

# Get the WSGI application callable to be used by WSGI servers
application = get_wsgi_application()
