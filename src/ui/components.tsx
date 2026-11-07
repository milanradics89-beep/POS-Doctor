import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.brandMark, compact && styles.brandMarkCompact]}>
      <View style={styles.brandDot} />
      <View style={styles.brandDotSmall} />
    </View>
  );
}

export function SectionHeader({ eyebrow, detail }: { eyebrow: string; detail?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

export function ProductCard({ title, category, source, price, onPress }: {
  title: string; category: string; source: string; price?: number; onPress?: () => void;
}) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.product, pressed && styles.pressed]}>
      <View style={styles.productMark}><Text style={styles.productMarkText}>✳</Text></View>
      <View style={styles.productCopy}>
        <Text style={styles.productTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.productMeta} numberOfLines={1}>{category} · {source}</Text>
      </View>
      <View style={styles.productPrice}>
        {typeof price === 'number' ? <Text style={styles.price}>{price.toLocaleString('hu-HU')} Ft</Text> : null}
        {onPress ? <Text style={styles.link}>VIEW ↗</Text> : <Text style={styles.unavailable}>DETAILS UNAVAILABLE</Text>}
      </View>
    </Pressable>
  );
}

export function StatePanel({ kind, title, description, actionLabel, onAction }: {
  kind: 'empty' | 'error' | 'success'; title: string; description: string; actionLabel?: string; onAction?: () => void;
}) {
  const accent = kind === 'error' ? theme.colors.danger : theme.colors.ink;
  return (
    <View accessibilityRole="summary" style={[styles.statePanel, kind === 'error' && styles.errorPanel]}>
      <View style={[styles.stateIcon, kind === 'error' && styles.errorIcon]}><Text style={[styles.stateSymbol, { color: accent }]}>{kind === 'error' ? '!' : kind === 'empty' ? '＋' : '✳'}</Text></View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateDescription}>{description}</Text>
      {actionLabel && onAction ? <Pressable accessibilityRole="button" onPress={onAction} style={styles.stateAction}><Text style={styles.stateActionText}>{actionLabel} ↗</Text></Pressable> : null}
    </View>
  );
}

export function FadeIn({ children, delay = 0 }: React.PropsWithChildren<{ delay?: number }>) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 360, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 360, delay, useNativeDriver: true }),
    ]).start();
  }, [delay, opacity, translateY]);
  return <Animated.View style={{ opacity, transform: [{ translateY }] }}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  brandMark: { width: 25, height: 25, borderRadius: 9, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center' },
  brandMarkCompact: { width: 21, height: 21, borderRadius: 7 },
  brandDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent, position: 'absolute', top: 5, left: 5 },
  brandDotSmall: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.surface, position: 'absolute', bottom: 5, right: 5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 10 },
  eyebrow: { color: theme.colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.6 },
  detail: { color: theme.colors.subtle, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  product: { minHeight: 76, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 18, padding: 12, marginBottom: 9, flexDirection: 'row', alignItems: 'center' },
  productMark: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  productMarkText: { color: theme.colors.ink, fontSize: 20 },
  productCopy: { flex: 1, paddingHorizontal: 12 },
  productTitle: { color: theme.colors.ink, fontSize: 12, lineHeight: 17, fontWeight: '800' },
  productMeta: { color: theme.colors.subtle, fontSize: 10, marginTop: 5 },
  productPrice: { alignItems: 'flex-end' },
  price: { color: theme.colors.ink, fontSize: 11, fontWeight: '900' },
  link: { color: theme.colors.accentDark, fontSize: 8, fontWeight: '900', letterSpacing: 0.8, marginTop: 5 },
  unavailable: { color: theme.colors.subtle, fontSize: 7, fontWeight: '800', letterSpacing: 0.35, marginTop: 5 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  statePanel: { alignItems: 'center', padding: 24, borderRadius: 22, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line },
  errorPanel: { backgroundColor: theme.colors.errorSurface, borderColor: theme.colors.errorBorder },
  stateIcon: { width: 48, height: 48, borderRadius: 17, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  errorIcon: { backgroundColor: theme.colors.errorIconSurface },
  stateSymbol: { fontSize: 23, fontWeight: '800' },
  stateTitle: { color: theme.colors.ink, fontSize: 17, fontWeight: '800', marginTop: 15, textAlign: 'center' },
  stateDescription: { color: theme.colors.muted, fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  stateAction: { marginTop: 17, backgroundColor: theme.colors.ink, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 13 },
  stateActionText: { color: theme.colors.surface, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
});
