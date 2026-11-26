import React, { useEffect, useRef, useState } from 'react';
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
import type { ConsumerIntent, ConsumerAnalysis } from '../src/core/intelligence/apiClient';
import type { OpportunityKind } from '../src/core/intelligence/types';
import { permissionDecision } from '../src/core/intelligence/permissionDecision';
import { isSafeExternalHttpUrl } from '../src/core/intelligence/externalLink';
import { BrandMark, FadeIn, ProductCard, SectionHeader, StatePanel } from '../src/ui/components';
import { shouldShowEmptyProductPanel } from '../src/ui/productResultsState';
import { theme } from '../src/ui/theme';
import { requestFailureKind } from '../src/ui/requestFailure';
import { validateImageUri } from '../src/core/intelligence/imageInput';
import { normalizeImageAsset, resolveVisualDimensions } from '../src/core/intelligence/imageNormalization';

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
  const analysisControllerRef = useRef<AbortController | null>(null);
  const analysisRequestIdRef = useRef(0);
  const redesignRequestIdRef = useRef(0);
  const redesign = result?.redesign ?? result?.phase3?.redesign;

  useEffect(() => () => {
    analysisRequestIdRef.current += 1;
    analysisControllerRef.current?.abort();
    analysisControllerRef.current = null;
  }, []);

  function cancelAnalysis() {
    analysisRequestIdRef.current += 1;
    analysisControllerRef.current?.abort();
    analysisControllerRef.current = null;
    setBusy(false);
  }

  function setSelectedPhoto(imageUri: string) {
    redesignRequestIdRef.current += 1;
    setRendering(false);
    try {
      validateImageUri(imageUri);
    } catch (error) {
      setNotice({
        kind: 'error',
        title: 'Photo unavailable',
        description: error instanceof Error ? error.message : 'Choose a smaller supported photo.',
      });
      return;
    }
    cancelAnalysis();
    setNotice(null);
    setPhoto(imageUri);
    setResult(null);
    setRendered(null);
  }

  async function prepareAndSelectPhoto(
    uri: string,
    width: number,
    height: number,
    orientation: unknown,
    failureDescription: string
  ) {
    // Invalidate a pending redesign before dimension lookup or normalization can await.
    redesignRequestIdRef.current += 1;
    setRendering(false);
    cancelAnalysis();
    setResult(null);
    setRendered(null);
    setNotice(null);

    try {
      let resolvedWidth = width;
      let resolvedHeight = height;
      if (!Number.isFinite(resolvedWidth) || !Number.isFinite(resolvedHeight) || resolvedWidth <= 0 || resolvedHeight <= 0) {
        const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
          Image.getSize(uri, (imageWidth, imageHeight) => resolve({ width: imageWidth, height: imageHeight }), reject);
        });
        const visualDimensions = resolveVisualDimensions(dimensions.width, dimensions.height, orientation);
        resolvedWidth = visualDimensions.width;
        resolvedHeight = visualDimensions.height;
      }
      const normalized = await normalizeImageAsset(uri, resolvedWidth, resolvedHeight);
      setSelectedPhoto(normalized.dataUrl);
    } catch (error) {
      setNotice({
        kind: 'error',
        title: 'Photo unavailable',
        description: error instanceof Error ? error.message : failureDescription,
      });
    }
  }

  const reset = () => {
    cancelAnalysis();
    redesignRequestIdRef.current += 1;
    setRendering(false);
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
    if (analysisControllerRef.current) return;
    if (!API_URL) {
      setNotice({
        kind: 'error',
        title: 'USEIT is not connected',
        description: 'The real vision flow needs EXPO_PUBLIC_USEIT_API_URL to be configured.',
      });
      return;
    }

    if (!photo) return;

    const controller = new AbortController();
    const requestId = ++analysisRequestIdRef.current;
    analysisControllerRef.current = controller;
    setBusy(true);
    setRendered(null);
    setNotice(null);

    try {
      const response = await analyzeForConsumer(
        new UseitApiProvider(API_URL),
        photo,
        intent,
        { signal: controller.signal }
      );
      if (controller.signal.aborted || requestId !== analysisRequestIdRef.current) return;
      setResult(response);
    } catch (error) {
      if (controller.signal.aborted || requestId !== analysisRequestIdRef.current || (error instanceof Error && error.name === 'AbortError')) return;
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
      if (requestId === analysisRequestIdRef.current) {
        analysisControllerRef.current = null;
        setBusy(false);
      }
    }
  }

  async function createVisualConcept() {
    if (!photo || !redesign || rendering) return;

    const requestId = ++redesignRequestIdRef.current;
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

      if (requestId !== redesignRequestIdRef.current) return;
      setRendered(renderedResult.imageDataUrl);
    } catch {
      if (requestId !== redesignRequestIdRef.current) return;
      setNotice({
        kind: 'error',
        title: 'Visual concept failed',
        description: 'The redesign could not be rendered. The selected solution is still available.',
        actionLabel: 'TRY AGAIN',
        actionAccessibilityHint: 'Retries creating the visual concept.',
        onAction: () => { void createVisualConcept(); },
      });
    } finally {
      if (requestId === redesignRequestIdRef.current) setRendering(false);
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
      quality: 1,
      base64: false,
      exif: true,
      allowsMultipleSelection: false,
    });

    if (r.canceled) return;

    const a = r.assets[0];
    await prepareAndSelectPhoto(
      a.uri,
      a.width,
      a.height,
      a.exif?.Orientation,
      'USEIT could not decode this image. Choose a different photo.'
    );
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
      quality: 1,
      base64: false,
      exif: true,
    });

    if (r.canceled) return;

    const a = r.assets[0];
    await prepareAndSelectPhoto(
      a.uri,
      a.width,
      a.height,
      a.exif?.Orientation,
      'USEIT could not decode the captured image. Try taking it again.'
    );
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

            <View style={s.tags}>
              {['ROOMS', 'OBJECTS', 'FOOD', 'MATERIALS'].map((x) => (
                <Text style={s.tag} key={x}>
                  {x}
                </Text>
              ))}
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
                <Text style={s.kicker}>VISUAL CONCEPT</Text>
                <Image source={{ uri: rendered }} style={s.rendered} />
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
                actionLabel="CANCEL ANALYSIS"
                actionAccessibilityHint="Stops the current image analysis and returns to the selected photo."
                onAction={cancelAnalysis}
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

                {(result.intelligence?.rankedCandidates?.length ?? 0) > 0 ? (
                  <>
                    <SectionHeader eyebrow="MATCHING OPTIONS" />

                    {result.intelligence.rankedCandidates
                      .slice(0, 5)
                      .map((x) => (
                        <ProductCard
                          key={x.id}
                          title={x.title}
                          category={x.category}
                          source={x.source}
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

                {modes.map(([a, b]) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${a.toUpperCase()} mode`}
                    accessibilityHint={b}
                    key={a}
                    style={s.mode}
                    onPress={() => analyze(a)}
                  >
                    <Text style={s.modeTitle}>{a.toUpperCase()}</Text>

                    <Text style={s.modeDesc}>{b}</Text>

                    <Text style={s.arrow}>›</Text>
                  </Pressable>
                ))}
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
    fontSize: 52,
    lineHeight: 53,
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 26,
  },
  tag: {
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.muted,
  },
  photo: {
    width: '100%',
    height: 320,
    borderRadius: 26,
  },
  rendered: {
    width: '100%',
    height: 420,
    borderRadius: 26,
  },
  mode: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  modeDesc: {
    fontSize: 14,
    color: theme.colors.muted,
    marginTop: 4,
    maxWidth: '85%',
  },
  arrow: {
    position: 'absolute',
    right: 18,
    top: 17,
    fontSize: 28,
    color: theme.colors.subtle,
  },
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
