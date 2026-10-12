import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { radii, shadows, spacing } from '../theme/spacing';

interface AudioSpeakerButtonProps {
  onPress: () => void;
  size?: number;
  label?: string;
  testID?: string;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  onPress,
  size = 56,
  label,
  testID,
}) => {
  const [isPressing, setIsPressing] = useState(false);

  const handlePress = () => {
    setIsPressing(true);
    onPress();
    setTimeout(() => setIsPressing(false), 500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.button,
          shadows.card,
          {
            width: size,
            height: size,
            borderRadius: radii.full,
            backgroundColor: isPressing ? colors.peach : colors.mint,
          },
        ]}
        testID={testID}
      >
        <Text style={{ fontSize: size * 0.45 }}>🔊</Text>
      </TouchableOpacity>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
