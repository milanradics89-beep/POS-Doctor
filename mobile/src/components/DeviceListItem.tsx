/**
 * DeviceListItem Component
 * Compact card row for discovered terminals in the scan screen
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { DiscoveredDevice } from '../storage';
import { StatusBadge } from './StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS, TOUCH_TARGET } from '../theme';

interface DeviceListItemProps {
  device: DiscoveredDevice & { probing?: boolean };
  onPress: (device: DiscoveredDevice) => void;
}

export function DeviceListItem({ device, onPress }: DeviceListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(device)}
      testID="scan-device-list-item"
      accessibilityRole="button"
    >
      {/* Left: Status dot */}
      <View style={styles.statusDot}>
        <View
          style={[
            styles.dot,
            { backgroundColor: device.lastStatus === 'fault' ? COLORS.fault :
              device.lastStatus === 'warning' ? COLORS.warning :
              COLORS.ok },
          ]}
        />
      </View>

      {/* Center: Device info */}
      <View style={styles.info}>
        <Text style={styles.ip} selectable>
          {device.ip}
        </Text>
        <Text style={styles.model} numberOfLines={1}>
          {device.probing
            ? 'Probing...'
            : `${device.manufacturer || 'Unknown'} \u00b7 ${device.model || 'Unknown'}`
          }
        </Text>
        {device.serial && device.serial !== 'Unknown' && (
          <Text style={styles.serial} numberOfLines={1}>
            S/N: {device.serial}
          </Text>
        )}
      </View>

      {/* Right: Status badge + chevron */}
      <View style={styles.right}>
        {device.lastStatus && (
          <StatusBadge status={device.lastStatus} size="sm" />
        )}
        <Text style={styles.chevron}>{'›'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.cardPad,
    marginBottom: SPACING.sm,
    minHeight: TOUCH_TARGET + 12,
  },
  pressed: {
    backgroundColor: COLORS.bgElevated,
    opacity: 0.9,
  },
  statusDot: {
    width: 28,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  ip: {
    fontFamily: 'monospace',
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  model: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textSecondary,
    marginBottom: 1,
  },
  serial: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textMuted,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
});
