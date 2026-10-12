import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { spacing, radii } from '../src/theme/spacing';
import { useApp } from '../src/context/AppContext';

export default function SplashScreen() {
  const router = useRouter();
  const { hasCompletedOnboarding, isLoading } = useApp();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle, fast transition to avoid annoying delays
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (hasCompletedOnboarding) {
          router.replace('/home');
        } else {
          router.replace('/onboarding');
        }
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isLoading, hasCompletedOnboarding]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo with open book, friendly star */}
        <View style={styles.logoBadge}>
          <View style={styles.mintRing} />
          <View style={styles.peachRing} />
          <Text style={styles.logoEmoji}>📖✨</Text>
        </View>

        <Text style={styles.appName}>KidsZone</Text>
        <Text style={styles.tagline}>Learn, Play & Grow</Text>

        <View style={styles.scriptBadgeRow}>
          <Text style={styles.scriptBadge}>ગુજરાતી</Text>
          <Text style={styles.scriptDot}>•</Text>
          <Text style={styles.scriptBadge}>English</Text>
          <Text style={styles.scriptDot}>•</Text>
          <Text style={styles.scriptBadge}>हिन्दी</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  mintRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.mint,
    opacity: 0.9,
  },
  peachRing: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.yellow,
    opacity: 0.6,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.accent,
    letterSpacing: 0.2,
    marginBottom: spacing.xl,
  },
  scriptBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  scriptBadge: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  scriptDot: {
    color: colors.border,
    fontSize: 14,
  },
});
