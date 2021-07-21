from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class userRegisterForm(UserCreationForm):

    password1 = forms.CharField(label="Introduzca su contraseña", widget=forms.PasswordInput(attrs={"class": "text-input"}))

    password2 = forms.CharField(label="Confirme su contraseña", widget=forms.PasswordInput(attrs={"class": "text-input"}))

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

        widgets = {
            "username": forms.TextInput(
                attrs={"class": "text-input"}
            ),
            "email": forms.EmailInput(
                attrs={"class": "text-input"}
            )
        }
        
        help_texts = {k: "" for k in fields}