import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  label: string;
  route: string;
  iconText: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    label: 'Overview',
    route: '/(dashboard)',
    iconText: 'SYS',
    description: 'Internal operations & metrics',
  },
  {
    label: 'Employee Profile',
    route: '/(dashboard)/profile',
    iconText: 'ID',
    description: 'HB+ credentials & access grants',
  },
  {
    label: 'Portal Settings',
    route: '/(dashboard)/settings',
    iconText: 'SEC',
    description: 'Security & environment config',
  },
];

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();

  const isRouteActive = (route: string) => {
    if (route === '/(dashboard)' && (pathname === '/' || pathname === '')) return true;
    return pathname.includes(route.replace('/(dashboard)', ''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WORKSPACE</Text>
        {navItems.map((item) => {
          const active = isRouteActive(item.route);
          return (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route as any)}
              style={({ hovered }: any) => [
                styles.navLink,
                hovered && styles.navLinkHovered,
                active && styles.navLinkActive,
              ]}
            >
              <View style={[styles.iconBox, active && styles.iconBoxActive]}>
                <Text style={[styles.iconText, active && styles.iconTextActive]}>
                  {item.iconText}
                </Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.label}
                </Text>
                <Text style={styles.navDescription} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.statusBox}>
          <View style={styles.statusDot} />
          <View>
            <Text style={styles.statusTitle}>HB+ SECURE REALM</Text>
            <Text style={styles.statusSub}>Domain verified: hbplus.fit</Text>
          </View>
        </View>

        <Pressable
          onPress={signOut}
          style={({ hovered, pressed }: any) => [
            styles.logoutBtn,
            hovered && styles.logoutBtnHovered,
            pressed && styles.logoutBtnPressed,
          ]}
        >
          <Text style={styles.logoutBtnText}>Sign Out of Realm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    backgroundColor: theme.colors.backgroundElevated,
    borderRightWidth: 1,
    borderRightColor: theme.colors.borderSubtle,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'space-between',
  },
  section: {
    gap: theme.spacing.xs,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs - 2,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1.2,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  navLinkHovered: {
    backgroundColor: theme.colors.surface,
  },
  navLinkActive: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderStrong,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.xs,
    backgroundColor: theme.colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  iconBoxActive: {
    backgroundColor: theme.colors.primaryGlow,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  iconText: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    fontFamily: theme.typography.fontMono,
  },
  iconTextActive: {
    color: theme.colors.primary,
  },
  labelContainer: {
    flex: 1,
  },
  navLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  navLabelActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.semibold,
  },
  navDescription: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs - 1,
    marginTop: 1,
  },
  footer: {
    gap: theme.spacing.md,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: theme.spacing.sm,
  },
  statusTitle: {
    color: theme.colors.textPrimary,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 0.5,
  },
  statusSub: {
    color: theme.colors.textMuted,
    fontSize: 9,
  },
  logoutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    alignItems: 'center',
  },
  logoutBtnHovered: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: theme.colors.danger,
  },
  logoutBtnPressed: {
    opacity: 0.8,
  },
  logoutBtnText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
});
