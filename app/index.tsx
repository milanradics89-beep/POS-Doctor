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
import { UseitApiProvider, UseitApiError, analyzeForConsumer } from '../src/core/intelligence/apiClient';
import type { ConsumerIntent, ConsumerAnalysis } from '../src/core/intelligence/apiClient';
import { permissionDecision } from '../src/core/intelligence/permissionDecision';
import { isSafeExternalHttpUrl } from '../src/core/intelligence/externalLink';
import { BrandMark, FadeIn, StatePanel } from '../src/ui/components';
import { PhotoComparison, PhotoResult } from '../src/ui/PhotoResult';
import { modeCopy, resultMode, type ResultMode } from '../src/ui/resultModel';
import { theme } from '../src/ui/theme';
import { createIdempotencyKey } from '../src/core/intelligence/idempotencyKey';
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

const modes: [ConsumerIntent, string, string][] = [
  ['create', modeCopy.create.title, 'Turn the materials you see into a new project.'],
  ['improve', modeCopy.improve.title, 'Explore changes to the look or layout.'],
  ['fix', modeCopy.fix.title, 'Find a practical next step for a damaged item.'],
  ['cook', modeCopy.cook.title, 'Get a recipe idea from the ingredients in view.'],
  ['surprise', modeCopy.surprise.title, 'Discover an unexpected use for this scene.'],
];

function hasUsableDimensions(width: number, height: number) {
  return [width, height].every((value) => Number.isFinite(value) && value > 0);
}

function PhotoWelcome({ capture, chooseGallery, noticePanel }: {
  capture: () => void; chooseGallery: () => void; noticePanel: React.ReactNode;
}) {
  return (
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
              style={({ pressed }) => [s.capture, pressed && s.capturePressed]}
            >
              <LinearGradient colors={[theme.colors.captureStart, theme.colors.captureEnd]} style={s.grad}>
                <Text style={s.cam}>⌾</Text>
                <Text style={s.cta}>Take a photo</Text>
                <Text style={s.hint}>Start with what’s in front of you</Text>
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

            <Text style={s.sub}>Your photo stays on this device until you start an analysis. USEIT and its AI provider then process the photo.</Text>

            {noticePanel}
            <Text accessibilityRole="header" style={s.modeHeading}>One photo. Five possibilities.</Text>
            <View style={s.examples}>
              <Text style={s.exampleTitle}>Fridge shelf → a meal idea</Text>
              <Text style={s.modeDesc}>Cook with the ingredients you already have.</Text>
              <Text style={s.exampleTitle}>Living room → a new layout</Text>
              <Text style={s.modeDesc}>See what to keep and what could move.</Text>
            </View>
            <View style={s.tags}>
              {modes.map(([mode]) => <Text style={s.tag} key={mode}>{mode.toUpperCase()}</Text>)}
            </View>
          </>
          </FadeIn>
  );
}

function ModeChooser({ noticePanel, onSelect, onBack }: {
  noticePanel: React.ReactNode; onSelect: (intent: ConsumerIntent) => void; onBack?: () => void;
}) {
  return (
              <>
                {noticePanel}
                <Text accessibilityRole="header" style={s.modeHeading}>What should I do with this?</Text>

                {onBack && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Back to my result"
                    accessibilityHint="Shows your last result without analyzing the photo again."
                    style={s.secondary}
                    onPress={onBack}
                  >
                    <Text style={s.secondaryText}>Back to my result</Text>
                  </Pressable>
                )}
                {modes.map(([intent, label, hint], index) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    accessibilityHint={hint}
                    key={intent}
                    style={({ pressed }) => [s.mode, pressed && s.modePressed]}
                    onPress={() => onSelect(intent)}
                  >
                    <Text style={s.modeIndex}>{String(index + 1).padStart(2, '0')}</Text>
                    <View style={s.modeCopy}>
                      <Text style={s.modeTitle}>{label}</Text>
                      <Text style={s.modeDesc}>{hint}</Text>
                    </View>
                    <Text style={s.arrow}>›</Text>
                  </Pressable>
                ))}
              </>
  );
}

