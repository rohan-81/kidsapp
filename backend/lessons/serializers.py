from rest_framework import serializers
from .models import Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'id',
            'title',
            'category',
            'language',
            'age_group',
            'difficulty',
            'symbol',
            'subtitle',
            'phonetic',
            'example_word',
            'example_meaning',
            'audio_prompt',
            'visual_color',
            'is_active',
            'created_at',
        ]
