from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, BloodDonation

# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("name", "username", "phone_number", "address", "is_active", "is_staff")

admin.site.register(CustomUser, CustomUserAdmin)

@admin.register(BloodDonation)
class BloodDonationAdmin(admin.ModelAdmin):
    list_display = ("user", "survey", "first_donation_date", "last_donation_date", "num_donations", "output")
    list_filter = ("survey",)
    search_fields = ("survey","user__email")
    sortable_by = ("first_donation_date", "last_donation_date", "num_donations", "output")
