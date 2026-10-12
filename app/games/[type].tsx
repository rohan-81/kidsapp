import React, { useState, useEffect } from 'react';
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
import { PastelButton } from '../../src/components/PastelButton';
import { AudioSpeakerButton } from '../../src/components/AudioSpeakerButton';
import { GAME_QUESTIONS } from '../../src/data/gamesData';
import { GameType, GameQuestion, GameOption } from '../../src/types';

export default function GameRunnerScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const gameType = (type || 'find-letter') as GameType;

  const { language, speak, recordScore, t } = useApp();

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // For Memory Match specific game state
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; val: string; isFlipped: boolean; isMatched: boolean }>
  >([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Load questions
  useEffect(() => {
    initGame();
  }, [gameType, language]);

  const initGame = () => {
    const rawList =
      GAME_QUESTIONS[gameType]?.[language] ||
      GAME_QUESTIONS[gameType]?.en ||
      GAME_QUESTIONS['find-letter'].en;

    // Shuffle questions gently
    const shuffled = [...rawList].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setFeedback(null);
    setIsGameOver(false);

    // Initialize Memory Match cards if this is memory game
    if (gameType === 'memory-match') {
      const symbols = ['🦁', '🐰', '🥭', '⭐'];
      const deck = [...symbols, ...symbols]
        .sort(() => 0.5 - Math.random())
        .map((val, idx) => ({
          id: idx,
          val,
          isFlipped: false,
          isMatched: false,
        }));
      setMemoryCards(deck);
      setFlippedIndices([]);
    }

    // Auto-prompt sound
    if (shuffled[0]?.audioText) {
      speak(shuffled[0].audioText, language);
    }
  };

  const currentQ = questions[currentIndex];

  const handleOptionSelect = (option: GameOption) => {
    if (isAnswered) return; // Prevent double taps

    setIsAnswered(true);
    setSelectedOptionId(option.id);

    const isCorrect = option.id === currentQ.correctOptionId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: t('games.correct'),
      });
      speak('Super! That is right!');
    } else {
      setFeedback({
        isCorrect: false,
        text: t('games.wrong'),
      });
      speak('Nice try! Let us try again.');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setFeedback(null);

      if (questions[nextIdx]?.audioText) {
        speak(questions[nextIdx].audioText, language);
      }
    } else {
      // Game Completed
      setIsGameOver(true);
      recordScore(gameType, score + (feedback?.isCorrect ? 1 : 0));
    }
  };

  // Memory match card click handler
  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].isMatched || memoryCards[index].isFlipped) {
      return;
    }

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    const newFlipped = [...flippedIndices, index];
    setMemoryCards(updated);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (updated[first].val === updated[second].val) {
        // Matched
        setTimeout(() => {
          updated[first].isMatched = true;
          updated[second].isMatched = true;
          setMemoryCards([...updated]);
          setFlippedIndices([]);
          setScore((s) => s + 1);
          speak('Match found!');

          // Check if all matched
          if (updated.every((c) => c.isMatched)) {
            setIsGameOver(true);
            recordScore('memory-match', 4);
          }
        }, 500);
      } else {
        // Not matched - flip back
        setTimeout(() => {
          updated[first].isFlipped = false;
          updated[second].isFlipped = false;
          setMemoryCards([...updated]);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  if (!currentQ && gameType !== 'memory-match') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header showBack={true} />
        <View style={styles.centerBox}>
          <Text style={styles.promptText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t(`games.${gameType === 'find-letter' ? 'findLetter' : gameType === 'picture-matching' ? 'pictureMatching' : gameType === 'memory-match' ? 'memoryMatch' : gameType === 'missing-letter' ? 'missingLetter' : gameType === 'colors-shapes' ? 'colorsShapes' : gameType === 'listen-choose' ? 'listenChoose' : 'counting'}`)} showBack={true} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Info Bar */}
        <View style={styles.infoBar}>
          <Text style={styles.scoreText}>
            ⭐ {t('games.score')}: {score}
          </Text>
          {gameType !== 'memory-match' && (
            <Text style={styles.questionText}>
              {t('games.question')} {currentIndex + 1} / {questions.length}
            </Text>
          )}
        </View>

        {/* MEMORY MATCH SPECIAL INTERFACE */}
        {gameType === 'memory-match' ? (
          <View style={styles.memoryContainer}>
            <Text style={styles.promptText}>{t('games.memoryMatch')} - Tap to flip pairs</Text>
            <View style={styles.memoryGrid}>
              {memoryCards.map((card, idx) => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => handleCardClick(idx)}
                  activeOpacity={0.8}
                  style={[
                    styles.memoryCard,
                    card.isFlipped || card.isMatched
                      ? styles.memoryCardFlipped
                      : styles.memoryCardBack,
                    shadows.soft,
                  ]}
                >
                  <Text style={styles.memoryCardText}>
                    {card.isFlipped || card.isMatched ? card.val : '❓'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          /* STANDARD 6 EDUCATIONAL GAMES INTERFACE */
          <View style={styles.gameContent}>
            {/* Question Prompt */}
            <View style={[styles.promptCard, shadows.soft]}>
              <Text style={styles.promptText}>{currentQ.prompt}</Text>

              {/* Display Visual or Repeated Counting Items */}
              {currentQ.countTarget ? (
                <View style={styles.counterRow}>
                  {Array.from({ length: currentQ.countTarget }).map((_, i) => (
                    <Text key={i} style={styles.counterItem}>
                      {currentQ.displayVisual}
                    </Text>
                  ))}
                </View>
              ) : currentQ.displayVisual ? (
                <View
                  style={[
                    styles.visualBox,
                    currentQ.displayVisualColor
                      ? { backgroundColor: currentQ.displayVisualColor }
                      : null,
                  ]}
                >
                  <Text style={styles.visualText}>{currentQ.displayVisual}</Text>
                </View>
              ) : null}

              {/* Speaker for Listen & Choose or Prompt Audio */}
              {currentQ.audioText ? (
                <AudioSpeakerButton
                  onPress={() => speak(currentQ.audioText, language)}
                  size={50}
                  label={t('lesson.repeatAudio')}
                />
              ) : null}
            </View>

            {/* Answer Options Grid */}
            <View style={styles.optionsGrid}>
              {currentQ.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQ.correctOptionId;

                let cardBg: string = colors.card;
                if (isAnswered) {
                  if (isSelected && isCorrect) cardBg = colors.mint;
                  else if (isSelected && !isCorrect) cardBg = colors.peach;
                }

                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                    activeOpacity={0.8}
                    style={[
                      styles.optionCard,
                      { backgroundColor: cardBg },
                      isSelected && styles.optionSelected,
                      shadows.soft,
                    ]}
                  >
                    {option.visual ? (
                      <Text style={styles.optionVisual}>{option.visual}</Text>
                    ) : null}
                    <Text style={styles.optionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Feedback Alert Bar & Next Button */}
            {feedback ? (
              <View
                style={[
                  styles.feedbackBanner,
                  {
                    backgroundColor: feedback.isCorrect ? colors.mint : colors.yellow,
                  },
                ]}
              >
                <Text style={styles.feedbackText}>{feedback.text}</Text>
                {currentQ.hint && !feedback.isCorrect ? (
                  <Text style={styles.hintText}>{currentQ.hint}</Text>
                ) : null}

                <PastelButton
                  title={
                    currentIndex < questions.length - 1
                      ? `${t('lesson.next')} →`
                      : t('lesson.finish')
                  }
                  onPress={handleNextQuestion}
                  variant="primary"
                  style={{ marginTop: spacing.md }}
                />
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>

      {/* Completion Modal */}
      <Modal visible={isGameOver} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, shadows.modal]}>
            <Text style={styles.modalTrophy}>🏆 🌟 🏆</Text>
            <Text style={styles.modalTitle}>{t('games.gameOver')}</Text>
            <Text style={styles.modalSub}>
              {t('games.earnedScore', {
                score,
                total: gameType === 'memory-match' ? 4 : questions.length,
              })}
            </Text>

            <View style={styles.modalBtnRow}>
              <PastelButton
                title={t('games.playAgain')}
                onPress={initGame}
                variant="mint"
                style={{ flex: 1 }}
              />
              <PastelButton
                title={t('nav.home')}
                onPress={() => router.replace('/home')}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
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
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  gameContent: {
    width: '100%',
  },
  promptCard: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  visualBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  visualText: {
    fontSize: 48,
  },
  counterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  counterItem: {
    fontSize: 38,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '47%',
    minHeight: 74,
    borderRadius: radii.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.accent,
  },
  optionVisual: {
    fontSize: 28,
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  feedbackBanner: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  memoryContainer: {
    alignItems: 'center',
  },
  memoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  memoryCard: {
    width: 74,
    height: 84,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  memoryCardBack: {
    backgroundColor: colors.skyBlue,
  },
  memoryCardFlipped: {
    backgroundColor: colors.card,
    borderColor: colors.accent,
  },
  memoryCardText: {
    fontSize: 32,
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
  modalTrophy: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
});
