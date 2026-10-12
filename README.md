# KidsZone — Learn, Play & Grow

A complete, calm, offline-first educational mobile application for children aged 2–8 years, designed to teach **Gujarati**, **English**, and **Hindi** through interactive lessons, audio pronunciations, finger letter tracing, quizzes, and 7 educational games.

Built with **React Native (Expo)** and **Django REST Framework**.

---

## 🌟 App Highlights & Core Features

- **App Name**: KidsZone
- **Tagline**: Learn, Play & Grow
- **Android Package**: `com.kidszone.learning`
- **Design Aesthetic**: Calm soft pastel palette (mint `#DDEFE5`, pale sky blue `#DFEAF8`, light peach `#F9E5D8`, muted lavender `#EAE3F5`, soft yellow `#F6EDC9`, primary accent `#729A85`)
- **Offline-First**: Bundled lessons, quizzes, and audio synthesis run 100% offline without requiring an internet connection or backend server.
- **Child Privacy by Design**: Zero ads, zero user tracking, zero voice recording or microphone requirements. Progress is safely saved locally on device.
- **Parent Corner**: Protected by a dynamic mathematical verification challenge (multiplication/addition gate) to prevent accidental child access. Provides screen-time break reminders, progress monitoring, and data clearing.

---

## 🎯 Target Age Groups

1. **Ages 2–4: Explore**
   - Letter and sound recognition
   - Colors and basic shapes
   - Numbers 1–10 with visual counters
   - Animals, birds, and fruits
   - Large interactive buttons and simple matching

2. **Ages 4–6: Learn**
   - Gujarati vowels (Swar) and consonants (Vyanjan)
   - Gujarati Barakhadi (ક, કા, કિ, કી...)
   - English alphabet (A–Z) & early phonics
   - Hindi Varnamala (अ, आ, क, ख...)
   - Counting 1–20 & simple addition
   - Interactive finger letter tracing

3. **Ages 6–8: Practice**
   - Spelling & word formation (C-A-T, S-U-N)
   - Addition and subtraction exercises
   - Memory pair matching
   - Missing letter challenges
   - Listening quizzes with progressive difficulty

---

## 🎮 7 Working Educational Games

Every game card in the app opens a fully functional, playable educational game:

1. **Find the Correct Letter**: Match audio and visual letter prompts with the right choice.
2. **Picture Matching**: Connect illustrations of fruits, animals, and objects to their names.
3. **Counting Game**: Count smiling stars, apples, and flowers on screen.
4. **Memory Match**: Card-flipping memory game to find matching pairs.
5. **Missing Letter**: Complete words by filling in the missing letter.
6. **Colors and Shapes**: Identify primary/secondary colors and geometric shapes.
7. **Listen and Choose**: Hear recorded pronunciation and tap the matching illustration.

*Positive Encouragement*: Immediate friendly feedback ("Super! That's Right! 🎉"). For mistakes, friendly hints and retry options are offered without shaming. Double taps are protected against duplicate point awards.

---

## 🛠️ Technology Stack

### Frontend
- **React Native & Expo SDK 52**
- **TypeScript** (Strict type checking enabled)
- **Expo Router** (File-based navigation)
- **React Native StyleSheet** (Soft pastel design system tokens)
- **Expo Speech** (`expo-speech` with offline multi-script TTS)
- **AsyncStorage** (`@react-native-async-storage/async-storage` for offline preferences and progress)

### Backend
- **Python 3.11**
- **Django 5.2** & **Django REST Framework 3.18**
- **django-cors-headers**
- **SQLite** for development (PostgreSQL-compatible architecture for production)
- Complete database migrations and `seed_data` management command.

---

## 📁 Project Structure

