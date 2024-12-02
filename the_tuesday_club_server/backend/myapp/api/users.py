from ninja import Router
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from ..signals import address_created
from .serializers.address_serializers import (AddressCreateSchema)
from .serializers.login_serializers import (LoginSchema)
from .serializers.user_serializers import (
    UserCreateSchema,
    UserResponseSchema,
)
from django.http import JsonResponse



router = Router()

@router.get("/users/{user_id}", response=UserResponseSchema)
def get_user(request, user_id: int):
    user = User.objects.select_related("address").get(id=user_id)  # Hent user og adresse
    return UserResponseSchema.from_orm(user)


# Sign-up endpoint
@router.post("/sign_up", response=UserResponseSchema)
def sign_up(request, user_data: UserCreateSchema, address_data: AddressCreateSchema):
    user = User.objects.create_user(
        **user_data.to_user_data(),  # Brug kun nødvendige data
        password=user_data.password  # Tilføj password separat
    )

    # Send custom signal med parametre
    address_data_dict = address_data.to_dict()
    address_created.send(
        sender=User,
        user=user,
        address_data=address_data_dict,
)
    return UserResponseSchema.from_orm(user)

    

# Login endpoint

@router.post("/login", response=dict)
def user_login(request, credentials: LoginSchema):
    user = authenticate(username=credentials.username, password=credentials.password)
    if user is not None:
        login(request, user)
        return {"message": "Login successful!"}

    # Returnér en struktureret fejl med 401 statuskode
    return JsonResponse(
        {"detail": "Invalid username or password."},
        status=401
    )
