from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Lesson

class LessonAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.lesson1 = Lesson.objects.create(
            title='ક - કમળ',
            category='gu-varnamala',
            language='gu',
            age_group='2-4',
            symbol='ક',
            example_word='કમળ',
            is_active=True
        )
        self.lesson2 = Lesson.objects.create(
            title='A for Apple',
            category='en-alphabet',
            language='en',
            age_group='2-4',
            symbol='A',
            example_word='Apple',
            is_active=True
        )

    def test_list_lessons(self):
        response = self.client.get('/api/lessons/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check pagination or results
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_filter_by_language(self):
        response = self.client.get('/api/lessons/?language=gu')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['symbol'], 'ક')

    def test_retrieve_single_lesson(self):
        response = self.client.get(f'/api/lessons/{self.lesson1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'ક - કમળ')
