from django.urls import path
from .views import signup, login, get_user_details, chat

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path("user/<str:email>/", get_user_details, name="get_user_details"),
    path("chat/", chat),
]