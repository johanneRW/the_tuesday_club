from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from ninja import Router, Schema
from myapp.models import Address

router = Router()

# Schema for oprettelse af bruger
class UserCreateSchema(Schema):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str

# Schema for oprettelse af adresse
class AddressCreateSchema(Schema):
    street: str
    city: str
    postal_code: int
    country: str

# Schema for login
class LoginSchema(Schema):
    username: str
    password: str


@router.post("/sign_up")
def sign_up(request, user_data: UserCreateSchema, address_data: AddressCreateSchema):
    # Opret bruger
    user = User.objects.create_user(
        username=user_data.username,
        password=user_data.password,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
    )

    # Overstyr signal og opret adresse med brugerdata
    Address.objects.create(
        user_id=user,
        street=address_data.street,
        city=address_data.city,
        postal_code=address_data.postal_code,
        country=address_data.country,
    )

    return {"message": "User and address created successfully!"}


# Login endpoint
@router.post("/login")
def user_login(request, credentials: LoginSchema):
    user = authenticate(username=credentials.username, password=credentials.password)
    if user is not None:
        login(request, user)
        return {"message": "Login successful!"}
    return {"error": "Invalid username or password."}
