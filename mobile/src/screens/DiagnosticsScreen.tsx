/**
 * DiagnosticsScreen
 * Main on-device diagnostic dashboard
 * Entry point for the app - runs directly on the POS terminal
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TopNav } from '../components/TopNav';
import { CollapsibleCard } from '../components/CollapsibleCard';
import { BottomActionBar } from '../components/BottomActionBar';
import { StatusBadge } from '../components/StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';
import { shareReport } from '../export';
import { saveHistoryEntry } from '../storage';
import { getDiagnostics, getDeviceKey, getPermissionsInfo } from '../native/PosDoctorDiagnostics';
import { processDiagnostics } from '../native/DiagnosticsProcessor';
import type { DiagnosticReport, DiagnosticCategory, DiagnosticStatus } from '../native/DiagnosticsProcessor';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { PermissionsAndroid, Platform, Linking } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Diagnostics'>;

export default function DiagnosticsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { lang, t } = useLanguage();

  const [running, setRunning] = useState(false);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [permissionsNeeded, setPermissionsNeeded] = useState(false);
  const [permissionSummary, setPermissionSummary] = useState({
    location: 'unknown',
    phoneState: 'unknown',
  });

  const refreshPermissionSummary = useCallback(async () => {
    const info = await getPermissionsInfo();
    setPermissionSummary({ location: info.location, phoneState: info.phoneState });
    setPermissionsNeeded(info.location !== 'granted' || info.phoneState !== 'granted');
  }, []);

  useEffect(() => {
    refreshPermissionSummary();
  }, [refreshPermissionSummary]);

  const requestRuntimePermissions = async () => {
    if (Platform.OS !== 'android') return;

    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ];

      const results = await PermissionsAndroid.requestMultiple(permissions);

      const allGranted = Object.values(results).every(
        (result) => result === PermissionsAndroid.RESULTS.GRANTED
      );

      if (allGranted) {
        setPermissionsNeeded(false);
        await refreshPermissionSummary();
        // Re-run diagnostics to get full data
        await runDiagnostics();
      } else {
        // Still update permissions needed state
        await refreshPermissionSummary();
        const showLocationRationale = await PermissionsAndroid.shouldShowRequestPermissionRationale(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        const showPhoneRationale = await PermissionsAndroid.shouldShowRequestPermissionRationale(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
        );
        if (!showLocationRationale || !showPhoneRationale) {
          Alert.alert('Permissions blocked', 'Enable permissions from Android Settings to run full diagnostics.');
        }
      }
    } catch (err) {
      console.warn('Permission request failed:', err);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const runDiagnostics = useCallback(async () => {
    setRunning(true);
    setError(null);

    try {
      // Check permissions first
      await refreshPermissionSummary();

      // Get permissions info for the permissions card
      const permissionsInfo = await getPermissionsInfo();

      // Get native diagnostics data
      const nativePayload = await getDiagnostics();
      
      // Process into app format (with permissions card)
      const diagnosticReport = processDiagnostics(nativePayload, permissionsInfo);
      
      setReport(diagnosticReport);
      
      // Save to history with stable device key
      const deviceKey = getDeviceKey(nativePayload.device);
      await saveHistoryEntry(deviceKey, diagnosticReport);
    } catch (e: any) {
      console.error('Diagnostics error:', e);
      setError(e?.message || t.diagnostics.failedMessage);
    } finally {
      setRunning(false);
    }
  }, [refreshPermissionSummary, t]);

  const handleExport = async () => {
    if (!report) return;
    Alert.alert('Export Report', 'Choose export format', [
      {
        text: 'Text',
        onPress: async () => {
          setExporting(true);
          try {
            await shareReport(report, lang, 'text');
          } catch (e: any) {
            Alert.alert(t.diagnostics.exportFailed, e?.message || '');
          } finally {
            setExporting(false);
          }
        },
      },
      {
        text: 'PDF',
        onPress: async () => {
          setExporting(true);
          try {
            await shareReport(report, lang, 'pdf');
          } catch (e: any) {
            Alert.alert(t.diagnostics.exportFailed, e?.message || '');
          } finally {
            setExporting(false);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
        title="POS Doctor"
        showHistory
        onHistory={() => navigation.navigate('History')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.permissionBanner}>
          <Text style={styles.permissionBannerTitle}>Permission Status</Text>
          <Text style={styles.permissionBannerText}>Location: {permissionSummary.location}</Text>
          <Text style={styles.permissionBannerText}>Phone state: {permissionSummary.phoneState}</Text>
          {permissionsNeeded && !running && (
            <View style={styles.permissionButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.permissionButton,
                  pressed && styles.permissionButtonPressed,
                ]}
                onPress={requestRuntimePermissions}
              >
                <Text style={styles.permissionButtonText}>Grant Permissions</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.permissionButtonSecondary,
                  pressed && styles.permissionButtonPressed,
                ]}
                onPress={openSettings}
              >
                <Text style={styles.permissionButtonSecondaryText}>Open Settings</Text>
              </Pressable>
            </View>
          )}
        </View>

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
            {!report && !running && !error && (
              <Text style={styles.healthWelcome}>
                {t.diagnostics.welcomeMessage || 'Tap Run Diagnostics to start'}
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
            {' · Android '}
            <Text style={styles.mono}>{report.androidVersion}</Text>
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

        {/* Empty state - first run */}
        {!report && !running && !error && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🩺</Text>
            <Text style={styles.emptyText}>
              {t.diagnostics.emptyTitle || 'No diagnostics run yet'}
            </Text>
            <Text style={styles.emptyHint}>
              {t.diagnostics.emptyHint || 'Tap the button below to run a complete system diagnostic'}
            </Text>
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
  healthWelcome: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 22,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.textSecondary,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
    lineHeight: 20,
  },
  permissionBanner: {
    backgroundColor: COLORS.warningBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.warning,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  permissionBannerTitle: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    color: COLORS.warning,
    marginBottom: 4,
  },
  permissionBannerText: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  permissionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  permissionButton: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.warning,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButtonSecondary: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButtonPressed: {
    opacity: 0.7,
  },
  permissionButtonText: {
    fontSize: FONT_SIZES.meta,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  permissionButtonSecondaryText: {
    fontSize: FONT_SIZES.meta,
    fontWeight: '700',
    color: COLORS.warning,
  },
});
