/**
 * TopNav Component
 * Header with back button, title, and EN/HU language toggle
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { COLORS, SPACING, FONT_SIZES, TOUCH_TARGET } from '../theme';

interface TopNavProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  showHistory?: boolean;
  onHistory?: () => void;
}

export function TopNav({ title, onBack, showBack = false, showHistory = false, onHistory }: TopNavProps) {
  const { lang, t, setLang } = useLanguage();

  return (
    <View style={styles.container} testID="top-nav">
      {/* Left: Back or Logo */}
      <View style={styles.left}>
        {showBack && onBack ? (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            testID="top-nav-back-button"
            accessibilityLabel={t.nav.back}
            hitSlop={8}
          >
            <Text style={styles.backChevron}>{'\u2190'}</Text>
            <Text style={styles.backText}>{t.nav.back}</Text>
          </Pressable>
        ) : (
          <View style={styles.logoRow}>
            <Text style={styles.logoIcon}>{'♥'}</Text>
            <Text style={styles.logoText}>{t.appName}</Text>
          </View>
        )}
      </View>

      {/* Center: Title (when not home) */}
      {showBack && title ? (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : null}

      {/* Right: Language Toggle + History */}
      <View style={styles.right}>
        {showHistory && onHistory && (
          <Pressable
            onPress={onHistory}
            style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}
            testID="top-nav-history-button"
            accessibilityLabel="History"
            hitSlop={8}
          >
            <Text style={styles.historyIcon}>📋</Text>
          </Pressable>
        )}
        <View style={styles.langToggle} testID="top-nav-language-toggle">
          <Pressable
            onPress={() => setLang('en')}
            style={[
              styles.langButton,
              lang === 'en' && styles.langButtonActive,
            ]}
            testID="top-nav-language-en"
            accessibilityLabel="English"
          >
            <Text
              style={[
                styles.langText,
                lang === 'en' && styles.langTextActive,
              ]}
            >
              EN
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLang('hu')}
            style={[
              styles.langButton,
              lang === 'hu' && styles.langButtonActive,
            ]}
            testID="top-nav-language-hu"
            accessibilityLabel="Magyar"
          >
            <Text
              style={[
                styles.langText,
                lang === 'hu' && styles.langTextActive,
              ]}
            >
              HU
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenX,
    backgroundColor: COLORS.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: TOUCH_TARGET,
    minHeight: TOUCH_TARGET,
  },
  pressed: {
    opacity: 0.7,
  },
  backChevron: {
    color: COLORS.scanning,
    fontSize: 18,
    marginRight: 4,
    fontWeight: '600',
  },
  backText: {
    color: COLORS.scanning,
    fontSize: FONT_SIZES.body,
    fontWeight: '500',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 18,
    marginRight: 6,
    color: COLORS.scanning,
  },
  logoText: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
    color: COLORS.textPrimary,
    pointerEvents: 'none',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  historyButton: {
    minWidth: TOUCH_TARGET,
    minHeight: TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyIcon: {
    fontSize: 20,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.card2,
    borderRadius: TOUCH_TARGET,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  langButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: TOUCH_TARGET * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langButtonActive: {
    backgroundColor: COLORS.scanning,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  langTextActive: {
    color: '#fff',
  },
});
