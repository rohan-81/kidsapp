import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { radii, shadows, spacing } from '../theme/spacing';

interface PastelCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  onPress?: () => void;
  activeOpacity?: number;
  testID?: string;
}

export const PastelCard: React.FC<PastelCardProps> = ({
  children,
  style,
  backgroundColor = colors.card,
  onPress,
  activeOpacity = 0.8,
  testID,
}) => {
  const cardStyle = [
    styles.card,
    { backgroundColor },
    shadows.card,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={cardStyle}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle} testID={testID}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
