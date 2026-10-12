import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { spacing, radii, shadows } from '../../src/theme/spacing';
import { useApp } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { AudioSpeakerButton } from '../../src/components/AudioSpeakerButton';
import { TracingCanvas } from '../../src/components/TracingCanvas';
import { PastelButton } from '../../src/components/PastelButton';
import { LESSONS } from '../../src/data/lessons';
import { LessonItem } from '../../src/types';

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { speak, completeLesson, t } = useApp();

  const [currentLesson, setCurrentLesson] = useState<LessonItem | null>(null);
  const [showTracing, setShowTracing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const item = LESSONS.find((l) => l.id === id) || LESSONS[0];
    setCurrentLesson(item);
    // Auto speak letter on opening
    if (item) {
      speak(item.audioPrompt, item.language === 'all' ? undefined : item.language);
    }
  }, [id]);

  if (!currentLesson) {
    return null;
  }

  // Find index in category list for Previous/Next
  const categoryLessons = LESSONS.filter(
    (l) => l.categoryId === currentLesson.categoryId
  );
  const currentIndex = categoryLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? categoryLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < categoryLessons.length - 1 ? categoryLessons[currentIndex + 1] : null;

  const handleSpeak = () => {
    speak(
      currentLesson.audioPrompt,
      currentLesson.language === 'all' ? undefined : currentLesson.language
    );
  };

  const handleFinish = async () => {
    await completeLesson(currentLesson.id);
    setShowCelebration(true);
  };

  const goToNext = () => {
    if (nextLesson) {
      router.replace(`/lessons/${nextLesson.id}`);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={currentLesson.title} showBack={true} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Progress indicator */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${
                  categoryLessons.length > 0
                    ? ((currentIndex + 1) / categoryLessons.length) * 100
                    : 100
                }%`,
              },
            ]}
          />
        </View>

        {/* Main Card with Big Symbol & Illustration */}
        <View
          style={[
            styles.card,
            { backgroundColor: currentLesson.visualColor || colors.card },
            shadows.card,
          ]}
        >
          {/* Large Readable Symbol */}
          <Text style={styles.hugeSymbol}>{currentLesson.symbol}</Text>

          {/* Example Word & Meaning */}
          {currentLesson.exampleWord ? (
            <View style={styles.wordBox}>
              <Text style={styles.exampleWord}>{currentLesson.exampleWord}</Text>
              {currentLesson.exampleMeaning ? (
                <Text style={styles.exampleMeaning}>({currentLesson.exampleMeaning})</Text>
              ) : null}
            </View>
          ) : null}

          {/* Pronunciation Speaker Button */}
          <AudioSpeakerButton
            onPress={handleSpeak}
            size={58}
            label={t('lesson.repeatAudio')}
          />
        </View>

        {/* Finger Tracing Toggle & Canvas */}
        <View style={styles.tracingSection}>
          <TouchableOpacity
            onPress={() => setShowTracing(!showTracing)}
            style={styles.traceToggleBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.traceToggleText}>
              {showTracing ? '▲ Hide Tracing' : `✏️ ${t('lesson.traceLetter')}`}
            </Text>
          </TouchableOpacity>

          {showTracing && (
            <TracingCanvas
              symbol={currentLesson.symbol}
              onTraceComplete={() => {
                speak('Great job tracing!');
              }}
            />
          )}
        </View>

        {/* Navigation & Completion Buttons */}
        <View style={styles.navRow}>
          {prevLesson ? (
            <PastelButton
              title={`← ${t('lesson.previous')}`}
              onPress={() => router.replace(`/lessons/${prevLesson.id}`)}
              variant="secondary"
              style={{ flex: 1 }}
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}

          <PastelButton
            title={`⭐ ${t('lesson.finish')}`}
            onPress={handleFinish}
            variant="primary"
            style={{ flex: 1.2, marginHorizontal: spacing.sm }}
          />

          {nextLesson ? (
            <PastelButton
              title={`${t('lesson.next')} →`}
              onPress={() => router.replace(`/lessons/${nextLesson.id}`)}
              variant="mint"
              style={{ flex: 1 }}
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
      </ScrollView>

      {/* Celebration Modal when Lesson is Completed */}
      <Modal visible={showCelebration} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, shadows.modal]}>
            <Text style={styles.modalStar}>🌟 ⭐ 🌟</Text>
            <Text style={styles.modalTitle}>{t('lesson.greatJob')}</Text>
            <Text style={styles.modalDesc}>{t('lesson.lessonCompleted')}</Text>

            <PastelButton
              title={nextLesson ? t('lesson.next') : t('lesson.backToCategory')}
              onPress={() => {
                setShowCelebration(false);
                goToNext();
              }}
              variant="primary"
              size="large"
              style={{ width: '100%', marginTop: spacing.md }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radii.full,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
  },
  card: {
    width: '100%',
    borderRadius: radii.card,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 280,
  },
  hugeSymbol: {
    fontSize: 84,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: spacing.sm,
    textAlign: 'center',
  },
  wordBox: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  exampleWord: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  exampleMeaning: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tracingSection: {
    width: '100%',
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  traceToggleBtn: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  traceToggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  modalStar: {
    fontSize: 42,
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
});