const pickerCopy = {
  camera: {
    blocked: 'Camera access is disabled', permission: 'Camera permission needed',
    settings: 'Enable camera access in Settings to take a photo.',
    ask: 'USEIT needs camera access to photograph what you want to explore.',
    failure: 'Camera unavailable', recover: 'Try opening the camera again, or choose a photo from your gallery.',
    decode: 'USEIT could not decode the captured image. Try taking it again.',
    request: ImagePicker.requestCameraPermissionsAsync,
    launch: ImagePicker.launchCameraAsync,
  },
  gallery: {
    blocked: 'Photos access is disabled', permission: 'Photos permission needed',
    settings: 'Enable photo library access in Settings to choose an image.',
    ask: 'USEIT needs access to a photo you want to explore.',
    failure: 'Photo library unavailable', recover: 'Try choosing a photo again, or use the camera.',
    decode: 'USEIT could not decode this image. Choose a different photo.',
    request: ImagePicker.requestMediaLibraryPermissionsAsync,
    launch: ImagePicker.launchImageLibraryAsync,
  },
};

type PickerSource = keyof typeof pickerCopy;

function permissionNotice(copy: typeof pickerCopy[PickerSource], openSettings: boolean, retry: () => void): ScreenNotice {
  return {
    kind: 'permission-denied',
    title: openSettings ? copy.blocked : copy.permission,
    description: openSettings ? copy.settings : copy.ask,
    actionLabel: openSettings ? 'OPEN SETTINGS' : 'TRY AGAIN',
    actionAccessibilityHint: openSettings ? 'Opens system settings to enable access.' : 'Requests permission again.',
    onAction: () => {
      if (openSettings) void Linking.openSettings();
      else retry();
    },
  };
}

function conceptIsAvailable(mode: ResultMode, plan: ConsumerAnalysis['redesign'], key: string | null) {
  return mode === 'improve' && Boolean(plan) && key === null;
}

function analysisFailureTitle(error: unknown, kind: ReturnType<typeof requestFailureKind>) {
  if (kind === 'offline') return 'No connection';
  if (error instanceof Error && error.name === 'AbortError') return 'Analysis took too long';
  if (error instanceof UseitApiError && error.status === 503) return 'Analysis is temporarily unavailable';
  return 'Could not finish the analysis';
}

function analysisFailureNotice(error: unknown, onAction: () => void): ScreenNotice {
  if (error instanceof UseitApiError && error.status === 409) {
    return { kind: 'error', title: 'Analysis cannot be recovered', description: 'USEIT cannot safely repeat that request. You can choose a mode to explicitly start a new analysis.' };
  }
  const kind = requestFailureKind(error);
  return {
    kind,
    title: analysisFailureTitle(error, kind),
    description: kind === 'offline'
      ? 'Check your internet connection, then retry the analysis.'
      : 'USEIT could not finish the analysis. Your photo is still here.',
    actionLabel: 'TRY AGAIN',
    actionAccessibilityHint: 'Retries image analysis for the selected photo.',
    onAction,
  };
}

function PhotoProgress({ busy, cancel }: { busy: boolean; cancel: () => void }) {
  return (
    <FadeIn>
      <StatePanel kind="loading"
        title={busy ? 'Understanding your photo' : 'Creating your visual concept'}
        description={busy ? 'Finding a useful next step from your photo.' : 'Preparing a visual version of the selected plan.'}
        actionLabel={busy ? 'CANCEL ANALYSIS' : 'CANCEL VISUAL CONCEPT'}
        actionAccessibilityHint={busy ? 'Stops the analysis and returns to your photo.' : 'Returns to the selected plan.'}
        onAction={cancel} />
    </FadeIn>
  );
}

function showConcept(concept: string | null, choosingMode: boolean, busy: boolean) {
  return choosingMode || busy ? null : concept;
}

function conceptFailureNotice(error: unknown, retryConcept: () => void): ScreenNotice {
  if (error instanceof UseitApiError && error.status === 409) {
    return { kind: 'error', title: 'Visual concept could not be recovered', description: 'USEIT cannot safely repeat this image request. Your plan is still available.' };
  }
  return {
    kind: 'error',
    title: 'Visual concept failed',
    description: 'The image did not arrive. Your plan is still available.',
    actionLabel: 'RETRY IF SAFE',
    actionAccessibilityHint: 'Tries the same request only when USEIT can prevent a duplicate.',
    onAction: retryConcept,
  };
}

