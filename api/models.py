from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator, EmailValidator


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The username field must be set')
        username = self.normalize_email(email=username)
        user = self.model(username=username, email=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)


class CustomUser(AbstractUser):
    username = models.EmailField(unique=True, validators=[EmailValidator()])


    name_validator = RegexValidator(
        regex=r'^[a-zA-Z ]*$',
        message='Name can only contain alphabets and spaces.'
    )
    name = models.CharField(max_length=100, validators=[name_validator])


    phone_number_validator = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message='Phone number must be entered in the format: "+999999999". Up to 15 digits allowed.'
    )
    phone_number = models.CharField(max_length=17, validators=[phone_number_validator])

    address = models.CharField(max_length=200)

    BLOOD_GROUPS = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUPS)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ['name', 'phone_number', 'blood_group']

    def __str__(self):
        return self.username
    
class BloodDonation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    survey = models.CharField(max_length=100)
    first_donation_date = models.DateField()
    last_donation_date = models.DateField()
    num_donations = models.IntegerField()
    output = models.DecimalField(max_digits=8, decimal_places=2, null=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s donation history"
    