from django.db import models
from lessons.models import Lesson

class Question(models.Model):
    QUESTION_TYPES = [
        ('find-letter', 'Find the Correct Letter'),
        ('picture-matching', 'Picture Matching'),
        ('counting', 'Counting Game'),
        ('memory-match', 'Memory Match'),
        ('missing-letter', 'Missing Letter'),
        ('colors-shapes', 'Colors & Shapes'),
        ('listen-choose', 'Listen & Choose'),
    ]

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='questions', null=True, blank=True)
    question_text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=40, choices=QUESTION_TYPES, default='find-letter', db_index=True)
    options = models.JSONField(help_text="List of choices: [{'id': '1', 'label': 'A'}]")
    correct_answer = models.CharField(max_length=100, help_text="Correct option id or value")
    explanation = models.CharField(max_length=255, blank=True)
    hint = models.CharField(max_length=255, blank=True)
    image = models.CharField(max_length=255, blank=True)
    audio = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.question_type}: {self.question_text[:40]}"
