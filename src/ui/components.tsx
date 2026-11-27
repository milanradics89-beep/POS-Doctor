import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, ActivityIndicator, Animated, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';
import { formatProductPrice, productCardAccessibilityLabel } from './productAccessibility';
import { hu } from '../i18n/hu';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.brandMark, compact && styles.brandMarkCompact]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.brandDot} />
      <View style={styles.brandDotSmall} />
    </View>
  );
}

export function PhotoFrame({ uri, label, eyebrow, imageHeight = 330 }: {
  uri: string;
  label: string;
  eyebrow: string;
  imageHeight?: number;
}) {
  return (
    <View style={styles.photoFrame}>
      <View style={styles.photoFrameHeader} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={styles.photoFrameAccent} />
        <Text style={styles.photoFrameEyebrow}>{eyebrow}</Text>
      </View>
      <Image
        accessible
        accessibilityLabel={label}
        resizeMode="contain"
        source={{ uri }}
        style={[styles.photoFrameImage, { height: imageHeight }]}
      />
    </View>
  );
}

export function ProductCard({ title, category, source, price, currency, onPress }: {
  title: string; category: string; source: string; price?: number; currency?: string; onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'link' : 'text'}
      accessibilityLabel={productCardAccessibilityLabel({ title, category, source, price, currency, actionable: Boolean(onPress) })}
      accessibilityHint={onPress ? hu.common.productHint : hu.common.productUnavailableHint}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.product, pressed && styles.pressed]}
    >
      <View style={styles.productHeader}>
        <View style={styles.productMark} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><Text style={styles.productMarkText}>✳</Text></View>
        <Text style={styles.productMeta}>{category} · {source}</Text>
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      <View style={styles.productFooter}>
        <Text style={styles.price}>{formatProductPrice(price, currency)}</Text>
        {onPress ? <Text style={styles.link}>Termék megnyitása ↗</Text> : null}
      </View>
    </Pressable>
  );
}

export function StatePanel({ kind, title, description, actionLabel, actionAccessibilityHint, onAction }: {
  kind: 'loading' | 'empty' | 'error' | 'offline' | 'permission-denied' | 'success';
  title: string;
  description: string;
  actionLabel?: string;
  actionAccessibilityHint?: string;
  onAction?: () => void;
}) {
  const isAlert = kind === 'error' || kind === 'offline' || kind === 'permission-denied';
  const isWarning = kind === 'offline' || kind === 'permission-denied';
  const accent = kind === 'error' ? theme.colors.danger : isWarning ? theme.colors.accentDark : theme.colors.ink;
  const symbol = kind === 'error' ? '!' : kind === 'offline' ? '⌁' : kind === 'permission-denied' ? '◈' : kind === 'empty' ? '＋' : '✳';

  useEffect(() => {
    // React Native's live-region announcement is not consistently exposed by iOS VoiceOver.
    // Announce the status explicitly while leaving the nested recovery Pressable independently accessible.
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(`${title}. ${description}`);
    }
  }, [kind, title, description]);

  return (
    <View
      accessibilityRole={kind === 'loading' ? 'progressbar' : isAlert ? 'alert' : 'summary'}
      accessibilityLabel={`${title}. ${description}`}
      accessibilityLiveRegion={kind === 'loading' ? 'polite' : isAlert ? 'assertive' : 'none'}
      style={[
        styles.statePanel,
        kind === 'error' && styles.errorPanel,
        isWarning && styles.warningPanel,
      ]}
    >
      {kind === 'loading' ? (
        <ActivityIndicator size="large" color={accent} />
      ) : (
        <View
          style={[styles.stateIcon, kind === 'error' && styles.errorIcon, isWarning && styles.warningIcon]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <Text style={[styles.stateSymbol, { color: accent }]}>{symbol}</Text>
        </View>
      )}
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateDescription}>{description}</Text>
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          accessibilityHint={actionAccessibilityHint?.trim() || hu.common.recoveryHint}
          onPress={onAction}
          style={({ pressed }) => [styles.stateAction, pressed && styles.pressed]}
        >
          <Text style={styles.stateActionText}>{actionLabel} ↗</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function FadeIn({ children, delay = 0 }: React.PropsWithChildren<{ delay?: number }>) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    let receivedLivePreference = false;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      receivedLivePreference = true;
      setReduceMotion(enabled);
    });

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active && !receivedLivePreference) setReduceMotion(enabled);
      })
      .catch(() => {
        if (active && !receivedLivePreference) setReduceMotion(false);
      });

    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;
    if (reduceMotion) {
      opacity.setValue(1);
      translateY.setValue(0);
      return;
    }

    opacity.setValue(0);
    translateY.setValue(12);
    const animation = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 360, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 360, delay, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [delay, opacity, reduceMotion, translateY]);

  return <Animated.View style={{ opacity, transform: [{ translateY }] }}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  photoFrame: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.xl, padding: 10, gap: 9 },
  photoFrameHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4, minHeight: 18 },
  photoFrameAccent: { width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.accentDark },
  photoFrameEyebrow: { color: theme.colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  photoFrameImage: { width: '100%', backgroundColor: theme.colors.surfaceMuted, borderRadius: theme.radius.md },
  brandMark: { width: 25, height: 25, borderRadius: 9, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center' },
  brandMarkCompact: { width: 21, height: 21, borderRadius: 7 },
  brandDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent, position: 'absolute', top: 5, left: 5 },
  brandDotSmall: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.surface, position: 'absolute', bottom: 5, right: 5 },
  product: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 18, padding: 16, marginBottom: 10 },
  productHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  productMark: { width: 24, height: 24, borderRadius: 8, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  productMarkText: { color: theme.colors.ink, fontSize: 15 },
  productMeta: { flex: 1, color: theme.colors.muted, fontSize: 13, lineHeight: 18 },
  productTitle: { color: theme.colors.ink, fontSize: 19, lineHeight: 25, fontWeight: '700', marginVertical: 10 },
  productFooter: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: theme.colors.line, paddingTop: 10 },
  price: { color: theme.colors.ink, fontSize: 15, fontWeight: '800', flexShrink: 1 },
  link: { color: theme.colors.accentDark, fontSize: 13, fontWeight: '700' },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  statePanel: { alignItems: 'center', padding: 24, borderRadius: 22, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line },
  errorPanel: { backgroundColor: theme.colors.errorSurface, borderColor: theme.colors.errorBorder },
  warningPanel: { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.controlBorder },
  warningIcon: { backgroundColor: theme.colors.peach },
  stateIcon: { width: 48, height: 48, borderRadius: 17, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  errorIcon: { backgroundColor: theme.colors.errorIconSurface },
  stateSymbol: { fontSize: 23, fontWeight: '800' },
  stateTitle: { color: theme.colors.ink, fontSize: 17, fontWeight: '800', marginTop: 15, textAlign: 'center' },
  stateDescription: { color: theme.colors.muted, fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  stateAction: { marginTop: 17, backgroundColor: theme.colors.ink, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 13 },
  stateActionText: { color: theme.colors.surface, fontSize: 12, lineHeight: 16, fontWeight: '900', letterSpacing: 0.5 },
});
