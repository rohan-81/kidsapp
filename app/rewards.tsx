import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { spacing, radii, shadows } from '../src/theme/spacing';
import { useApp } from '../src/context/AppContext';
import { Header } from '../src/components/Header';
import { PastelCard } from '../src/components/PastelCard';

interface BadgeDef {
  id: string;
  nameKey: string;
  defaultName: string;
  icon: string;
  description: string;
  req: string;
}

const BADGES: BadgeDef[] = [
  {
    id: 'badge-welcome',
    nameKey: 'rewards.milestone1',
    defaultName: 'First Step Learner',
    icon: '🌱',
    description: 'Welcome to KidsZone!',
    req: 'Joined the learning adventure',
  },
  {
    id: 'badge-first-step',
    nameKey: 'rewards.milestone2',
    defaultName: 'Star Collector',
    icon: '⭐',
    description: 'Completed your first interactive lesson',
    req: '1 Lesson finished',
  },
  {
    id: 'badge-scholar',
    nameKey: 'rewards.milestone3',
    defaultName: 'Alphabet Explorer',
    icon: '📚',
    description: 'Finished 5 lessons across Gujarati, English or Hindi',
    req: '5 Lessons finished',
  },
  {
    id: 'badge-master',
    nameKey: 'rewards.milestone4',
    defaultName: 'Math & Word Wizard',
    icon: '👑',
    description: 'Mastered 10 educational lessons and games',
    req: '10 Lessons finished',
  },
];

export default function RewardsScreen() {
  const { progress, t } = useApp();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('rewards.title')} showBack={true} showStars={false} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Celebration Card */}
        <PastelCard backgroundColor={colors.yellow} style={styles.starHeroCard}>
          <Text style={styles.starHeroIcon}>🌟</Text>
          <Text style={styles.starHeroCount}>{progress.stars}</Text>
          <Text style={styles.starHeroLabel}>{t('rewards.totalStars')}</Text>
          <Text style={styles.starHeroSub}>{t('rewards.subtitle')}</Text>
        </PastelCard>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.mint }, shadows.soft]}>
            <Text style={styles.statVal}>{progress.completedLessons.length}</Text>
            <Text style={styles.statLabel}>{t('rewards.completedLessons')}</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.skyBlue }, shadows.soft]}>
            <Text style={styles.statVal}>
              {Object.keys(progress.gameStats).length}
            </Text>
            <Text style={styles.statLabel}>Games Played</Text>
          </View>
        </View>

        {/* Achievement Badges List */}
        <Text style={styles.sectionHeading}>🏆 {t('rewards.badgesEarned')}</Text>

        <View style={styles.badgeList}>
          {BADGES.map((b) => {
            const isUnlocked = progress.earnedBadges.includes(b.id);
            return (
              <View
                key={b.id}
                style={[
                  styles.badgeCard,
                  { backgroundColor: isUnlocked ? colors.card : '#F0F0EE' },
                  shadows.soft,
                ]}
              >
                <View
                  style={[
                    styles.badgeIconCircle,
                    {
                      backgroundColor: isUnlocked ? colors.peach : '#E0E0E0',
                      opacity: isUnlocked ? 1 : 0.6,
                    },
                  ]}
                >
                  <Text style={styles.badgeIconText}>{b.icon}</Text>
                </View>

                <View style={styles.badgeTextCol}>
                  <Text
                    style={[
                      styles.badgeTitle,
                      { color: isUnlocked ? colors.textPrimary : colors.textSecondary },
                    ]}
                  >
                    {t(b.nameKey) || b.defaultName}
                  </Text>
                  <Text style={styles.badgeDesc}>{b.description}</Text>
                  <Text style={styles.badgeReq}>{b.req}</Text>
                </View>

                <View style={styles.statusBox}>
                  <Text style={styles.statusIcon}>{isUnlocked ? '✅' : '🔒'}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footerEncourage}>
          <Text style={styles.footerText}>🎈 {t('rewards.keepGoing')}</Text>
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
  starHeroCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: radii.card,
  },
  starHeroIcon: {
    fontSize: 54,
  },
  starHeroCount: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: 4,
  },
  starHeroLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  starHeroSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statBox: {
    flex: 1,
    borderRadius: radii.card,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statVal: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  badgeList: {
    gap: spacing.md,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  badgeIconText: {
    fontSize: 26,
  },
  badgeTextCol: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  badgeDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badgeReq: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 4,
  },
  statusBox: {
    marginLeft: spacing.sm,
  },
  statusIcon: {
    fontSize: 18,
  },
  footerEncourage: {
    marginTop: spacing.xxl,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
