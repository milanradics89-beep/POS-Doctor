import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { UseitApiProvider } from '../core/intelligence/apiClient';
import type { ConsumerAnalysis } from '../core/intelligence/apiClient';
import type { UseitShopping } from '../core/intelligence/useitAnalyzeContract';
import { isSafeExternalHttpUrl } from '../core/intelligence/externalLink';
import { ProductCard, StatePanel } from './components';
import { modeCopy, selectResult, type ResultMode } from './resultModel';
import { theme } from './theme';
import { productResultsState } from './productResultsState';
import { productPriceDisplay } from './productPresentation';

const API_URL = process.env.EXPO_PUBLIC_USEIT_API_URL || '';

type ActionProps = {
  label: string;
  hint: string;
  onPress: () => void;
  primary?: boolean;
  expanded?: boolean;
};

function ResultButton({ label, hint, onPress, primary, expanded }: ActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={expanded === undefined ? undefined : { expanded }}
      onPress={onPress}
      style={({ pressed }) => [s.button, primary && s.primary, pressed && s.pressed]}
    >
      <Text style={s.buttonText}>{label}</Text>
    </Pressable>
  );
}

export function PhotoComparison({ photo, concept }: { photo: string; concept: string }) {
  const [showConcept, setShowConcept] = useState(true);
  return (
    <View style={s.comparison}>
      <Text style={s.eyebrow}>{showConcept ? 'PROPOSED CONCEPT' : 'ORIGINAL PHOTO'}</Text>
      <Image
        accessible accessibilityLabel={showConcept ? 'Generated visual concept' : 'Your selected photo'}
        resizeMode="contain" source={{ uri: showConcept ? concept : photo }} style={s.comparisonImage}
      />
      <ResultButton
        label={showConcept ? 'Show original photo' : 'Show visual concept'}
        hint="Switches the comparison without generating another image."
        onPress={() => setShowConcept(!showConcept)}
      />
      <Text style={s.caption}>AI visualization. Appearance, scale and placement may differ from the real room.</Text>
    </View>
  );
}

