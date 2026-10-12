import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface MascotProps {
  size?: 'small' | 'medium' | 'large';
  mood?: 'happy' | 'cheering' | 'thinking';
}

export const MascotIllustration: React.FC<MascotProps> = ({
  size = 'medium',
  mood = 'happy',
}) => {
  const dimension = size === 'small' ? 56 : size === 'large' ? 120 : 80;
  const fontSize = size === 'small' ? 26 : size === 'large' ? 58 : 38;

  const emoji = mood === 'cheering' ? '🌟' : mood === 'thinking' ? '🦉' : '✨';

  return (
    <View style={[styles.container, { width: dimension, height: dimension }]}>
      <View style={styles.cloudBackdrop}>
        <View style={styles.circleMint} />
        <View style={styles.circlePeach} />
      </View>
      <View style={styles.mascotFace}>
        <Text style={{ fontSize }}>{emoji}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleMint: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 999,
    backgroundColor: colors.mint,
    opacity: 0.8,
  },
  circlePeach: {
    position: 'absolute',
    width: '75%',
    height: '75%',
    borderRadius: 999,
    backgroundColor: colors.yellow,
    opacity: 0.5,
    top: 4,
    left: 4,
  },
  mascotFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
