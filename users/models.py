from django.db import models  # Django ORM models
from django.contrib.auth.models import User  # Built-in User model
from cloudinary.models import CloudinaryField  # For image/cloud storage
from django.db.models.signals import post_save  # Signal on model save
from django.dispatch import receiver  # Decorator to register signal handlers


class Profile(models.Model):
    """
    Profile linked one-to-one with User.
    Holds extra info like bio and avatar.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    bio = models.TextField(max_length=500, blank=True)  # Optional user bio
    avatar = CloudinaryField('image', default='placeholder')  # Profile image
    created_on = models.DateTimeField(auto_now_add=True)  # Creation timestamp
    updated_on = models.DateTimeField(auto_now=True)  # Last update timestamp

    def __str__(self):
        # Display username with "Profile"
        return f'{self.user.username} Profile'


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    Creates or updates Profile automatically on User save.
    """
    if created:
        # Create profile on new user creation
        Profile.objects.create(user=instance)
    else:
        # Save profile on existing user update
        instance.profile.save()
