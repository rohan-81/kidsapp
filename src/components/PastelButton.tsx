import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';
import { radii, shadows, spacing } from '../theme/spacing';

interface PastelButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'mint' | 'peach' | 'sky';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const PastelButton: React.FC<PastelButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#E0E0E0';
    switch (variant) {
      case 'primary':
        return colors.accent;
      case 'secondary':
        return colors.card;
      case 'mint':
        return colors.mint;
      case 'peach':
        return colors.peach;
      case 'sky':
        return colors.skyBlue;
      default:
        return colors.accent;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    if (variant === 'primary') return colors.white;
    return colors.textPrimary;
  };

  const minHeight = size === 'small' ? 44 : size === 'large' ? 56 : 50;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        shadows.soft,
        {
          backgroundColor: getBackgroundColor(),
          minHeight,
          borderWidth: variant === 'secondary' ? 1.5 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { color: getTextColor(), marginLeft: icon ? spacing.sm : 0 },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minWidth: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
