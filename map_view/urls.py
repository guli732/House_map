from django.urls import path
from . import views


urlpatterns = [
    path('', views.map_view, name='map_view'),
    # path('ajax_send', views.ajax_send, name='ajax_send'),
]
