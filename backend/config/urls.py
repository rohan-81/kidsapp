"""
URL configuration for KidsZone backend project.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/lessons/', include('lessons.urls')),
    path('api/questions/', include('questions.urls')),
    path('api/profiles/', include('child_profiles.urls')),
    path('api/', include('progress.urls')),
    path('api/rewards/', include('rewards.urls')),
]
