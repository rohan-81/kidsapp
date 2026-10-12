from django.db import models
from child_profiles.models import ChildProfile
from lessons.models import Lesson

class LessonProgress(models.Model):
    child_profile = models.ForeignKey(ChildProfile, on_delete=models.CASCADE, related_name='lesson_progress', null=True, blank=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='user_progress')
    completed = models.BooleanField(default=True)
    best_score = models.IntegerField(default=1)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('child_profile', 'lesson')

    def __str__(self):
        return f"Progress: {self.lesson.title} - Done: {self.completed}"


class GameResult(models.Model):
    child_profile = models.ForeignKey(ChildProfile, on_delete=models.CASCADE, related_name='game_results', null=True, blank=True)
    game_type = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=5)
    played_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game_type}: {self.score}/{self.total_questions}"
