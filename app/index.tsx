import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UseitApiProvider, UseitApiError, analyzeForConsumer } from '../src/core/intelligence/apiClient';
import type { ConsumerIntent, ConsumerAnalysis } from '../src/core/intelligence/apiClient';
import { permissionDecision } from '../src/core/intelligence/permissionDecision';
import { isSafeExternalHttpUrl } from '../src/core/intelligence/externalLink';
import { BrandMark, FadeIn, PhotoFrame, StatePanel } from '../src/ui/components';
import { PhotoComparison, PhotoResult } from '../src/ui/PhotoResult';
import { modeCopy, resultMode, type ResultMode } from '../src/ui/resultModel';
import { HU_LOCALE, hu } from '../src/i18n/hu';
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
  ['create', modeCopy.create.title, modeCopy.create.description],
  ['improve', modeCopy.improve.title, modeCopy.improve.description],
  ['fix', modeCopy.fix.title, modeCopy.fix.description],
  ['cook', modeCopy.cook.title, modeCopy.cook.description],
  ['surprise', modeCopy.surprise.title, modeCopy.surprise.description],
];

const modeVisuals: Record<ResultMode, { tint: string }> = {
  create: { tint: theme.colors.mint },
  improve: { tint: theme.colors.blue },
  fix: { tint: theme.colors.peach },
  cook: { tint: theme.colors.accent },
  surprise: { tint: theme.colors.lavender },
};

function CameraGlyph() {
  return (
    <View style={s.cameraGlyph} accessible={false}>
      <View style={s.cameraGlyphTop} />
      <View style={s.cameraGlyphLens} />
      <View style={s.cameraGlyphFlash} />
    </View>
  );
}

function GalleryGlyph() {
  return (
    <View style={s.galleryGlyph} accessible={false}>
      <View style={s.galleryGlyphBack} />
      <View style={s.galleryGlyphFront}>
        <View style={s.galleryGlyphSun} />
        <View style={s.galleryGlyphHorizon} />
      </View>
    </View>
  );
}

function IntentGlyph({ mode }: { mode: ResultMode }) {
  return (
    <View style={s.intentGlyph} accessible={false}>
      {mode === 'create' ? (
        <>
          <View style={s.intentPlusVertical} />
          <View style={s.intentPlusHorizontal} />
        </>
      ) : null}
      {mode === 'improve' ? (
        <>
          <View style={s.intentArrowLine} />
          <View style={s.intentArrowHeadA} />
          <View style={s.intentArrowHeadB} />
        </>
      ) : null}
      {mode === 'fix' ? (
        <>
          <View style={s.intentToolShaft} />
          <View style={s.intentToolHandle} />
          <View style={s.intentToolHead} />
        </>
      ) : null}
      {mode === 'cook' ? (
        <>
          <View style={s.intentPotRim} />
          <View style={s.intentPotBody} />
          <View style={s.intentPotHandleLeft} />
          <View style={s.intentPotHandleRight} />
          <View style={s.intentPotSteamA} />
          <View style={s.intentPotSteamB} />
        </>
      ) : null}
      {mode === 'surprise' ? (
        <>
          <View style={s.intentSparkVertical} />
          <View style={s.intentSparkHorizontal} />
          <View style={s.intentSparkDiagonal} />
        </>
      ) : null}
    </View>
  );
}

function hasUsableDimensions(width: number, height: number) {
  return [width, height].every((value) => Number.isFinite(value) && value > 0);
}

