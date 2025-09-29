from django.urls import path
from accoounts import views as UserViews
urlpatterns = [
    path('register/',UserViews.RegisterView.as_view()),
]
