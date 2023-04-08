from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BloodDonation
from .serializers import BloodDonationSerializer
from .predict import predict
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer
from datetime import datetime


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class BloodDonationAPIView(APIView):
    queryset = BloodDonation.objects.all()
    serializer_class = BloodDonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = BloodDonationSerializer(data=request.data)
        if serializer.is_valid():
            first_donation_date = request.data.get('first_donation_date')
            last_donation_date = request.data.get('last_donation_date')
            num_donations = request.data.get('num_donations')

            first_donation_date = datetime.strptime(first_donation_date, '%Y-%m-%d').date()
            today = datetime.now().date()
            last_donation_date = datetime.strptime(last_donation_date, '%Y-%m-%d').date()
            num_donations = int(num_donations)

            today = datetime.now().date()

            months_since_first_donation = (today.year - first_donation_date.year) * 12 + (today.month - first_donation_date.month)

            months_since_last_donation = (today.year - last_donation_date.year) * 12 + (today.month - last_donation_date.month)

            print("input1: ", months_since_first_donation, months_since_last_donation, num_donations)
            
            # Call the predict function to make a prediction
            prediction = predict([months_since_last_donation, months_since_first_donation, num_donations])
            probability = prediction[0][0]
            
            # Return the probability as a JSON response
            return Response({'probability': probability})
        else:
            # Return an error message if the input data is invalid
            return Response(serializer.errors, status=400)
