from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from lessons.models import Lesson
from .models import LessonProgress, GameResult

class ProgressAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.lesson = Lesson.objects.create(
            title='Test Lesson',
            category='gu-varnamala',
            language='gu',
            age_group='2-4'
        )

    def test_record_lesson_progress(self):
        res = self.client.post('/api/progress/', {
            'lesson': self.lesson.id,
            'completed': True,
            'best_score': 3,
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['best_score'], 3)

    def test_record_game_result(self):
        res = self.client.post('/api/game-results/', {
            'game_type': 'counting',
            'score': 5,
            'total_questions': 5,
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['score'], 5)
