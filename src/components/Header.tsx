import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { spacing, radii } from '../theme/spacing';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showStars?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  showStars = true,
}) => {
  const router = useRouter();
  const { progress, soundEnabled, toggleSound, language } = useApp();

  const langLabel = language === 'gu' ? 'ગુજ' : language === 'hi' ? 'हिं' : 'EN';

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.circleBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.btnIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandContainer}>
            <Text style={styles.brandTitle}>KidsZone</Text>
          </View>
        )}
      </View>

      <View style={styles.center}>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>

      <View style={styles.right}>
        {showStars ? (
          <TouchableOpacity
            onPress={() => router.push('/rewards')}
            style={styles.starBadge}
            activeOpacity={0.8}
          >
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.starCount}>{progress.stars}</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={toggleSound}
          style={styles.circleBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.btnIcon}>{soundEnabled ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/language')}
          style={[styles.circleBtn, styles.langBtn]}
          activeOpacity={0.7}
        >
          <Text style={styles.langText}>{langLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    minHeight: 56,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 44,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: radii.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  langBtn: {
    backgroundColor: colors.mint,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    gap: 3,
  },
  starIcon: {
    fontSize: 14,
  },
  starCount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
