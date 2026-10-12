import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { spacing, radii, shadows } from '../src/theme/spacing';
import { useApp } from '../src/context/AppContext';
import { AppLanguage } from '../src/types';
import { Header } from '../src/components/Header';

export default function LanguageScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useApp();

  const options: Array<{
    code: AppLanguage;
    native: string;
    english: string;
    scriptSample: string;
    bgColor: string;
  }> = [
    {
      code: 'gu',
      native: 'ગુજરાતી',
      english: 'Gujarati',
      scriptSample: 'અ, આ, ઇ, ક, ખ, ગ',
      bgColor: colors.mint,
    },
    {
      code: 'en',
      native: 'English',
      english: 'English (US/UK)',
      scriptSample: 'A, B, C, D, E, F',
      bgColor: colors.skyBlue,
    },
    {
      code: 'hi',
      native: 'हिन्दी',
      english: 'Hindi',
      scriptSample: 'अ, आ, इ, क, ख, ग',
      bgColor: colors.peach,
    },
  ];

  const handleSelect = async (lang: AppLanguage) => {
    await setLanguage(lang);
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('parent.language')} showBack={true} showStars={false} />

      <View style={styles.container}>
        <Text style={styles.introText}>
          Select your preferred learning language. All lessons, words, and voices will update instantly.
        </Text>

        <View style={styles.list}>
          {options.map((item) => {
            const isSelected = language === item.code;
            return (
              <TouchableOpacity
                key={item.code}
                onPress={() => handleSelect(item.code)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  { backgroundColor: item.bgColor },
                  isSelected && styles.selectedBorder,
                  shadows.card,
                ]}
              >
                <View style={styles.textCol}>
                  <Text style={styles.nativeTitle}>{item.native}</Text>
                  <Text style={styles.englishTitle}>{item.english}</Text>
                  <Text style={styles.sampleScript}>{item.scriptSample}</Text>
                </View>

                <View
                  style={[
                    styles.radioCircle,
                    isSelected && { backgroundColor: colors.accent, borderColor: colors.accent },
                  ]}
                >
                  {isSelected && <Text style={styles.radioCheck}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
  },
  introText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  list: {
    gap: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xl,
    borderRadius: radii.card,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 96,
  },
  selectedBorder: {
    borderColor: colors.accent,
  },
  textCol: {
    flex: 1,
  },
  nativeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  englishTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sampleScript: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  radioCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  radioCheck: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
