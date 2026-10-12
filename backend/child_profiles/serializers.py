from rest_framework import serializers
from .models import ChildProfile

class ChildProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildProfile
        fields = ['id', 'nickname', 'age_group', 'created_at']
