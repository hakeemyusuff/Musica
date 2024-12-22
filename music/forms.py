from django import forms
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class CustomPasswordResetForm(PasswordResetForm):

    def clean(self):
        cleaned_data = super().clean()

        email = cleaned_data.get("email")

        if not UserModel.objects.filter(email=email).exists():
            raise forms.ValidationError("User with email does not exist")

        return cleaned_data

