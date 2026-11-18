import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { theme } from '../../theme';

interface TabItem {
  label: string;
  route: string;
  tag: string;
}

const tabs: TabItem[] = [
  { label: 'Overview', route: '/(dashboard)', tag: 'DASH' },
  { label: 'Profile', route: '/(dashboard)/profile', tag: 'USER' },
  { label: 'Settings', route: '/(dashboard)/settings', tag: 'SET' },
];

export const MobileNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (route: string) => {
    if (route === '/(dashboard)' && (pathname === '/' || pathname === '')) return true;
    return pathname.includes(route.replace('/(dashboard)', ''));
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isRouteActive(tab.route);
        return (
          <Pressable
            key={tab.route}
            onPress={() => router.push(tab.route as any)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.tabTag, active && styles.tabTagActive]}>{tab.tag}</Text>
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: theme.colors.backgroundElevated,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.md,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabTag: {
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontMono,
  },
  tabTagActive: {
    color: theme.colors.primary,
  },
  tabLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  tabLabelActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.semibold,
  },
});
