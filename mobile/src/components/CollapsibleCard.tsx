/**
 * CollapsibleCard Component
 * Diagnostic category card with header (title + status badge + chevron)
 * Expands to show parsed fields + raw output
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { DiagnosticCategory } from '../adb/DiagnosticCommands';
import { StatusBadge } from './StatusBadge';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

interface CollapsibleCardProps {
  category: DiagnosticCategory;
  initialExpanded?: boolean;
}

export function CollapsibleCard({ category, initialExpanded = false }: CollapsibleCardProps) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [showRaw, setShowRaw] = useState(false);
  const { lang, t } = useLanguage();

  const title = lang === 'hu' ? category.title.hu : category.title.en;
  const summary = lang === 'hu' ? category.summary.hu : category.summary.en;

  // Auto-expand fault categories
  React.useEffect(() => {
    if (category.status === 'fault' || category.status === 'warning') {
      setExpanded(true);
    }
  }, [category.status]);

  return (
    <View style={styles.container}>
      {/* Header - always visible */}
      <Pressable
        style={({ pressed }) => [
          styles.header,
          pressed && styles.headerPressed,
        ]}
        onPress={() => setExpanded(!expanded)}
        testID="diagnostic-card-toggle"
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{title}</Text>
          {!expanded && (
            <Text style={styles.summaryInline} numberOfLines={1}>
              {summary}
            </Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <StatusBadge
            status={category.status}
            size="sm"
            testID="diagnostic-card-status-badge"
          />
          <Text style={[
            styles.chevron,
            expanded && styles.chevronExpanded,
          ]}>
            {'\u203a'}
          </Text>
        </View>
      </Pressable>

      {/* Expanded content */}
      {expanded && (
        <View style={styles.content}>
          {/* Summary */}
          <Text style={styles.summaryExpanded} testID="diagnostic-card-summary">
            {summary}
          </Text>

          {/* Fields */}
          {category.fields.length > 0 && (
            <View style={styles.fieldsContainer}>
              {category.fields.map((field, idx) => (
                <View
                  key={`${field.key}_${idx}`}
                  style={[
                    styles.fieldRow,
                    idx < category.fields.length - 1 && styles.fieldRowBorder,
                  ]}
                  testID="key-value-row"
                >
                  <Text style={styles.fieldKey}>{field.key}</Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      field.status && {
                        color:
                          field.status === 'ok' ? COLORS.ok :
                          field.status === 'warning' ? COLORS.warning :
                          field.status === 'fault' ? COLORS.fault :
                          COLORS.textSecondary,
                      },
                    ]}
                  >
                    {field.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Raw data toggle */}
          <Pressable
            onPress={() => setShowRaw(!showRaw)}
            style={styles.rawToggle}
          >
            <Text style={styles.rawToggleText}>
              {showRaw
                ? `\u25bc ${t.diagnostics.rawData}`
                : `\u25ba ${t.diagnostics.rawData}`}
            </Text>
          </Pressable>

          {showRaw && (
            <ScrollView
              horizontal
              style={styles.rawContainer}
              testID="diagnostic-card-raw-data"
            >
              <Text
                style={styles.rawText}
                selectable
              >
                {category.rawOutput || 'No output'}
              </Text>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.cardPad,
    minHeight: 52,
  },
  headerPressed: {
    backgroundColor: COLORS.bgElevated,
  },
  headerLeft: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  summaryInline: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  chevron: {
    fontSize: 18,
    color: COLORS.textMuted,
    fontWeight: '300',
    transform: [{ rotate: '90deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '270deg' }],
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    padding: SPACING.cardPad,
  },
  summaryExpanded: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 21,
  },
  fieldsContainer: {
    backgroundColor: COLORS.card2,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
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
    textAlign: 'right',
    flex: 1,
  },
  rawToggle: {
    marginBottom: SPACING.xs,
    paddingVertical: 4,
  },
  rawToggleText: {
    fontSize: FONT_SIZES.meta,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  rawContainer: {
    backgroundColor: COLORS.card2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 200,
  },
  rawText: {
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Menlo',
    fontSize: FONT_SIZES.mono,
    color: COLORS.textSecondary,
    padding: 10,
    lineHeight: 18,
  },
});

import { Platform } from 'react-native';
