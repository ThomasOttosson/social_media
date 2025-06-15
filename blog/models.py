from django.db import models  # Django ORM models
from django.contrib.auth.models import User  # User model for authorship, likes
from cloudinary.models import CloudinaryField  # Cloudinary for image uploads

# Status choices for Post publishing state
STATUS = ((0, "Draft"), (1, "Published"))


class Post(models.Model):
    # Title of the blog post, must be unique
    title = models.CharField(max_length=200, unique=True)

    # URL-friendly identifier for the post, unique
    slug = models.SlugField(max_length=200, unique=True)

    # Author of the post; linked to Django User model
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="blog_posts"
    )

    # Featured image for the post stored in Cloudinary
    featured_image = CloudinaryField('image', default='placeholder')

    # Main content of the post
    content = models.TextField(default="test")

    # Timestamp when the post was created
    created_on = models.DateTimeField(auto_now_add=True)

    # Publishing status (Draft or Published)
    status = models.IntegerField(choices=STATUS, default=0)

    # Optional excerpt or summary of the post
    excerpt = models.TextField(blank=True, default="this is my default")

    # Timestamp when the post was last updated
    updated_on = models.DateTimeField(auto_now=True)

    # Many-to-many relationship for likes by users
    likes = models.ManyToManyField(
        User,
        related_name='liked_posts',
        blank=True
    )

    class Meta:
        # Order posts by creation date descending by default
        ordering = ["-created_on"]

    def __str__(self):
        # Return the post title as its string representation
        return self.title

    def number_of_likes(self):
        # Return count of users who liked this post
        return self.likes.count()


class Comment(models.Model):
    # The post that this comment belongs to
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    # The user who wrote the comment
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="commenter"
    )

    # Self-referential field to allow threaded replies
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )

    # Content of the comment
    body = models.TextField()

    # Approval status of the comment (moderation)
    approved = models.BooleanField(default=False)

    # Timestamp when the comment was created
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Order comments by creation date ascending
        ordering = ["created_on"]

    def __str__(self):
        # String with comment body and author username
        return f"Comment {self.body} by {self.author}"

    def get_replies(self):
        # Return queryset of replies to this comment ordered by date
        return Comment.objects.filter(parent=self).order_by('created_on')
