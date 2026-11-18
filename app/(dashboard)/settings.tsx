import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../src/theme';
import { Card } from '../../src/components/common/Card';
import { Badge } from '../../src/components/common/Badge';

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Security & Policies</Text>
          <Badge label="Enforced" variant="info" size="md" />
        </View>
        <Text style={styles.pageSubtitle}>
          Portal configuration, domain enforcement status, and audit parameters.
        </Text>
      </View>

      <View style={styles.settingsGrid}>
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Text style={styles.cardTitle}>Domain Restriction Rules</Text>
          <Text style={styles.cardDesc}>
            Strict tenant firewall settings applied to all authentication requests.
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Allowed SSO Domain</Text>
              <Text style={styles.settingSub}>Any other domain is automatically quarantined</Text>
            </View>
            <Badge label="@hbplus.fit" variant="success" size="sm" />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Backend Firestore Validation</Text>
              <Text style={styles.settingSub}>Firestore rules check request.auth.token.email</Text>
            </View>
            <Badge label="Active" variant="success" size="sm" />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Self-Assigned Admin Block</Text>
              <Text style={styles.settingSub}>Client-side role promotion is rejected by schema rules</Text>
            </View>
            <Badge label="Hardened" variant="success" size="sm" />
          </View>
        </Card>

        <Card variant="bordered" padding="lg" style={styles.card}>
          <Text style={styles.cardTitle}>Platform & Runtime Specs</Text>
          <Text style={styles.cardDesc}>
            Build targets for cross-platform distribution.
          </Text>

          <View style={styles.specRow}>
            <Text style={styles.specKey}>PRIMARY DELIVERABLE</Text>
            <Text style={styles.specVal}>Web Application (React Native Web + Netlify)</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>MOBILE TARGETS</Text>
            <Text style={styles.specVal}>Android & iOS (Expo Router Native Bundle)</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>ENVIRONMENT</Text>
            <Text style={styles.specVal}>Production Ready Enterprise Stack</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  headerSection: {
    marginBottom: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: 4,
  },
  pageTitle: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
  },
  pageSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  settingsGrid: {
    gap: theme.spacing.lg,
    maxWidth: 720,
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
  },
  cardDesc: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.xs,
    marginBottom: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  settingInfo: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  settingTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  settingSub: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    marginTop: 2,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  specKey: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontFamily: theme.typography.fontMono,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1,
  },
  specVal: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
  },
});
