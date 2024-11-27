from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from myapp.models import Address


@receiver(post_save, sender=User)
def create_address(sender, instance, created, **kwargs):
    if created and not hasattr(instance, "addresses"):  # Opret kun, hvis der ikke findes en adresse
        Address.objects.create(
            user_id=instance,
            street="Default Street",
            city="Default City",
            postal_code=12345,
            country="Default Country",
        )
