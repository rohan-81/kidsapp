from django.db import models
from django.contrib.auth.models import User

class ChildProfile(models.Model):
    AGE_GROUP_CHOICES = [
        ('2-4', 'Ages 2–4'),
        ('4-6', 'Ages 4–6'),
        ('6-8', 'Ages 6–8'),
    ]

    parent = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='child_profiles')
    nickname = models.CharField(max_length=60, default='Little Learner', blank=True)
    age_group = models.CharField(max_length=10, choices=AGE_GROUP_CHOICES, default='2-4')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.nickname} ({self.age_group})"
