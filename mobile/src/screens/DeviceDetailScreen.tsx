/**
 * DeviceDetailScreen
 * Shows terminal info and provides Run Diagnostics / View History buttons
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopNav } from '../components/TopNav';
import { StatusBadge } from '../components/StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS, TOUCH_TARGET } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';
import { AdbClient } from '../adb/AdbClient';
import { probeDeviceInfo } from '../adb/DiagnosticCommands';
import { saveKnownDevice, loadHistory } from '../storage';
import type { DiscoveredDevice } from '../storage';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeviceDetail'>;

export default function DeviceDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<Props['route']>();
  const { t } = useLanguage();

  const [device, setDevice] = useState<DiscoveredDevice>(route.params.device);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    // Load history count
    if (device.serial && device.serial !== 'Unknown') {
      loadHistory(device.serial).then((h) => setHistoryCount(h.length));
    }

    // If device info not fully known, probe it
    if (device.manufacturer === 'Unknown' || device.model === 'Unknown') {
      probeAndUpdate();
    }
  }, []);

  const probeAndUpdate = async () => {
    const client = new AdbClient();
    try {
      await client.connect(device.ip, device.port || 5555, 8000);
      const info = await probeDeviceInfo(client);
      const updated = { ...device, ...info, lastSeen: new Date().toISOString() };
      setDevice(updated);
      await saveKnownDevice(updated);
    } catch (_e) {
      // Silent - proceed with partial info
    } finally {
      client.disconnect();
    }
  };

  const handleRunDiagnostics = async () => {
    setConnecting(true);
    setConnectError(null);
    const client = new AdbClient();
    try {
      await client.connect(device.ip, device.port || 5555, 12000);
      navigation.navigate('Diagnostics', { device, client: { ip: device.ip, port: device.port || 5555 } });
    } catch (e: any) {
      setConnectError(e?.message || t.device.connectionFailed);
    } finally {
      setConnecting(false);
      client.disconnect();
    }
  };

  const fields: { key: string; value: string; mono?: boolean }[] = [
    { key: t.device.ip, value: device.ip, mono: true },
    { key: t.device.manufacturer, value: device.manufacturer || 'Unknown' },
    { key: t.device.model, value: device.model || 'Unknown' },
    { key: t.device.serial, value: device.serial || 'Unknown', mono: true },
    { key: t.device.adbStatus, value: t.device.adbConnected },
    { key: t.device.lastSeen, value: device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav
        showBack
        onBack={() => navigation.goBack()}
        title={t.device.title}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Device info card */}
        <View style={styles.infoCard} testID="device-info-card">
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.deviceTitle}>
                {device.manufacturer || 'Unknown'} {device.model || ''}
              </Text>
              <Text style={styles.deviceIp} selectable>
                {device.ip}
              </Text>
            </View>
            <StatusBadge status={device.lastStatus || 'ok'} />
          </View>

          <View style={styles.divider} />

          {fields.map((field, idx) => (
            <View
              key={field.key}
              style={[
                styles.fieldRow,
                idx < fields.length - 1 && styles.fieldRowBorder,
              ]}
              testID="key-value-row"
            >
              <Text style={styles.fieldKey}>{field.key}</Text>
              <Text style={[
                styles.fieldValue,
                field.mono && styles.fieldValueMono,
              ]}
                selectable>
                {field.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Error message */}
        {connectError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{connectError}</Text>
          </View>
        )}

        {/* Action buttons */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            connecting && styles.primaryButtonDisabled,
            pressed && !connecting && styles.primaryButtonPressed,
          ]}
          onPress={handleRunDiagnostics}
          disabled={connecting}
          testID="run-diagnostics-button"
        >
          {connecting ? (
            <View style={styles.buttonInner}>
              <ActivityIndicator size="small" color={COLORS.textInverse} />
              <Text style={styles.primaryButtonText}>{t.device.connecting}</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>{t.device.runDiagnostics}</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('History', { device })}
          testID="view-history-button"
        >
          <Text style={styles.secondaryButtonText}>
            {t.device.viewHistory}
            {historyCount > 0 ? ` (${historyCount})` : ''}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.screenX,
    paddingBottom: SPACING.xxl,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.cardPad,
    marginBottom: SPACING.md,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  deviceTitle: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  deviceIp: {
    fontFamily: 'monospace',
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: SPACING.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  fieldRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  fieldKey: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    fontWeight: '500',
    flex: 1,
  },
  fieldValue: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textPrimary,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  fieldValueMono: {
    fontFamily: 'monospace',
  },
  errorBanner: {
    backgroundColor: COLORS.faultBg,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.fault,
  },
  errorText: {
    color: COLORS.fault,
    fontSize: FONT_SIZES.meta,
    fontWeight: '500',
  },
  primaryButton: {
    height: 52,
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
});
