import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../src/context/AppContext';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="home" />
          <Stack.Screen name="language" />
          <Stack.Screen name="lessons/index" />
          <Stack.Screen name="lessons/[id]" />
          <Stack.Screen name="games/index" />
          <Stack.Screen name="games/[type]" />
          <Stack.Screen name="rewards" />
          <Stack.Screen name="parent/index" />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
