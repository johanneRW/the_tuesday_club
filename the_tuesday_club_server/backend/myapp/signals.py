from django.dispatch import Signal, receiver
from django.contrib.auth.models import User
from myapp.models import Address

address_created = Signal()

@receiver(address_created)
def create_address(sender, user, address_data, **kwargs):
    Address.objects.create(
        user_id=user,
        **address_data  # Unpack dictionary direkte
    )