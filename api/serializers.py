from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import CustomUser, BloodDonation


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'username', 'phone_number', 'address', 'blood_group']


class BloodDonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = BloodDonation
        fields = "__all__"


class UserBloodDonationSerializer(serializers.Serializer):
    # Fields from CustomUser model
    name = serializers.CharField()
    username = serializers.EmailField()
    phone_number = serializers.CharField()
    address = serializers.CharField()
    blood_group = serializers.ChoiceField(choices=CustomUser.BLOOD_GROUPS)

    # Fields from Donation model
    first_donation_date = serializers.DateField()
    last_donation_date = serializers.DateField()
    num_donations = serializers.IntegerField()
    survey = serializers.CharField()

    # Override create method to create CustomUser and Donation objects
    def create(self, validated_data):
        # Extract CustomUser data from validated_data
        user_data = {
            'name': validated_data['name'],
            'username': validated_data['username'],
            'phone_number': validated_data['phone_number'],
            'address': validated_data['address'],
            'blood_group': validated_data['blood_group']
        }

        # Create CustomUser object
        user = CustomUser.objects.create_user(**user_data)

        # Extract Donation data from validated_data
        donation_data = {
            'user': user,
            'first_donation_date': validated_data['first_donation_date'],
            'last_donation_date': validated_data['last_donation_date'],
            'num_donations': validated_data['num_donations'],
            'survey': validated_data['survey']
        }

        # Create Donation object
        donation = BloodDonation.objects.create(**donation_data)

        # Return the created objects
        return {'user': user, 'donation': donation}
    
class BloodDonationPrediction(serializers.Serializer):
    survey = serializers.CharField()
