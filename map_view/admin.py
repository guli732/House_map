from django.contrib import admin
from .models import House_base


@admin.register(House_base)
class House_baseAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'totalprice', 'house_area',)