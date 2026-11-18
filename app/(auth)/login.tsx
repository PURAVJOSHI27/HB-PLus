import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { theme } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { Badge } from '../../src/components/common/Badge';

export default function LoginScreen() {
  const { signInWithGoogle, status, error, clearError } = useAuth();
  const isLoading = status === 'loading';

  return (
    <View style={styles.wrapper}>
      {/* Brand Header */}
      <View style={styles.brandContainer}>
        <View style={styles.badgeRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>HB+</Text>
          </View>
          <Badge label="RESTRICTED REALM" variant="info" size="sm" />
        </View>
        <Text style={styles.brandTitle}>HB+ ACCESS</Text>
        <Text style={styles.brandSubtitle}>
          Internal Authentication & Identity Gateway
        </Text>
      </View>

      {/* Main Authentication Card */}
      <Card variant="elevated" padding="lg" style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Employee SSO Sign-In</Text>
          <Text style={styles.cardDescription}>
            Sign in using your authorized company Google account to access enterprise tools and dashboard.
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <View style={styles.errorHeader}>
              <Text style={styles.errorTitle}>Authentication Notice</Text>
              <Text onPress={clearError} style={styles.dismissText}>
                Dismiss
              </Text>
            </View>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        <View style={styles.actionSection}>
          <Button
            title={isLoading ? 'Connecting to Identity Provider...' : 'Sign In with Google Workspace'}
            onPress={signInWithGoogle}
            loading={isLoading}
            variant="primary"
            size="lg"
            style={styles.signInBtn}
          />
        </View>

        {/* Security Policy Notice */}
        <View style={styles.policyBox}>
          <View style={styles.policyRow}>
            <Text style={styles.policyIcon}>*</Text>
            <Text style={styles.policyText}>
              Domain Restricted: Only <Text style={styles.codeText}>@hbplus.fit</Text> addresses are granted access.
            </Text>
          </View>
          <View style={styles.policyRow}>
            <Text style={styles.policyIcon}>*</Text>
            <Text style={styles.policyText}>
              All access attempts are cryptographically verified and logged for security compliance.
            </Text>
          </View>
        </View>
      </Card>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          HB+ Internal Systems • Cross-Platform Web & Mobile • Build 1.0.0
        </Text>
      </View>
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
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.xs,
  },
  logoBadgeText: {
    color: theme.colors.textInverse,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
    letterSpacing: 0.5,
  },
  brandTitle: {
    color: theme.colors.textPrimary,
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
  },
  cardHeader: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    lineHeight: theme.typography.lineHeights.base,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  errorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  errorTitle: {
    color: theme.colors.danger,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    textTransform: 'uppercase',
  },
  dismissText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
  },
  errorMessage: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
  },
  actionSection: {
    marginBottom: theme.spacing.lg,
  },
  signInBtn: {
    width: '100%',
  },
  policyBox: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    gap: theme.spacing.sm,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  policyIcon: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
    marginRight: theme.spacing.sm,
    lineHeight: 18,
  },
  policyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    lineHeight: 18,
    flex: 1,
  },
  codeText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontMono,
    fontWeight: theme.typography.weights.semibold,
  },
  footer: {
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs - 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
