from django.db.models.signals import post_save  # Signal after model save
from django.contrib.auth.models import User  # Django User model
from django.dispatch import receiver  # Decorator to register signal handlers
from .models import Profile  # Profile model in current app


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Create a Profile object when a new User is created.
    """
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    """
    Save the Profile instance when the User is updated.
    """
    instance.profile.save()
