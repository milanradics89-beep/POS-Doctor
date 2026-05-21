/**
 * ScanScreen - Device Discovery
 * Auto-detects subnet and scans for ADB devices on port 5555
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TopNav } from '../components/TopNav';
import { DeviceListItem } from '../components/DeviceListItem';
import { StatusBadge } from '../components/StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS, TOUCH_TARGET } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';
import { detectSubnet, scanSubnet, checkAdbConnectivity } from '../adb/SubnetScanner';
import { AdbClient } from '../adb/AdbClient';
import { probeDeviceInfo } from '../adb/DiagnosticCommands';
import { saveKnownDevice, loadKnownDevices } from '../storage';
import type { DiscoveredDevice } from '../storage';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scan'>;

type FilterType = 'all' | 'ok' | 'warning' | 'fault';

export default function ScanScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();

  const [subnet, setSubnet] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState({ scanned: 0, total: 254, found: 0 });
  const [devices, setDevices] = useState<(DiscoveredDevice & { probing?: boolean })[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [manualIp, setManualIp] = useState('');
  const [manualPort, setManualPort] = useState('5555');
  const [connecting, setConnecting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cancelRef = useRef({ cancelled: false });

  // Load known devices and auto-detect subnet on mount
  useEffect(() => {
    loadKnownDevices().then((saved) => {
      if (saved.length > 0) setDevices(saved);
    });
    detectSubnet().then((s) => {
      if (s) setSubnet(s);
    });
  }, []);

  const showToast = (msg: string, durationMs = 2500) => {
    setToast(msg);
    setTimeout(() => setToast(null), durationMs);
  };

  const handleScan = useCallback(async () => {
    if (scanning) {
      // Cancel
      cancelRef.current.cancelled = true;
      setScanning(false);
      return;
    }

    if (!subnet.trim()) {
      Alert.alert(t.errors.noWifi, t.errors.noWifiHint);
      return;
    }

    cancelRef.current = { cancelled: false };
    setScanning(true);
    setDevices([]);
    setProgress({ scanned: 0, total: 254, found: 0 });

    const foundDevices: (DiscoveredDevice & { probing?: boolean })[] = [];

    try {
      await scanSubnet(
        subnet.trim(),
        5555,
        600,
        32,
        (p) => setProgress(p),
        async (ip) => {
          const stub: DiscoveredDevice & { probing: boolean } = {
            ip,
            port: 5555,
            manufacturer: 'Unknown',
            model: 'Unknown',
            serial: 'Unknown',
            lastSeen: new Date().toISOString(),
            lastStatus: 'ok',
            probing: true,
          };
          foundDevices.push(stub);
          setDevices([...foundDevices]);

          // Probe device info asynchronously
          probeDevice(ip, foundDevices, stub);
        },
        cancelRef.current
      );
    } finally {
      setScanning(false);
    }
  }, [scanning, subnet, t]);

  const probeDevice = async (
    ip: string,
    deviceList: (DiscoveredDevice & { probing?: boolean })[],
    stub: DiscoveredDevice & { probing?: boolean }
  ) => {
    const client = new AdbClient();
    try {
      await client.connect(ip, 5555, 8000);
      const info = await probeDeviceInfo(client);
      stub.manufacturer = info.manufacturer;
      stub.model = info.model;
      stub.serial = info.serial;
      stub.probing = false;
      stub.lastStatus = 'ok';
      await saveKnownDevice({ ...stub });
      setDevices([...deviceList]);
    } catch (_e) {
      stub.probing = false;
      setDevices([...deviceList]);
    } finally {
      client.disconnect();
    }
  };

  const handleAutoSubnet = async () => {
    const s = await detectSubnet();
    if (s) {
      setSubnet(s);
      showToast(`Subnet: ${s}.0/24`);
    } else {
      showToast(t.errors.noWifi);
    }
  };

  const handleManualConnect = async () => {
    const ip = manualIp.trim();
    if (!ip) return;
    const port = parseInt(manualPort) || 5555;

    setConnecting(true);
    try {
      const open = await checkAdbConnectivity(ip, port, 5000);
      if (!open) {
        Alert.alert(t.errors.connectionFailed, `${ip}:${port} is not reachable`);
        setConnecting(false);
        return;
      }

      const device: DiscoveredDevice = {
        ip,
        port,
        manufacturer: 'Unknown',
        model: 'Unknown',
        serial: 'Unknown',
        lastSeen: new Date().toISOString(),
        lastStatus: 'ok',
      };

      await saveKnownDevice(device);
      setManualModalVisible(false);
      navigation.navigate('DeviceDetail', { device });
    } catch (e: any) {
      Alert.alert(t.errors.connectionFailed, e?.message || '');
    } finally {
      setConnecting(false);
    }
  };

  const filteredDevices = devices.filter((d) => {
    if (filter === 'all') return true;
    return d.lastStatus === filter;
  });

  const renderDevice = ({ item }: { item: DiscoveredDevice & { probing?: boolean } }) => (
    <DeviceListItem
      device={item}
      onPress={(d) => navigation.navigate('DeviceDetail', { device: d })}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav />

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.ip}
        renderItem={renderDevice}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Title */}
            <Text style={styles.screenTitle}>{t.scan.title}</Text>
            <Text style={styles.screenSubtitle}>{t.scan.subtitle}</Text>

            {/* Subnet input */}
            <View style={styles.subnetRow}>
              <View style={styles.subnetInputWrapper}>
                <Text style={styles.subnetLabel}>{t.scan.subnet}</Text>
                <TextInput
                  style={styles.subnetInput}
                  value={subnet}
                  onChangeText={setSubnet}
                  placeholder={t.scan.subnetPlaceholder}
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  testID="scan-subnet-input"
                />
              </View>
              <Pressable
                style={styles.autoButton}
                onPress={handleAutoSubnet}
                testID="scan-subnet-auto-button"
              >
                <Text style={styles.autoButtonText}>{t.scan.autoDetect}</Text>
              </Pressable>
            </View>

            {/* Scan Button */}
            <Pressable
              style={({ pressed }) => [
                styles.scanButton,
                scanning && styles.scanButtonScanning,
                pressed && styles.scanButtonPressed,
              ]}
              onPress={handleScan}
              testID="scan-start-button"
            >
              {scanning ? (
                <View style={styles.scanButtonInner}>
                  <ActivityIndicator size="small" color={COLORS.bg} />
                  <Text style={styles.scanButtonText}>
                    {t.scan.scanProgress(progress.scanned, progress.total)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.scanButtonText}>
                  {t.scan.scanButton}
                </Text>
              )}
            </Pressable>

            {/* Filter chips */}
            {devices.length > 0 && (
              <View style={styles.filterRow}>
                {(['all', 'ok', 'warning', 'fault'] as FilterType[]).map((f) => (
                  <Pressable
                    key={f}
                    style={[
                      styles.filterChip,
                      filter === f && styles.filterChipActive,
                    ]}
                    onPress={() => setFilter(f)}
                    testID={`scan-filter-chip-${f === 'all' ? 'all' : f === 'ok' ? 'online' : f}`}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filter === f && styles.filterChipTextActive,
                    ]}>
                      {f === 'all' ? t.scan.filterAll :
                       f === 'ok' ? t.scan.filterOnline :
                       f === 'warning' ? t.scan.filterWarning :
                       t.scan.filterFault}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Results header */}
            {devices.length > 0 && (
              <Text style={styles.resultsCount}>
                {t.scan.devicesFound(filteredDevices.length)}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !scanning ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>{'\ud83d\udd0d'}</Text>
              <Text style={styles.emptyText}>{t.scan.noDevices}</Text>
              <Text style={styles.emptyHint}>{t.scan.noDevicesHint}</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <Pressable
            style={styles.manualButton}
            onPress={() => setManualModalVisible(true)}
            testID="manual-connect-open-button"
          >
            <Text style={styles.manualButtonText}>
              + {t.scan.manualConnect}
            </Text>
          </Pressable>
        }
        testID="scan-results-list"
      />

      {/* Toast */}
      {toast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}

      {/* Manual Connect Modal */}
      <Modal
        visible={manualModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setManualModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.scan.manualConnectTitle}</Text>

            <TextInput
              style={styles.modalInput}
              value={manualIp}
              onChangeText={setManualIp}
              placeholder={t.scan.manualIpPlaceholder}
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              autoCapitalize="none"
              autoFocus
              testID="manual-connect-ip-input"
            />
            <TextInput
              style={styles.modalInput}
              value={manualPort}
              onChangeText={setManualPort}
              placeholder={`${t.scan.manualPort}: 5555`}
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalCancel}
                onPress={() => setManualModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>{t.scan.cancelButton || 'Cancel'}</Text>
              </Pressable>
              <Pressable
                style={styles.modalConnect}
                onPress={handleManualConnect}
                disabled={connecting}
                testID="manual-connect-submit-button"
              >
                {connecting ? (
                  <ActivityIndicator size="small" color={COLORS.textInverse} />
                ) : (
                  <Text style={styles.modalConnectText}>{t.scan.connect}</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  listContent: {
    paddingHorizontal: SPACING.screenX,
    paddingBottom: SPACING.xxl,
  },
  screenTitle: {
    fontSize: FONT_SIZES.h1,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  subnetRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SPACING.sm,
    gap: 8,
  },
  subnetInputWrapper: {
    flex: 1,
  },
  subnetLabel: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    marginBottom: 4,
    fontWeight: '500',
  },
  subnetInput: {
    height: 46,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.body,
    fontFamily: 'monospace',
  },
  autoButton: {
    height: 46,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.card2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoButtonText: {
    color: COLORS.scanning,
    fontSize: FONT_SIZES.meta,
    fontWeight: '700',
  },
  scanButton: {
    height: 52,
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  scanButtonScanning: {
    backgroundColor: COLORS.scanning,
  },
  scanButtonPressed: {
    opacity: 0.88,
  },
  scanButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.scanning,
    borderColor: COLORS.scanning,
  },
  filterChipText: {
    fontSize: FONT_SIZES.meta,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  resultsCount: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.h3,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
    lineHeight: 20,
  },
  manualButton: {
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  manualButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  toast: {
    position: 'absolute',
    bottom: 32,
    left: SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
  },
  toastText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.meta,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.bgElevated,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  modalInput: {
    height: 48,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.body,
    fontFamily: 'monospace',
    marginBottom: SPACING.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: SPACING.sm,
  },
  modalCancel: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  modalConnect: {
    flex: 2,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConnectText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
  },
});
