from django.contrib import admin  # Import Django admin module
from django_summernote.admin import SummernoteModelAdmin  # Summernote admin

from .models import Post, Comment  # Import Post and Comment models


@admin.register(Post)  # Register Post model with admin site
class PostAdmin(SummernoteModelAdmin):
    # Fields to display in the admin list view
    list_display = ('title', 'slug', 'status')

    # Fields searchable in admin search bar
    search_fields = ['title', 'content']

    # Filters available in the admin sidebar
    list_filter = ('status', 'created_on')

    # Automatically fill 'slug' field based on 'title'
    prepopulated_fields = {'slug': ('title',)}

    # Fields using Summernote rich text editor
    summernote_fields = ('content',)


# Register Comment model with default admin options
admin.site.register(Comment)
