/**
 * DiagnosticsScreen
 * Full health dashboard with 10 collapsible diagnostic categories
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopNav } from '../components/TopNav';
import { CollapsibleCard } from '../components/CollapsibleCard';
import { BottomActionBar } from '../components/BottomActionBar';
import { StatusBadge } from '../components/StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';
import { AdbClient } from '../adb/AdbClient';
import { runFullDiagnostics } from '../adb/DiagnosticCommands';
import type { DiagnosticReport } from '../adb/DiagnosticCommands';
import { saveHistoryEntry, saveKnownDevice } from '../storage';
import { shareReport } from '../export';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Diagnostics'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Diagnostics'>;

export default function DiagnosticsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<Props['route']>();
  const { lang, t } = useLanguage();

  const { device, client: clientParams } = route.params;

  const [running, setRunning] = useState(false);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Run diagnostics automatically on mount
  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = useCallback(async () => {
    setRunning(true);
    setError(null);

    const client = new AdbClient();
    try {
      await client.connect(clientParams.ip, clientParams.port, 15000);

      const result = await runFullDiagnostics(client);
      result.deviceIp = clientParams.ip;

      // Update device status from results
      const updatedDevice = {
        ...device,
        manufacturer: result.deviceManufacturer !== 'Unknown' ? result.deviceManufacturer : device.manufacturer,
        model: result.deviceModel !== 'Unknown' ? result.deviceModel : device.model,
        serial: result.deviceSerial !== 'Unknown' ? result.deviceSerial : device.serial,
        lastStatus: result.overallStatus as 'ok' | 'warning' | 'fault',
        lastSeen: new Date().toISOString(),
      };
      await saveKnownDevice(updatedDevice);

      // Save to history
      const serialKey = result.deviceSerial !== 'Unknown'
        ? result.deviceSerial
        : device.serial || device.ip;
      await saveHistoryEntry(serialKey, result);

      setReport(result);
    } catch (e: any) {
      setError(e?.message || t.diagnostics.failedMessage);
    } finally {
      client.disconnect();
      setRunning(false);
    }
  }, [clientParams, device, t]);

  const handleExport = async () => {
    if (!report) return;
    setExporting(true);
    try {
      await shareReport(report, lang, 'pdf');
    } catch (e: any) {
      Alert.alert(t.diagnostics.exportFailed, e?.message || '');
    } finally {
      setExporting(false);
    }
  };

  const healthColor = !report ? COLORS.textMuted
    : report.overallScore >= 80 ? COLORS.ok
    : report.overallScore >= 60 ? COLORS.warning
    : COLORS.fault;

  const healthLabel = !report ? '' :
    report.overallScore >= 80 ? t.diagnostics.healthy :
    report.overallScore >= 60 ? t.diagnostics.warning :
    t.diagnostics.critical;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav
        showBack
        onBack={() => navigation.goBack()}
        title={t.diagnostics.title}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Overall health header */}
        <View style={styles.healthCard} testID="overall-health-score">
          <View style={styles.healthLeft}>
            <Text style={styles.healthLabel}>{t.diagnostics.overallHealth}</Text>
            {report && (
              <Text
                style={[
                  styles.healthScore,
                  { color: healthColor },
                ]}
              >
                {report.overallScore}%
              </Text>
            )}
            {!report && running && (
              <View style={styles.healthLoading}>
                <ActivityIndicator size="small" color={COLORS.scanning} />
                <Text style={styles.healthLoadingText}>{t.diagnostics.running}</Text>
              </View>
            )}
            {healthLabel ? (
              <Text
                style={[
                  styles.healthStatusLabel,
                  { color: healthColor },
                ]}
                testID="overall-health-label"
              >
                {healthLabel}
              </Text>
            ) : null}
          </View>

          {report && (
            <View style={styles.healthStats}>
              {[
                { status: 'ok', label: 'OK', color: COLORS.ok },
                { status: 'warning', label: 'Warn', color: COLORS.warning },
                { status: 'fault', label: 'Fault', color: COLORS.fault },
              ].map(({ status, label, color }) => {
                const count = report.categories.filter((c) => c.status === status).length;
                return (
                  <View key={status} style={styles.healthStat}>
                    <Text style={[styles.healthStatNum, { color }]}>{count}</Text>
                    <Text style={styles.healthStatLabel}>{label}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Device identity */}
        {report && (
          <Text style={styles.deviceIdentity} testID="diagnostics-device-identity">
            {report.deviceModel} {'· '}
            <Text style={styles.mono}>{report.deviceSerial}</Text>
            {' · '}
            <Text style={styles.mono}>{report.deviceIp}</Text>
          </Text>
        )}

        {/* Error state */}
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>{t.diagnostics.failedTitle}</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {/* Running skeleton */}
        {running && !report && (
          <View style={styles.skeletonContainer}>
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={i} style={styles.skeleton} />
            ))}
          </View>
        )}

        {/* Diagnostic categories */}
        {report && (
          <View style={styles.categoriesContainer}>
            {report.categories.map((cat) => (
              <CollapsibleCard
                key={cat.id}
                category={cat}
                initialExpanded={cat.status === 'fault'}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom action bar */}
      <BottomActionBar
        onRerun={runDiagnostics}
        onExport={handleExport}
        running={running || exporting}
        hasResults={!!report}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.screenX,
    paddingBottom: SPACING.xxl,
  },
  healthCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.cardPad,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthLeft: {
    flex: 1,
  },
  healthLabel: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 4,
  },
  healthScore: {
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 50,
  },
  healthLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  healthLoadingText: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
  },
  healthStatusLabel: {
    fontSize: FONT_SIZES.meta,
    fontWeight: '700',
    marginTop: 2,
  },
  healthStats: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: SPACING.md,
  },
  healthStat: {
    alignItems: 'center',
  },
  healthStatNum: {
    fontSize: 22,
    fontWeight: '700',
  },
  healthStatLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginTop: 1,
  },
  deviceIdentity: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  mono: {
    fontFamily: 'monospace',
  },
  errorCard: {
    backgroundColor: COLORS.faultBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.fault,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  errorTitle: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    color: COLORS.fault,
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.fault,
    opacity: 0.85,
  },
  skeletonContainer: {
    gap: 8,
  },
  skeleton: {
    height: 52,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoriesContainer: {
    gap: 0,
  },
});