function SelectedPhoto({ photo, concept, reset }: { photo: string; concept: string | null; reset: () => void }) {
  return (
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
                style={s.closeButton}
              >
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>

            {concept ? <PhotoComparison photo={photo} concept={concept} /> : (
              <Image accessible accessibilityLabel="Your selected photo" resizeMode="contain" source={{ uri: photo }} style={s.photo} />
            )}

    </>
  );
}

function ResultNavigation({ switchMode, reset }: { switchMode: () => void; reset: () => void }) {
  return (
    <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Try another mode"
                  accessibilityHint="Shows the modes for this photo without starting an analysis."
                  style={({ pressed }) => [s.modeSwitch, pressed && s.modePressed]}
                  onPress={switchMode}
                >
                  <Text style={s.secondaryText}>Try another mode</Text>
                  <Text style={s.modeDesc}>Keep this photo and explore a different idea.</Text>
                </Pressable>

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
  );
}

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

type PhotoPreparation = {
  photoGeneration: React.RefObject<number>;
  setPreparing: (preparing: boolean) => void;
  onBegin: () => void;
  setNotice: (notice: ScreenNotice | null) => void;
  setSelectedPhoto: (image: string) => void;
};

function createPhotoPreparation({ photoGeneration, setPreparing, onBegin, setNotice, setSelectedPhoto }: PhotoPreparation) {
  async function prepareAndSelectPhoto(
    uri: string,
    width: number,
    height: number,
    orientation: unknown,
    failureDescription: string
  ) {
    const generation = ++photoGeneration.current;
    setPreparing(true);
    // Invalidate a pending redesign before dimension lookup or normalization can await.
    onBegin();

    try {
      let resolvedWidth = width;
      let resolvedHeight = height;
      if (!hasUsableDimensions(resolvedWidth, resolvedHeight)) {
        const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
          Image.getSize(uri, (imageWidth, imageHeight) => resolve({ width: imageWidth, height: imageHeight }), reject);
        });
        const visualDimensions = resolveVisualDimensions(dimensions.width, dimensions.height, orientation);
        resolvedWidth = visualDimensions.width;
        resolvedHeight = visualDimensions.height;
      }
      const normalized = await normalizeImageAsset(uri, resolvedWidth, resolvedHeight);
      if (generation !== photoGeneration.current) return;
      setSelectedPhoto(normalized.dataUrl);
    } catch (error) {
      if (generation !== photoGeneration.current) return;
      setNotice({
        kind: 'error',
        title: 'Photo unavailable',
        description: error instanceof Error ? error.message : failureDescription,
      });
    } finally {
      if (generation === photoGeneration.current) setPreparing(false);
    }
  }

  return prepareAndSelectPhoto;
}

function createPhotoPicker({ photoGeneration, setNotice, prepareAndSelectPhoto }: {
  photoGeneration: React.RefObject<number>;
  setNotice: PhotoPreparation['setNotice'];
  prepareAndSelectPhoto: ReturnType<typeof createPhotoPreparation>;
}) {
  async function selectPickerResult(result: ImagePicker.ImagePickerResult, generation: number, failure: string) {
    if (generation !== photoGeneration.current || result.canceled) return;
    const asset = result.assets[0];
    if (!asset) {
      setNotice({ kind: 'error', title: 'Photo unavailable', description: failure });
      return;
    }
    await prepareAndSelectPhoto(asset.uri, asset.width, asset.height, asset.exif?.Orientation, failure);
  }

  async function pickPhoto(source: PickerSource) {
    const generation = ++photoGeneration.current;
    const copy = pickerCopy[source];
    try {
      const permission = await copy.request();
      if (generation !== photoGeneration.current) return;
      const decision = permissionDecision(permission.granted, permission.canAskAgain);
      if (decision !== 'granted') {
        setNotice(permissionNotice(copy, decision === 'open_settings', () => { void pickPhoto(source); }));
        return;
      }

      setNotice(null);
      const r = await copy.launch({ mediaTypes: ['images'], quality: 1, base64: false, exif: true });
      await selectPickerResult(r, generation, copy.decode);
    } catch {
      if (generation !== photoGeneration.current) return;
      setNotice({ kind: 'error', title: copy.failure, description: copy.recover });
    }
  }

  return pickPhoto;
}

