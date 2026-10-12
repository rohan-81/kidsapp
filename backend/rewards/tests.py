from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Reward

class RewardAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_and_fetch_reward(self):
        res = self.client.post('/api/rewards/', {
            'reward_type': 'badge',
            'title': 'Alphabet Master',
            'icon': '⭐',
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['title'], 'Alphabet Master')

        get_res = self.client.get('/api/rewards/')
        self.assertEqual(get_res.status_code, status.HTTP_200_OK)
