from rest_framework.serializers import ModelSerializer, Serializer, CharField
from django.contrib.auth.models import User
from .models import Student

class StudentSerializer(ModelSerializer):

    class Meta:
        model = Student 
        fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate','photo')

class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)
