from django.urls import path
from . import views


urlpatterns = [
    path('', views.others_view, name='other_view'),
    path('view_msg', views.view_msg, name='view_msg'),
]
