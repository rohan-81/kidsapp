import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

interface Point {
  x: number;
  y: number;
}

interface TracingCanvasProps {
  symbol: string;
  onTraceComplete?: () => void;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  symbol,
  onTraceComplete,
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [activeColor, setActiveColor] = useState<string>(colors.accent);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt: GestureResponderEvent) => {
      const { locationX, locationY } = evt.nativeEvent;
      setPoints((prev) => [...prev, { x: locationX, y: locationY }]);
    },
    onPanResponderMove: (evt: GestureResponderEvent) => {
      const { locationX, locationY } = evt.nativeEvent;
      setPoints((prev) => {
        // Collect points gently
        if (prev.length > 500) return prev;
        return [...prev, { x: locationX, y: locationY }];
      });
    },
    onPanResponderRelease: () => {
      if (points.length > 15 && onTraceComplete) {
        onTraceComplete();
      }
    },
  });

  const clearCanvas = () => {
    setPoints([]);
  };

  const palette = [colors.accent, '#E06B6B', '#4D96FF', '#FFB703', '#9B51E0'];

  return (
    <View style={styles.container}>
      {/* Canvas Area */}
      <View style={styles.canvas} {...panResponder.panHandlers}>
        {/* Faint Guide Letter in Background */}
        <Text style={styles.guideText}>{symbol}</Text>

        {/* Drawn Touch Path Points */}
        {points.map((pt, index) => (
          <View
            key={index}
            style={[
              styles.brushDot,
              {
                left: pt.x - 7,
                top: pt.y - 7,
                backgroundColor: activeColor,
              },
            ]}
          />
        ))}
      </View>

      {/* Control bar */}
      <View style={styles.controlsRow}>
        <View style={styles.colorsRow}>
          {palette.map((c, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setActiveColor(c)}
              style={[
                styles.colorDot,
                { backgroundColor: c },
                activeColor === c && styles.activeColorDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
          <Text style={styles.clearText}>✏️ Clear Trace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
    width: '100%',
  },
  canvas: {
    width: '100%',
    height: 240,
    backgroundColor: colors.card,
    borderRadius: radii.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  guideText: {
    fontSize: 130,
    fontWeight: '800',
    color: '#E0E0E0',
    textAlign: 'center',
    userSelect: 'none',
  },
  brushDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  colorsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.white,
  },
  activeColorDot: {
    borderColor: colors.textPrimary,
    transform: [{ scale: 1.15 }],
  },
  clearButton: {
    backgroundColor: colors.peach,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.sm,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
