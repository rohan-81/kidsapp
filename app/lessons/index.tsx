import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { spacing, radii, shadows } from '../../src/theme/spacing';
import { useApp } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { CATEGORIES } from '../../src/data/categories';
import { LESSONS } from '../../src/data/lessons';
import { LessonItem, CategoryId } from '../../src/types';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - spacing.xl * 2 - spacing.md * 2) / 3;

export default function CategoryLessonsScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const { language, ageGroup, progress, t } = useApp();

  const currentCategory =
    CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const [lessons, setLessons] = useState<LessonItem[]>([]);

  useEffect(() => {
    // Filter matching lessons
    const items = LESSONS.filter((l) => {
      const matchCat = l.categoryId === currentCategory.id;
      const matchLang =
        l.language === 'all' || l.language === language || currentCategory.id === 'numbers';
      const matchAge = l.ageGroup === 'all' || l.ageGroup === ageGroup || true; // Show full category set for exploration
      return matchCat && (matchLang || l.language === 'all');
    });
    setLessons(items.length > 0 ? items : LESSONS.slice(0, 8));
  }, [categoryId, language, ageGroup]);

  const completedCount = lessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t(currentCategory.titleKey)} showBack={true} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner with Progress Summary */}
        <View style={[styles.summaryBanner, { backgroundColor: currentCategory.bgColor }]}>
          <View style={styles.summaryTextCol}>
            <Text style={styles.summaryTitle}>{currentCategory.defaultTitle}</Text>
            <Text style={styles.summarySubtitle}>{currentCategory.subtitle}</Text>
            <Text style={styles.summaryProgress}>
              Progress: {completedCount} / {lessons.length} completed ⭐
            </Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryPercent}>
              {lessons.length > 0
                ? `${Math.round((completedCount / lessons.length) * 100)}%`
                : '0%'}
            </Text>
          </View>
        </View>

        {/* Grid of Lesson Cards (Letters, numbers, words) */}
        <View style={styles.grid}>
          {lessons.map((item, index) => {
            const isCompleted = progress.completedLessons.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/lessons/${item.id}`)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  { width: GRID_ITEM_WIDTH, backgroundColor: item.visualColor || colors.card },
                  shadows.soft,
                ]}
              >
                {isCompleted && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkIcon}>⭐</Text>
                  </View>
                )}
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.exampleWord || item.title}
                </Text>
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
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radii.card,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTextCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  summarySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryProgress: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
    marginTop: spacing.xs,
  },
  summaryBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    height: 110,
    borderRadius: radii.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  checkIcon: {
    fontSize: 12,
  },
  symbolText: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
});
