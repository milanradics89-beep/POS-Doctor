import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { UseitApiProvider } from '../core/intelligence/apiClient';
import type { ConsumerAnalysis } from '../core/intelligence/apiClient';
import type { UseitShopping } from '../core/intelligence/useitAnalyzeContract';
import { isSafeExternalHttpUrl } from '../core/intelligence/externalLink';
import { PhotoFrame, ProductCard, StatePanel } from './components';
import { modeCopy, selectResult, type ResultMode } from './resultModel';
import { theme } from './theme';
import { productResultsState } from './productResultsState';
import { productPriceDisplay } from './productPresentation';
import { localizeProductCategory } from './productAccessibility';
import { hu } from '../i18n/hu';

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
      <PhotoFrame
        uri={showConcept ? concept : photo}
        label={showConcept ? hu.result.generatedImage : hu.result.originalImage}
        eyebrow={showConcept ? hu.result.comparisonConcept : hu.result.comparisonOriginal}
        imageHeight={330}
      />
      <ResultButton
        label={showConcept ? hu.result.showOriginal : hu.result.showConcept}
        hint={hu.result.comparisonHint}
        onPress={() => setShowConcept(!showConcept)}
      />
      <Text style={s.caption}>{hu.result.conceptDisclaimer}</Text>
      <Text style={s.caption}>{hu.result.conceptPrivacy}</Text>
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
  const category = localizeProductCategory(item.category ?? '');
  return (
    <ProductCard
      title={item.name}
      category={item.brand ? `${item.brand} · ${category}` : category}
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
        title={hu.product.unavailableTitle}
        description={hu.product.unavailableDescription}
        actionLabel={hu.product.tryAgain}
        actionAccessibilityHint={hu.product.retryHint}
        onAction={onRetry}
      />
    );
  }
  if (!candidates.length) {
    return <StatePanel kind="empty" title={hu.product.emptyTitle} description={hu.product.emptyDescription} />;
  }
  return (
    <View style={s.stack}>
      <Text accessibilityRole="header" style={s.sectionTitle}>{hu.product.matching}</Text>
      <Text style={s.caption}>{hu.product.retailerDisclaimer}</Text>
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
      <Text accessibilityRole="header" style={s.sectionTitle}>{hu.product.heading}</Text>
      <Text style={s.body}>{discovery.need.summary}</Text>
      <Lines title={hu.product.photoClues} items={discovery.need.evidence} />
      <Text style={s.caption}>{hu.product.findDisclosure}</Text>
      {discovery.loading ? (
        <StatePanel kind="loading" title={hu.product.searching}
          description={hu.product.searchingDescription}
          actionLabel={hu.product.cancelSearch} actionAccessibilityHint={hu.product.cancelSearchHint}
          onAction={discovery.cancel} />
      ) : null}
      {discovery.failed ? (
        <StatePanel kind="error" title={hu.product.unavailableTitle}
          description={hu.product.retrySearchDescription}
          actionLabel={hu.product.tryAgain} actionAccessibilityHint={hu.product.retrySearchHint}
          onAction={() => { void discovery.discover(); }} />
      ) : null}
      {!discovery.loading && !discovery.failed && !discovery.shopping ? (
        <ResultButton label={hu.product.find}
          hint={hu.product.findHint}
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
  if (!open) return <ResultButton label={hu.refinement.open} hint={hu.refinement.openHint} onPress={() => setOpen(true)} expanded={false} />;
  const text = value.trim();
  return (
    <View style={s.guide}>
      <Text accessibilityRole="header" style={s.sectionTitle}>{hu.refinement.heading}</Text>
      <TextInput accessibilityLabel={hu.refinement.accessibility} placeholder={hu.refinement.placeholder} placeholderTextColor={theme.colors.muted}
        value={value} onChangeText={setValue} maxLength={320} multiline style={s.input} />
      <Text style={s.caption}>{hu.refinement.privacy}</Text>
      {text ? <ResultButton label={hu.refinement.submit} hint={hu.refinement.submitHint} onPress={() => onRefine(text)} primary /> : null}
      <ResultButton label={hu.refinement.cancel} hint={hu.refinement.cancelHint} onPress={() => setOpen(false)} expanded />
    </View>
  );
}

type GuideDetails = NonNullable<ReturnType<typeof selectResult>['guides']>[string];

function GuideDetails({ guide, mode, expanded, onToggle }: {
  guide: GuideDetails; mode: ResultMode; expanded: boolean; onToggle: () => void;
}) {
  return (
        <View style={s.guide}>
          <Lines title={hu.result.usedFromPhoto} items={guide.evidence} />
          <Lines title={hu.result.checkBeforeStart} items={guide.limits} />
          {guide.steps[0] ? <Lines title={mode === 'fix' ? hu.result.firstSafeCheck : hu.result.startHere} items={[guide.steps[0]]} /> : null}
          <ResultButton label={expanded ? hu.result.hidePlan : hu.result.showPlan} hint={hu.result.planHint}
            expanded={expanded} onPress={onToggle} />
          {expanded ? <>
            <Lines title={modeCopy[mode].next} items={guide.steps} ordered />
            <Lines title={modeCopy[mode].needs} items={guide.requiredItems} />
            <Lines title={hu.result.missing} items={guide.missingItems} />
            <Lines title={modeCopy[mode].alternatives} items={guide.alternatives} />
            <Lines title={hu.result.keep} items={guide.keep} />
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
      <Text accessibilityRole="header" style={s.sectionTitle}>{hu.result.moreIdeas}</Text>
      {ideas.map((other, index) => index === selected ? null : (
        <ResultButton key={other.id} label={other.title} hint={hu.result.ideaHint}
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
        <StatePanel kind="empty" title={hu.result.needsContext} description={data.clarification || hu.result.needsContextDescription} />
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
        {idea.durationMinutes ? <Text style={s.featureText}>{hu.result.duration.replace('{minutes}', String(idea.durationMinutes))}</Text> : null}
      </View>
      {guide ? (
        <GuideDetails guide={guide} mode={mode} expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      ) : null}
      {(!selected && onConcept) ? <>
        <ResultButton label={hu.result.createConcept} hint={hu.result.createConceptHint} onPress={onConcept} primary />
        <Text style={s.caption}>{hu.result.conceptPrivacy}</Text>
      </> : null}
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
        <Text style={s.eyebrow}>{hu.result.lead} · {modeCopy[mode].title.toUpperCase()}</Text>
        <Text accessibilityRole="header" style={s.heading}>{hu.result.heading}</Text>
        <Text style={s.body}>{result.analysis.summary}</Text>
      </View>
      {data.cautions.length ? <View style={s.caution}><Lines title={hu.result.beforeContinue} items={data.cautions} /></View> : null}
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
});
