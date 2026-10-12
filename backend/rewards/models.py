from django.db import models
from child_profiles.models import ChildProfile

class Reward(models.Model):
    child_profile = models.ForeignKey(ChildProfile, on_delete=models.CASCADE, related_name='rewards', null=True, blank=True)
    reward_type = models.CharField(max_length=60, default='badge')
    title = models.CharField(max_length=120)
    icon = models.CharField(max_length=30, default='⭐')
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.reward_type}: {self.title}"
