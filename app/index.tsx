import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { UseitApiProvider, analyzeForConsumer } from '../src/core/intelligence/apiClient';
import type { OpportunityKind } from '../src/core/intelligence/types';
import type { ConsumerAnalysis } from '../src/core/intelligence/apiClient';
import { permissionDecision } from '../src/core/intelligence/permissionDecision';
import { useProfilePreferences } from '../src/ui/useProfilePreferences';
import { theme } from '../src/ui/theme';
import { FadeIn, ProductCard, SectionHeader, StatePanel } from '../src/ui/components';

const API_URL = process.env.EXPO_PUBLIC_USEIT_API_URL || '';

const modes: { id: OpportunityKind; title: string; description: string; symbol: string; tint: string }[] = [
  { id: 'create', title: 'CREATE', description: 'Turn what you have into something new.', symbol: '✳', tint: theme.colors.accent },
  { id: 'improve', title: 'IMPROVE', description: 'Make your space or things better.', symbol: '↗', tint: theme.colors.mint },
  { id: 'fix', title: 'FIX', description: 'Find a practical way forward.', symbol: '⌁', tint: theme.colors.blue },
  { id: 'cook', title: 'COOK', description: 'Make something with what you have.', symbol: '✳', tint: theme.colors.peach },
  { id: 'surprise', title: 'SURPRISE ME', description: 'Discover an idea you would not expect.', symbol: '✦', tint: theme.colors.lavender },
];

