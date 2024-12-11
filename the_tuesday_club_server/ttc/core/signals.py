from django.dispatch import Signal, receiver
from core.models import Address

address_created = Signal()

@receiver(address_created)
def create_address(sender, user, address_data, **kwargs):
    Address.objects.create(
        user_id=user,
        **address_data 
    )