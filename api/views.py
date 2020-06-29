from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .models import Profile, Code, Completion
from .serializers import ProfileSerializer, CodeSerializer, CompletionSerializer, UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_class = [IsAuthenticated]

class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    # permission_class = [IsAuthenticated]

class CompletionViewSet(viewsets.ModelViewSet):
    queryset = Completion.objects.all()
    serializer_class = CompletionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# for testing connectivity to backend
from django.shortcuts import render
from django.http import JsonResponse

def test_json(request):
    return JsonResponse({'message': 'You have reached the backend!'})