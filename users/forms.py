from django import forms  # Django form classes and fields
from django.contrib.auth.models import User  # Django User model
from django.contrib.auth.forms import UserCreationForm  # User signup form
from .models import Profile  # Profile model from current app


class UserRegisterForm(UserCreationForm):
    """
    Form for registering a new user, including email field.
    """
    email = forms.EmailField()  # Required email field

    class Meta:
        model = User  # Model to create
        fields = ['username', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    """
    Form for updating existing User info, including email.
    """
    email = forms.EmailField()  # Email field for updates

    class Meta:
        model = User  # User model to update
        fields = ['username', 'email']


class ProfileUpdateForm(forms.ModelForm):
    """
    Form for updating the Profile model fields.
    """

    class Meta:
        model = Profile  # Profile model to update
        fields = ['bio', 'avatar']  # Editable fields
