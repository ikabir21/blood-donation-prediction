from django.db import models

class BloodDonation(models.Model):
    first_donation_date = models.DateField()
    last_donation_date = models.DateField()
    num_donations = models.IntegerField()

