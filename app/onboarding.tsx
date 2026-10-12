import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { spacing, radii } from '../src/theme/spacing';
import { useApp } from '../src/context/AppContext';
import { AppLanguage, AgeGroup } from '../src/types';
import { PastelButton } from '../src/components/PastelButton';
import { MascotIllustration } from '../src/components/MascotIllustration';

export default function OnboardingScreen() {
  const router = useRouter();
  const { language: currentLang, ageGroup: currentAge, finishOnboarding, t } = useApp();

  const [selectedLang, setSelectedLang] = useState<AppLanguage>(currentLang || 'gu');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(currentAge || '2-4');

  const languages: Array<{ code: AppLanguage; native: string; english: string; bg: string }> = [
    { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', bg: colors.mint },
    { code: 'en', native: 'English', english: 'English', bg: colors.skyBlue },
    { code: 'hi', native: 'हिन्दी', english: 'Hindi', bg: colors.peach },
  ];

  const ageTiers: Array<{ group: AgeGroup; title: string; subtitle: string; bg: string }> = [
    {
      group: '2-4',
      title: 'Ages 2–4 • Explore',
      subtitle: 'Sounds, pictures, colors, shapes & 1–10',
      bg: colors.mint,
    },
    {
      group: '4-6',
      title: 'Ages 4–6 • Learn',
      subtitle: 'Alphabet, Barakhadi, Phonics, Counting & Math',
      bg: colors.skyBlue,
    },
    {
      group: '6-8',
      title: 'Ages 6–8 • Practice',
      subtitle: 'Word building, puzzles, memory games & math drills',
      bg: colors.lavender,
    },
  ];

  const handleStart = async () => {
    await finishOnboarding(selectedLang, selectedAge);
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Friendly Top Header */}
        <View style={styles.header}>
          <MascotIllustration size="medium" mood="happy" />
          <Text style={styles.title}>{t('onboarding.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>
        </View>

        {/* 1. Language Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('onboarding.selectLanguage')}</Text>
          <View style={styles.langRow}>
            {languages.map((item) => {
              const isSelected = selectedLang === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  onPress={() => setSelectedLang(item.code)}
                  activeOpacity={0.8}
                  style={[
                    styles.langCard,
                    { backgroundColor: item.bg },
                    isSelected && styles.selectedCardBorder,
                  ]}
                >
                  <Text style={styles.langNative}>{item.native}</Text>
                  <Text style={styles.langEng}>{item.english}</Text>
                  {isSelected && <Text style={styles.checkMark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Age Group Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('onboarding.selectAge')}</Text>
          <View style={styles.ageList}>
            {ageTiers.map((tier) => {
              const isSelected = selectedAge === tier.group;
              return (
                <TouchableOpacity
                  key={tier.group}
                  onPress={() => setSelectedAge(tier.group)}
                  activeOpacity={0.8}
                  style={[
                    styles.ageCard,
                    { backgroundColor: colors.card },
                    isSelected && { borderColor: colors.accent, borderWidth: 2 },
                  ]}
                >
                  <View style={[styles.ageBadge, { backgroundColor: tier.bg }]}>
                    <Text style={styles.ageBadgeText}>{tier.group}</Text>
                  </View>
                  <View style={styles.ageTextCol}>
                    <Text style={styles.ageTitle}>{tier.title}</Text>
                    <Text style={styles.ageSubtitle}>{tier.subtitle}</Text>
                  </View>
                  {isSelected && <Text style={styles.checkMarkRight}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PastelButton
            title={t('onboarding.getStarted')}
            onPress={handleStart}
            variant="primary"
            size="large"
          />
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
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  langRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  langCard: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 88,
  },
  selectedCardBorder: {
    borderColor: colors.accent,
  },
  langNative: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  langEng: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkMark: {
    position: 'absolute',
    top: 6,
    right: 8,
    fontSize: 14,
    fontWeight: '800',
    color: colors.accent,
  },
  ageList: {
    gap: spacing.md,
  },
  ageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ageBadge: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  ageBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ageTextCol: {
    flex: 1,
  },
  ageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ageSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkMarkRight: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accent,
    marginLeft: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
});
