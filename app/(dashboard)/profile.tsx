import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';
import { Card } from '../../src/components/common/Card';
import { Badge } from '../../src/components/common/Badge';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Employee Profile</Text>
          <Badge label="Verified Identity" variant="success" size="md" />
        </View>
        <Text style={styles.pageSubtitle}>
          Organization access credentials and profile details.
        </Text>
      </View>

      <Card variant="elevated" padding="lg" style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.displayName
                ? user.displayName.slice(0, 2).toUpperCase()
                : user?.email
                ? user.email.slice(0, 2).toUpperCase()
                : 'HB'}
            </Text>
          </View>
          <View style={styles.profileTitleBlock}>
            <Text style={styles.nameText}>
              {user?.displayName || 'Authorized Personnel'}
            </Text>
            <Text style={styles.emailText}>{user?.email || 'user@hbplus.fit'}</Text>
            <View style={styles.badgeRow}>
              <Badge label="@hbplus.fit" variant="success" size="sm" />
              <Badge label="Role: Employee" variant="info" size="sm" />
            </View>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ORGANIZATION</Text>
            <Text style={styles.infoValue}>HB+ Fitness Technologies</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>DOMAIN MATCH STATUS</Text>
            <Text style={[styles.infoValue, { color: theme.colors.success }]}>
              {user?.isDomainVerified ? 'Verified Active Domain' : 'Corporate Account Enforced'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>SECURITY CLEARANCE</Text>
            <Text style={styles.infoValue}>Standard Staff (Read/Write Portal)</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>SESSION STATUS</Text>
            <Text style={styles.infoValue}>OAuth 2.0 Token Active</Text>
          </View>
        </View>
      </Card>
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
  card: {
    maxWidth: 720,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.surfaceHover,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    fontFamily: theme.typography.fontMono,
  },
  profileTitleBlock: {
    flex: 1,
    gap: 4,
  },
  nameText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  emailText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontMono,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: 4,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
    marginVertical: theme.spacing.lg,
  },
  infoGrid: {
    gap: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  infoLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontFamily: theme.typography.fontMono,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1,
  },
  infoValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
});
