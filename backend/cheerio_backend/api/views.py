from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['POST'])
def signup(request):
    data = request.data
    
    # Check if user already exists
    if User.objects.filter(email=data["email"]).exists():
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create user (storing Full Name in first_name)
    user = User.objects.create_user(
        username=data["email"],  # Using email as username
        email=data["email"],
        password=data["password"],
        first_name=data["full_name"]
    )
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data["email"], password=request.data["password"])
    if user:
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_details(request, email):
    try:
        user = User.objects.get(email=email)
        return Response({"full_name": user.first_name}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)