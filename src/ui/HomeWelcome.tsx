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

function ExampleIllustration({ variant, label }: { variant: 0 | 1 | 2; label: string }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.scene, variant === 0 ? styles.foodScene : variant === 1 ? styles.roomScene : styles.repairScene]}
    >
      {variant === 0 ? (
        <>
          <View style={styles.fridgeBody}>
            <View style={styles.fridgeFreezer} />
            <View style={styles.fridgeDivider} />
            <View style={styles.fridgeShelf} />
            <View style={[styles.foodItem, styles.foodTomato]} />
            <View style={[styles.foodItem, styles.foodLemon]} />
            <View style={[styles.foodItem, styles.foodLeaf]} />
            <View style={styles.fridgeHandle} />
          </View>
          <View style={styles.sceneTag}><Text style={styles.sceneTagText}>{label}</Text></View>
        </>
      ) : variant === 1 ? (
        <>
          <View style={styles.roomPicture}><View style={styles.pictureSun} /><View style={styles.pictureHill} /></View>
          <View style={styles.roomSofaBack} />
          <View style={styles.roomSofaSeat} />
          <View style={styles.roomSofaLegLeft} />
          <View style={styles.roomSofaLegRight} />
          <View style={styles.roomPlantPot} />
          <View style={styles.roomPlantStem} />
          <View style={styles.roomPlantLeaf} />
          <View style={styles.roomLampShade} />
          <View style={styles.roomLampStem} />
          <View style={styles.sceneTag}><Text style={styles.sceneTagText}>{label}</Text></View>
        </>
      ) : (
        <>
          <View style={styles.toolBoard}>
            <View style={styles.toolScrewdriverHandle} />
            <View style={styles.toolScrewdriverShaft} />
            <View style={styles.toolWrenchJaw} />
            <View style={styles.toolWrenchNeck} />
            <View style={styles.toolWrenchGrip} />
            <View style={styles.toolBolt} />
          </View>
          <View style={styles.sceneTag}><Text style={styles.sceneTagText}>{label}</Text></View>
        </>
      )}
    </View>
  );
}

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
          <Text style={styles.captureEyebrow}>{hu.home.captureEyebrow}</Text>
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
          <Text style={styles.captureFooterText}>{hu.home.captureFooter}</Text>
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
              <ExampleIllustration variant={index as 0 | 1 | 2} label={hu.home.sceneTags[index]} />
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
  brandNoteText: { color: theme.colors.muted, fontSize: 11, letterSpacing: 0.5, fontWeight: '800' },
  heroBlock: { gap: 10, paddingTop: 8 },
  kicker: { color: theme.colors.accentDark, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  hero: { color: theme.colors.ink, fontSize: 48, lineHeight: 52, fontWeight: '900', letterSpacing: -2.7 },
  description: { color: theme.colors.muted, fontSize: 16, lineHeight: 24, maxWidth: 460 },
  captureCard: { backgroundColor: theme.colors.ink, borderRadius: 28, padding: 22, borderWidth: 1, borderColor: theme.colors.ink, overflow: 'hidden' },
  capturePressed: { opacity: 0.88, transform: [{ scale: 0.992 }] },
  captureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  captureEyebrow: { color: theme.colors.captureTextMuted, fontSize: 11, letterSpacing: 1, fontWeight: '800' },
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
  captureHint: { color: theme.colors.captureTextMuted, fontSize: 14, lineHeight: 20, marginTop: 3, textAlign: 'center' },
  captureFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#424B43' },
  captureFooterText: { color: theme.colors.captureTextMuted, fontSize: 11, fontWeight: '800', letterSpacing: 0.6, flexShrink: 1 },
  captureFooterMark: { width: 29, height: 29, borderRadius: 15, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  captureFooterArrow: { color: theme.colors.ink, fontSize: 16, fontWeight: '900' },
  galleryCard: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.line, padding: 15 },
  galleryPressed: { backgroundColor: theme.colors.surfaceMuted },
  galleryIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  galleryGlyph: { color: theme.colors.ink, fontSize: 23 },
  galleryCopy: { flex: 1, minWidth: 0, gap: 3 },
  galleryTitle: { color: theme.colors.ink, fontSize: 15, fontWeight: '800' },
  galleryHint: { color: theme.colors.muted, fontSize: 13, lineHeight: 18 },
  galleryArrow: { color: theme.colors.subtle, fontSize: 20, fontWeight: '700' },
  privacy: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingHorizontal: 2 },
  privacyMark: { width: 23, height: 23, borderRadius: 8, backgroundColor: theme.colors.mint, alignItems: 'center', justifyContent: 'center' },
  privacyGlyph: { color: theme.colors.accentDark, fontSize: 15, fontWeight: '800' },
  privacyText: { color: theme.colors.muted, flex: 1, fontSize: 12, lineHeight: 18 },
  examplesSection: { gap: 13, marginTop: 2 },
  sectionHeader: { gap: 5 },
  sectionTitle: { color: theme.colors.ink, fontSize: 21, lineHeight: 26, fontWeight: '900', letterSpacing: -0.6 },
  sectionMeta: { color: theme.colors.accentDark, fontSize: 11, letterSpacing: 0.7, fontWeight: '900' },
  exampleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  example: { flexGrow: 1, flexBasis: '47%', minWidth: 140, backgroundColor: theme.colors.surface, borderRadius: 19, padding: 12, borderWidth: 1, borderColor: theme.colors.line, gap: 7 },
  scene: { width: '100%', height: 104, borderRadius: 13, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  foodScene: { backgroundColor: '#E8EBDD' },
  fridgeBody: { width: 74, height: 86, borderRadius: 11, backgroundColor: '#F8F8F2', borderWidth: 1, borderColor: '#C7CDC1', position: 'relative', overflow: 'hidden' },
  fridgeFreezer: { position: 'absolute', top: 0, left: 0, right: 0, height: 19, backgroundColor: '#E5E9E0' },
  fridgeDivider: { position: 'absolute', top: 19, left: 0, right: 0, height: 2, backgroundColor: '#C7CDC1' },
  fridgeShelf: { position: 'absolute', top: 49, left: 5, right: 5, height: 2, backgroundColor: '#C7CDC1' },
  foodItem: { position: 'absolute', width: 13, height: 13, borderRadius: 7, bottom: 23 },
  foodTomato: { left: 10, backgroundColor: '#D86F50' },
  foodLemon: { left: 29, backgroundColor: '#EACB62', width: 15, height: 12 },
  foodLeaf: { right: 9, backgroundColor: '#77936B', width: 14, height: 15, borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
  fridgeHandle: { position: 'absolute', right: 5, top: 28, width: 3, height: 13, borderRadius: 2, backgroundColor: '#A8B0A4' },
  roomScene: { backgroundColor: '#EEE6DC' },
  roomPicture: { position: 'absolute', top: 12, left: '34%', width: 55, height: 42, borderRadius: 5, backgroundColor: '#FAF6ED', borderWidth: 3, borderColor: '#FFFFFF', overflow: 'hidden' },
  pictureSun: { position: 'absolute', top: 7, right: 10, width: 12, height: 12, borderRadius: 6, backgroundColor: '#E7C57D' },
  pictureHill: { position: 'absolute', bottom: -8, left: -5, width: 58, height: 26, borderRadius: 20, backgroundColor: '#A3B29A', transform: [{ rotate: '-12deg' }] },
  roomSofaBack: { position: 'absolute', bottom: 30, left: '22%', width: 112, height: 31, borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: '#758A79' },
  roomSofaSeat: { position: 'absolute', bottom: 22, left: '18%', width: 122, height: 17, borderRadius: 8, backgroundColor: '#657C6A' },
  roomSofaLegLeft: { position: 'absolute', bottom: 12, left: '26%', width: 5, height: 12, backgroundColor: '#8A725E', borderRadius: 2 },
  roomSofaLegRight: { position: 'absolute', bottom: 12, right: '26%', width: 5, height: 12, backgroundColor: '#8A725E', borderRadius: 2 },
  roomPlantPot: { position: 'absolute', bottom: 11, left: 12, width: 18, height: 17, backgroundColor: '#C58E67', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 },
  roomPlantStem: { position: 'absolute', bottom: 26, left: 20, width: 2, height: 25, backgroundColor: '#58765D', transform: [{ rotate: '10deg' }] },
  roomPlantLeaf: { position: 'absolute', bottom: 43, left: 10, width: 15, height: 9, backgroundColor: '#78916E', borderRadius: 10, transform: [{ rotate: '-32deg' }] },
  roomLampShade: { position: 'absolute', top: 18, right: 13, width: 23, height: 18, backgroundColor: '#E2C989', borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  roomLampStem: { position: 'absolute', top: 35, right: 23, width: 2, height: 30, backgroundColor: '#8C8270' },
  repairScene: { backgroundColor: '#E4E9E7' },
  toolBoard: { width: 140, height: 78, borderRadius: 15, backgroundColor: '#D5DED8', borderWidth: 1, borderColor: '#C0CBC3', position: 'relative' },
  toolScrewdriverHandle: { position: 'absolute', top: 30, left: 24, width: 17, height: 34, borderRadius: 7, backgroundColor: '#D88A55', transform: [{ rotate: '32deg' }] },
  toolScrewdriverShaft: { position: 'absolute', top: 19, left: 43, width: 5, height: 35, borderRadius: 2, backgroundColor: '#687773', transform: [{ rotate: '32deg' }] },
  toolWrenchJaw: { position: 'absolute', top: 14, right: 28, width: 22, height: 22, borderWidth: 5, borderColor: '#6F817B', borderRadius: 10, borderBottomColor: 'transparent', transform: [{ rotate: '38deg' }] },
  toolWrenchNeck: { position: 'absolute', top: 30, right: 35, width: 6, height: 26, borderRadius: 3, backgroundColor: '#6F817B', transform: [{ rotate: '38deg' }] },
  toolWrenchGrip: { position: 'absolute', bottom: 11, right: 31, width: 17, height: 8, borderRadius: 4, backgroundColor: '#6F817B', transform: [{ rotate: '38deg' }] },
  toolBolt: { position: 'absolute', top: 15, left: 20, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accentDark },
  sceneTag: { position: 'absolute', bottom: 7, right: 7, borderRadius: theme.radius.pill, backgroundColor: 'rgba(255,255,255,0.78)', paddingHorizontal: 8, paddingVertical: 4 },
  sceneTagText: { color: theme.colors.ink, fontSize: 11, fontWeight: '900', letterSpacing: 0.6 },
  exampleWide: { flexBasis: '100%' },
  exampleNumber: { color: theme.colors.accentDark, fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  exampleTitle: { color: theme.colors.ink, fontSize: 15, lineHeight: 19, fontWeight: '800' },
  exampleDescription: { color: theme.colors.muted, fontSize: 12, lineHeight: 18 },
  intentChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 4 },
  intentChip: { borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.pill, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: theme.colors.surface },
  intentChipText: { color: theme.colors.muted, fontSize: 11, fontWeight: '700' },
});
