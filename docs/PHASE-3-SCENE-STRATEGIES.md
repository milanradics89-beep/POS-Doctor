# USEIT Phase 3: Scene Strategies

Phase 3 turns generic scene understanding into domain-specific reasoning. The model should first classify the scene, then apply the corresponding reasoning priorities before generating opportunities.

## Room
Inspect layout, circulation, focal points, lighting, furniture scale, empty wall/floor areas, clutter and visible style. Prefer changes that materially improve function or appearance and can be explained as concrete steps.

## Cluttered table
Inventory useful objects and group them by material, function and likely relationship. Look for combinations, reuse, repair and organization opportunities. Avoid suggesting projects that require many unseen supplies.

## Refrigerator / food
Identify only reasonably visible ingredients. Distinguish certain items from uncertain ones. Prefer recipes that use several visible ingredients, state important missing assumptions, and avoid inventing quantities or ingredients.

## Generic objects
Infer practical uses, repair/reuse possibilities and combinations. Consider whether an object has a specialist use before recommending disposal or replacement.

## Quality rules
1. Scene context beats object labels.
2. Visible evidence beats assumptions.
3. One excellent recommendation beats a list of generic ideas.
4. Missing requirements must be explicit.
5. Safety constraints must survive all downstream transformations.
6. Recommendations should be actionable, specific and realistically achievable.
