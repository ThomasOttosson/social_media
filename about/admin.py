from django.contrib import admin  # Import Django admin module
from django_summernote.admin import SummernoteModelAdmin  # Import Summernote

from .models import (  # Import models to register admin
    About,
    CollaborateRequest,
)


@admin.register(About)  # Register About model with admin site
class AboutAdmin(SummernoteModelAdmin):
    # Enable Summernote editor for the 'content' field
    summernote_fields = ('content',)


@admin.register(CollaborateRequest)  # Register CollaborateRequest model admin
class CollaborateRequestAdmin(admin.ModelAdmin):
    # Display these fields in the admin list view
    list_display = ('message', 'read')
