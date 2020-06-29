from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Code, Completion

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = '__all__'

class CompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Completion
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    snippets = CodeSerializer(many=True, read_only=True)
    completed_challenges = CompletionSerializer(many=True, read_only=True)
    class Meta: 
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile', 'snippets', 'completed_challenges')

    # must modify update function for updating nested 
    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance
