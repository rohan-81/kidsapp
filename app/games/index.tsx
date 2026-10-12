import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { spacing, radii, shadows } from '../../src/theme/spacing';
import { useApp } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { GameType } from '../../src/types';

interface GameItemConfig {
  type: GameType;
  titleKey: string;
  defaultTitle: string;
  desc: string;
  icon: string;
  bgColor: string;
}

const GAMES_LIST: GameItemConfig[] = [
  {
    type: 'find-letter',
    titleKey: 'games.findLetter',
    defaultTitle: 'Find the Correct Letter',
    desc: 'Match letter prompts with the right choice',
    icon: '🔤',
    bgColor: colors.mint,
  },
  {
    type: 'picture-matching',
    titleKey: 'games.pictureMatching',
    defaultTitle: 'Picture Matching',
    desc: 'Connect delicious fruits and friendly animals',
    icon: '🖼️',
    bgColor: colors.skyBlue,
  },
  {
    type: 'counting',
    titleKey: 'games.counting',
    defaultTitle: 'Counting Game',
    desc: 'Count smiling stars, apples, and flowers',
    icon: '🔢',
    bgColor: colors.peach,
  },
  {
    type: 'memory-match',
    titleKey: 'games.memoryMatch',
    defaultTitle: 'Memory Match',
    desc: 'Flip cards and remember pairs',
    icon: '🃏',
    bgColor: colors.lavender,
  },
  {
    type: 'missing-letter',
    titleKey: 'games.missingLetter',
    defaultTitle: 'Missing Letter',
    desc: 'Complete simple fun words',
    icon: '🧩',
    bgColor: colors.yellow,
  },
  {
    type: 'colors-shapes',
    titleKey: 'games.colorsShapes',
    defaultTitle: 'Colors & Shapes',
    desc: 'Identify beautiful colors and shapes',
    icon: '🎨',
    bgColor: colors.mint,
  },
  {
    type: 'listen-choose',
    titleKey: 'games.listenChoose',
    defaultTitle: 'Listen & Choose',
    desc: 'Hear pronunciation and pick the matching picture',
    icon: '🎧',
    bgColor: colors.skyBlue,
  },
];

export default function GamesHubScreen() {
  const router = useRouter();
  const { t, progress } = useApp();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('games.title')} showBack={true} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🌟 Learn by Playing!</Text>
          <Text style={styles.bannerSub}>
            Play gentle educational games designed to build language, memory, and math skills.
          </Text>
        </View>

        <View style={styles.list}>
          {GAMES_LIST.map((game) => {
            const stats = progress.gameStats[game.type];
            return (
              <TouchableOpacity
                key={game.type}
                onPress={() => router.push(`/games/${game.type}`)}
                activeOpacity={0.8}
                style={[styles.card, { backgroundColor: game.bgColor }, shadows.card]}
              >
                <View style={styles.iconCircle}>
                  <Text style={styles.gameIcon}>{game.icon}</Text>
                </View>
                <View style={styles.textCol}>
                  <Text style={styles.cardTitle}>{t(game.titleKey)}</Text>
                  <Text style={styles.cardDesc}>{game.desc}</Text>
                  {stats ? (
                    <Text style={styles.highScoreText}>
                      High Score: {stats.highScore} • Played: {stats.timesPlayed}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.playBtn}>
                  <Text style={styles.playBtnText}>▶</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
  banner: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bannerSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  list: {
    gap: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  gameIcon: {
    fontSize: 26,
  },
  textCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  highScoreText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 4,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  playBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 2,
  },
});
