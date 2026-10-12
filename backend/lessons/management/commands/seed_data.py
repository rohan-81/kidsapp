from django.core.management.base import BaseCommand
from lessons.models import Lesson
from questions.models import Question

class Command(BaseCommand):
    help = 'Seeds KidsZone database with comprehensive Gujarati, English, Hindi lessons & questions'

    def handle(self, *args, **options):
        self.stdout.write('Seeding KidsZone educational data...')

        lessons_data = [
            # Gujarati Swar & Vyanjan
            {
                'title': 'અ - અનાનસ',
                'category': 'gu-varnamala',
                'language': 'gu',
                'age_group': '2-4',
                'symbol': 'અ',
                'subtitle': 'સ્વર (Vowel)',
                'phonetic': 'A',
                'example_word': 'અનાનસ',
                'example_meaning': 'Pineapple',
                'audio_prompt': 'અ, અનાનસ નો અ',
                'visual_color': '#DDEFE5',
            },
            {
                'title': 'આ - આગગાડી',
                'category': 'gu-varnamala',
                'language': 'gu',
                'age_group': '2-4',
                'symbol': 'આ',
                'subtitle': 'સ્વર (Vowel)',
                'phonetic': 'Aa',
                'example_word': 'આગગાડી',
                'example_meaning': 'Train',
                'audio_prompt': 'આ, આગગાડી નો આ',
                'visual_color': '#DFEAF8',
            },
            {
                'title': 'ક - કમળ',
                'category': 'gu-varnamala',
                'language': 'gu',
                'age_group': '2-4',
                'symbol': 'ક',
                'subtitle': 'વ્યંજન (Consonant)',
                'phonetic': 'Ka',
                'example_word': 'કમળ',
                'example_meaning': 'Lotus Flower',
                'audio_prompt': 'ક, કમળ નો ક',
                'visual_color': '#F6EDC9',
            },
            {
                'title': 'ખ - ખલ',
                'category': 'gu-varnamala',
                'language': 'gu',
                'age_group': '2-4',
                'symbol': 'ખ',
                'subtitle': 'વ્યંજન (Consonant)',
                'phonetic': 'Kha',
                'example_word': 'ખલ',
                'example_meaning': 'Mortar',
                'audio_prompt': 'ખ, ખલ નો ખ',
                'visual_color': '#DDEFE5',
            },
            # Gujarati Barakhadi
            {
                'title': 'ક - કા - કિ - કી',
                'category': 'gu-barakhadi',
                'language': 'gu',
                'age_group': '4-6',
                'symbol': 'કા',
                'subtitle': 'Barakhadi Patterns',
                'phonetic': 'Ka, Kaa, Ki, Kee',
                'example_word': 'કાગડો',
                'example_meaning': 'Crow',
                'audio_prompt': 'ક ને કાનો કા',
                'visual_color': '#DFEAF8',
            },
            # English Alphabet & Words
            {
                'title': 'A for Apple',
                'category': 'en-alphabet',
                'language': 'en',
                'age_group': '2-4',
                'symbol': 'A',
                'subtitle': 'Uppercase A',
                'phonetic': '/æ/',
                'example_word': 'Apple',
                'example_meaning': 'Sweet red fruit',
                'audio_prompt': 'A is for Apple',
                'visual_color': '#F9E5D8',
            },
            {
                'title': 'B for Ball',
                'category': 'en-alphabet',
                'language': 'en',
                'age_group': '2-4',
                'symbol': 'B',
                'subtitle': 'Uppercase B',
                'phonetic': '/b/',
                'example_word': 'Ball',
                'example_meaning': 'Round toy',
                'audio_prompt': 'B is for Ball',
                'visual_color': '#DFEAF8',
            },
            # Hindi Varnamala
            {
                'title': 'अ - अनार',
                'category': 'hi-varnamala',
                'language': 'hi',
                'age_group': '4-6',
                'symbol': 'अ',
                'subtitle': 'स्वर',
                'phonetic': 'A',
                'example_word': 'अनार',
                'example_meaning': 'Pomegranate',
                'audio_prompt': 'अ से अनार',
                'visual_color': '#F9E5D8',
            },
            {
                'title': 'क - कबूतर',
                'category': 'hi-varnamala',
                'language': 'hi',
                'age_group': '4-6',
                'symbol': 'क',
                'subtitle': 'व्यंजन',
                'phonetic': 'Ka',
                'example_word': 'कबूतर',
                'example_meaning': 'Pigeon',
                'audio_prompt': 'क से कबूतर',
                'visual_color': '#DDEFE5',
            },
            # Numbers
            {
                'title': '1 • One • ૧ • १',
                'category': 'numbers',
                'language': 'all',
                'age_group': '2-4',
                'symbol': '1',
                'subtitle': 'One Star',
                'phonetic': 'One',
                'example_word': '1 Star',
                'example_meaning': 'એક તારો / एक तारा',
                'audio_prompt': 'Number One. ૧ (એક).',
                'visual_color': '#F6EDC9',
            },
            {
                'title': '2 • Two • ૨ • २',
                'category': 'numbers',
                'language': 'all',
                'age_group': '2-4',
                'symbol': '2',
                'subtitle': 'Two Apples',
                'phonetic': 'Two',
                'example_word': '2 Apples',
                'example_meaning': 'બે સફરજન / दो सेब',
                'audio_prompt': 'Number Two. ૨ (બે).',
                'visual_color': '#F9E5D8',
            },
        ]

        created_count = 0
        for l_data in lessons_data:
            lesson, created = Lesson.objects.get_or_create(
                title=l_data['title'],
                category=l_data['category'],
                defaults=l_data
            )
            if created:
                created_count += 1

                # Add sample question
                Question.objects.create(
                    lesson=lesson,
                    question_text=f"Find the matching symbol for {lesson.example_word}",
                    question_type='find-letter',
                    options=[
                        {'id': '1', 'label': lesson.symbol},
                        {'id': '2', 'label': '★'},
                        {'id': '3', 'label': '▲'},
                    ],
                    correct_answer='1',
                    explanation=f"Correct! {lesson.symbol} matches {lesson.example_word}."
                )

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {created_count} lessons & questions."))
