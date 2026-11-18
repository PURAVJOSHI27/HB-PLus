import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>HB+</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.portalTitle}>
            ACCESS <Text style={styles.portalSub}>PORTAL</Text>
          </Text>
          {title && <Text style={styles.pageTitle}>{title}</Text>}
        </View>
      </View>

      <View style={styles.right}>
        {user ? (
          <View style={styles.userSection}>
            <Badge label="@hbplus.fit" variant="success" size="sm" style={styles.badge} />
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>
                {user.displayName || user.email?.split('@')[0] || 'Employee'}
              </Text>
              <Text style={styles.userRole}>Internal Staff</Text>
            </View>
            <Pressable
              onPress={signOut}
              style={({ pressed, hovered }: any) => [
                styles.logoutButton,
                hovered && styles.logoutHovered,
                pressed && styles.logoutPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Log out of HB+ ACCESS"
            >
              <Text style={styles.logoutText}>Log out</Text>
            </Pressable>
          </View>
        ) : (
          <Badge label="Restricted Network" variant="info" size="sm" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: theme.colors.backgroundElevated,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
    marginRight: theme.spacing.sm,
  },
  logoText: {
    color: theme.colors.textInverse,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
    letterSpacing: 0.5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portalTitle: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.base,
    letterSpacing: 1.5,
  },
  portalSub: {
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.regular,
    fontSize: theme.typography.sizes.xs,
  },
  pageTitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    marginLeft: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.borderSubtle,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: theme.spacing.md,
  },
  userInfo: {
    marginRight: theme.spacing.md,
    alignItems: 'flex-end',
  },
  userName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    maxWidth: 160,
  },
  userRole: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs - 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    backgroundColor: theme.colors.surface,
  },
  logoutHovered: {
    backgroundColor: theme.colors.surfaceHover,
    borderColor: theme.colors.danger,
  },
  logoutPressed: {
    opacity: 0.8,
  },
  logoutText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
});
