from django import forms  # Import Django forms module
from .models import CollaborateRequest  # Import CollaborateRequest model


class CollaborateForm(forms.ModelForm):
    """Form for submitting collaboration requests."""

    class Meta:
        model = CollaborateRequest  # Model linked to this form
        fields = (                  # Fields to include in the form
            'name',
            'email',
            'message',
        )