function Lines({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  if (!items.length) return null;
  return (
    <View style={s.stack}>
      <Text accessibilityRole="header" style={s.sectionTitle}>{title}</Text>
      {items.map((item, i) => <Text key={i} style={s.body}>{ordered ? `${i + 1}. ` : '•  '}{item}</Text>)}
    </View>
  );
}

type Props = {
  result: ConsumerAnalysis;
  mode: ResultMode;
  onOpenProduct: (url: string) => void;
  onRefine: (text: string, target?: string) => void;
  onConcept?: () => void;
};

type ProductCandidate = NonNullable<UseitShopping>["candidates"][number];

function ProductCardRow({ item, onOpenProduct }: {
  item: ProductCandidate;
  onOpenProduct: Props["onOpenProduct"];
}) {
  const price = productPriceDisplay(item);
  return (
    <ProductCard
      title={item.name}
      category={item.brand ? `${item.brand} · ${item.category ?? 'general'}` : item.category ?? 'general'}
      source={item.retailer ?? 'USEIT'}
      price={price.price}
      currency={price.currency}
      onPress={isSafeExternalHttpUrl(item.url) ? () => onOpenProduct(item.url) : undefined}
    />
  );
}

function ProductResults({ shopping, onOpenProduct, onRetry }: {
  shopping: NonNullable<UseitShopping>;
  onOpenProduct: Props["onOpenProduct"];
  onRetry: () => void;
}) {
  const candidates = shopping.candidates;
  const status = productResultsState(candidates.length, shopping, true);
  if (!candidates.length && status === "unavailable") {
    return (
      <StatePanel
        kind="error"
        title="Product search unavailable"
        description="Your photo analysis is still available. Product listings could not be verified."
        actionLabel="TRY AGAIN"
        actionAccessibilityHint="Starts one new product search using the same text clues."
        onAction={onRetry}
      />
    );
  }
  if (!candidates.length) {
    return <StatePanel kind="empty" title="No matching products yet" description="Try a more specific product need or keep the photo-based recommendation." />;
  }
  return (
    <View style={s.stack}>
      <Text accessibilityRole="header" style={s.sectionTitle}>Matching products</Text>
      <Text style={s.caption}>Store listings. Confirm price, dimensions and availability with the retailer.</Text>
      {candidates.slice(0, 5).map(item => (
        <ProductCardRow key={item.id} item={item} onOpenProduct={onOpenProduct} />
      ))}
    </View>
  );
}

function useProductDiscovery(result: ConsumerAnalysis) {
  const need = result.unified?.actionable?.shoppingNeed;
  const query = need?.searchTerms.join(" ").replace(/\s+/g, " ").slice(0, 500) ?? "";
  const [shopping, setShopping] = useState<NonNullable<UseitShopping> | null>(result.unified?.shopping ?? null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => {
    const controller = controllerRef.current;
    controllerRef.current = null;
    controller?.abort();
  }, []);

  async function discover() {
    if (loading || controllerRef.current || query.length < 2) return;
    const controller = new AbortController();
    controllerRef.current = controller;
    setShopping(null);
    setLoading(true);
    setFailed(false);
    try {
      const response = await new UseitApiProvider(API_URL).discoverProducts(
        query,
        { limit: 8, maxResolve: 8, locale: "hu-HU", region: "HU" },
        controller.signal,
      );
      if (!controller.signal.aborted) setShopping(response);
    } catch {
      setFailed(!controller.signal.aborted);
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  }

  function cancel() {
    const controller = controllerRef.current;
    controllerRef.current = null;
    controller?.abort();
    setLoading(false);
  }

  return { need, shopping, loading, failed, discover, cancel };
}

function ProductDiscoveryPanel({ result, onOpenProduct }: {
  result: ConsumerAnalysis;
  onOpenProduct: Props["onOpenProduct"];
}) {
  const discovery = useProductDiscovery(result);
  if (!discovery.need) return null;
  return (
    <View style={s.stack}>
      <Text accessibilityRole="header" style={s.sectionTitle}>Product discovery</Text>
      <Text style={s.body}>{discovery.need.summary}</Text>
      <Lines title="Clues from your photo" items={discovery.need.evidence} />
      {discovery.loading ? (
        <StatePanel kind="loading" title="Finding matching products"
          description="Searching product listings from the text clues. Your photo is not sent again."
          actionLabel="CANCEL SEARCH" actionAccessibilityHint="Stops the product search without repeating the photo analysis."
          onAction={discovery.cancel} />
      ) : null}
      {discovery.failed ? (
        <StatePanel kind="error" title="Product search unavailable"
          description="Your photo analysis is still available. You can retry product discovery separately."
          actionLabel="TRY AGAIN" actionAccessibilityHint="Starts one new product search using the same text clues."
          onAction={() => { void discovery.discover(); }} />
      ) : null}
      {!discovery.loading && !discovery.failed && !discovery.shopping ? (
        <ResultButton label="Find matching products"
          hint="Searches product listings using visible-item clues without sending your photo or starting another AI analysis."
          onPress={() => { void discovery.discover(); }} primary />
      ) : null}
      {discovery.shopping ? (
        <ProductResults
          shopping={discovery.shopping}
          onOpenProduct={onOpenProduct}
          onRetry={() => { void discovery.discover(); }}
        />
      ) : null}
    </View>
  );
}

function Refinement({ onRefine }: Pick<Props, 'onRefine'>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  if (!open) return <ResultButton label="Refine this result" hint="Opens a field for what you want to change." onPress={() => setOpen(true)} expanded={false} />;
  const text = value.trim();
  return (
    <View style={s.guide}>
      <Text accessibilityRole="header" style={s.sectionTitle}>What would you change?</Text>
      <TextInput accessibilityLabel="What would you change?" placeholder="E.g. Use only what’s in the photo" placeholderTextColor={theme.colors.muted}
        value={value} onChangeText={setValue} maxLength={320} multiline style={s.input} />
      <Text style={s.caption}>Requesting a new result sends this note and your photo for analysis.</Text>
      {text ? <ResultButton label="Analyze with this note" hint="Starts a new analysis with your photo and note." onPress={() => onRefine(text)} primary /> : null}
      <ResultButton label="Cancel refinement" hint="Closes the note and keeps your result." onPress={() => setOpen(false)} expanded />
    </View>
  );
}

type GuideDetails = NonNullable<ReturnType<typeof selectResult>['guides']>[string];

function GuideDetails({ guide, mode, expanded, onToggle }: {
  guide: GuideDetails; mode: ResultMode; expanded: boolean; onToggle: () => void;
}) {
  return (
        <View style={s.guide}>
          <Lines title="Used from your photo" items={guide.evidence} />
          <Lines title="Check before you start" items={guide.limits} />
          {guide.steps[0] ? <Lines title={mode === 'fix' ? 'First safe check' : 'Start here'} items={[guide.steps[0]]} /> : null}
          <ResultButton label={expanded ? 'Hide plan details' : 'View plan details'} hint="Shows the plan, materials and alternatives already available for this idea."
            expanded={expanded} onPress={onToggle} />
          {expanded ? <>
            <Lines title={modeCopy[mode].next} items={guide.steps} ordered />
            <Lines title={modeCopy[mode].needs} items={guide.requiredItems} />
            <Lines title="What’s missing or unconfirmed" items={guide.missingItems} />
            <Lines title={modeCopy[mode].alternatives} items={guide.alternatives} />
            <Lines title="Keep as it is" items={guide.keep} />
          </> : null}
        </View>
  );
}

function IdeaChoices({ ideas, selected, onSelect }: {
  ideas: ReturnType<typeof selectResult>['ideas']; selected: number; onSelect: (index: number) => void;
}) {
  if (ideas.length < 2) return null;
  return (
    <View style={s.stack}>
      <Text accessibilityRole="header" style={s.sectionTitle}>More ideas for this photo</Text>
      {ideas.map((other, index) => index === selected ? null : (
        <ResultButton key={other.id} label={other.title} hint="Shows this idea without analyzing the photo again."
          onPress={() => onSelect(index)} />
      ))}
    </View>
  );
}

function Recommendations({ data, mode, onRefine, onConcept }: Pick<Props, 'mode' | 'onRefine' | 'onConcept'> & {
  data: ReturnType<typeof selectResult>;
}) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const idea = data.ideas[selected];
  const guide = idea && data.guides?.[idea.id];
  if (!idea) {
    return (
      <>
        <StatePanel kind="empty" title="I need a little more context" description={data.clarification || 'Try a closer photo, or tell USEIT what you want to achieve below.'} />
        <Refinement onRefine={onRefine} />
      </>
    );
  }

  return (
    <View style={s.stack}>
      <View style={s.feature}>
        <Text style={s.featureLabel}>{modeCopy[mode].title.toUpperCase()}</Text>
        <Text accessibilityRole="header" style={s.featureTitle}>{idea.title}</Text>
        <Text style={s.featureText}>{idea.description}</Text>
        {idea.durationMinutes ? <Text style={s.featureText}>About {idea.durationMinutes} min</Text> : null}
      </View>
      {guide ? (
        <GuideDetails guide={guide} mode={mode} expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      ) : null}
      {(!selected && onConcept) ? <ResultButton label="Create visual concept" hint="Generates a visual redesign for this suggestion." onPress={onConcept} primary /> : null}
      <Refinement key={idea.id} onRefine={(note) => onRefine(note, idea.title)} />
      <IdeaChoices ideas={data.ideas} selected={selected}
        onSelect={(index) => { setSelected(index); setExpanded(false); }} />

    </View>
  );
}

export function PhotoResult({ result, mode, onOpenProduct, onRefine, onConcept }: Props) {
  const data = selectResult(result, mode);
  return (
    <View style={s.result}>
      <View style={s.stack}>
        <Text style={s.eyebrow}>YOUR PHOTO · {modeCopy[mode].title.toUpperCase()}</Text>
        <Text accessibilityRole="header" style={s.heading}>What USEIT sees</Text>
        <Text style={s.body}>{result.analysis.summary}</Text>
      </View>
      {data.cautions.length ? <View style={s.caution}><Lines title="Before you continue" items={data.cautions} /></View> : null}
      <Recommendations data={data} mode={mode} onRefine={onRefine} onConcept={onConcept} />
      <ProductDiscoveryPanel result={result} onOpenProduct={onOpenProduct} />
    </View>
  );
}

const s = StyleSheet.create({
  result: { gap: theme.spacing.xl, marginTop: theme.spacing.xl, marginBottom: theme.spacing.lg },
  stack: { gap: theme.spacing.sm },
  eyebrow: { color: theme.colors.accentDark, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  heading: { color: theme.colors.ink, fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  sectionTitle: { color: theme.colors.ink, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  body: { color: theme.colors.ink, fontSize: 15, lineHeight: 23 },
  caption: { color: theme.colors.muted, fontSize: 13, lineHeight: 20 },
  button: { backgroundColor: theme.colors.surface, minHeight: 48, borderRadius: theme.radius.md, borderColor: theme.colors.controlBorder, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: theme.colors.ink, fontSize: 15, lineHeight: 21, fontWeight: '800', textAlign: 'center' },
  primary: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accentDark },
  pressed: { opacity: 0.8 },
  guide: { backgroundColor: theme.colors.surface, borderColor: theme.colors.line, borderWidth: 1, borderRadius: theme.radius.md, padding: theme.spacing.lg, gap: theme.spacing.md },
  feature: { backgroundColor: theme.colors.ink, padding: theme.spacing.xl, borderRadius: theme.radius.lg, gap: theme.spacing.sm },
  featureLabel: { color: theme.colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  featureTitle: { color: theme.colors.surface, fontSize: 24, lineHeight: 30, fontWeight: '800' },
  featureText: { color: theme.colors.captureTextMuted, fontSize: 15, lineHeight: 23 },
  caution: { backgroundColor: theme.colors.errorSurface, borderColor: theme.colors.errorBorder, borderWidth: 1, borderRadius: theme.radius.md, padding: theme.spacing.lg },
  input: { color: theme.colors.ink, backgroundColor: theme.colors.canvas, borderColor: theme.colors.controlBorder, borderWidth: 1, borderRadius: theme.radius.sm, minHeight: 70, padding: 12, fontSize: 16, textAlignVertical: 'top' },
  comparison: { gap: theme.spacing.sm },
  comparisonImage: { height: 330, width: '100%', backgroundColor: theme.colors.surfaceMuted, borderRadius: theme.radius.md },
});
