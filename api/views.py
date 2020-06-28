from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated

from .models import Profile, Code
from .serializers import ProfileSerializer, CodeSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_class = [IsAuthenticated]

class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    # permission_class = [IsAuthenticated]

# for testing connectivity to backend
from django.shortcuts import render
from django.http import JsonResponse

def test_json(request):
    return JsonResponse({'message': 'You have reached the backend!'})