from rest_framework import viewsets
from .models import Lesson
from .serializers import LessonSerializer

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows lessons to be viewed or searched.
    Supports filtering by category, language, age_group, and difficulty.
    """
    serializer_class = LessonSerializer

    def get_queryset(self):
        queryset = Lesson.objects.filter(is_active=True)

        category = self.request.query_params.get('category')
        language = self.request.query_params.get('language')
        age_group = self.request.query_params.get('age_group')
        difficulty = self.request.query_params.get('difficulty')

        if category:
            queryset = queryset.filter(category=category)
        if language:
            queryset = queryset.filter(language__in=[language, 'all'])
        if age_group:
            queryset = queryset.filter(age_group__in=[age_group, 'all'])
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)

        return queryset