export default function Home() {
  const { preferences, hydrated: preferencesHydrated } = useProfilePreferences();
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [rendered, setRendered] = useState<string | null>(null);
  const [result, setResult] = useState<ConsumerAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [lastIntent, setLastIntent] = useState<OpportunityKind | undefined>(undefined);

  const reset = () => {
    setPhoto(null);
    setResult(null);
    setRendered(null);
    setAnalysisError(null);
    setRenderError(null);
    setLastIntent(undefined);
  };

  async function analyze(intent?: OpportunityKind) {
    if (!preferencesHydrated) return;
    const effectiveIntent = preferences.personalizedIdeas ? intent : undefined;
    setLastIntent(effectiveIntent);
    if (!API_URL) {
      Alert.alert('USEIT is not connected', 'Set EXPO_PUBLIC_USEIT_API_URL before running the real vision flow.');
      return;
    }
    if (!photo) return;
    setBusy(true);
    setAnalysisError(null);
    setRendered(null);
    try {
      const response = await analyzeForConsumer(new UseitApiProvider(API_URL), photo, effectiveIntent);
      setResult(response);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Please try again with a clearer photo.');
    } finally {
      setBusy(false);
    }
  }

  async function createVisualConcept() {
    if (!photo || !result?.phase3?.redesign) return;
    setRendering(true);
    setRenderError(null);
    try {
      const api = new UseitApiProvider(API_URL);
      const products = result.phase3.redesign.products.map((product) => ({
        title: product.title,
        category: product.category,
        priceHuf: product.priceHuf,
        url: product.url,
        id: product.productId,
      }));
      const renderedResult = await api.renderRedesign(photo, result.phase3.redesign.prompt, products);
      setRendered(renderedResult.imageDataUrl);
    } catch (error) {
      setRenderError(error instanceof Error ? error.message : 'The redesign could not be rendered. The selected solution is still available.');
    } finally {
      setRendering(false);
    }
  }

  async function chooseGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const decision = permissionDecision(permission.granted, permission.canAskAgain);
    if (decision !== 'granted') {
      if (decision === 'open_settings') {
        Alert.alert('Photos access is disabled', 'Enable photo library access in Settings to choose an image.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => { void Linking.openSettings(); } },
        ]);
      } else {
        Alert.alert('Photos permission needed', 'USEIT needs access to a photo you want to explore.', [
          { text: 'Not now', style: 'cancel' },
          { text: 'Try again', onPress: () => { void chooseGallery(); } },
        ]);
      }
      return;
    }
    const selection = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (selection.canceled) return;
    const asset = selection.assets[0];
    if (!asset.base64) {
      Alert.alert('Photo unavailable', 'USEIT could not read this image.');
      return;
    }
    setPhoto(`data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`);
    setResult(null);
    setRendered(null);
    setAnalysisError(null);
    setRenderError(null);
  }

  async function capture() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    const decision = permissionDecision(permission.granted, permission.canAskAgain);
    if (decision !== 'granted') {
      if (decision === 'open_settings') {
        Alert.alert('Camera access is disabled', 'Enable camera access in Settings to take a photo.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => { void Linking.openSettings(); } },
        ]);
      } else {
        Alert.alert('Camera permission needed', 'USEIT needs camera access to photograph what you want to explore.', [
          { text: 'Not now', style: 'cancel' },
          { text: 'Try again', onPress: () => { void capture(); } },
        ]);
      }
      return;
    }
    const captureResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
    });
    if (captureResult.canceled) return;
    const asset = captureResult.assets[0];
    if (!asset.base64) {
      Alert.alert('Photo unavailable', 'USEIT could not read the captured image.');
      return;
    }
    setPhoto(`data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`);
    setResult(null);
    setRendered(null);
    setAnalysisError(null);
    setRenderError(null);
  }

  const confidence = Math.round((result?.intelligence?.intentConfidence || 0) * 100);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.canvas} />
      <ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
        {!photo ? (
          <View>
            <View style={s.header}>
              <View style={s.wordmarkRow}>
                <View style={s.brandMark}><View style={s.brandDot} /><View style={s.brandDotSmall} /></View>
                <Text style={s.logo}>USEIT</Text>
              </View>
              <View style={s.headerBadge}><View style={s.statusDot} /><Text style={s.headerBadgeText}>SEE WHAT'S POSSIBLE</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" onPress={() => router.push('/profile')} style={s.profileShortcut}><Text style={s.profileShortcutText}>U</Text></Pressable>
            </View>

            <View style={s.heroBlock}>
              <Text style={s.overline}>A NEW WAY TO LOOK AT EVERYDAY THINGS</Text>
              <Text style={s.hero}>Show me what{ '\n' }you have.</Text>
              <Text style={s.heroSub}>One photo can lead to a hundred possibilities. Let's find the useful one.</Text>
            </View>

            <Pressable accessibilityRole="button" accessibilityLabel="Take a photo" onPress={capture} style={({ pressed }) => [s.capture, pressed && s.pressed]}>
              <LinearGradient colors={[theme.colors.captureStart, theme.colors.captureEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.captureGradient}>
                <View style={s.cameraGlyph}><View style={s.cameraLens} /></View>
                <View style={s.captureCopy}>
                  <Text style={s.captureTitle}>SHOW ME</Text>
                  <Text style={s.captureSub}>Take a photo</Text>
                </View>
                <View style={s.captureArrow}><Text style={s.captureArrowText}>↗</Text></View>
              </LinearGradient>
            </Pressable>

            <Pressable accessibilityRole="button" onPress={chooseGallery} style={({ pressed }) => [s.gallery, pressed && s.pressed]}>
              <View style={s.galleryIcon}><Text style={s.galleryIconText}>▧</Text></View>
              <View style={s.galleryCopy}>
                <Text style={s.galleryTitle}>Choose from gallery</Text>
                <Text style={s.galleryHint}>Use a photo you already have</Text>
              </View>
              <Text style={s.galleryChevron}>›</Text>
            </Pressable>

            <View style={s.dividerRow}><View style={s.dividerLine} /><Text style={s.dividerLabel}>MADE FOR THE EVERYDAY</Text><View style={s.dividerLine} /></View>
            <View style={s.tagRow}>
              {['SPACES', 'OBJECTS', 'FOOD', 'IDEAS'].map((item) => <View style={s.tag} key={item}><Text style={s.tagText}>{item}</Text></View>)}
            </View>
            <View style={s.bottomNote}><Text style={s.bottomNoteText}>LOOK CLOSER. FIND MORE.</Text><Text style={s.bottomSpark}>✳</Text></View>
          </View>
        ) : (
          <View>
            <View style={s.topBar}>
              <View style={s.wordmarkRow}><View style={s.brandMarkSmall}><View style={s.brandDot} /><View style={s.brandDotSmall} /></View><Text style={s.smallLogo}>USEIT</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Close and start over" onPress={reset} style={s.closeButton}><Text style={s.closeText}>×</Text></Pressable>
            </View>

            <View style={s.photoFrame}>
              <Image source={{ uri: rendered || photo }} style={rendered ? s.rendered : s.photo} resizeMode="cover" />
              <View style={s.photoPill}><View style={s.photoPillDot} /><Text style={s.photoPillText}>{rendered ? 'AI VISUAL CONCEPT' : 'YOUR PHOTO'}</Text></View>
            </View>
            {rendered ? (
              <View style={s.comparisonBlock}>
                <Text style={s.comparisonHeading}>FROM IDEA TO VISUAL</Text>
                <View style={s.comparisonRow}>
                  <View style={s.comparisonItem}><Image source={{ uri: photo }} style={s.comparisonImage} /><Text style={s.comparisonLabel}>ORIGINAL</Text></View>
                  <View style={s.comparisonItem}><Image source={{ uri: rendered }} style={s.comparisonImage} /><Text style={s.comparisonLabel}>USEIT CONCEPT</Text></View>
                </View>
                <Text style={s.disclosure}>{result?.phase3?.redesign?.disclosure}</Text>
              </View>
            ) : null}

            {busy || rendering ? (
              <View style={s.loadingCard}>
                <ActivityIndicator size="large" color={theme.colors.ink} />
                <Text style={s.loadingTitle}>{busy ? 'Finding the possibilities…' : 'Bringing the idea to life…'}</Text>
                <Text style={s.loadingSub}>{busy ? 'Understanding the details in your photo.' : 'Creating a visual concept from your plan.'}</Text>
              </View>
            ) : analysisError ? (
              <View style={{ marginTop: 22 }}><StatePanel kind="error" title="We couldn't finish that" description={analysisError} actionLabel="TRY AGAIN" onAction={() => analyze(lastIntent)} /></View>
            ) : result ? (
              <View>
                <FadeIn>
                  <View style={s.resultIntro}>
                    <Text style={s.overline}>ONE IDEA TO START WITH</Text>
                    <Text style={s.resultTitle}>{result.hero?.title || result.intelligence?.action?.title || 'Here is what I found'}</Text>
                    <Text style={s.resultSub}>{result.hero?.description || 'USEIT has turned the scene into a concrete next action.'}</Text>
                  </View>
                </FadeIn>

                {result.intelligence?.clarificationRequired ? (
                  <View style={s.notice}>
                    <Text style={s.noticeTitle}>A LITTLE MORE CONTEXT</Text>
                    <Text style={s.noticeText}>I'm not confident enough to make a consequential recommendation yet. A little more detail will help.</Text>
                  </View>
                ) : null}

                <Text style={s.sectionLabel}>YOUR NEXT STEP</Text>
                <View style={s.actionCard}>
                  <View style={s.actionTop}><Text style={s.actionEyebrow}>{result.intelligence?.need?.kind?.replace(/_/g, ' ').toUpperCase() || 'GENERAL IDEA'}</Text><View style={s.confidencePill}><Text style={s.confidenceText}>{confidence}% MATCH</Text></View></View>
                  <Text style={s.actionTitle}>{result.intelligence?.action?.title || 'Next step'}</Text>
                  <Text style={s.actionType}>{result.intelligence?.action?.type?.replace(/_/g, ' ') || 'recommendation'}</Text>
                </View>

                {result.observed.length > 0 ? (
                  <View>
                    <SectionHeader eyebrow="WHAT WE NOTICED" detail={`${result.observed.length} DETAILS`} />
                    <View style={s.observedWrap}>{result.observed.map((item) => <View key={item} style={s.observedChip}><Text style={s.observedText}>{item}</Text></View>)}</View>
                  </View>
                ) : null}

                {result.alternatives.length > 0 ? (
                  <View>
                    <SectionHeader eyebrow="OTHER DIRECTIONS" detail="EXPLORE MORE" />
                    {result.alternatives.map((item) => <View key={item.id} style={s.alternativeCard}><Text style={s.alternativeTitle}>{item.title}</Text><Text style={s.alternativeDescription}>{item.description}</Text><Text style={s.alternativeMeta}>{item.effort.toUpperCase()}{item.durationMinutes ? ` · ${item.durationMinutes} MIN` : ''}</Text></View>)}
                  </View>
                ) : null}

                {result.cautions.length > 0 ? (
                  <View style={s.cautionCard}><Text style={s.cautionTitle}>A NOTE BEFORE YOU START</Text>{result.cautions.map((item, index) => <Text key={`${index}-${item}`} style={s.cautionText}>•  {item}</Text>)}</View>
                ) : null}

                {result.phase3?.redesign ? (
                  <View>
                    <Text style={s.sectionLabel}>REDESIGN PLAN</Text>
                    <View style={s.planCard}>
                      <View style={s.planIcon}><Text style={s.planIconText}>✳</Text></View>
                      <View style={s.planCopy}>
                        <Text style={s.planTitle}>{result.phase3.redesign.products.length} selected products</Text>
                        <Text style={s.planDescription}>{result.phase3.redesign.actions.filter((item) => item.type === 'add').map((item) => item.target).join(' · ') || 'Your existing scene, reimagined with a considered plan.'}</Text>
                      </View>
                    </View>
                  </View>
                ) : null}

                {preferences.productSuggestions && (result.intelligence?.rankedCandidates?.length ?? 0) > 0 ? (
                  <View>
                    <SectionHeader eyebrow="GOOD MATCHES" detail="TOP PICKS" />
                    {result.intelligence.rankedCandidates.slice(0, 5).map((item) => (
                      <ProductCard key={item.id} title={item.title} category={item.category} source={item.source} price={item.priceHuf} onPress={item.url ? () => Linking.openURL(item.url) : undefined} />
                    ))}
                  </View>
                ) : (
                  <View style={{ marginTop: 22 }}><StatePanel kind="empty" title={preferences.productSuggestions ? 'No product matches yet' : 'Product suggestions are off'} description={preferences.productSuggestions ? "The idea is ready. We couldn't find a product worth recommending this time." : 'Turn product suggestions back on in your profile to see matching items.'} actionLabel={preferences.productSuggestions ? undefined : 'OPEN PREFERENCES'} onAction={preferences.productSuggestions ? undefined : () => router.push('/profile')} /></View>
                )}

                {renderError ? <View style={{ marginTop: 14 }}><StatePanel kind="error" title="The visual concept isn't ready" description={renderError} actionLabel="TRY AGAIN" onAction={createVisualConcept} /></View> : null}
                {result.phase3?.redesign ? (
                  <Pressable accessibilityRole="button" onPress={createVisualConcept} style={({ pressed }) => [s.primaryButton, pressed && s.pressed]}>
                    <Text style={s.primaryButtonText}>CREATE VISUAL CONCEPT</Text><Text style={s.primaryButtonArrow}>↗</Text>
                  </Pressable>
                ) : null}
                <Pressable accessibilityRole="button" onPress={reset} style={s.secondaryButton}><Text style={s.secondaryButtonText}>TRY ANOTHER PHOTO</Text></Pressable>
              </View>
            ) : (
              {!preferencesHydrated ? (
                <View style={s.loadingCard} accessibilityRole="progressbar" accessibilityLabel="Loading saved preferences">
                  <ActivityIndicator size="large" color={theme.colors.ink} />
                  <Text style={s.loadingTitle}>Getting things ready…</Text>
                  <Text style={s.loadingSub}>Loading your saved preferences before we personalize the result.</Text>
                </View>
              ) : (
                <View style={s.modeBlock}>
                  <Text style={s.overline}>WHAT'S YOUR INTENTION?</Text>
                  <Text style={s.modeTitle}>What should we{ '\n' }do with this?</Text>
                  <Text style={s.modeSub}>Choose a direction. USEIT will take it from here.</Text>
                  {preferences.personalizedIdeas ? modes.map((mode) => (
                    <Pressable accessibilityRole="button" key={mode.id} onPress={() => analyze(mode.id)} style={({ pressed }) => [s.modeCard, pressed && s.pressed]}>
                      <View style={[s.modeSymbol, { backgroundColor: mode.tint }]}><Text style={s.modeSymbolText}>{mode.symbol}</Text></View>
                      <View style={s.modeCopy}><Text style={s.modeName}>{mode.title}</Text><Text style={s.modeDescription}>{mode.description}</Text></View>
                      <Text style={s.modeArrow}>↗</Text>
                    </Pressable>
                  )) : (
                    <Pressable accessibilityRole="button" accessibilityLabel="Explore this photo without personalized ideas" onPress={() => analyze()} style={({ pressed }) => [s.modeCard, pressed && s.pressed]}>
                      <View style={[s.modeSymbol, { backgroundColor: theme.colors.accent }]}><Text style={s.modeSymbolText}>✳</Text></View>
                      <View style={s.modeCopy}><Text style={s.modeName}>EXPLORE</Text><Text style={s.modeDescription}>Let USEIT choose a useful direction without personalized intent.</Text></View>
                      <Text style={s.modeArrow}>↗</Text>
                    </Pressable>
                  )}
                  <Pressable accessibilityRole="button" accessibilityLabel="Use a different photo" onPress={reset} style={s.changePhoto}><Text style={s.changePhotoText}>USE A DIFFERENT PHOTO</Text></Pressable>
                </View>
              )}
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  page: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 54 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 54 },
  wordmarkRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 25, height: 25, borderRadius: 9, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  brandMarkSmall: { width: 21, height: 21, borderRadius: 7, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  brandDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent, position: 'absolute', top: 5, left: 5 },
  brandDotSmall: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.surface, position: 'absolute', bottom: 5, right: 5 },
  logo: { color: theme.colors.ink, fontSize: 20, fontWeight: '900', letterSpacing: -1.1 },
  smallLogo: { color: theme.colors.ink, fontSize: 16, fontWeight: '900', letterSpacing: -0.7 },
  headerBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, paddingHorizontal: 10, paddingVertical: 8, borderRadius: theme.radius.pill },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.status },
  headerBadgeText: { color: theme.colors.muted, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  profileShortcut: { width: 34, height: 34, borderRadius: 17, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center' },
  profileShortcutText: { color: theme.colors.accent, fontSize: 13, fontWeight: '900' },
  heroBlock: { marginBottom: 30 },
  overline: { color: theme.colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.8, lineHeight: 14 },
  hero: { color: theme.colors.ink, fontSize: 48, lineHeight: 49, letterSpacing: -2.8, fontWeight: '800', marginTop: 14 },
  heroSub: { color: theme.colors.muted, fontSize: 15, lineHeight: 23, marginTop: 17, maxWidth: 310 },
  capture: { borderRadius: 25, overflow: 'hidden', marginBottom: 12 },
  captureGradient: { minHeight: 112, paddingHorizontal: 19, paddingVertical: 19, flexDirection: 'row', alignItems: 'center' },
  cameraGlyph: { width: 48, height: 48, borderRadius: 17, borderWidth: 1.5, borderColor: theme.colors.cameraOutline, alignItems: 'center', justifyContent: 'center' },
  cameraLens: { width: 19, height: 19, borderRadius: 10, borderWidth: 3, borderColor: theme.colors.accent },
  captureCopy: { flex: 1, marginLeft: 15 },
  captureTitle: { color: theme.colors.surface, fontSize: 17, fontWeight: '900', letterSpacing: 1 },
  captureSub: { color: theme.colors.captureTextMuted, fontSize: 12, marginTop: 4 },
  captureArrow: { width: 35, height: 35, borderRadius: 18, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  captureArrowText: { color: theme.colors.ink, fontSize: 18, fontWeight: '800' },
  gallery: { minHeight: 76, backgroundColor: theme.colors.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.line, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' },
  galleryIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  galleryIconText: { color: theme.colors.ink, fontSize: 22 },
  galleryCopy: { flex: 1, marginLeft: 12 },
  galleryTitle: { color: theme.colors.ink, fontSize: 13, fontWeight: '800' },
  galleryHint: { color: theme.colors.subtle, fontSize: 11, marginTop: 4 },
  galleryChevron: { color: theme.colors.subtle, fontSize: 26, paddingHorizontal: 4 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 34, marginBottom: 15 },
  dividerLine: { height: 1, backgroundColor: theme.colors.line, flex: 1 },
  dividerLabel: { color: theme.colors.subtle, fontSize: 8, fontWeight: '900', letterSpacing: 1.5 },
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.pill, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.45)' },
  tagText: { color: theme.colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  bottomNote: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 54 },
  bottomNoteText: { color: theme.colors.subtle, fontSize: 8, fontWeight: '900', letterSpacing: 2 },
  bottomSpark: { color: theme.colors.accentDark, fontSize: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  closeButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.line },
  closeText: { color: theme.colors.ink, fontSize: 26, lineHeight: 28 },
  photoFrame: { position: 'relative', borderRadius: 25, overflow: 'hidden', backgroundColor: theme.colors.surfaceMuted },
  photo: { width: '100%', height: 290 },
  rendered: { width: '100%', height: 390 },
  photoPill: { position: 'absolute', left: 13, bottom: 13, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(20,24,21,0.82)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: theme.radius.pill },
  photoPillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.accent },
  photoPillText: { color: theme.colors.surface, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  comparisonBlock: { marginTop: 16, backgroundColor: theme.colors.surface, borderRadius: 20, padding: 12, borderWidth: 1, borderColor: theme.colors.line },
  comparisonHeading: { color: theme.colors.muted, fontSize: 8, fontWeight: '900', letterSpacing: 1.4, marginBottom: 10 },
  comparisonRow: { flexDirection: 'row', gap: 9 },
  comparisonItem: { flex: 1 },
  comparisonImage: { width: '100%', height: 118, borderRadius: 13, backgroundColor: theme.colors.surfaceMuted },
  comparisonLabel: { color: theme.colors.muted, fontSize: 8, fontWeight: '900', letterSpacing: 0.8, marginTop: 7 },
  disclosure: { color: theme.colors.muted, fontSize: 10, lineHeight: 16, marginTop: 10 },
  observedWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  observedChip: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.pill, paddingHorizontal: 11, paddingVertical: 8 },
  observedText: { color: theme.colors.ink, fontSize: 10, fontWeight: '700' },
  alternativeCard: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 17, padding: 15, marginBottom: 8 },
  alternativeTitle: { color: theme.colors.ink, fontSize: 13, fontWeight: '800' },
  alternativeDescription: { color: theme.colors.muted, fontSize: 11, lineHeight: 17, marginTop: 5 },
  alternativeMeta: { color: theme.colors.accentDark, fontSize: 8, fontWeight: '900', letterSpacing: 0.9, marginTop: 9 },
  cautionCard: { backgroundColor: theme.colors.peach, borderRadius: 17, padding: 15, marginTop: 18 },
  cautionTitle: { color: theme.colors.ink, fontSize: 8, fontWeight: '900', letterSpacing: 1.1, marginBottom: 7 },
  cautionText: { color: theme.colors.ink, fontSize: 10, lineHeight: 16, marginTop: 3 },
  loadingCard: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 22, padding: 28, marginTop: 18 },
  loadingTitle: { color: theme.colors.ink, fontSize: 17, fontWeight: '800', marginTop: 17 },
  loadingSub: { color: theme.colors.muted, fontSize: 12, marginTop: 6, textAlign: 'center' },
  resultIntro: { marginTop: 28, marginBottom: 22 },
  resultTitle: { color: theme.colors.ink, fontSize: 35, lineHeight: 38, letterSpacing: -1.7, fontWeight: '800', marginTop: 10 },
  resultSub: { color: theme.colors.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  notice: { backgroundColor: theme.colors.peach, borderRadius: 18, padding: 16, marginBottom: 18 },
  noticeTitle: { color: theme.colors.ink, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  noticeText: { color: theme.colors.ink, fontSize: 12, lineHeight: 18, marginTop: 6 },
  sectionLabel: { color: theme.colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.6, marginTop: 23, marginBottom: 10 },
  actionCard: { backgroundColor: theme.colors.dark, borderRadius: 22, padding: 20 },
  actionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionEyebrow: { color: theme.colors.darkMuted, fontSize: 9, fontWeight: '900', letterSpacing: 1.2, flex: 1 },
  confidencePill: { backgroundColor: theme.colors.confidenceSurface, borderRadius: theme.radius.pill, paddingHorizontal: 9, paddingVertical: 6 },
  confidenceText: { color: theme.colors.accent, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  actionTitle: { color: theme.colors.surface, fontSize: 21, lineHeight: 26, fontWeight: '800', marginTop: 15 },
  actionType: { color: theme.colors.darkMuted, fontSize: 11, textTransform: 'capitalize', marginTop: 8 },
  planCard: { backgroundColor: theme.colors.surface, borderRadius: 19, padding: 16, borderWidth: 1, borderColor: theme.colors.line, flexDirection: 'row', alignItems: 'center' },
  planIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center' },
  planIconText: { color: theme.colors.ink, fontSize: 20 },
  planCopy: { flex: 1, marginLeft: 12 },
  planTitle: { color: theme.colors.ink, fontSize: 14, fontWeight: '800' },
  planDescription: { color: theme.colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionHint: { color: theme.colors.subtle, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  productCard: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 17, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  productIndex: { width: 38, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  productIndexLime: { backgroundColor: theme.colors.accent },
  productIndexMint: { backgroundColor: theme.colors.mint },
  productIndexText: { color: theme.colors.ink, fontSize: 11, fontWeight: '900' },
  productMain: { flex: 1, paddingHorizontal: 11 },
  productTitle: { color: theme.colors.ink, fontSize: 12, fontWeight: '800' },
  productMeta: { color: theme.colors.subtle, fontSize: 10, marginTop: 5 },
  productPriceWrap: { alignItems: 'flex-end' },
  price: { color: theme.colors.ink, fontSize: 11, fontWeight: '900' },
  productLink: { color: theme.colors.productLink, fontSize: 8, fontWeight: '900', letterSpacing: 0.7, marginTop: 5 },
  primaryButton: { backgroundColor: theme.colors.accent, borderRadius: 18, paddingHorizontal: 18, paddingVertical: 18, marginTop: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryButtonText: { color: theme.colors.ink, fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  primaryButtonArrow: { color: theme.colors.ink, fontSize: 18, fontWeight: '800' },
  secondaryButton: { alignItems: 'center', padding: 18, marginTop: 5 },
  secondaryButtonText: { color: theme.colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  modeBlock: { marginTop: 28 },
  modeTitle: { color: theme.colors.ink, fontSize: 34, lineHeight: 37, letterSpacing: -1.6, fontWeight: '800', marginTop: 10 },
  modeSub: { color: theme.colors.muted, fontSize: 13, lineHeight: 20, marginTop: 9, marginBottom: 20 },
  modeCard: { minHeight: 78, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.line, borderRadius: 19, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  modeSymbol: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  modeSymbolText: { color: theme.colors.ink, fontSize: 21, fontWeight: '700' },
  modeCopy: { flex: 1, marginLeft: 13 },
  modeName: { color: theme.colors.ink, fontSize: 12, fontWeight: '900', letterSpacing: 0.7 },
  modeDescription: { color: theme.colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  modeArrow: { color: theme.colors.subtle, fontSize: 17, paddingHorizontal: 5 },
  changePhoto: { alignItems: 'center', padding: 15, marginTop: 5 },
  changePhotoText: { color: theme.colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
