from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from lessons.models import Lesson
from .models import Question

class QuestionAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.lesson = Lesson.objects.create(
            title='Test Lesson',
            category='gu-varnamala',
            language='gu',
            age_group='2-4'
        )
        self.question = Question.objects.create(
            lesson=self.lesson,
            question_text='Find letter K',
            question_type='find-letter',
            options=[{'id': '1', 'label': 'ક'}, {'id': '2', 'label': 'ખ'}],
            correct_answer='1',
            is_active=True
        )

    def test_list_questions_by_lesson(self):
        response = self.client.get(f'/api/questions/?lesson_id={self.lesson.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['question_text'], 'Find letter K')
        # Ensure correct_answer is not leaked in public endpoint
        self.assertNotIn('correct_answer', results[0])
