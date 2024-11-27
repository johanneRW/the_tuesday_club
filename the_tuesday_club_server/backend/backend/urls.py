"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from backend.api.csv import router as csv_router
from backend.api.albums import router as albums_router
from backend.api.filters import router as filters_router
from backend.api.users import router as users_router



api = NinjaAPI()


api.add_router("/csv", csv_router)  
api.add_router("/albums", albums_router)  
api.add_router("/filters", filters_router)
api.add_router("/users", users_router)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),
]
