from django.urls import path  # URL routing
from . import views  # Import views from current app
from django.contrib.auth import views as auth_views  # Auth views


urlpatterns = [
    # User registration page
    path('register/', views.register, name='register'),

    # User's own profile page
    path('profile/', views.profile, name='profile'),

    # Public profile page by username
    path('profile/<str:username>/', views.public_profile,
         name='public_profile'),

    # Login page using Django's built-in LoginView with custom template
    path(
        'login/',
        auth_views.LoginView.as_view(template_name='users/login.html'),
        name='login',
    ),

    # Logout page using Django's built-in LogoutView with custom template
    path(
        'logout/',
        auth_views.LogoutView.as_view(template_name='users/logout.html'),
        name='logout',
    ),
]
