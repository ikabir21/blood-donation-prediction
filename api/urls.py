from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('predict/', views.BloodDonationAPIView.as_view(), name="predict"),
    path("add-details/", views.AddBloodDonationDataAPIView.as_view(), name="addDetails"),
    path("predict-all/", views.GetBloodDonationPrediction.as_view(), name="predictAll"),
    path("get-surveys/", views.GetSurveyNames.as_view(), name="getSurveyNames"),
    path("login/", views.LoginView.as_view(), name="api_login"),
    path('token/refresh/', views.TokenRefreshAPIView.as_view(), name='token_refresh'),
]