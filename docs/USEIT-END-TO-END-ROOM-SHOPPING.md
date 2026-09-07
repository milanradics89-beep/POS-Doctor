# USEIT End-to-End Use Case: Room → Design → Shop → Visualize

Flagship Phase 3+ flow. It shapes the intelligence model without coupling scene analysis to a shopping provider.

## Flow
1. Capture a room image from camera or gallery.
2. Analyze the whole scene: geometry cues, furniture, style, lighting, circulation, constraints and uncertainty.
3. Ask one high-value clarification: keep existing furniture, replace it, or mix existing and new.
4. If new items are desired, collect a budget and optional style, color and must-keep priorities.
5. Build a design brief from the scene model. Never invent exact dimensions the image cannot establish.
6. Pass the brief to a future product-search agent. Results retain product identity, current price, dimensions, source URL and availability evidence.
7. Rank candidates against scene constraints and budget.
8. Generate a visual concept grounded in the selected products.
9. Allow iterative refinement without restarting scene analysis.
10. Present total estimated spend, itemized products and uncertainty.

## Stable scene-model requirements
- scene type and confidence
- visible objects and confidence
- spatial relationships and approximate placement
- style, color and material cues
- constraints and safety notes
- preserved items
- user intent
- budget
- explicit unknowns

## Architecture rule
Scene understanding, product search, visual generation and action/purchase execution remain separate capabilities connected by typed contracts. A shopping provider or image model must not contaminate the canonical scene model.
