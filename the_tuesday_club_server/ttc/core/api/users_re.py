from ninja import Router
from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.models import User
from ..signals import address_created
from .serializers.address_serializers import (AddressCreateSchema)
from .serializers.login_serializers import (LoginSchema, UserSchema, ErrorSchema)
from .serializers.user_serializers import (
    UserCreateSchema,
    UserResponseSchema,
)
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session



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



#burde funger men dekoder ikke korrekt: mulige årsager, databasen skal startes op fra bunden igen, 
     # eller det fungere kun over https fobindelse og kan derfor ikke teste lokalt uden tunneling
@router.get("/me", response=UserSchema)
def get_current_user(request):
    print("Session data:", list(request.session.items()))  # Log sessionen
    print("Authenticated user:", request.user.is_authenticated)  # Log brugerstatus
    print("User object:", request.user)  # Log brugerobjekt
    if request.user.is_authenticated:
        return UserSchema(
            username=request.user.username,
            isAuthenticated=True,
            isSuperuser=request.user.is_superuser,
        )
    return JsonResponse({"detail": "Unauthorized"}, status=401)




#burde funger men dekoder ikke korrekt: mulige årsager, databasen skal startes op fra bunden igen, 
    # eller det fungere kun over https fobindelse og kan derfor ikke teste lokalt uden tunneling

@router.post("/logout", response={200: UserSchema, 401: ErrorSchema})
def user_logout(request):
    if not request.user.is_authenticated:
        # Returnér 401, hvis brugeren ikke er logget ind
        return 401, {"error": "You are not logged in."}
    
    try:
        logout(request)
        
        # Fjern session-cookien
        response = JsonResponse({"message": "Logout successful!"})
        response.delete_cookie("sessionid")
        return response

    except Exception as e:
        return 500, {"error": "An error occurred during logout. Please try again."}
