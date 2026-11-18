import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { Badge } from '../../src/components/common/Badge';
import { maskEmail } from '../../src/utils/validation';

export default function AccessDeniedScreen() {
  const router = useRouter();
  const { accessDeniedDetails, retryAuth } = useAuth();

  const handleRetry = () => {
    retryAuth();
    router.replace('/(auth)/login');
  };

  const masked = maskEmail(accessDeniedDetails?.attemptedEmail);

  return (
    <View style={styles.wrapper}>
      {/* Brand Header */}
      <View style={styles.brandContainer}>
        <View style={styles.badgeRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>HB+</Text>
          </View>
          <Badge label="ACCESS REJECTED" variant="danger" size="sm" />
        </View>
        <Text style={styles.brandTitle}>ACCESS DENIED</Text>
        <Text style={styles.brandSubtitle}>
          Enterprise Domain Policy Violation Detected
        </Text>
      </View>

      {/* Main Alert Card */}
      <Card variant="elevated" padding="lg" style={styles.card}>
        <View style={styles.alertHeader}>
          <View style={styles.iconCircle}>
            <Text style={styles.alertIcon}>!</Text>
          </View>
          <Text style={styles.alertTitle}>Unauthorized Domain</Text>
          <Text style={styles.alertDescription}>
            The account you authenticated with is not authorized to access internal HB+ systems.
          </Text>
        </View>

        {/* Audit Details */}
        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Attempted Account</Text>
            <Text style={styles.detailValue}>{masked}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Authorized Domain</Text>
            <Text style={[styles.detailValue, styles.authorizedDomain]}>@hbplus.fit</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Security Enforcement</Text>
            <Text style={styles.detailValue}>Client & Cloud Firestore Level</Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Sign In with Company Account (@hbplus.fit)"
            onPress={handleRetry}
            variant="primary"
            size="md"
            style={styles.retryBtn}
          />
        </View>

        {/* Security Notice */}
        <View style={styles.supportBox}>
          <Text style={styles.supportTitle}>Are you an HB+ employee?</Text>
          <Text style={styles.supportText}>
            Ensure you choose your official corporate Google account during SSO login. For account provisioning, contact{' '}
            <Text style={styles.supportEmail}>it-security@hbplus.fit</Text>.
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  logoBadge: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderStrong,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.xs,
  },
  logoBadgeText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
  },
  brandTitle: {
    color: theme.colors.danger,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 2,
    marginBottom: theme.spacing.xs,
  },
  brandSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  alertHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  alertIcon: {
    color: theme.colors.danger,
    fontSize: 24,
    fontWeight: theme.typography.weights.bold,
    fontFamily: theme.typography.fontMono,
  },
  alertTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.xs,
  },
  alertDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.base,
  },
  detailsBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
  },
  detailValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fontMono,
  },
  authorizedDomain: {
    color: theme.colors.success,
    fontWeight: theme.typography.weights.semibold,
  },
  actionSection: {
    marginBottom: theme.spacing.lg,
  },
  retryBtn: {
    width: '100%',
  },
  supportBox: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
  },
  supportTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 4,
  },
  supportText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    lineHeight: 18,
  },
  supportEmail: {
    color: theme.colors.primary,
  },
});
