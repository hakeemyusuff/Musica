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


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label="Enter Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Confirm Password", widget=forms.PasswordInput)
    
    class Meta:
        model = UserModel
        fields = ['first_name', 'last_name', 'username', 'email']
        
    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError("Password doesn't match.")
        return cd['password2']
