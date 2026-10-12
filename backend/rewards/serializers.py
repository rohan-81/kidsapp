from rest_framework import serializers
from .models import Reward

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ['id', 'child_profile', 'reward_type', 'title', 'icon', 'earned_at']
