from . import views  # Import views from current package
from django.urls import path  # Import path function for URL routing

# URL patterns list to map URLs to view functions
urlpatterns = [
    path('', views.about_me, name='about'),  # Root URL mapped to about_me view
]
