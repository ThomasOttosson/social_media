from . import views  # Import views from current package
from django.urls import path  # Import path for URL routing

# URL patterns to map URLs to corresponding views
urlpatterns = [
    # Home page showing a list of posts using a class-based view
    path('', views.PostList.as_view(), name='home'),

    # Detail view for a post, identified by slug in the URL
    path('<slug:slug>/', views.post_detail, name='post_detail'),

    # Edit a comment on a post, given post slug and comment ID
    path(
        '<slug:slug>/edit_comment/<int:comment_id>',
        views.comment_edit,
        name='comment_edit'
    ),

    # Delete a comment on a post, given post slug and comment ID
    path(
        '<slug:slug>/delete_comment/<int:comment_id>',
        views.comment_delete,
        name='comment_delete'
    ),

    # Like a post, identified by slug
    path('<slug:slug>/like/', views.post_like, name='post_like'),
]
