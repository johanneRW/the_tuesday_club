from ninja import Router
from django.contrib.auth import authenticate, logout
from core.models import Address, User
from ..utils.helpers import get_user_from_session_key
from ..signals import address_created
from .serializers.address_serializers import (AddressCreateSchema)
from .serializers.login_serializers import (LoginSchema, UserSchema, ErrorSchema)
from .serializers.user_serializers import (
    UserCreateSchema,
    UserResponseSchema,
    UserUpdateSchema)
from django.http import JsonResponse
from ninja.errors import HttpError
from django.db import transaction



router = Router()


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
        # Brug Django's indbyggede session management
        request.session['user_id'] = user.id

        # Opret og returner respons
        response = JsonResponse({"message": "Logged in"})
        response.set_cookie(
            key="sessionid",  # Brug det samme navn som i settings.py
            value=request.session.session_key,
            httponly=True,
            secure=True,  # Sæt til True i produktion
            samesite='None',  # Tillader cross-site cookies
        )
        # Pt. ikke understøttet i Django
        # response.headers['Set-Cookie'] += '; Partitioned'
        return response

    # Returnér en fejl med 401 statuskode, hvis login fejler
    return JsonResponse(
        {"detail": "Invalid username or password."},
        status=401
    )




@router.get("/me")
def get_current_user_manual(request):
    user_or_none = get_user_from_session_key(request)
    if user_or_none is None:
        return JsonResponse({"detail": "Session not found"}, status=401)
    else:
        return JsonResponse({
        "username": user_or_none.username,
        "isAuthenticated": True,
        "isSuperuser": user_or_none.is_superuser,
    })
    
    


@router.post("/logout", response={200: UserSchema, 401: ErrorSchema})
def user_logout(request):
    user_or_none = get_user_from_session_key(request)
    if user_or_none is None:
        return JsonResponse({"detail": "You are not logged in."}, status=401)
    
    try:
        logout(request)
        print("Logged out", user_or_none)
        
        # Fjern session-cookien
        response = JsonResponse({"message": "Logout successful!"})
        response.delete_cookie("sessionid")
        return response

    except Exception as e:
        return JsonResponse({"detail": "You are not logged in."}, status=500)
        #return 500, {"error": "An error occurred during logout. Please try again."}


@router.get("/profile", response=dict)
def get_profile(request):
    user = get_user_from_session_key(request)
    if not user:
        raise HttpError(401, "Authentication required.")
    
    try:
        address = Address.objects.get(user_id=user)  
    except Address.DoesNotExist:
        raise HttpError(404, "Address not found for the user.")

    return {
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "address": {
            "street": address.street,
            "city": address.city,
            "postal_code": address.postal_code,
            "country": address.country,
        },
    }



@router.patch("/profile", response=dict)
def update_profile(request, user_data: UserUpdateSchema, address_data: AddressCreateSchema = None):
    user = get_user_from_session_key(request)
    if not user:
        raise HttpError(401, "Authentication required.")
    
    try:
        address = Address.objects.get(user_id=user) 
    except Address.DoesNotExist:
        raise HttpError(404, "Address not found for the user.")
    
    # Opdater brugerdata
    with transaction.atomic():
        for attr, value in user_data.dict(exclude_none=True).items():
            setattr(user, attr, value)
        user.save()

        # Opdater adresse, hvis den er inkluderet
        if address_data:
            for attr, value in address_data.dict(exclude_none=True).items():
                setattr(address, attr, value)
            address.save()

    return {
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "address": {
            "street": address.street,
            "city": address.city,
            "postal_code": address.postal_code,
            "country": address.country,
        },
    }
