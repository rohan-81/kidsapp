from rest_framework import viewsets
from .models import LessonProgress, GameResult
from .serializers import LessonProgressSerializer, GameResultSerializer

class LessonProgressViewSet(viewsets.ModelViewSet):
    serializer_class = LessonProgressSerializer

    def get_queryset(self):
        profile_id = self.request.query_params.get('profile_id')
        queryset = LessonProgress.objects.all()
        if profile_id:
            queryset = queryset.filter(child_profile_id=profile_id)
        return queryset


class GameResultViewSet(viewsets.ModelViewSet):
    serializer_class = GameResultSerializer

    def get_queryset(self):
        profile_id = self.request.query_params.get('profile_id')
        queryset = GameResult.objects.all()
        if profile_id:
            queryset = queryset.filter(child_profile_id=profile_id)
        return queryset