function prepareConceptRequest({
  photo, redesign, redesignControllerRef, redesignRequestIdRef, redesignKeyRef, setRendering, setNotice, setRendered,
}: {
  photo: string | null;
  redesign: ConsumerAnalysis['redesign'];
  redesignControllerRef: React.RefObject<AbortController | null>;
  redesignRequestIdRef: React.RefObject<number>;
  redesignKeyRef: React.RefObject<string | null>;
  setRendering: (rendering: boolean) => void;
  setNotice: PhotoPreparation['setNotice'];
  setRendered: (image: string) => void;
}) {
  async function createVisualConcept(retry = false) {
    if (!photo || !redesign || redesignControllerRef.current) return;

    const controller = new AbortController();
    redesignControllerRef.current = controller;
    const requestId = ++redesignRequestIdRef.current;
    const key = redesignKeyRef.current ??= createIdempotencyKey();
    setRendering(true);
    setNotice(null);

    try {
      const api = new UseitApiProvider(API_URL);

      const products = redesign.products.map((product) => ({
        title: product.title,
        category: product.category,
        priceHuf: product.priceHuf,
        sourcePrice: product.sourcePrice,
        currency: product.currency,
        url: product.url,
        id: product.productId,
      }));

      const renderedResult = await api.renderRedesign(
        photo,
        redesign.prompt,
        products,
        controller.signal,
        key,
        retry
      );

      if (requestId !== redesignRequestIdRef.current) return;
      setRendered(renderedResult.imageDataUrl);
    } catch (error) {
      if (requestId !== redesignRequestIdRef.current) return;
      setNotice(conceptFailureNotice(error, () => { void createVisualConcept(true); }));
    } finally {
      if (requestId === redesignRequestIdRef.current) {
        redesignControllerRef.current = null;
        setRendering(false);
      }
    }
  }

  return createVisualConcept;
}

function createAnalysisRequest({ photo, analysisControllerRef, analysisRequestIdRef, setBusy, setNotice, onComplete }: {
  photo: string | null;
  analysisControllerRef: React.RefObject<AbortController | null>;
  analysisRequestIdRef: React.RefObject<number>;
  setBusy: (busy: boolean) => void;
  setNotice: PhotoPreparation['setNotice'];
  onComplete: (result: ConsumerAnalysis, intent?: ConsumerIntent) => void;
}) {
  async function analyze(intent?: ConsumerIntent, idempotencyKey = createIdempotencyKey(), refinement?: string, refinementTarget?: string, retry = false) {
    if (analysisControllerRef.current) return;
    if (!API_URL) {
      setNotice({
        kind: 'error',
        title: 'USEIT is not connected',
        description: 'Photo analysis is unavailable in this version. Your photo has not been sent.',
      });
      return;
    }

    if (!photo) return;

    const controller = new AbortController();
    const requestId = ++analysisRequestIdRef.current;
    const isStale = () => controller.signal.aborted || requestId !== analysisRequestIdRef.current;
    analysisControllerRef.current = controller;
    setBusy(true);
    setNotice(null);

    try {
      const response = await analyzeForConsumer(
        new UseitApiProvider(API_URL),
        photo,
        intent,
        { signal: controller.signal, idempotencyKey, actionable: true, refinement, refinementTarget, locale: 'en-HU', retry }
      );
      if (isStale()) return;
      onComplete(response, intent);
    } catch (error) {
      if (isStale()) return;
      setNotice(analysisFailureNotice(error, () => { void analyze(intent, idempotencyKey, refinement, refinementTarget, true); }));
    } finally {
      if (requestId === analysisRequestIdRef.current) {
        analysisControllerRef.current = null;
        setBusy(false);
      }
    }
  }

  return analyze;
}

