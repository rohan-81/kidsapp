from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    """
    Public student serializer. Excludes correct_answer for secure server-validated quizzes
    unless explicitly checking validation.
    """
    class Meta:
        model = Question
        fields = [
            'id',
            'lesson',
            'question_text',
            'question_type',
            'options',
            'explanation',
            'hint',
            'image',
            'audio',
        ]
