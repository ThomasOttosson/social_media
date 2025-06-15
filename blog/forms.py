from django import forms  # Import Django forms module
from .models import Comment  # Import Comment model


class CommentForm(forms.ModelForm):
    """Form to submit comments on posts or articles."""

    class Meta:
        model = Comment  # Model associated with this form
        fields = ('body',)  # Include only the 'body' field in the form

    def __init__(self, *args, **kwargs):
        # Customize the widget attributes on form initialization
        super().__init__(*args, **kwargs)
        self.fields['body'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Share your thoughts...'
        })
