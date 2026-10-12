import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { spacing, radii, shadows } from '../src/theme/spacing';
import { useApp } from '../src/context/AppContext';
import { Header } from '../src/components/Header';
import { MascotIllustration } from '../src/components/MascotIllustration';
import { PastelCard } from '../src/components/PastelCard';
import { CATEGORIES } from '../src/data/categories';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

export default function HomeScreen() {
  const router = useRouter();
  const { t, ageGroup, progress } = useApp();

  // Filter categories relevant for current age group or all
  const filteredCategories = CATEGORIES.filter((c) => {
    if (c.id === 'games') return false; // Handled in dedicated games section
    if (ageGroup === '2-4') {
      return ['gu-varnamala', 'en-alphabet', 'numbers', 'colors-shapes', 'animals', 'fruits', 'objects'].includes(c.id);
    }
    return true;
  });

  const recentCategory = filteredCategories[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBack={false} showStars={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Greeting & Mascot Card */}
        <PastelCard backgroundColor={colors.mint} style={styles.greetingCard}>
          <View style={styles.greetingTextCol}>
            <Text style={styles.greetingTag}>{t('appName')} • {ageGroup} Group</Text>
            <Text style={styles.greetingHeading}>{t('home.greeting')}</Text>
            <Text style={styles.greetingSub}>{t('tagline')}</Text>
          </View>
          <MascotIllustration size="medium" mood="cheering" />
        </PastelCard>

        {/* Continue Learning Action Card */}
        <TouchableOpacity
          onPress={() => router.push(`/lessons?categoryId=${recentCategory.id}`)}
          activeOpacity={0.85}
          style={[styles.continueCard, shadows.card]}
        >
          <View style={[styles.continueIconCircle, { backgroundColor: colors.skyBlue }]}>
            <Text style={styles.continueEmoji}>🚀</Text>
          </View>
          <View style={styles.continueTextCol}>
            <Text style={styles.continuePre}>{t('home.continueLearning')}</Text>
            <Text style={styles.continueTitle}>{recentCategory.defaultTitle}</Text>
            <Text style={styles.continueProgress}>
              {progress.completedLessons.length} lessons mastered ⭐
            </Text>
          </View>
          <Text style={styles.continueArrow}>➔</Text>
        </TouchableOpacity>

        {/* Games Highlight Shortcut Banner */}
        <TouchableOpacity
          onPress={() => router.push('/games')}
          activeOpacity={0.85}
          style={[styles.gameBanner, shadows.soft]}
        >
          <View style={styles.gameBannerLeft}>
            <Text style={styles.gameBannerTitle}>🎮 {t('home.playGames')}</Text>
            <Text style={styles.gameBannerSub}>
              7 Fun games: Letter Find, Memory Match, Counting & more!
            </Text>
          </View>
          <View style={styles.gameBannerPlayBtn}>
            <Text style={styles.gameBannerPlayText}>Play</Text>
          </View>
        </TouchableOpacity>

        {/* Learning Zones (Categories Grid) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.exploreCategories')}</Text>
          <TouchableOpacity onPress={() => router.push('/parent')}>
            <Text style={styles.parentLink}>🛡️ {t('nav.parentCorner')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {filteredCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => router.push(`/lessons?categoryId=${cat.id}`)}
              activeOpacity={0.8}
              style={[
                styles.catCard,
                { backgroundColor: cat.bgColor, width: CARD_WIDTH },
                shadows.soft,
              ]}
            >
              <View style={styles.catEmojiBox}>
                <Text style={styles.catEmoji}>
                  {cat.id === 'gu-varnamala'
                    ? 'ક'
                    : cat.id === 'gu-barakhadi'
                    ? 'કા'
                    : cat.id === 'en-alphabet'
                    ? 'ABC'
                    : cat.id === 'en-phonics'
                    ? '🔊'
                    : cat.id === 'hi-varnamala'
                    ? 'अ'
                    : cat.id === 'numbers'
                    ? '123'
                    : cat.id === 'math'
                    ? '+ -'
                    : cat.id === 'colors-shapes'
                    ? '🎨'
                    : cat.id === 'animals'
                    ? '🐾'
                    : cat.id === 'fruits'
                    ? '🍎'
                    : '🎈'}
                </Text>
              </View>
              <Text style={styles.catTitle} numberOfLines={2}>
                {t(cat.titleKey)}
              </Text>
              <Text style={styles.catSub} numberOfLines={1}>
                {cat.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Tip / Screen-time Wellness Card */}
        <View style={styles.dailyCard}>
          <Text style={styles.dailyTitle}>🌱 {t('home.dailySuggestion')}</Text>
          <Text style={styles.dailyDesc}>
            Practice tracing letters with your finger and listen to Gujarati and Hindi pronunciations together!
          </Text>
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
  greetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radii.card,
  },
  greetingTextCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  greetingTag: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  greetingHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  greetingSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  continueIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  continueEmoji: {
    fontSize: 24,
  },
  continueTextCol: {
    flex: 1,
  },
  continuePre: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  continueProgress: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  continueArrow: {
    fontSize: 18,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  gameBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.yellow,
    borderRadius: radii.card,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gameBannerLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  gameBannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gameBannerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  gameBannerPlayBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  gameBannerPlayText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  parentLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  catCard: {
    borderRadius: radii.card,
    padding: spacing.md,
    minHeight: 130,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  catEmojiBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catEmoji: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  catTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  catSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dailyCard: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dailyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dailyDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});
