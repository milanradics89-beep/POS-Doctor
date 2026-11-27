# USEIT Design System

## North star

**An intelligent possibility studio for everyday life.** USEIT should feel like a beautifully art-directed object of everyday discovery, not a chatbot, camera utility, shopping catalogue, or AI dashboard. The emotional sequence is: curiosity → confident capture → anticipation → a surprisingly useful reveal → action.

The product's signature is the **Possibility Frame**: the user's photograph remains the visual anchor while USEIT progressively layers a small number of relevant possibilities around it. The original scene is respected; AI suggestions are clearly distinguished from facts and generated concepts.

## Product register and audience

- Register: consumer mobile product, visual-first and AI-first.
- Audience: ordinary people looking for useful, creative, practical ideas from objects, rooms, ingredients, and everyday scenes.
- Primary context: one-handed use on a phone, often in a real room with variable lighting and connectivity.
- Product language: plain, encouraging, specific. No developer terminology or generic AI hype.
- Locale: Hungarian (`hu-HU`) is the primary launch locale. This is an explicit launch gate, not a statement that the current app is already localized. The current implementation still contains English user-facing and accessibility strings and sends `locale: 'en-HU'`; those gaps must be closed and verified before launch. No mixed-language flow may pass acceptance.

## Visual direction

A tactile, editorial-meets-product aesthetic: quiet warm surfaces, confident graphite typography, one unmistakable lime signal, generous image space, and crisp functional controls. The UI should feel calm until the moment of discovery, when the image and recommendation become the hero.

### Palette

Runtime source of truth: `src/ui/theme.ts`. These values document the current approved foundation; change them only as a coordinated design-system decision.

| Token | Value | Role |
|---|---|---|
| Canvas | `#F5F4EF` | Warm primary background |
| Surface | `#FFFFFF` | Cards and elevated content |
| Surface muted | `#ECEDE6` | Quiet grouping and image surroundings |
| Ink | `#171A18` | Primary text and graphite surfaces |
| Muted | `#62685F` | Secondary text |
| Line | `#E2E4DC` | Subtle separators |
| Lime | `#D9F36A` | Signature action and selected state |
| Lime dark | `#52672F` | Accessible text/icon on light lime |
| Mint | `#D8EDE1` | Create / positive context |
| Blue | `#DCE8F8` | Improve / informational context |
| Peach | `#F4E2D4` | Fix / caution context |
| Lavender | `#E9E3F4` | Surprise / exploratory context |
| Danger | `#A94338` | Errors only |

Do not introduce additional accent colors per feature. Semantic tints may support grouping but never compete with lime as the brand signal. Verify contrast for every foreground/background pairing; never rely on color alone.

## Typography

- Display: platform system rounded/sans display treatment where available; large, compact, confident headlines with restrained line breaks.
- Body: platform system sans, readable at 15–17sp with comfortable line height.
- Utility: platform system sans at 11–13sp; never make essential instructions tiny.
- Use weight, spacing, and scale for hierarchy rather than decorative all-caps.
- Avoid shipping custom font dependencies until licensing, bundle size, and Android/iOS parity are verified.

## Layout and rhythm

- Mobile-first; safe-area aware; preserve one-handed reach for primary actions.
- Use the existing spacing scale: 4, 8, 12, 16, 22, 30, 38.
- Use the existing radius scale: 12, 18, 24, 30, pill.
- Give the photograph the largest visual area on capture and result screens.
- Keep one dominant action per screen; secondary actions must remain visibly secondary.
- Avoid nested cards, dashboard grids, excessive borders, gratuitous gradients, and dense text walls.
- Reserve geometry for images, asynchronous content, and loading states to prevent layout jumps.

## Signature interaction: Possibility Frame

1. The selected photograph is presented uncropped or with an explicit, reversible crop affordance.
2. The chosen intent is expressed as a clear, human-readable action.
3. During analysis, the photo remains visible while progress communicates the actual current stage. No fake progress or invented completion.
4. Results reveal one strong, image-grounded lead idea first, followed by supporting details progressively.
5. Generated visual concepts are explicitly labelled as AI visualizations and can be compared with the original.

## Component language

Maintain shared, reusable visual owners for:
- Brand mark and app wordmark.
- Primary capture action and secondary gallery action.
- Intent selector with selected, pressed, disabled, and loading states.
- Photo preview and original/concept comparison.
- Recommendation/result card and product card.
- Inline refinement controls.
- Loading, empty, offline, permission, error, and success states.
- Dialogs, banners, and transient feedback.

Every interactive control needs pressed, focus/accessibility, disabled, and busy states as applicable. Touch targets should be comfortably usable. Icons must be consistent and have accessible labels when actionable.

## Motion

Use a small motion vocabulary: short opacity/position reveal for content, tactile press feedback for actions, and a clear transition between photo analysis and results. Respect OS reduced-motion settings. Never use motion to imply a process is progressing when it is not.

## Image rules

- Preserve original image orientation, aspect ratio, and visual fidelity.
- Never silently crop or stretch user photos.
- Use stable image frames and explicit fit modes.
- Keep original and generated imagery distinguishable.
- Do not use stock imagery as a substitute for real product capability.
- Every visual concept must disclose that it is generated and may differ from reality.

## Anti-references

- Generic chatbot bubbles as the primary result layout.
- Generic SaaS dashboard cards or admin-style KPI tiles.
- Neon gradients, random rainbow accents, glassmorphism, decorative blobs.
- Over-rounded everything, tiny uppercase labels, low-contrast gray copy.
- Stock-photo hero sections or fake AI output.
- Screenshots that look premium but hide broken loading, error, permission, or retry behavior.

## Quality bar

A design is not accepted because it compiles or looks attractive in one screenshot. It must be coherent across Home, Camera/Photo Preview, Intent Selection, Analysis, Results, Refinement, and recovery states on both iOS and Android. Verify narrow and large devices, accessibility, reduced motion, localization, image fidelity, and real interaction paths. Record screenshots and visual regression evidence where available.

## Ownership

- This document owns visual intent and rationale.
- `src/ui/theme.ts` remains the current runtime token source of truth.
- Shared primitives live under `src/ui/`; avoid screen-local duplicates.
- When a durable visual token changes, update this document and runtime tokens in the same change.
- `docs/PRODUCT-VISION.md` remains the business/product vision and overrides aesthetic preferences when product behavior or trust is at stake.
