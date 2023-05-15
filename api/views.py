from rest_framework import viewsets, status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser, BloodDonation
from .serializers import BloodDonationSerializer, UserBloodDonationSerializer, BloodDonationPrediction, LoginSerializer
from django.contrib.auth import authenticate, login
from .predict import predict
from datetime import datetime
from rest_framework_simplejwt.views import TokenRefreshView

class BloodDonationAPIView(APIView):
    queryset = BloodDonation.objects.all()
    serializer_class = BloodDonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = BloodDonationSerializer(data=request.data)
        if serializer.is_valid():
            first_donation_date = request.data.get('first_donation_date')
            last_donation_date = request.data.get('last_donation_date')
            num_donations = request.data.get('num_donations')
            
            # Call the predict function to make a prediction
            prediction = predict([first_donation_date, last_donation_date, num_donations])
            probability = prediction[0][0]
            
            # Return the probability as a JSON response
            return Response({'result': probability})
        else:
            # Return an error message if the input data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddBloodDonationDataAPIView(APIView):
    serializer_class = UserBloodDonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            data = request.data["user"].copy()
            data.update(request.data["donation"])
            serializer = UserBloodDonationSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': 'success',
                    'data': serializer.validated_data,
                    'message': "Data saved successfully!"
                }, status=status.HTTP_201_CREATED)
            return Response({
                    'status': 'error',
                    'errors': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                        'status': 'error',
                        'errors': str(e)
                    }, status=status.HTTP_400_BAD_REQUEST)
        
class GetBloodDonationPrediction(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            survey = request.GET.get("survey", "")

            if survey is None or survey == '':
                queryset = BloodDonation.objects.all()
            else:
                queryset = BloodDonation.objects.filter(survey=survey)

            count = 0
            prob = 0
            prob50 = 0

            for item in queryset:
                res = predict([str(item.first_donation_date), str(item.last_donation_date), str(item.num_donations)])
                item.output = res[0][0] * 100
                count += 1
                if item.output >= 50:
                    prob50 += 1
                prob += item.output
                item.save()

            serializer = BloodDonationSerializer(queryset, many=True)

            return Response({
                    'status': 'success',
                    'data': serializer.data,
                    'stats': {'overall_probality': round(prob / count, 2), 'probality50': prob50, 'prob50_percentage': round((prob50/count) * 100, 2)}
                }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                        'status': 'error',
                        'errors': str(e)
                    }, status=status.HTTP_400_BAD_REQUEST)
        
class GetSurveyNames(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            survey_names = BloodDonation.objects.values_list('survey', flat=True).distinct()
            return Response({
                'status': 'success',
                'data': list(survey_names)
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'status': 'error',
                'errors': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token
                return Response({'status': 'success', 'message': 'Login successful.', 'access': str(refresh.access_token), 'refresh': str(refresh)})
            else:
                return Response({'status': 'success', 'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TokenRefreshAPIView(TokenRefreshView):
    pass
        