```text
kidszone/
├── app/                          # Expo Router Navigation
│   ├── _layout.tsx               # Root layout with AppProvider & theme
│   ├── index.tsx                 # Splash screen with KidsZone branding
│   ├── onboarding.tsx            # Language & age tier selector
│   ├── home.tsx                  # Pastel dashboard with categories & games
│   ├── language.tsx              # Multilingual switcher (GU, EN, HI)
│   ├── lessons/
│   │   ├── index.tsx             # Category lessons grid with progress
│   │   └── [id].tsx              # Interactive lesson, TTS & tracing canvas
│   ├── games/
│   │   ├── index.tsx             # Educational games directory
│   │   └── [type].tsx            # Unified 7-game interactive engine
│   ├── rewards.tsx               # Stars, milestone badges & encouragement
│   └── parent/
│       └── index.tsx             # Parent Corner with math verification gate
│
├── src/
│   ├── components/               # PastelCard, PastelButton, Mascot, AudioButton, Tracing
│   ├── context/                  # AppContext & state management
│   ├── data/                     # Offline educational datasets (Gujarati, English, Hindi)
│   ├── localization/             # en.json, gu.json, hi.json & translation helpers
│   ├── services/                 # audioService, storageService, apiService
│   ├── theme/                    # Color palette, spacing, typography tokens
│   └── types/                    # Strict TypeScript interfaces
│
├── backend/                      # Django REST Framework Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/                   # settings.py, urls.py, wsgi.py
│   ├── lessons/                  # Lesson model, serializer, views, seed_data
│   ├── questions/                # Question model, serializer, views
│   ├── child_profiles/           # ChildProfile model, serializer, views
│   ├── progress/                 # LessonProgress & GameResult models
│   └── rewards/                  # Reward model, serializer, views
│
├── assets/                       # App icons and splash images
├── tests/                        # Automated unit tests
├── .env.example                  # Environment configuration template
├── .gitignore                    # Comprehensive Git exclusions
└── README.md
```

---

## 🚀 Getting Started on Windows 11 (PowerShell)

### Prerequisites
- Node.js LTS (v20+ or v25+)
- Python 3.10+
- Git

### 1. Clone the Repository
```powershell
git clone <YOUR_GITHUB_REPO_URL>
cd kidsapp
```

### 2. Configure Environment Variables
```powershell
Copy-Item .env.example .env
```

---

## 📱 Running the Mobile App (Frontend)

1. **Install dependencies:**
   ```powershell
   npm install --legacy-peer-deps
   ```

2. **Generate placeholder icons (if missing):**
   ```powershell
   node scripts/generate_assets.js
   ```

3. **Start the Expo development server:**
   ```powershell
   npm run start
   ```

4. **Testing Options:**
   - **On Android Phone (Recommended):** Install the free **Expo Go** app from Google Play Store on your Android phone. Scan the QR code displayed in the PowerShell terminal.
   - **In Web Browser:** Press `w` in the terminal to view in Chrome/Edge.
   - **In Android Emulator:** Press `a` in the terminal (requires Android Studio SDK).

---

## 🖥️ Running the Backend (Django REST Framework)

1. **Open a new PowerShell terminal and navigate to backend:**
   ```powershell
   cd e:\kidsapp\backend
   ```

2. **Install Python requirements:**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Run database migrations:**
   ```powershell
   python manage.py migrate
   ```

4. **Seed educational lessons and questions:**
   ```powershell
   python manage.py seed_data
   ```

5. **Run backend unit tests:**
   ```powershell
   python manage.py test
   ```

6. **Start the development server:**
   ```powershell
   python manage.py runserver 0.0.0.0:8000
   ```
   Backend API is accessible at: `http://127.0.0.1:8000/api/`

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/lessons/` | List lessons with filters (`?language=gu&category=gu-varnamala&age_group=2-4`) |
| `GET` | `/api/lessons/<id>/` | Retrieve detailed lesson |
| `GET` | `/api/questions/?lesson_id=<id>` | Retrieve quiz questions for a lesson |
| `GET` | `/api/progress/` | Retrieve child learning progress |
| `POST` | `/api/progress/` | Sync lesson completion and score |
| `POST` | `/api/game-results/` | Record game session score |
| `GET` | `/api/rewards/` | List earned stars and badges |
| `GET` | `/api/profiles/` | List or create local child profiles |

---

## 🔒 Child Safety & Privacy Commitment

KidsZone is designed for young children (ages 2–8):
- **No Personal Data Collection**: No email, full name, phone number, or location is requested.
- **No Device Sensors**: No microphone, camera, or contact permissions required.
- **No Advertising**: Free of third-party advertisements and in-app purchases.
- **Parental Gate**: Sensitive settings, sound toggles, and data deletion are protected by a math challenge.
- **Local Data Deletion**: Parents can delete all local learning progress at any time from Parent Corner.

---

## 🧪 Testing

### Backend Unit Tests
```powershell
cd backend
python manage.py test
```
*Tests verify models, serializers, answer protection, and API response status codes.*

---

## 📦 Building Android Release APK

To create an installable APK for Android:

1. Install EAS CLI:
   ```powershell
   npm install -g eas-cli
   ```
2. Log in to your free Expo account:
   ```powershell
   eas login
   ```
3. Configure build:
   ```powershell
   eas build:configure
   ```
4. Build APK:
   ```powershell
   eas build -p android --profile preview
   ```

---

## 📄 License
This project is open-source and free for educational use.
