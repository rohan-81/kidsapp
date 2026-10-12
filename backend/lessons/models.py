from django.db import models

class Lesson(models.Model):
    LANGUAGE_CHOICES = [
        ('gu', 'Gujarati'),
        ('en', 'English'),
        ('hi', 'Hindi'),
        ('all', 'Universal'),
    ]

    AGE_GROUP_CHOICES = [
        ('2-4', 'Ages 2–4'),
        ('4-6', 'Ages 4–6'),
        ('6-8', 'Ages 6–8'),
        ('all', 'All Ages'),
    ]

    title = models.CharField(max_length=120)
    category = models.CharField(max_length=60, db_index=True)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='gu', db_index=True)
    age_group = models.CharField(max_length=10, choices=AGE_GROUP_CHOICES, default='2-4', db_index=True)
    difficulty = models.PositiveSmallIntegerField(default=1)
    symbol = models.CharField(max_length=20, default='★')
    subtitle = models.CharField(max_length=120, blank=True)
    phonetic = models.CharField(max_length=60, blank=True)
    example_word = models.CharField(max_length=100, blank=True)
    example_meaning = models.CharField(max_length=120, blank=True)
    audio_prompt = models.CharField(max_length=200, blank=True)
    visual_color = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.title} ({self.category} - {self.language})"
