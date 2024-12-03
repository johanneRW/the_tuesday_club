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
from ninja.security import django_auth
from django.contrib.sessions.backends.db import SessionStore
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




""" @router.get("/me", response=UserSchema)
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

"""

def get_user_from_session_key(request) -> User | None:
    session_key = request.session.session_key
    print("Session key:", session_key)

    # Hent sessionen fra databasen
    try:
        session = Session.objects.get(session_key=session_key)
        session_data = session.get_decoded()
        print("Decoded session data:", session_data)
    except Session.DoesNotExist:
        return None
    
    # Hent user_id fra session-data
    user_id = session_data.get('user_id')  # Bemærk ændringen fra '_auth_user_id'
    if not user_id:
        return None

    # Find brugeren i databasen
    try:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(id=user_id)
        print("User found:", user)
    except User.DoesNotExist:
        return None
    else:
        return user


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
    
    # session_key = request.session.session_key
    # print("Session key:", session_key)

    # # Hent sessionen fra databasen
    # try:
    #     session = Session.objects.get(session_key=session_key)
    #     session_data = session.get_decoded()
    #     print("Decoded session data:", session_data)
    # except Session.DoesNotExist:
    #     return JsonResponse({"detail": "Session not found"}, status=401)

    # # Hent user_id fra session-data
    # user_id = session_data.get('user_id')  # Bemærk ændringen fra '_auth_user_id'
    # if not user_id:
    #     return JsonResponse({"detail": "No user_id in session"}, status=401)

    # # Find brugeren i databasen
    # try:
    #     from django.contrib.auth import get_user_model
    #     User = get_user_model()
    #     user = User.objects.get(id=user_id)
    #     print("User found:", user)
    # except User.DoesNotExist:
    #     return JsonResponse({"detail": "User not found"}, status=401)

    # # Returnér brugerens data
    # return JsonResponse({
    #     "username": user.username,
    #     "isAuthenticated": True,
    #     "isSuperuser": user.is_superuser,
    # })


@router.post("/logout", response={200: UserSchema, 401: ErrorSchema})
def user_logout(request):
    user_or_none = get_user_from_session_key(request)
    if user_or_none is None:
        # Returnér 401, hvis brugeren ikke er logget ind
        return 401, {"error": "You are not logged in."}
    
    try:
        logout(request)
        print("Logged out", user_or_none)
        
        # Fjern session-cookien
        response = JsonResponse({"message": "Logout successful!"})
        response.delete_cookie("sessionid")
        return response

    except Exception as e:
        return 500, {"error": "An error occurred during logout. Please try again."}

"""
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
"""