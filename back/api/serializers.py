from rest_framework import serializers
from .models import User, Product

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','email','age','password','balance','id']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["name","image","price","quantity", "id"]