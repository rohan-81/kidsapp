from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = Question.objects.filter(is_active=True)
        lesson_id = self.request.query_params.get('lesson_id')
        question_type = self.request.query_params.get('question_type')

        if lesson_id:
            queryset = queryset.filter(lesson_id=lesson_id)
        if question_type:
            queryset = queryset.filter(question_type=question_type)

        return queryset
