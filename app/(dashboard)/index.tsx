import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';
import { Card } from '../../src/components/common/Card';
import { Badge } from '../../src/components/common/Badge';

export default function DashboardOverviewScreen() {
  const { user } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Title & Hero */}
      <View style={styles.headerSection}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Enterprise Overview</Text>
          <Badge label="Operational" variant="success" size="md" />
        </View>
        <Text style={styles.pageSubtitle}>
          Welcome to the HB+ internal operations and identity management portal.
        </Text>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsGrid}>
        <Card variant="elevated" padding="md" style={styles.metricCard}>
          <Text style={styles.metricLabel}>AUTHENTICATION DOMAIN</Text>
          <Text style={styles.metricValue}>hbplus.fit</Text>
          <Text style={styles.metricSub}>Strict single-tenant verification</Text>
        </Card>

        <Card variant="elevated" padding="md" style={styles.metricCard}>
          <Text style={styles.metricLabel}>IDENTITY PROVIDER</Text>
          <Text style={styles.metricValue}>Google SSO</Text>
          <Text style={styles.metricSub}>OAuth 2.0 + Firebase Auth</Text>
        </Card>

        <Card variant="elevated" padding="md" style={styles.metricCard}>
          <Text style={styles.metricLabel}>SECURITY LEVEL</Text>
          <Text style={[styles.metricValue, { color: theme.colors.success }]}>Level 4</Text>
          <Text style={styles.metricSub}>Cloud Firestore Security Rules</Text>
        </Card>
      </View>

      {/* Main Grid: Active Services & Verification Notice */}
      <View style={styles.contentGrid}>
        {/* Service Modules */}
        <Card variant="elevated" padding="lg" style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Authorized Portal Services</Text>
            <Badge label="Internal Only" variant="neutral" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            These enterprise modules are restricted to validated @hbplus.fit personnel.
          </Text>

          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceTag}>
                <Text style={styles.serviceTagText}>OPS</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Operations Console</Text>
                <Text style={styles.serviceDescription}>
                  Inventory, warehouse logistics and scheduling
                </Text>
              </View>
              <Badge label="Available" variant="success" size="sm" />
            </View>

            <View style={styles.serviceItem}>
              <View style={styles.serviceTag}>
                <Text style={styles.serviceTagText}>DATA</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Performance & Member Analytics</Text>
                <Text style={styles.serviceDescription}>
                  Real-time fitness tracking telemetry
                </Text>
              </View>
              <Badge label="Available" variant="success" size="sm" />
            </View>

            <View style={styles.serviceItem}>
              <View style={styles.serviceTag}>
                <Text style={styles.serviceTagText}>IAM</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>Identity & Access Audit</Text>
                <Text style={styles.serviceDescription}>
                  Session monitoring and role administration
                </Text>
              </View>
              <Badge label="Protected" variant="info" size="sm" />
            </View>
          </View>
        </Card>

        {/* Security & Access Info */}
        <Card variant="bordered" padding="lg" style={styles.sideCard}>
          <Text style={styles.cardTitle}>Identity Session</Text>
          <View style={styles.sessionBox}>
            <View style={styles.sessionRow}>
              <Text style={styles.sessionLabel}>Current User</Text>
              <Text style={styles.sessionVal}>{user?.email || 'Not connected'}</Text>
            </View>
            <View style={styles.sessionRow}>
              <Text style={styles.sessionLabel}>Domain Match</Text>
              <Text style={[styles.sessionVal, { color: theme.colors.success }]}>
                {user?.isDomainVerified ? 'Verified (@hbplus.fit)' : 'Pending'}
              </Text>
            </View>
            <View style={styles.sessionRow}>
              <Text style={styles.sessionLabel}>Assigned Role</Text>
              <Text style={styles.sessionVal}>{user?.role || 'Guest'}</Text>
            </View>
          </View>

          <View style={styles.ruleNotice}>
            <Text style={styles.ruleNoticeTitle}>Architecture Note</Text>
            <Text style={styles.ruleNoticeText}>
              Frontend domain checking is coupled with backend Firestore Security Rules.
              Access to production records is denied if `request.auth.token.email` does not end with @hbplus.fit.
            </Text>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metricCard: {
    flex: 1,
    minWidth: 220,
  },
  metricLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontFamily: theme.typography.fontMono,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1,
    marginBottom: 6,
  },
  metricValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 4,
  },
  metricSub: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.xs,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  mainCard: {
    flex: 2,
    minWidth: 320,
  },
  sideCard: {
    flex: 1,
    minWidth: 280,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  servicesList: {
    gap: theme.spacing.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  serviceTag: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.xs,
    backgroundColor: theme.colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  serviceTagText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontMono,
    fontWeight: theme.typography.weights.bold,
    fontSize: 11,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  serviceDescription: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    marginTop: 2,
  },
  sessionBox: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
  },
  sessionVal: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fontMono,
  },
  ruleNotice: {
    marginTop: theme.spacing.md,
  },
  ruleNoticeTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: 4,
  },
  ruleNoticeText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.xs,
    lineHeight: 18,
  },
});
