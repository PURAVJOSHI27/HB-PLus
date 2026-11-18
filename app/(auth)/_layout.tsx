import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Slot } from 'expo-router';
import { theme } from '../../src/theme';

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.ambientGlow} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Slot />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  ambientGlow: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: 600,
    height: 350,
    borderRadius: 300,
    backgroundColor: theme.colors.primaryGlow,
    opacity: 0.7,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
});
