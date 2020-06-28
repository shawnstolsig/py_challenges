from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Code


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    snippets = CodeSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'date_created', 'date_updated', 'dark_mode_enabled', 'tab_size', 'editor_theme', 'user', 'snippets')

    # must modify update function for updating nested 
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
