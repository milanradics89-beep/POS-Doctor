/**
 * StatusBadge Component
 * Color-coded pill badge with icon and label (never color-only)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { DiagnosticStatus } from '../adb/DiagnosticCommands';
import { STATUS_COLORS, FONT_SIZES, RADIUS } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

interface StatusBadgeProps {
  status: DiagnosticStatus | string;
  size?: 'sm' | 'md';
  testID?: string;
}

const STATUS_ICONS: Record<string, string> = {
  ok: '\u2713',
  warning: '\u26a0',
  fault: '\u2717',
  unknown: '?',
  running: '\u25cf',
  info: 'i',
};

export function StatusBadge({ status, size = 'md', testID }: StatusBadgeProps) {
  const { t } = useLanguage();
  const colors = STATUS_COLORS[status] || STATUS_COLORS.unknown;
  const icon = STATUS_ICONS[status] || '?';

  const labelMap: Record<string, string> = {
    ok: t.status.ok,
    warning: t.status.warning,
    fault: t.status.fault,
    unknown: t.status.unknown,
    running: t.status.running,
  };

  const label = labelMap[status] || status;
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        isSmall && styles.badgeSm,
      ]}
      testID={testID || 'status-badge'}
    >
      <Text style={[
        styles.icon,
        { color: colors.text },
        isSmall && styles.iconSm,
      ]}>
        {icon}
      </Text>
      <Text style={[
        styles.label,
        { color: colors.text },
        isSmall && styles.labelSm,
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  badgeSm: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  icon: {
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  iconSm: {
    fontSize: 10,
    marginRight: 3,
  },
  label: {
    fontSize: FONT_SIZES.meta,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelSm: {
    fontSize: 11,
  },
});
