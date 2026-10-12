from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LessonProgressViewSet, GameResultViewSet

router = DefaultRouter()
router.register(r'progress', LessonProgressViewSet, basename='progress')
router.register(r'game-results', GameResultViewSet, basename='game-result')

urlpatterns = [
    path('', include(router.urls)),
]