function PossibilityFrame() {
  return (
    <View style={s.possibilityFrame} accessible accessibilityRole="image" accessibilityLabel={hu.home.frameAccessibility}>
      <View style={s.frameHeader}>
        <View style={s.frameHeaderMark} />
        <Text style={s.frameEyebrow}>{hu.home.frameEyebrow}</Text>
        <Text style={s.frameCount}>05</Text>
      </View>
      <View style={s.frameContent}>
        <View style={s.frameVisual}>
          <View style={s.frameOrbit} />
          <View style={s.frameLens}><View style={s.frameLensCore} /></View>
          <View style={s.frameSpark} />
        </View>
        <View style={s.frameCopy}>
          <Text style={s.frameTitle}>{hu.home.frameTitle}</Text>
          <Text style={s.frameBody}>{hu.home.frameBody}</Text>
        </View>
      </View>
      <View style={s.frameTags}>
        {[hu.modes.create.chip, hu.modes.improve.chip, hu.modes.fix.chip, hu.modes.cook.chip, hu.modes.surprise.chip].map((label) => (
          <View key={label} style={s.frameTag}><Text style={s.frameTagText}>{label}</Text></View>
        ))}
      </View>
    </View>
  );
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
          <Text style={s.brandNote}>{hu.home.brandNote}</Text>
        </View>

        <Text style={s.kicker}>{hu.home.kicker}</Text>
        <Text style={s.hero}>{hu.home.hero}</Text>
        <Text style={s.sub}>{hu.home.description}</Text>

        <PossibilityFrame />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hu.home.capture}
          accessibilityHint={hu.home.captureAccessibility}
          onPress={capture}
          style={({ pressed }) => [s.capture, pressed && s.capturePressed]}
        >
          <View style={s.captureIcon}><CameraGlyph /></View>
          <View style={s.captureCopy}>
            <Text style={s.cta}>{hu.home.capture}</Text>
            <Text style={s.hint}>{hu.home.captureHint}</Text>
          </View>
          <Text style={s.captureArrow}>↗</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hu.home.gallery}
          accessibilityHint={hu.home.galleryAccessibility}
          onPress={chooseGallery}
          style={({ pressed }) => [s.gallery, pressed && s.galleryPressed]}
        >
          <View style={s.galleryIcon}><GalleryGlyph /></View>
          <View style={s.galleryCopy}>
            <Text style={s.galleryTitle}>{hu.home.gallery}</Text>
            <Text style={s.galleryHint}>{hu.home.galleryHint}</Text>
          </View>
          <Text style={s.galleryArrow}>›</Text>
        </Pressable>

        <Text style={s.privacy}>{hu.home.privacy}</Text>
        {noticePanel}

        <View style={s.examples}>
          <Text accessibilityRole="header" style={s.examplesHeading}>{hu.home.examplesHeading}</Text>
          <View style={s.exampleRow}>
            <View style={[s.exampleMarker, { backgroundColor: theme.colors.mint }]} />
            <View style={s.exampleCopy}>
              <Text style={s.exampleTitle}>{hu.home.exampleOneTitle}</Text>
              <Text style={s.exampleDescription}>{hu.home.exampleOneDescription}</Text>
            </View>
          </View>
          <View style={s.exampleDivider} />
          <View style={s.exampleRow}>
            <View style={[s.exampleMarker, { backgroundColor: theme.colors.blue }]} />
            <View style={s.exampleCopy}>
              <Text style={s.exampleTitle}>{hu.home.exampleTwoTitle}</Text>
              <Text style={s.exampleDescription}>{hu.home.exampleTwoDescription}</Text>
            </View>
          </View>
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
      <Text style={s.kicker}>{hu.chooser.kicker}</Text>
      <Text accessibilityRole="header" style={s.modeHeading}>{hu.chooser.title}</Text>
      <Text style={s.chooserDescription}>{hu.chooser.description}</Text>

      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hu.chooser.back}
          accessibilityHint={hu.chooser.backAccessibility}
          style={s.backToResult}
          onPress={onBack}
        >
          <Text style={s.backToResultText}>‹  {hu.chooser.back}</Text>
        </Pressable>
      ) : null}

      {modes.map(([intent, label, hint]) => {
        const visual = modeVisuals[intent as ResultMode];
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityHint={hint}
            key={intent}
            style={({ pressed }) => [s.mode, pressed && s.modePressed]}
            onPress={() => onSelect(intent)}
          >
            <View style={[s.modeGlyph, { backgroundColor: visual.tint }]}>
              <IntentGlyph mode={intent as ResultMode} />
            </View>
            <View style={s.modeCopy}>
              <Text style={s.modeTitle}>{label}</Text>
              <Text style={s.modeDesc}>{hint}</Text>
            </View>
            <Text style={s.modeArrow}>↗</Text>
          </Pressable>
        );
      })}
    </>
  );
}

const pickerCopy = {
  camera: { ...hu.picker.camera, request: ImagePicker.requestCameraPermissionsAsync, launch: ImagePicker.launchCameraAsync },
  gallery: { ...hu.picker.gallery, request: ImagePicker.requestMediaLibraryPermissionsAsync, launch: ImagePicker.launchImageLibraryAsync },
};

type PickerSource = keyof typeof pickerCopy;

