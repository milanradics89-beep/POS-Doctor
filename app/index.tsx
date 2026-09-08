import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { UseitApiProvider, analyzeForConsumer } from '../src/core/intelligence/apiClient';
import type { OpportunityKind } from '../src/core/intelligence/types';
import type { ConsumerAnalysis } from '../src/core/intelligence/apiClient';

const API_URL = process.env.EXPO_PUBLIC_USEIT_API_URL || '';

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

  const reset = () => {
    setPhoto(null);
    setResult(null);
    setRendered(null);
  };

  async function analyze(intent?: OpportunityKind) {
    if (!API_URL) {
      Alert.alert(
        'USEIT is not connected',
        'Set EXPO_PUBLIC_USEIT_API_URL before running the real vision flow.'
      );
      return;
    }

    if (!photo) return;

    setBusy(true);
    setRendered(null);

    try {
      const response = await analyzeForConsumer(
        new UseitApiProvider(API_URL),
        photo,
        intent
      );
      setResult(response);
    } catch (error) {
      Alert.alert(
        'Could not understand the image',
        error instanceof Error
          ? error.message
          : 'Please try again with a clearer photo.'
      );
    } finally {
      setBusy(false);
    }
  }

  async function createVisualConcept() {
    if (!photo || !result?.phase3?.redesign) return;

    setRendering(true);

    try {
      const api = new UseitApiProvider(API_URL);

      const products = result.phase3.redesign.products.map((product) => ({
        title: product.title,
        category: product.category,
        priceHuf: product.priceHuf,
        url: product.url,
        id: product.productId,
      }));

      const renderedResult = await api.renderRedesign(
        photo,
        result.phase3.redesign.prompt,
        products
      );

      setRendered(renderedResult.imageDataUrl);
    } catch {
      Alert.alert(
        'Visual concept failed',
        'The redesign could not be rendered. The selected solution is still available.'
      );
    } finally {
      setRendering(false);
    }
  }

  async function chooseGallery() {
    const p = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!p.granted) {
      Alert.alert(
        'Photos permission needed',
        'Allow USEIT to access a photo you want to explore.'
      );
      return;
    }

    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (r.canceled) return;

    const a = r.assets[0];

    if (!a.base64) {
      Alert.alert(
        'Photo unavailable',
        'USEIT could not read this image.'
      );
      return;
    }

    setPhoto(`data:${a.mimeType || 'image/jpeg'};base64,${a.base64}`);
    setResult(null);
    setRendered(null);
  }

  async function capture() {
    const p = await ImagePicker.requestCameraPermissionsAsync();

    if (!p.granted) {
      Alert.alert(
        'Camera permission needed',
        'Allow USEIT to see what you want to explore.'
      );
      return;
    }

    const r = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
    });

    if (r.canceled) return;

    const a = r.assets[0];

    if (!a.base64) {
      Alert.alert(
        'Photo unavailable',
        'USEIT could not read the captured image.'
      );
      return;
    }

    setPhoto(`data:${a.mimeType || 'image/jpeg'};base64,${a.base64}`);
    setResult(null);
    setRendered(null);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.page}>
        {!photo ? (
          <>
            <Text style={s.logo}>USEIT</Text>

            <Text style={s.kicker}>SEE WHAT’S POSSIBLE</Text>

            <Text style={s.hero}>
              Show me what{`\n`}you have.
            </Text>

            <Text style={s.sub}>
              Point your camera at almost anything. USEIT helps you discover what you can do with it.
            </Text>

            <Pressable onPress={capture} style={s.capture}>
              <LinearGradient colors={['#111', '#3b3b3b']} style={s.grad}>
                <Text style={s.cam}>⌾</Text>
                <Text style={s.cta}>SHOW ME</Text>
                <Text style={s.hint}>Take a photo</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={chooseGallery} style={s.gallery}>
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
          </>
        ) : (
          <>
            <View style={s.top}>
              <Text style={s.small}>USEIT</Text>
              <Pressable onPress={reset}>
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>

            {rendered ? (
              <>
                <Text style={s.kicker}>VISUAL CONCEPT</Text>
                <Image source={{ uri: rendered }} style={s.rendered} />
                <Text style={s.disclosure}>
                  {result?.phase3?.redesign?.disclosure}
                </Text>
              </>
            ) : (
              <Image source={{ uri: photo }} style={s.photo} />
            )}

            {busy ? (
              <View style={s.loading}>
                <ActivityIndicator size="large" />
                <Text style={s.load}>Understanding what I see…</Text>
              </View>
            ) : rendering ? (
              <View style={s.loading}>
                <ActivityIndicator size="large" />
                <Text style={s.load}>Creating your visual concept…</Text>
              </View>
            ) : result ? (
              <>
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

                {result.phase3?.redesign ? (
                  <>
                    <Text style={s.section}>REDESIGN SOLUTION</Text>

                    <View style={s.solution}>
                      <Text style={s.solutionTitle}>
                        {result.phase3.redesign.products.length} selected products
                      </Text>

                      <Text style={s.solutionText}>
                        {result.phase3.redesign.actions
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
                    <Text style={s.section}>MATCHING OPTIONS</Text>

                    {result.intelligence.rankedCandidates
                      .slice(0, 5)
                      .map((x) => (
                        <Pressable
                          style={s.product}
                          key={x.id}
                          onPress={() => x.url && Linking.openURL(x.url)}
                        >
                          <View style={s.productMain}>
                            <Text style={s.productTitle}>{x.title}</Text>
                            <Text style={s.productMeta}>
                              {x.category} · {x.source}
                            </Text>
                          </View>

                          <Text style={s.price}>
                            {x.priceHuf?.toLocaleString('hu-HU') ?? 0} Ft
                          </Text>
                        </Pressable>
                      ))}
                  </>
                ) : null}

                {result.phase3?.redesign ? (
                  <Pressable
                    style={s.primary}
                    onPress={createVisualConcept}
                  >
                    <Text style={s.primaryText}>CREATE VISUAL CONCEPT</Text>
                  </Pressable>
                ) : null}

                <Pressable style={s.secondary} onPress={reset}>
                  <Text style={s.secondaryText}>TRY ANOTHER PHOTO</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={s.title}>What should I do with this?</Text>

                {modes.map(([a, b]) => (
                  <Pressable
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
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F2',
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
    color: '#111',
    marginTop: 12,
  },
  small: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -1,
  },
  close: {
    fontSize: 20,
    color: '#777',
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#777',
    marginTop: 32,
  },
  hero: {
    fontSize: 52,
    lineHeight: 53,
    fontWeight: '800',
    letterSpacing: -2.5,
    color: '#111',
    marginTop: 10,
  },
  title: {
    fontSize: 42,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -2,
    color: '#111',
    marginVertical: 20,
  },
  sub: {
    fontSize: 17,
    lineHeight: 25,
    color: '#666',
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
    color: '#fff',
  },
  cta: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#fff',
    marginTop: 8,
  },
  hint: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 6,
  },
  gallery: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
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
    color: '#888',
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
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 10,
    fontWeight: '800',
    color: '#777',
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
  loading: {
    alignItems: 'center',
    paddingTop: 55,
  },
  load: {
    marginTop: 14,
    color: '#666',
  },
  mode: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5df',
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  modeDesc: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    maxWidth: '85%',
  },
  arrow: {
    position: 'absolute',
    right: 18,
    top: 17,
    fontSize: 28,
    color: '#aaa',
  },
  section: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#888',
    marginTop: 26,
    marginBottom: 10,
  },
  action: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
  },
  actionType: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#aaa',
  },
  actionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#fff',
    marginTop: 7,
  },
  actionMeta: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 10,
  },
  solution: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e5df',
  },
  solutionTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  solutionText: {
    fontSize: 13,
    color: '#666',
    marginTop: 7,
  },
  product: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5df',
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
    color: '#888',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '900',
  },
  notice: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
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
    color: '#666',
    marginTop: 5,
  },
  primary: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 28,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '900',
  },
  disclosure: {
    fontSize: 11,
    lineHeight: 17,
    color: '#888',
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
    color: '#111',
  },
});
