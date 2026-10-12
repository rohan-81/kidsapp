from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ChildProfile

class ChildProfileAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_and_list_profile(self):
        res = self.client.post('/api/profiles/', {'nickname': 'Maya', 'age_group': '4-6'})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['nickname'], 'Maya')

        list_res = self.client.get('/api/profiles/')
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
