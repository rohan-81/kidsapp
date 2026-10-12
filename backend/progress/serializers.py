from rest_framework import serializers
from .models import LessonProgress, GameResult

class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ['id', 'child_profile', 'lesson', 'completed', 'best_score', 'updated_at']


class GameResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameResult
        fields = ['id', 'child_profile', 'game_type', 'score', 'total_questions', 'played_at']
