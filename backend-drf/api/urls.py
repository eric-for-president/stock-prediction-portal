from django.urls import path
from .views import CarPricePredictionAPIView
from accoounts import views as UserViews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path("register/", UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view',UserViews.ProtectedView.as_view()),
    #prediciton api
    path('predict/',CarPricePredictionAPIView.as_view(),name="car-price-prediction"),
]
