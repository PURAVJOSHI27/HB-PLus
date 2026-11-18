import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  style,
}) => {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
      <View style={[styles.dot, styles[`dot_${variant}`]]} />
      <Text style={[styles.text, styles[`text_${variant}`], styles[`textSize_${size}`]]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.medium,
    letterSpacing: 0.3,
  },

  // Variants
  neutral: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderSubtle,
  },
  dot_neutral: {
    backgroundColor: theme.colors.textMuted,
  },
  text_neutral: {
    color: theme.colors.textSecondary,
  },

  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  dot_success: {
    backgroundColor: theme.colors.success,
  },
  text_success: {
    color: theme.colors.success,
  },

  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  dot_danger: {
    backgroundColor: theme.colors.danger,
  },
  text_danger: {
    color: theme.colors.danger,
  },

  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  dot_warning: {
    backgroundColor: theme.colors.warning,
  },
  text_warning: {
    color: theme.colors.warning,
  },

  info: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  dot_info: {
    backgroundColor: theme.colors.primary,
  },
  text_info: {
    color: theme.colors.primary,
  },

  // Sizes
  size_sm: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  size_md: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  textSize_sm: {
    fontSize: theme.typography.sizes.xs - 1,
  },
  textSize_md: {
    fontSize: theme.typography.sizes.xs,
  },
});
