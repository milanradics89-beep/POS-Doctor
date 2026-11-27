import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from './components';
import { modeCopy, type ResultMode } from './resultModel';
import { theme } from './theme';
import { hu } from '../i18n/hu';

type Props = {
  capture: () => void;
  chooseGallery: () => void;
  noticePanel: React.ReactNode;
};

const primaryIntents: ResultMode[] = ['create', 'improve', 'fix', 'cook', 'surprise'];

export function HomeWelcome({ capture, chooseGallery, noticePanel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <BrandMark />
          <Text style={styles.logo}>USEIT</Text>
        </View>
        <View style={styles.brandNote}>
          <View style={styles.brandDot} />
          <Text style={styles.brandNoteText}>{hu.home.brandNote}</Text>
        </View>
      </View>

      <View style={styles.heroBlock}>
        <Text style={styles.kicker}>{hu.home.kicker}</Text>
        <Text accessibilityRole="header" style={styles.hero}>{hu.home.headline}</Text>
        <Text style={styles.description}>{hu.home.description}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={hu.home.captureTitle}
        accessibilityHint={hu.home.captureHint}
        onPress={capture}
        style={({ pressed }) => [styles.captureCard, pressed && styles.capturePressed]}
      >
        <View style={styles.captureHeader}>
          <Text style={styles.captureEyebrow}>01  /  INDULÁS</Text>
          <Text style={styles.captureArrow}>↗</Text>
        </View>
        <View style={styles.possibilityFrame}>
          <View style={[styles.frameCorner, styles.frameTopLeft]} />
          <View style={[styles.frameCorner, styles.frameTopRight]} />
          <View style={[styles.frameCorner, styles.frameBottomLeft]} />
          <View style={[styles.frameCorner, styles.frameBottomRight]} />
          <View style={styles.cameraLens}>
            <View style={styles.cameraLensInner} />
          </View>
          <View style={styles.frameSpark} />
        </View>
        <Text style={styles.captureTitle}>{hu.home.captureTitle}</Text>
        <Text style={styles.captureHint}>{hu.home.captureHint}</Text>
        <View style={styles.captureFooter}>
          <Text style={styles.captureFooterText}>FOTÓ → FELFEDEZÉS → CSELEKVÉS</Text>
          <View style={styles.captureFooterMark}><Text style={styles.captureFooterArrow}>→</Text></View>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={hu.home.galleryTitle}
        accessibilityHint={hu.home.galleryHint}
        onPress={chooseGallery}
        style={({ pressed }) => [styles.galleryCard, pressed && styles.galleryPressed]}
      >
        <View style={styles.galleryIcon}><Text style={styles.galleryGlyph}>▧</Text></View>
        <View style={styles.galleryCopy}>
          <Text style={styles.galleryTitle}>{hu.home.galleryTitle}</Text>
          <Text style={styles.galleryHint}>{hu.home.galleryHint}</Text>
        </View>
        <Text style={styles.galleryArrow}>↗</Text>
      </Pressable>

      {noticePanel}

      <View style={styles.privacy}>
        <View style={styles.privacyMark}><Text style={styles.privacyGlyph}>⌑</Text></View>
        <Text style={styles.privacyText}>{hu.home.privacy}</Text>
      </View>

      <View style={styles.examplesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{hu.home.examplesTitle}</Text>
          <Text style={styles.sectionMeta}>{hu.home.intentCaption}</Text>
        </View>
        <View style={styles.exampleGrid}>
          {hu.home.examples.map((item, index) => (
            <View key={item.title} style={[styles.example, index === 0 && styles.exampleWide]}>
              <Text style={styles.exampleNumber}>{String(index + 1).padStart(2, '0')}</Text>
              <Text style={styles.exampleTitle}>{item.title}</Text>
              <Text style={styles.exampleDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.intentChips}>
          {primaryIntents.map((intent) => (
            <View key={intent} style={styles.intentChip}>
              <Text style={styles.intentChipText}>{modeCopy[intent].title}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: theme.spacing.xl, paddingBottom: theme.spacing.section },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: { color: theme.colors.ink, fontSize: 24, lineHeight: 28, fontWeight: '900', letterSpacing: -1.4 },
  brandNote: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: theme.radius.pill, borderWidth: 1, borderColor: theme.colors.line, paddingHorizontal: 10, paddingVertical: 7 },
  brandDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.accentDark },
  brandNoteText: { color: theme.colors.muted, fontSize: 9, letterSpacing: 0.8, fontWeight: '800' },
  heroBlock: { gap: 10, paddingTop: 8 },
  kicker: { color: theme.colors.accentDark, fontSize: 10, fontWeight: '900', letterSpacing: 1.6 },
  hero: { color: theme.colors.ink, fontSize: 48, lineHeight: 52, fontWeight: '900', letterSpacing: -2.7 },
  description: { color: theme.colors.muted, fontSize: 16, lineHeight: 24, maxWidth: 460 },
  captureCard: { backgroundColor: theme.colors.ink, borderRadius: 28, padding: 22, borderWidth: 1, borderColor: theme.colors.ink, overflow: 'hidden' },
  capturePressed: { opacity: 0.88, transform: [{ scale: 0.992 }] },
  captureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  captureEyebrow: { color: theme.colors.captureTextMuted, fontSize: 10, letterSpacing: 1.4, fontWeight: '800' },
  captureArrow: { color: theme.colors.accent, fontSize: 21, fontWeight: '700' },
  possibilityFrame: { width: 110, height: 92, alignSelf: 'center', marginTop: 13, marginBottom: 15, alignItems: 'center', justifyContent: 'center' },
  frameCorner: { position: 'absolute', width: 20, height: 20, borderColor: theme.colors.accent, borderWidth: 2 },
  frameTopLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  frameTopRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  frameBottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  frameBottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  cameraLens: { width: 52, height: 52, borderRadius: 18, borderWidth: 2, borderColor: theme.colors.captureTextMuted, alignItems: 'center', justifyContent: 'center' },
  cameraLensInner: { width: 22, height: 22, borderRadius: 11, backgroundColor: theme.colors.accent },
  frameSpark: { position: 'absolute', right: 17, top: 15, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent },
  captureTitle: { color: theme.colors.surface, fontSize: 22, lineHeight: 28, fontWeight: '900', textAlign: 'center' },
  captureHint: { color: theme.colors.captureTextMuted, fontSize: 13, lineHeight: 19, marginTop: 3, textAlign: 'center' },
  captureFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#424B43' },
  captureFooterText: { color: theme.colors.captureTextMuted, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  captureFooterMark: { width: 29, height: 29, borderRadius: 15, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  captureFooterArrow: { color: theme.colors.ink, fontSize: 16, fontWeight: '900' },
  galleryCard: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.line, padding: 15 },
  galleryPressed: { backgroundColor: theme.colors.surfaceMuted },
  galleryIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  galleryGlyph: { color: theme.colors.ink, fontSize: 23 },
  galleryCopy: { flex: 1, minWidth: 0, gap: 3 },
  galleryTitle: { color: theme.colors.ink, fontSize: 15, fontWeight: '800' },
  galleryHint: { color: theme.colors.muted, fontSize: 12, lineHeight: 17 },
  galleryArrow: { color: theme.colors.subtle, fontSize: 20, fontWeight: '700' },
  privacy: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingHorizontal: 2 },
  privacyMark: { width: 23, height: 23, borderRadius: 8, backgroundColor: theme.colors.mint, alignItems: 'center', justifyContent: 'center' },
  privacyGlyph: { color: theme.colors.accentDark, fontSize: 15, fontWeight: '800' },
  privacyText: { color: theme.colors.muted, flex: 1, fontSize: 11, lineHeight: 17 },
  examplesSection: { gap: 13, marginTop: 2 },
  sectionHeader: { gap: 5 },
  sectionTitle: { color: theme.colors.ink, fontSize: 21, lineHeight: 26, fontWeight: '900', letterSpacing: -0.6 },
  sectionMeta: { color: theme.colors.accentDark, fontSize: 9, letterSpacing: 1.1, fontWeight: '900' },
  exampleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  example: { flexGrow: 1, flexBasis: '47%', minWidth: 140, backgroundColor: theme.colors.surface, borderRadius: 17, padding: 13, borderWidth: 1, borderColor: theme.colors.line, gap: 6 },
  exampleWide: { flexBasis: '100%' },
  exampleNumber: { color: theme.colors.accentDark, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  exampleTitle: { color: theme.colors.ink, fontSize: 15, lineHeight: 19, fontWeight: '800' },
  exampleDescription: { color: theme.colors.muted, fontSize: 12, lineHeight: 18 },
  intentChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 4 },
  intentChip: { borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.pill, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: theme.colors.surface },
  intentChipText: { color: theme.colors.muted, fontSize: 10, fontWeight: '700' },
});