function permissionNotice(copy: typeof pickerCopy[PickerSource], openSettings: boolean, retry: () => void): ScreenNotice {
  return {
    kind: 'permission-denied',
    title: openSettings ? copy.blocked : copy.permission,
    description: openSettings ? copy.settings : copy.ask,
    actionLabel: openSettings ? hu.picker.openSettings : hu.picker.tryAgain,
    actionAccessibilityHint: openSettings ? hu.picker.settingsHint : hu.picker.permissionHint,
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
  if (kind === 'offline') return hu.notice.offlineTitle;
  if (error instanceof Error && error.name === 'AbortError') return hu.notice.timeoutTitle;
  if (error instanceof UseitApiError && error.status === 503) return hu.notice.unavailableTitle;
  return hu.notice.failureTitle;
}

function analysisFailureNotice(error: unknown, onAction: () => void): ScreenNotice {
  if (error instanceof UseitApiError && error.status === 409) {
    return { kind: 'error', title: hu.notice.recoveredTitle, description: hu.notice.recoveredDescription };
  }
  const kind = requestFailureKind(error);
  return {
    kind,
    title: analysisFailureTitle(error, kind),
    description: kind === 'offline'
      ? hu.notice.offlineDescription
      : hu.notice.failureDescription,
    actionLabel: hu.notice.tryAgain,
    actionAccessibilityHint: hu.notice.retryAnalysisHint,
    onAction,
  };
}

function PhotoProgress({ busy, cancel }: { busy: boolean; cancel: () => void }) {
  return (
    <FadeIn>
      <StatePanel kind="loading"
        title={busy ? hu.progress.analysisTitle : hu.progress.conceptTitle}
        description={busy ? hu.progress.analysisDescription : hu.progress.conceptDescription}
        actionLabel={busy ? hu.progress.cancelAnalysis : hu.progress.cancelConcept}
        actionAccessibilityHint={busy ? hu.progress.cancelAnalysisHint : hu.progress.cancelConceptHint}
        onAction={cancel} />
    </FadeIn>
  );
}

function showConcept(concept: string | null, choosingMode: boolean, busy: boolean) {
  return choosingMode || busy ? null : concept;
}

function conceptFailureNotice(error: unknown, retryConcept: () => void): ScreenNotice {
  if (error instanceof UseitApiError && error.status === 409) {
    return { kind: 'error', title: hu.notice.conceptRecoveredTitle, description: hu.notice.conceptRecoveredDescription };
  }
  return {
    kind: 'error',
    title: hu.notice.conceptFailedTitle,
    description: hu.notice.conceptFailedDescription,
    actionLabel: hu.notice.retryIfSafe,
    actionAccessibilityHint: hu.notice.retryConceptHint,
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
                accessibilityLabel={hu.photo.chooseAnother}
                accessibilityHint={hu.photo.chooseAnotherHint}
                onPress={reset}
                style={s.closeButton}
              >
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>

            {concept ? <PhotoComparison photo={photo} concept={concept} /> : (
              <PhotoFrame uri={photo} label={hu.photo.selected} eyebrow={hu.photo.originalEyebrow} imageHeight={330} />
            )}

    </>
  );
}

function ResultNavigation({ switchMode, reset }: { switchMode: () => void; reset: () => void }) {
  return (
    <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={hu.navigation.anotherMode}
                  accessibilityHint={hu.navigation.anotherModeHint}
                  style={({ pressed }) => [s.modeSwitch, pressed && s.modePressed]}
                  onPress={switchMode}
                >
                  <Text style={s.secondaryText}>{hu.navigation.anotherMode}</Text>
                  <Text style={s.modeDesc}>{hu.navigation.keepPhoto}</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={hu.navigation.anotherPhoto}
                  accessibilityHint={hu.navigation.anotherPhotoHint}
                  style={s.secondary}
                  onPress={reset}
                >
                  <Text style={s.secondaryText}>{hu.navigation.anotherPhoto}</Text>
                </Pressable>

    </>
  );
}

async function openProductLink(url: string) {
  if (!isSafeExternalHttpUrl(url)) {
    Alert.alert(hu.alerts.productLinkUnavailable, hu.alerts.productLinkUnsafe);
    return;
  }

  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(hu.alerts.productLinkFailed, hu.alerts.tryLater);
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
        title: hu.notice.photoUnavailable,
        description: hu.notice.preparingFailed,
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
      setNotice({ kind: 'error', title: hu.notice.photoUnavailable, description: hu.notice.preparingFailed });
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
        title: hu.notice.notConnectedTitle,
        description: hu.notice.notConnectedDescription,
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
        { signal: controller.signal, idempotencyKey, actionable: true, refinement, refinementTarget, locale: HU_LOCALE, retry }
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
          <StatePanel kind="loading" title={hu.progress.preparingTitle}
            description={hu.progress.preparingDescription} actionLabel={hu.progress.cancel}
            actionAccessibilityHint={hu.progress.cancelPreparationHint} onAction={reset} />
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
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  page: { alignSelf: 'center', width: '100%', maxWidth: 640, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 48 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  logo: { fontSize: 28, fontWeight: '900', letterSpacing: -1.7, color: theme.colors.ink },
  brandNote: { marginLeft: 'auto', color: theme.colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
  small: { fontSize: 18, fontWeight: '900', letterSpacing: -1, color: theme.colors.ink },
  closeButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  close: { fontSize: 20, color: theme.colors.muted },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.4, color: theme.colors.accentDark, marginTop: 30 },
  hero: { fontSize: theme.type.hero, lineHeight: 50, fontWeight: '800', letterSpacing: -1.8, color: theme.colors.ink, marginTop: 11 },
  sub: { fontSize: 16, lineHeight: 23, color: theme.colors.muted, marginTop: 12 },
  possibilityFrame: { backgroundColor: theme.colors.ink, borderRadius: theme.radius.lg, padding: 19, marginTop: 24, overflow: 'hidden' },
  frameHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  frameHeaderMark: { width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.accent },
  frameEyebrow: { color: theme.colors.captureTextMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.1, flex: 1 },
  frameCount: { color: theme.colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  frameContent: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 18 },
  frameVisual: { width: 94, height: 94, borderRadius: 47, backgroundColor: theme.colors.confidenceSurface, alignItems: 'center', justifyContent: 'center' },
  frameOrbit: { position: 'absolute', width: 76, height: 76, borderRadius: 38, borderWidth: 1, borderColor: theme.colors.accent, opacity: 0.65 },
  frameLens: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  frameLensCore: { width: 19, height: 19, borderRadius: 10, backgroundColor: theme.colors.ink },
  frameSpark: { position: 'absolute', width: 9, height: 9, borderRadius: 5, backgroundColor: theme.colors.surface, top: 14, right: 17 },
  frameCopy: { flex: 1, minWidth: 0, gap: 5 },
  frameTitle: { color: theme.colors.surface, fontSize: 20, lineHeight: 24, fontWeight: '800', letterSpacing: -0.5 },
  frameBody: { color: theme.colors.captureTextMuted, fontSize: 13, lineHeight: 19 },
  frameTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 17 },
  frameTag: { borderWidth: 1, borderColor: theme.colors.darkMuted, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999 },
  frameTagText: { color: theme.colors.captureTextMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  capturePressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  capture: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: theme.colors.accent, marginTop: 18, borderRadius: theme.radius.lg, minHeight: 82, paddingHorizontal: 17 },
  captureIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center' },
  cameraGlyph: { width: 23, height: 17, borderWidth: 2, borderColor: theme.colors.ink, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  cameraGlyphTop: { position: 'absolute', width: 10, height: 4, top: -5, left: 4, backgroundColor: theme.colors.ink, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  cameraGlyphLens: { width: 8, height: 8, borderWidth: 2, borderColor: theme.colors.ink, borderRadius: 4 },
  cameraGlyphFlash: { position: 'absolute', top: 3, right: 3, width: 3, height: 3, borderRadius: 2, backgroundColor: theme.colors.ink },
  captureCopy: { flex: 1, gap: 3 },
  cta: { fontSize: 18, fontWeight: '900', letterSpacing: -0.2, color: theme.colors.ink },
  hint: { fontSize: 12, color: theme.colors.accentDark },
  captureArrow: { color: theme.colors.ink, fontSize: 23, fontWeight: '700' },
  galleryPressed: { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.accentDark },
  gallery: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.md, paddingHorizontal: 16, minHeight: 72, marginTop: 10 },
  galleryIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  galleryGlyph: { width: 23, height: 21 },
  galleryGlyphBack: { position: 'absolute', top: 0, right: 0, width: 17, height: 14, borderWidth: 1.5, borderColor: theme.colors.subtle, borderRadius: 3 },
  galleryGlyphFront: { position: 'absolute', bottom: 0, left: 0, width: 17, height: 14, borderWidth: 1.7, borderColor: theme.colors.ink, borderRadius: 3, backgroundColor: theme.colors.surfaceMuted, overflow: 'hidden' },
  galleryGlyphSun: { position: 'absolute', top: 2, right: 3, width: 3.5, height: 3.5, borderRadius: 2, backgroundColor: theme.colors.accentDark },
  galleryGlyphHorizon: { position: 'absolute', bottom: 1, left: 2, width: 11, height: 7, borderTopWidth: 1.5, borderRightWidth: 1.5, borderColor: theme.colors.ink, transform: [{ rotate: '-28deg' }] },
  galleryCopy: { flex: 1, gap: 3 },
  galleryTitle: { fontSize: 14, fontWeight: '800', color: theme.colors.ink },
  galleryHint: { fontSize: 12, color: theme.colors.subtle },
  galleryArrow: { color: theme.colors.subtle, fontSize: 22 },
  privacy: { fontSize: 12, lineHeight: 18, color: theme.colors.muted, marginTop: 14, marginBottom: 8 },
  examples: { backgroundColor: theme.colors.surface, padding: 18, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.line, marginTop: 18, gap: 12 },
  examplesHeading: { color: theme.colors.ink, fontSize: 16, fontWeight: '800', marginBottom: 1 },
  exampleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  exampleMarker: { width: 10, height: 34, borderRadius: 5 },
  exampleCopy: { flex: 1, gap: 2 },
  exampleTitle: { color: theme.colors.ink, fontSize: 14, fontWeight: '800' },
  exampleDescription: { color: theme.colors.muted, fontSize: 12, lineHeight: 17 },
  exampleDivider: { height: 1, backgroundColor: theme.colors.line, marginLeft: 22 },
  modeHeading: { fontSize: 30, lineHeight: 35, letterSpacing: -0.9, fontWeight: '800', color: theme.colors.ink, marginTop: 10, marginBottom: 8 },
  chooserDescription: { color: theme.colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 },
  backToResult: { alignSelf: 'flex-start', marginBottom: 15, minHeight: 40, justifyContent: 'center' },
  backToResultText: { color: theme.colors.accentDark, fontSize: 13, fontWeight: '800' },
  mode: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 13, minHeight: 82, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.line, marginBottom: 9 },
  modeGlyph: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  intentGlyph: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center' },
  intentPlusVertical: { position: 'absolute', width: 3, height: 19, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentPlusHorizontal: { position: 'absolute', width: 19, height: 3, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentArrowLine: { position: 'absolute', width: 20, height: 3, borderRadius: 2, backgroundColor: theme.colors.ink, transform: [{ rotate: '-45deg' }] },
  intentArrowHeadA: { position: 'absolute', width: 9, height: 3, top: 3, right: 2, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentArrowHeadB: { position: 'absolute', width: 3, height: 9, top: 3, right: 2, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentToolShaft: { position: 'absolute', width: 4, height: 20, borderRadius: 2, backgroundColor: theme.colors.ink, transform: [{ rotate: '42deg' }] },
  intentToolHandle: { position: 'absolute', bottom: 1, left: 3, width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: theme.colors.ink, backgroundColor: theme.colors.peach },
  intentToolHead: { position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: theme.colors.ink, backgroundColor: theme.colors.peach },
  intentPotRim: { position: 'absolute', top: 7, width: 20, height: 2.5, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentPotBody: { position: 'absolute', top: 10, width: 15, height: 9, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.ink },
  intentPotHandleLeft: { position: 'absolute', top: 11, left: 0, width: 5, height: 4, borderWidth: 1.5, borderColor: theme.colors.ink, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  intentPotHandleRight: { position: 'absolute', top: 11, right: 0, width: 5, height: 4, borderWidth: 1.5, borderColor: theme.colors.ink, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  intentPotSteamA: { position: 'absolute', top: 0, left: 8, width: 2, height: 5, borderRadius: 1, backgroundColor: theme.colors.ink },
  intentPotSteamB: { position: 'absolute', top: 1, right: 8, width: 2, height: 4, borderRadius: 1, backgroundColor: theme.colors.ink },
  intentSparkVertical: { position: 'absolute', width: 3, height: 23, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentSparkHorizontal: { position: 'absolute', width: 23, height: 3, borderRadius: 2, backgroundColor: theme.colors.ink },
  intentSparkDiagonal: { position: 'absolute', width: 3, height: 20, borderRadius: 2, backgroundColor: theme.colors.ink, transform: [{ rotate: '45deg' }] },
  modeCopy: { flex: 1, minWidth: 0 },
  modeTitle: { color: theme.colors.ink, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  modeDesc: { color: theme.colors.muted, fontSize: 13, lineHeight: 19, marginTop: 3 },
  modeArrow: { color: theme.colors.accentDark, fontSize: 18, fontWeight: '700' },
  modePressed: { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.accentDark, transform: [{ scale: 0.995 }] },
  modeSwitch: { padding: 16, marginTop: 14, backgroundColor: theme.colors.surface, borderColor: theme.colors.controlBorder, borderWidth: 1, borderRadius: 16, alignItems: 'center' },
  secondary: { padding: 18, alignItems: 'center', marginTop: 8 },
  secondaryText: { fontSize: 14, fontWeight: '800', color: theme.colors.ink },
});
