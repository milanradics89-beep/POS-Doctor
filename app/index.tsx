import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { UseitApiProvider, analyzeForConsumer } from '../src/core/intelligence/apiClient';
import type { OpportunityKind } from '../src/core/intelligence/types';
import type { ConsumerIntent, ConsumerAnalysis } from '../src/core/intelligence/apiClient';
import { permissionDecision } from '../src/core/intelligence/permissionDecision';
import { isSafeExternalHttpUrl } from '../src/core/intelligence/externalLink';
import { BrandMark, FadeIn, ProductCard, SectionHeader, StatePanel } from '../src/ui/components';
import { shouldShowEmptyProductPanel } from '../src/ui/productResultsState';
import { theme } from '../src/ui/theme';
import { requestFailureKind } from '../src/ui/requestFailure';

const API_URL = process.env.EXPO_PUBLIC_USEIT_API_URL || '';

type ScreenNotice = {
  kind: 'error' | 'offline' | 'permission-denied';
  title: string;
  description: string;
  actionLabel?: string;
  actionAccessibilityHint?: string;
  onAction?: () => void;
};

const modes: [OpportunityKind, string][] = [
  ['create', 'Turn what you have into something new.'],
  ['improve', 'Make your space or things better.'],
  ['fix', 'Figure out what to do next.'],
  ['cook', 'Make something from what you have.'],
  ['surprise', 'Show me something I would not think of.'],
];

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [rendered, setRendered] = useState<string | null>(null);
  const [result, setResult] = useState<ConsumerAnalysis | null>(null);
  const [notice, setNotice] = useState<ScreenNotice | null>(null);
  const redesign = result?.redesign ?? result?.phase3?.redesign;

  const reset = () => {
    setPhoto(null);
    setResult(null);
    setRendered(null);
    setNotice(null);
  };

  async function openProductLink(url: string) {
    if (!isSafeExternalHttpUrl(url)) {
      Alert.alert('Product link unavailable', 'This product link cannot be opened safely.');
      return;
    }

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Could not open product link', 'Please try again later.');
    }
  }

  async function analyze(intent?: ConsumerIntent) {
    if (!API_URL) {
      setNotice({
        kind: 'error',
        title: 'USEIT is not connected',
        description: 'The real vision flow needs EXPO_PUBLIC_USEIT_API_URL to be configured.',
      });
      return;
    }

    if (!photo) return;

    setBusy(true);
    setRendered(null);
    setNotice(null);

    try {
      const response = await analyzeForConsumer(
        new UseitApiProvider(API_URL),
        photo,
        intent
      );
      setResult(response);
    } catch (error) {
      const kind = requestFailureKind(error);
      setNotice({
        kind,
        title: kind === 'offline' ? 'No connection' : 'Could not understand the image',
        description: kind === 'offline'
          ? 'Check your internet connection, then retry the analysis.'
          : error instanceof Error
            ? error.message
            : 'Please try again with a clearer photo.',
        actionLabel: 'TRY AGAIN',
        actionAccessibilityHint: 'Retries image analysis for the selected photo.',
        onAction: () => { void analyze(intent); },
      });
    } finally {
      setBusy(false);
    }
  }

  async function createVisualConcept() {
    if (!photo || !redesign) return;

    setRendering(true);
    setNotice(null);

    try {
      const api = new UseitApiProvider(API_URL);

      const products = redesign.products.map((product) => ({
        title: product.title,
        category: product.category,
        priceHuf: product.priceHuf,
        url: product.url,
        id: product.productId,
      }));

      const renderedResult = await api.renderRedesign(
        photo,
        redesign.prompt,
        products
      );

      setRendered(renderedResult.imageDataUrl);
    } catch {
      setNotice({
        kind: 'error',
        title: 'Visual concept failed',
        description: 'The redesign could not be rendered. The selected solution is still available.',
        actionLabel: 'TRY AGAIN',
        actionAccessibilityHint: 'Retries creating the visual concept.',
        onAction: () => { void createVisualConcept(); },
      });
    } finally {
      setRendering(false);
    }
  }

  async function chooseGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const decision = permissionDecision(permission.granted, permission.canAskAgain);
    if (decision !== 'granted') {
      const openSettings = decision === 'open_settings';
      setNotice({
        kind: 'permission-denied',
        title: openSettings ? 'Photos access is disabled' : 'Photos permission needed',
        description: openSettings
          ? 'Enable photo library access in Settings to choose an image.'
          : 'USEIT needs access to a photo you want to explore.',
        actionLabel: openSettings ? 'OPEN SETTINGS' : 'TRY AGAIN',
        actionAccessibilityHint: openSettings
          ? 'Opens system settings so you can enable photo library access.'
          : 'Requests photo library permission again.',
        onAction: () => {
          if (openSettings) void Linking.openSettings();
          else void chooseGallery();
        },
      });
      return;
    }

    setNotice(null);
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (r.canceled) return;

    const a = r.assets[0];

    if (!a.base64) {
      setNotice({
        kind: 'error',
        title: 'Photo unavailable',
        description: 'USEIT could not read this image. Choose the photo again.',
        actionLabel: 'CHOOSE AGAIN',
        onAction: () => { void chooseGallery(); },
      });
      return;
    }

    setNotice(null);
    setPhoto(`data:${a.mimeType || 'image/jpeg'};base64,${a.base64}`);
    setResult(null);
    setRendered(null);
  }

  async function capture() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    const decision = permissionDecision(permission.granted, permission.canAskAgain);
    if (decision !== 'granted') {
      const openSettings = decision === 'open_settings';
      setNotice({
        kind: 'permission-denied',
        title: openSettings ? 'Camera access is disabled' : 'Camera permission needed',
        description: openSettings
          ? 'Enable camera access in Settings to take a photo.'
          : 'USEIT needs camera access to photograph what you want to explore.',
        actionLabel: openSettings ? 'OPEN SETTINGS' : 'TRY AGAIN',
        actionAccessibilityHint: openSettings
          ? 'Opens system settings so you can enable camera access.'
          : 'Requests camera permission again.',
        onAction: () => {
          if (openSettings) void Linking.openSettings();
          else void capture();
        },
      });
      return;
    }

    setNotice(null);
    const r = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
    });

    if (r.canceled) return;

    const a = r.assets[0];

    if (!a.base64) {
      setNotice({
        kind: 'error',
        title: 'Photo unavailable',
        description: 'USEIT could not read the captured image. Try taking it again.',
        actionLabel: 'TAKE AGAIN',
        onAction: () => { void capture(); },
      });
      return;
    }

    setNotice(null);
    setPhoto(`data:${a.mimeType || 'image/jpeg'};base64,${a.base64}`);
    setResult(null);
    setRendered(null);
    setNotice(null);
  }

  const noticePanel = notice ? (
    <StatePanel
      kind={notice.kind}
      title={notice.title}
      description={notice.description}
      actionLabel={notice.actionLabel}
      actionAccessibilityHint={notice.actionAccessibilityHint}
      onAction={notice.onAction}
    />
  ) : null;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.page}>
        {!photo ? (
          <FadeIn delay={40}>
          <>
            <View style={s.brandRow}>
              <BrandMark />
              <Text style={s.logo}>USEIT</Text>
            </View>

            <Text style={s.kicker}>SEE WHAT’S POSSIBLE</Text>

            <Text style={s.hero}>
              Show me what{`\n`}you have.
            </Text>

            <Text style={s.sub}>
              Point your camera at almost anything. USEIT helps you discover what you can do with it.
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Take a photo"
              accessibilityHint="Opens the camera to take a photo for analysis."
              onPress={capture}
              style={s.capture}
            >
              <LinearGradient colors={[theme.colors.ink, theme.colors.captureEnd]} style={s.grad}>
                <Text style={s.cam}>⌾</Text>
                <Text style={s.cta}>SHOW ME</Text>
                <Text style={s.hint}>Take a photo</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Choose a photo from your gallery"
              accessibilityHint="Opens your photo library."
              onPress={chooseGallery}
              style={s.gallery}
            >
              <Text style={s.galleryTitle}>▣  CHOOSE FROM GALLERY</Text>
              <Text style={s.galleryHint}>Use a photo you already have</Text>
            </Pressable>

            <View style={s.categoryHeading}>
              <Text style={s.categoryEyebrow}>START WITH WHAT YOU HAVE</Text>
              <Text style={s.categoryCaption}>A room, an object, a meal or a material.</Text>
            </View>
            <View style={s.categoryGrid}>
              <View style={[s.categoryCard, s.categoryRoom]}>
                <Text style={s.categorySymbol}>⌂</Text>
                <Text style={s.categoryLabel}>ROOMS</Text>
                <Text style={s.categoryDetail}>Spaces to rethink</Text>
              </View>
              <View style={[s.categoryCard, s.categoryObjects]}>
                <Text style={s.categorySymbol}>◈</Text>
                <Text style={s.categoryLabel}>OBJECTS</Text>
                <Text style={s.categoryDetail}>Things with potential</Text>
              </View>
              <View style={[s.categoryCard, s.categoryFood]}>
                <Text style={s.categorySymbol}>✳</Text>
                <Text style={s.categoryLabel}>FOOD</Text>
                <Text style={s.categoryDetail}>Ideas from ingredients</Text>
              </View>
              <View style={[s.categoryCard, s.categoryMaterials]}>
                <Text style={s.categorySymbol}>▧</Text>
                <Text style={s.categoryLabel}>MATERIALS</Text>
                <Text style={s.categoryDetail}>Make something useful</Text>
              </View>
            </View>
            {noticePanel}
          </>
          </FadeIn>
        ) : (
          <>
            <View style={s.top}>
              <View style={s.brandRow}>
                <BrandMark compact />
                <Text style={s.small}>USEIT</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Choose another photo"
                accessibilityHint="Returns to photo selection."
                onPress={reset}
              >
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>

            {rendered ? (
              <>
                <Text style={s.kicker}>YOUR SPACE, REIMAGINED</Text>
                <View style={s.comparison}>
                  <View style={s.comparisonItem}>
                    <Text style={s.comparisonLabel}>BEFORE</Text>
                    <Image source={{ uri: photo }} style={s.comparisonImage} />
                  </View>
                  <View style={s.comparisonItem}>
                    <Text style={s.comparisonLabel}>AFTER</Text>
                    <Image source={{ uri: rendered }} style={s.comparisonImage} />
                  </View>
                </View>
                <Text style={s.disclosure}>
                  {redesign?.disclosure}
                </Text>
              </>
            ) : (
              <Image source={{ uri: photo }} style={s.photo} />
            )}

            {busy ? (
              <FadeIn>
              <StatePanel
                kind="loading"
                title="Understanding your photo"
                description="USEIT is analyzing the image and preparing your next step."
              />
              </FadeIn>
            ) : rendering ? (
              <FadeIn>
              <StatePanel
                kind="loading"
                title="Creating your visual concept"
                description="USEIT is preparing a visual version of the selected redesign."
              />
              </FadeIn>
            ) : result ? (
              <>
                {noticePanel}
                <Text style={s.kicker}>ONE IDEA</Text>

                <Text style={s.title}>
                  {result.hero?.title ||
                    result.intelligence?.action?.title ||
                    'Here is what I found'}
                </Text>

                <Text style={s.sub}>
                  {result.hero?.description ||
                    'USEIT has turned the scene into a concrete next action.'}
                </Text>

                {result.intelligence?.clarificationRequired ? (
                  <View style={s.notice}>
                    <Text style={s.noticeTitle}>ONE THING TO CLARIFY</Text>
                    <Text style={s.noticeText}>
                      I am not confident enough to make a consequential recommendation yet.
                    </Text>
                  </View>
                ) : null}

                <Text style={s.section}>NEXT ACTION</Text>

                <View style={s.action}>
                  <Text style={s.actionType}>
                    {result.intelligence?.action?.type?.toUpperCase() || 'ACTION'}
                  </Text>

                  <Text style={s.actionTitle}>
                    {result.intelligence?.action?.title || 'Next Step'}
                  </Text>

                  <Text style={s.actionMeta}>
                    {result.intelligence?.need?.kind?.toUpperCase() || 'GENERAL'}
                    {' · '}
                    {Math.round((result.intelligence?.intentConfidence || 0) * 100)}% CONFIDENCE
                  </Text>
                </View>

                {redesign ? (
                  <>
                    <SectionHeader eyebrow="REDESIGN SOLUTION" />

                    <View style={s.solution}>
                      <Text style={s.solutionTitle}>
                        {redesign.products.length} selected products
                      </Text>

                      <Text style={s.solutionText}>
                        {redesign.actions
                          .filter((x) => x.type === 'add')
                          .map((x) => x.target)
                          .join(' · ') ||
                          'Existing scene preserved with the selected redesign plan.'}
                      </Text>
                    </View>
                  </>
                ) : null}

                {result.unified?.intent.name !== 'shop' ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Find matching products"
                    accessibilityHint="Searches for products related to the selected photo and recommendation."
                    style={s.primary}
                    onPress={() => { void analyze('shop'); }}
                  >
                    <Text style={s.primaryText}>FIND MATCHING PRODUCTS</Text>
                  </Pressable>
                ) : null}

                {(result.intelligence?.rankedCandidates?.length ?? 0) > 0 ? (
                  <>
                    <SectionHeader eyebrow="MATCHING OPTIONS" />

                    {result.intelligence.rankedCandidates
                      .slice(0, 5)
                      .map((x) => (
                        <ProductCard
                          key={x.id}
                          title={x.title}
                          category={x.brand ? `${x.brand} · ${x.category}` : x.category}
                          source={x.availability && x.availability !== 'unknown' ? `${x.source} · ${x.availability.replace('_', ' ')}` : x.source}
                          price={typeof x.priceHuf === 'number' ? x.priceHuf : undefined}
                          onPress={() => { void openProductLink(x.url); }}
                        />
                      ))}
                  </>
                ) : null}

                {shouldShowEmptyProductPanel(
                  result.unified?.intent.name,
                  result.intelligence?.action?.type,
                  result.intelligence?.rankedCandidates?.length
                ) ? (
                  <StatePanel
                    kind="empty"
                    title="No matching products yet"
                    description="The shopping search is complete, but no safe product match was found. You can still use the next action above."
                    actionLabel="TRY ANOTHER PHOTO"
                    actionAccessibilityHint="Returns to photo selection."
                    onAction={reset}
                  />
                ) : null}

                {redesign ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Create visual concept"
                    accessibilityHint="Generates a visual redesign from the selected photo."
                    style={s.primary}
                    onPress={createVisualConcept}
                  >
                    <Text style={s.primaryText}>CREATE VISUAL CONCEPT</Text>
                  </Pressable>
                ) : null}

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Try another photo"
                  accessibilityHint="Returns to photo selection."
                  style={s.secondary}
                  onPress={reset}
                >
                  <Text style={s.secondaryText}>TRY ANOTHER PHOTO</Text>
                </Pressable>
              </>
            ) : (
              <>
                {noticePanel}
                <Text style={s.title}>What should I do with this?</Text>

                <View style={s.modeIntro}>
                  <Text style={s.categoryEyebrow}>WHAT SHOULD WE DO?</Text>
                  <Text style={s.categoryCaption}>Choose a direction. USEIT will take it from there.</Text>
                </View>
                <View style={s.modeGrid}>
                  {modes.map(([a, b]) => (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${a.toUpperCase()} mode`}
                      accessibilityHint={b}
                      key={a}
                      style={({ pressed }) => [
                        s.mode,
                        a === 'create' ? s.modeCreate : null,
                        a === 'improve' ? s.modeImprove : null,
                        a === 'fix' ? s.modeFix : null,
                        a === 'cook' ? s.modeCook : null,
                        a === 'surprise' ? s.modeSurprise : null,
                        a === 'surprise' ? s.modeWide : null,
                        pressed && s.modePressed,
                      ]}
                      onPress={() => analyze(a)}
                    >
                      <View style={s.modeTop}>
                        <Text style={[s.modeIcon, a === 'surprise' ? s.modeSurpriseForeground : null]}>
                          {a === 'create' ? '✳' : a === 'improve' ? '↗' : a === 'fix' ? '⌁' : a === 'cook' ? '◒' : '✦'}
                        </Text>
                        <Text style={[s.modeArrow, a === 'surprise' ? s.modeSurpriseForeground : null]}>↗</Text>
                      </View>
                      <Text style={[s.modeTitle, a === 'surprise' ? s.modeSurpriseForeground : null]}>{a.toUpperCase()}</Text>
                      <Text style={[s.modeDesc, a === 'surprise' ? s.modeSurpriseDescription : null]}>{b}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  safe: {
    flex: 1,
    backgroundColor: theme.colors.canvas,
  },
  page: {
    padding: 24,
    paddingTop: 28,
    paddingBottom: 60,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  logo: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -2,
    color: theme.colors.ink,
    marginTop: 12,
  },
  small: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -1,
  },
  close: {
    fontSize: 20,
    color: theme.colors.muted,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: theme.colors.muted,
    marginTop: 32,
  },
  hero: {
    fontSize: 44,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -2.5,
    color: theme.colors.ink,
    marginTop: 10,
  },
  title: {
    fontSize: 42,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -2,
    color: theme.colors.ink,
    marginVertical: 20,
  },
  sub: {
    fontSize: 17,
    lineHeight: 25,
    color: theme.colors.muted,
    marginTop: 16,
  },
  capture: {
    marginTop: 36,
    borderRadius: 28,
    overflow: 'hidden',
  },
  grad: {
    padding: 30,
    alignItems: 'center',
  },
  cam: {
    fontSize: 30,
    color: theme.colors.surface,
  },
  cta: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    color: theme.colors.surface,
    marginTop: 8,
  },
  hint: {
    fontSize: 12,
    color: theme.colors.captureTextMuted,
    marginTop: 6,
  },
  gallery: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  galleryTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  galleryHint: {
    fontSize: 12,
    color: theme.colors.subtle,
    marginTop: 4,
  },
  categoryHeading: { marginTop: 34, marginBottom: 12 },
  categoryEyebrow: { fontSize: 10, fontWeight: '900', letterSpacing: 1.7, color: theme.colors.subtle },
  categoryCaption: { fontSize: 12, color: theme.colors.muted, marginTop: 5, lineHeight: 18 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  categoryCard: { width: '48.5%', minHeight: 112, borderRadius: 22, padding: 15, justifyContent: 'space-between' },
  categoryRoom: { backgroundColor: theme.colors.surfaceMuted },
  categoryObjects: { backgroundColor: theme.colors.mint },
  categoryFood: { backgroundColor: theme.colors.peach },
  categoryMaterials: { backgroundColor: theme.colors.lavender },
  categorySymbol: { fontSize: 23, color: theme.colors.ink, fontWeight: '700' },
  categoryLabel: { fontSize: 12, fontWeight: '900', letterSpacing: 1.2, color: theme.colors.ink, marginTop: 10 },
  categoryDetail: { fontSize: 10, color: theme.colors.muted, marginTop: 3 },
  photo: {
    width: '100%',
    height: 320,
    borderRadius: 26,
  },
  rendered: { width: '100%', height: 420, borderRadius: 26 },
  comparison: { flexDirection: 'row', gap: 10, marginTop: 6 },
  comparisonItem: { flex: 1, minWidth: 0 },
  comparisonLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.4, color: theme.colors.subtle, marginBottom: 7 },
  comparisonImage: { width: '100%', aspectRatio: 0.78, borderRadius: 18, backgroundColor: theme.colors.surfaceMuted },
  modeIntro: { marginTop: 24, marginBottom: 13 },
  modeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  mode: { width: '48.5%', minHeight: 148, borderRadius: 23, padding: 16, marginBottom: 0, borderWidth: 1, borderColor: theme.colors.line, backgroundColor: theme.colors.surface, justifyContent: 'space-between' },
  modeCreate: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  modeImprove: { backgroundColor: theme.colors.mint, borderColor: theme.colors.mint },
  modeFix: { backgroundColor: theme.colors.blue, borderColor: theme.colors.blue },
  modeCook: { backgroundColor: theme.colors.peach, borderColor: theme.colors.peach },
  modeSurprise: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  modeSurpriseForeground: { color: theme.colors.surface },
  modeSurpriseDescription: { color: theme.colors.surfaceMuted },
  modeWide: { width: '100%', minHeight: 118 },
  modePressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  modeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modeIcon: { fontSize: 23, fontWeight: '800', color: theme.colors.ink },
  modeArrow: { fontSize: 20, fontWeight: '800', color: theme.colors.muted },
  modeTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  modeDesc: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 4,
    maxWidth: '85%',
  },
  arrow: { position: 'absolute', right: 18, top: 17, fontSize: 28, color: theme.colors.subtle },
  section: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    color: theme.colors.subtle,
    marginTop: 26,
    marginBottom: 10,
  },
  action: {
    backgroundColor: theme.colors.ink,
    borderRadius: 20,
    padding: 20,
  },
  actionType: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    color: theme.colors.captureTextMuted,
  },
  actionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: theme.colors.surface,
    marginTop: 7,
  },
  actionMeta: {
    fontSize: 11,
    color: theme.colors.captureTextMuted,
    marginTop: 10,
  },
  solution: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  solutionTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  solutionText: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 7,
  },
  product: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  productMain: {
    flex: 1,
    paddingRight: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  productMeta: {
    fontSize: 11,
    color: theme.colors.subtle,
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '900',
  },
  notice: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
  },
  noticeTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  noticeText: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 5,
  },
  primary: {
    backgroundColor: theme.colors.ink,
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 28,
  },
  primaryText: {
    color: theme.colors.surface,
    fontWeight: '900',
  },
  disclosure: {
    fontSize: 11,
    lineHeight: 17,
    color: theme.colors.subtle,
    marginTop: 10,
  },
  secondary: {
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.ink,
  },
});
