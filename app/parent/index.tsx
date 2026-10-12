import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { spacing, radii, shadows } from '../../src/theme/spacing';
import { useApp } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { PastelButton } from '../../src/components/PastelButton';
import { PastelCard } from '../../src/components/PastelCard';
import { AgeGroup } from '../../src/types';

export default function ParentCornerScreen() {
  const router = useRouter();
  const {
    language,
    ageGroup,
    setAgeGroup,
    soundEnabled,
    toggleSound,
    progress,
    resetAll,
    t,
  } = useApp();

  // Parental Verification Math Gate
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mathProblem, setMathProblem] = useState({ q: '', answer: 0 });
  const [inputAnswer, setInputAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  useEffect(() => {
    generateMathGate();
  }, []);

  const generateMathGate = () => {
    const num1 = Math.floor(Math.random() * 8) + 6;
    const num2 = Math.floor(Math.random() * 8) + 3;
    setMathProblem({
      q: `${num1} × ${num2} = ?`,
      answer: num1 * num2,
    });
    setInputAnswer('');
    setGateError(false);
  };

  const verifyParentGate = () => {
    if (parseInt(inputAnswer.trim(), 10) === mathProblem.answer) {
      setIsUnlocked(true);
      setGateError(false);
    } else {
      setGateError(true);
      generateMathGate();
    }
  };

  const handleResetData = () => {
    Alert.alert(
      t('parent.dangerZone'),
      t('parent.resetConfirm'),
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: t('parent.resetData'),
          style: 'destructive',
          onPress: async () => {
            await resetAll();
            Alert.alert('Success', 'Local progress has been safely reset.');
          },
        },
      ]
    );
  };

  // IF LOCKED: Show Parental Math Verification Gate
  if (!isUnlocked) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title={t('parent.title')} showBack={true} showStars={false} />

        <View style={styles.gateContainer}>
          <PastelCard backgroundColor={colors.card} style={styles.gateCard}>
            <Text style={styles.lockIcon}>🛡️</Text>
            <Text style={styles.gateTitle}>{t('parent.gateTitle')}</Text>
            <Text style={styles.gatePrompt}>{t('parent.gatePrompt')}</Text>

            <View style={styles.mathEquationBox}>
              <Text style={styles.mathEquationText}>{mathProblem.q}</Text>
            </View>

            <TextInput
              style={styles.mathInput}
              keyboardType="number-pad"
              placeholder="Enter answer"
              placeholderTextColor={colors.textSecondary}
              value={inputAnswer}
              onChangeText={setInputAnswer}
              maxLength={4}
            />

            {gateError ? (
              <Text style={styles.gateErrorText}>{t('parent.gateError')}</Text>
            ) : null}

            <PastelButton
              title={t('parent.gateSubmit')}
              onPress={verifyParentGate}
              variant="primary"
              style={{ width: '100%', marginTop: spacing.lg }}
            />
          </PastelCard>
        </View>
      </SafeAreaView>
    );
  }

  // IF UNLOCKED: Show Complete Parent Corner Dashboard
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t('parent.title')} showBack={true} showStars={false} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={styles.introSubtitle}>{t('parent.subtitle')}</Text>

        {/* 1. Learning Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>📊 {t('parent.overview')}</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: colors.mint }]}>
              <Text style={styles.statNumber}>{progress.stars}</Text>
              <Text style={styles.statLabel}>Total Stars ⭐</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.skyBlue }]}>
              <Text style={styles.statNumber}>{progress.completedLessons.length}</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.peach }]}>
              <Text style={styles.statNumber}>{progress.earnedBadges.length}</Text>
              <Text style={styles.statLabel}>Badges Earned</Text>
            </View>
          </View>
        </View>

        {/* 2. Controls & Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>⚙️ {t('parent.settings')}</Text>

          {/* Language Selector shortcut */}
          <TouchableOpacity
            onPress={() => router.push('/language')}
            style={styles.settingRow}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.settingLabel}>{t('parent.language')}</Text>
              <Text style={styles.settingSub}>
                {language === 'gu' ? 'ગુજરાતી' : language === 'hi' ? 'हिन्दी' : 'English'}
              </Text>
            </View>
            <Text style={styles.chevron}>➔</Text>
          </TouchableOpacity>

          {/* Age Tier Selection */}
          <View style={styles.settingBox}>
            <Text style={styles.settingLabel}>{t('parent.ageGroup')}</Text>
            <View style={styles.ageButtonGroup}>
              {(['2-4', '4-6', '6-8'] as AgeGroup[]).map((age) => (
                <TouchableOpacity
                  key={age}
                  onPress={() => setAgeGroup(age)}
                  style={[
                    styles.ageBtn,
                    ageGroup === age && { backgroundColor: colors.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.ageBtnText,
                      ageGroup === age && { color: colors.white, fontWeight: '700' },
                    ]}
                  >
                    Ages {age}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sound Toggle */}
          <TouchableOpacity
            onPress={toggleSound}
            style={styles.settingRow}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.settingLabel}>{t('parent.sound')}</Text>
              <Text style={styles.settingSub}>
                {soundEnabled ? 'Enabled (Voice pronunciation on)' : 'Muted'}
              </Text>
            </View>
            <Text style={{ fontSize: 22 }}>{soundEnabled ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Screen Break Health Reminder */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>⏱️ {t('parent.screenTime')}</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.yellow }]}>
            <Text style={styles.infoCardText}>{t('parent.screenTimeNotice')}</Text>
          </View>
        </View>

        {/* 4. Child Safety & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>🛡️ {t('parent.privacyTitle')}</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.mint }]}>
            <Text style={styles.infoCardText}>{t('parent.privacyNotice')}</Text>
          </View>
        </View>

        {/* 5. Danger Zone: Reset Data */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>⚠️ {t('parent.dangerZone')}</Text>
          <PastelButton
            title={`🗑️ ${t('parent.resetData')}`}
            onPress={handleResetData}
            variant="secondary"
            style={{ borderColor: colors.error }}
            textStyle={{ color: colors.error }}
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
  gateContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gateCard: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    padding: spacing.xl,
  },
  lockIcon: {
    fontSize: 44,
    marginBottom: spacing.sm,
  },
  gateTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  gatePrompt: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  mathEquationBox: {
    backgroundColor: colors.yellow,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  mathEquationText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  mathInput: {
    width: '80%',
    height: 50,
    backgroundColor: colors.background,
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gateErrorText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  introSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  settingBox: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  ageButtonGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  ageBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ageBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  infoCard: {
    borderRadius: radii.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoCardText: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