function usePhotoRequestLifetimes(setBusy: (busy: boolean) => void, setRendering: (rendering: boolean) => void) {
  const analysisControllerRef = useRef<AbortController | null>(null);
  const analysisRequestIdRef = useRef(0);
  const redesignControllerRef = useRef<AbortController | null>(null);
  const photoGeneration = useRef(0);
  const redesignRequestIdRef = useRef(0);
  useEffect(() => () => {
    photoGeneration.current += 1;
    redesignRequestIdRef.current += 1;
    redesignControllerRef.current?.abort();
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

  function cancelRedesign() {
    redesignRequestIdRef.current += 1;
    redesignControllerRef.current?.abort();
    redesignControllerRef.current = null;
    setRendering(false);
  }

  return { analysisControllerRef, analysisRequestIdRef, redesignControllerRef,
    redesignRequestIdRef, photoGeneration, cancelAnalysis, cancelRedesign };
}

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [choosingMode, setChoosingMode] = useState(false);
  const [rendered, setRendered] = useState<string | null>(null);
  const [completedMode, setCompletedMode] = useState<ResultMode>('surprise');
  const [result, setResult] = useState<ConsumerAnalysis | null>(null);
  const [notice, setNotice] = useState<ScreenNotice | null>(null);
  const { analysisControllerRef, analysisRequestIdRef, redesignControllerRef,
    redesignRequestIdRef, photoGeneration, cancelAnalysis, cancelRedesign } = usePhotoRequestLifetimes(setBusy, setRendering);
  const redesignKeyRef = useRef<string | null>(null);
  const redesign = result?.redesign ?? result?.phase3?.redesign;
  const backToResult = () => setChoosingMode(false);
  function switchMode() {
    setNotice(null);
    setChoosingMode(true);
  }

  function setSelectedPhoto(imageUri: string) {
    validateImageUri(imageUri);
    cancelAnalysis();
    setNotice(null);
    setPhoto(imageUri);
    setResult(null);
    setRendered(null);
  }

  const prepareAndSelectPhoto = createPhotoPreparation({
    photoGeneration, setPreparing, setNotice, setSelectedPhoto,
    onBegin: () => {
      cancelRedesign();
      cancelAnalysis();
      setResult(null);
      setRendered(null);
      setNotice(null);
    },
  });

  const pickPhoto = createPhotoPicker({ photoGeneration, setNotice, prepareAndSelectPhoto });

  const reset = () => {
    setChoosingMode(false);
    setPreparing(false);
    redesignKeyRef.current = null;
    photoGeneration.current += 1;
    cancelAnalysis();
    cancelRedesign();
    setPhoto(null);
    setResult(null);
    setRendered(null);
    setNotice(null);
  };

  const analyze = createAnalysisRequest({
    photo, analysisControllerRef, analysisRequestIdRef, setBusy, setNotice,
    onComplete: (response, intent) => {
      setCompletedMode(resultMode(intent));
      setChoosingMode(false);
      redesignKeyRef.current = null;
      setRendered(null);
      setResult(response);
    },
  });

  const createVisualConcept = prepareConceptRequest({
    photo, redesign, redesignControllerRef, redesignRequestIdRef, redesignKeyRef,
    setRendering, setNotice, setRendered,
  });

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

  const onRefine = (text: string, target?: string) => { void analyze(completedMode, undefined, text, target?.slice(0, 180)); };
  return (
    <PhotoStage photo={photo} preparing={preparing} busy={busy} noticePanel={noticePanel}
      concept={rendered} rendering={rendering} choosingMode={choosingMode} result={result} mode={completedMode}
      cancelAnalysis={cancelAnalysis} cancelRedesign={cancelRedesign}
      resultId={analysisRequestIdRef.current} reset={reset} switchMode={switchMode}
      pickPhoto={pickPhoto} onSelect={analyze} onBack={backToResult}
      onOpenProduct={(url) => { void openProductLink(url); }} onRefine={onRefine}
      onConcept={conceptIsAvailable(completedMode, redesign, redesignKeyRef.current) ? () => { void createVisualConcept(); } : undefined}
    />
  );
}

type PhotoStageProps = {
  photo: string | null; preparing: boolean; busy: boolean; noticePanel: React.ReactNode;
  concept: string | null; rendering: boolean; choosingMode: boolean;
  cancelAnalysis: () => void; cancelRedesign: () => void; result: ConsumerAnalysis | null; mode: ResultMode;
  resultId: number; reset: () => void; switchMode: () => void; pickPhoto: (source: PickerSource) => Promise<void>;
  onSelect: (intent: ConsumerIntent) => void; onBack?: () => void; onOpenProduct: (url: string) => void;
  onRefine: (text: string, target?: string) => void; onConcept?: () => void;
};

function PhotoStage(props: PhotoStageProps) {
  const { photo, preparing, noticePanel, reset } = props;
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.page}>
        {preparing ? (
          <StatePanel kind="loading" title="Preparing your photo"
            description="Your photo is being prepared on this device." actionLabel="CANCEL"
            actionAccessibilityHint="Stops photo selection and returns to the camera and gallery options." onAction={reset} />
        ) : photo ? (
          <SelectedPhotoFlow {...props} photo={photo} />
        ) : (
          <PhotoWelcome capture={() => { void props.pickPhoto('camera'); }} chooseGallery={() => { void props.pickPhoto('gallery'); }} noticePanel={noticePanel} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SelectedPhotoFlow(props: PhotoStageProps & { photo: string }) {
  const { photo, busy, choosingMode, noticePanel, mode, reset } = props;
  const result = choosingMode ? null : props.result;
  const progress = busy ? props.cancelAnalysis : props.rendering ? props.cancelRedesign : null;
  const concept = showConcept(props.concept, choosingMode, busy);
  let body: React.ReactNode;
  if (progress) {
    body = <PhotoProgress busy={busy} cancel={progress} />;
  } else if (result) {
    body = <>
      {noticePanel}
      <PhotoResult key={props.resultId} result={result} mode={mode}
        onOpenProduct={props.onOpenProduct} onRefine={props.onRefine} onConcept={props.onConcept} />
      <ResultNavigation reset={reset} switchMode={props.switchMode} />
    </>;
  } else {
    body = <ModeChooser noticePanel={noticePanel} onSelect={props.onSelect} onBack={choosingMode ? props.onBack : undefined} />;
  }
  return (
    <>
      <SelectedPhoto photo={photo} concept={concept} reset={reset} />
      {body}
    </>
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
    alignSelf: 'center', width: '100%', maxWidth: 720,
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
  closeButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
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
  sub: {
    fontSize: 17,
    lineHeight: 25,
    color: theme.colors.muted,
    marginTop: 16,
  },
  examples: { backgroundColor: theme.colors.surface, padding: 18, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.line },
  exampleTitle: { marginTop: 6, color: theme.colors.ink, fontSize: 16, fontWeight: '800' },
  capturePressed: { opacity: 0.82 },
  capture: {
    backgroundColor: theme.colors.ink,
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
    height: 280,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 26,
  },
  modeHeading: { fontSize: 30, lineHeight: 34, letterSpacing: -1, fontWeight: '800', color: theme.colors.ink, marginTop: 24, marginBottom: 16 },
  mode: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, minHeight: 72,
    backgroundColor: theme.colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: theme.colors.line, marginBottom: 8,
  },
  modeSwitch: { padding: 16, marginTop: 14, backgroundColor: theme.colors.surface, borderColor: theme.colors.controlBorder, borderWidth: 1, borderRadius: 16, alignItems: 'center' },
  modePressed: { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.accentDark },
  modeIndex: { color: theme.colors.accentDark, fontSize: 12, fontWeight: '800', fontVariant: ['tabular-nums'] },
  modeCopy: { flex: 1, minWidth: 0 },
  modeTitle: { color: theme.colors.ink, fontSize: 17, fontWeight: '800', lineHeight: 22 },
  modeDesc: { color: theme.colors.muted, fontSize: 14, lineHeight: 19, marginTop: 3 },
  arrow: { color: theme.colors.subtle, fontSize: 22 },
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
