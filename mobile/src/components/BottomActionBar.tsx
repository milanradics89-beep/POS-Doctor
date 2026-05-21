/**
 * BottomActionBar Component
 * Sticky bottom bar for the Diagnostics screen
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, RADIUS, TOUCH_TARGET } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomActionBarProps {
  onRerun: () => void;
  onExport: () => void;
  running: boolean;
  hasResults: boolean;
}

export function BottomActionBar({ onRerun, onExport, running, hasResults }: BottomActionBarProps) {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Re-run button (primary) */}
      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          (running) && styles.primaryButtonDisabled,
          pressed && !running && styles.primaryButtonPressed,
        ]}
        onPress={onRerun}
        disabled={running}
        testID="diagnostics-rerun-button"
        accessibilityRole="button"
      >
        {running ? (
          <ActivityIndicator size="small" color={COLORS.textInverse} />
        ) : (
          <Text style={styles.primaryButtonText}>
            {running
              ? t.diagnostics.running
              : hasResults
              ? t.diagnostics.rerunButton
              : t.diagnostics.runButton
            }
          </Text>
        )}
      </Pressable>

      {/* Export button (secondary) */}
      {hasResults && (
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={onExport}
          testID="diagnostics-export-button"
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>
            {'📄'} {t.diagnostics.exportButton}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenX,
    paddingVertical: SPACING.sm + 2,
    backgroundColor: COLORS.bgElevated,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
    ...Platform.select({
      ios: {
        paddingBottom: SPACING.xl,
      },
    }),
  },
  primaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 48,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: TOUCH_TARGET * 2.5,
  },
  secondaryButtonPressed: {
    backgroundColor: COLORS.bgElevated,
    opacity: 0.85,
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.meta,
    fontWeight: '600',
  },
});
