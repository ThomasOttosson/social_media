from django.db import models  # Import Django models module
from cloudinary.models import CloudinaryField  # Import Cloudinary field


class About(models.Model):
    # Title of the About entry
    title = models.CharField(max_length=200)
    # Profile image stored using Cloudinary with default placeholder
    profile_image = CloudinaryField('image', default='placeholder')
    # Timestamp updated automatically on each save
    updated_on = models.DateTimeField(auto_now=True)
    # Main content text for the About entry
    content = models.TextField()

    def __str__(self):
        # String representation returns the title
        return self.title


class CollaborateRequest(models.Model):
    # Name of the person requesting collaboration
    name = models.CharField(max_length=200)
    # Email address of the requester
    email = models.EmailField()
    # Message content of the request
    message = models.TextField()
    # Boolean flag indicating if request has been read
    read = models.BooleanField(default=False)

    def __str__(self):
        # String representation with requester’s name
        return f"Collaboration request from {self.name}"
