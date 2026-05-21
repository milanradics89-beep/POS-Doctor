/**
 * HistoryScreen
 * Past diagnostic sessions for this device
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TopNav } from '../components/TopNav';
import { StatusBadge } from '../components/StatusBadge';
import { CollapsibleCard } from '../components/CollapsibleCard';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';
import { loadHistory, clearHistory } from '../storage';
import type { HistoryEntry } from '../storage';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

// Default device key - will be replaced with actual device serial when native module is implemented
const DEVICE_KEY = 'this-device';

export default function HistoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();

  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  useEffect(() => {
    reload();
  }, []);

  const reload = useCallback(async () => {
    const history = await loadHistory(DEVICE_KEY);
    setEntries(history);
  }, []);

  const handleClearAll = () => {
    Alert.alert(
      t.history.deleteAll,
      t.history.confirmDelete,
      [
        { text: t.history.no, style: 'cancel' },
        {
          text: t.history.yes,
          style: 'destructive',
          onPress: async () => {
            await clearHistory(DEVICE_KEY);
            setEntries([]);
            setSelectedEntry(null);
          },
        },
      ]
    );
  };

  const renderEntry = ({ item }: { item: HistoryEntry }) => {
    const isSelected = selectedEntry?.id === item.id;
    const date = new Date(item.timestamp).toLocaleString();
    const score = item.report.overallScore;
    const status = item.report.overallStatus;

    // Fault categories for brief note
    const faultCategories = item.report.categories
      .filter((c) => c.status === 'fault' || c.status === 'warning')
      .map((c) => c.title)
      .slice(0, 2)
      .join(', ');

    return (
      <View style={styles.entryWrapper} testID="history-list-item">
        <Pressable
          style={({ pressed }) => [
            styles.entryHeader,
            isSelected && styles.entryHeaderSelected,
            pressed && styles.entryHeaderPressed,
          ]}
          onPress={() => setSelectedEntry(isSelected ? null : item)}
          testID="history-open-session-button"
        >
          <View style={styles.entryLeft}>
            <Text style={styles.entryDate}>{date}</Text>
            {faultCategories ? (
              <Text style={styles.entryNote} numberOfLines={1}>
                {faultCategories}
              </Text>
            ) : null}
          </View>
          <View style={styles.entryRight}>
            <Text style={[
              styles.entryScore,
              { color: score >= 80 ? COLORS.ok : score >= 60 ? COLORS.warning : COLORS.fault },
            ]}>
              {score}%
            </Text>
            <StatusBadge status={status} size="sm" />
            <Text style={styles.chevron}>{isSelected ? '\u25bc' : '\u25ba'}</Text>
          </View>
        </Pressable>

        {/* Expanded detail */}
        {isSelected && (
          <View style={styles.entryDetail}>
            {item.report.categories.map((cat) => (
              <CollapsibleCard
                key={cat.id}
                category={cat}
                initialExpanded={cat.status === 'fault'}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav
        showBack
        onBack={() => navigation.goBack()}
        title={t.history.title}
      />

      <View style={styles.headerRow}>
        <Text style={styles.deviceTitle}>
          {t.history.thisDevice || 'This Device'}
        </Text>
        {entries.length > 0 && (
          <Pressable onPress={handleClearAll}>
            <Text style={styles.clearButton}>{t.history.deleteAll}</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderEntry}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{'\ud83d\udcc2'}</Text>
            <Text style={styles.emptyText}>{t.history.noHistory}</Text>
            <Text style={styles.emptyHint}>{t.history.noHistoryHint}</Text>
          </View>
        }
        testID="history-list"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenX,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  deviceTitle: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  clearButton: {
    color: COLORS.fault,
    fontSize: FONT_SIZES.meta,
    fontWeight: '600',
  },
  listContent: {
    padding: SPACING.screenX,
    paddingBottom: SPACING.xxl,
  },
  entryWrapper: {
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.cardPad,
    minHeight: 60,
  },
  entryHeaderSelected: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  entryHeaderPressed: {
    backgroundColor: COLORS.bgElevated,
  },
  entryLeft: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  entryDate: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  entryNote: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  entryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryScore: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  entryDetail: {
    padding: SPACING.sm,
    backgroundColor: COLORS.bg,
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
});
