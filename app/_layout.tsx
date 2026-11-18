import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { theme } from '../src/theme';

/**
 * Gatekeeper component that observes authentication state and enforces route guards.
 */
// ─── DEV BYPASS ────────────────────────────────────────────────────────────
// Set to false to re-enable authentication before going to production.
const SKIP_AUTH = false;
// ───────────────────────────────────────────────────────────────────────────

function RouteGuard() {
  const { status } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Skip auth: always redirect to dashboard
    if (SKIP_AUTH) {
      if (segments[0] !== '(dashboard)') {
        router.replace('/(dashboard)');
      }
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    const inDashboardGroup = segments[0] === '(dashboard)';

    if (status === 'authenticated') {
      if (inAuthGroup) {
        router.replace('/(dashboard)');
      }
    } else if (status === 'access_denied') {
      if (segments[1] !== 'access-denied') {
        router.replace('/(auth)/access-denied');
      }
    } else if (status === 'unauthenticated') {
      if (inDashboardGroup) {
        router.replace('/(auth)/login');
      }
    }
  }, [status, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="light" backgroundColor={theme.colors.background} />
        <AuthProvider>
          <RouteGuard />
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
