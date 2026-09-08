# USEIT Phase 4: Real Product Commerce Layer

Phase 4 replaces the Phase 3 mock product source with a provider boundary for real catalog data.

## Scope

1. Product catalog search
2. Retailer/provider adapters
3. Normalized product data
4. Price and availability fields
5. Canonical product URLs and later affiliate/deep-link handling
6. Mapping normalized products into the existing Phase 3 `CandidateProvider`

## Explicit non-goals

Phase 4 does **not** duplicate or replace Phase 3 intelligence. Existing need detection, task planning, candidate ranking, solution optimization, visual compatibility and redesign planning remain the source of truth.

## Architecture

```text
Phase 3 Need / Shopping Decision
              |
              v
      ProductCatalogProvider
              |
       +------+------+
       |             |
    Retailer A    Retailer B ...
       |             |
       +------+------+
              v
       Normalized Product
              |
              v
 Existing Phase 3 CandidateProvider
              |
              v
 Existing ranking / solution / redesign
```

The first implementation deliberately contains no invented retailer integration or fake live prices. A retailer adapter is added only when its API/feed/terms and credentials are available.
