from typing import Any, Dict
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['id', 'username', 'isAdmin', 'token','name','email']

    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name

        name = firstname + ' ' + lastname

        if name == ' ':
            name = obj.username
        return name
    
    def get_username(self, obj):
        return obj.username
    
    def get_id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_email(self, obj):
        return obj.email

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data =  super().validate(attrs)
        serializer = UserDetailSerializer(self.user).data

class UserListSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password', 'first_name', 'last_name', 'is_staff', 'is_active','last_login','date_joined']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user