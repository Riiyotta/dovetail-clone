# Changelog

## 1.0.0 - 2026-10-26

First build (Situation A) from the clone's rendered DOM and source, cross-checked against CLONE_SPEC.md, specs/ and ia/ia.json (read-only).

- Routes: all 1897 served routes mapped once to 39 templates (16 families) using the clone's own router (react-router matchRoutes),
  re-derived independently in verify_all ROUTE_COVERAGE; 404 fallback probed.
- Tokens: 136 foundation + 8 layout + 22 semantic + 19 component (185 in the LLM catalog), every foundation value cited to a line that contains it; 3 themes.
- 146 section contracts (9 retrieval-ineligible runtime UI), 12 primitives, 14 components, 29 motion patterns.
- Measured: every route at 1440 (section heights per semantic node), responsive doc heights at 1440/1280/768/390 for one route per template, live-vs-clone pixel parity.
- Examples: 75 reference PageSpecs extracted from the rendered clone, 39 generation-safe PageSpecs (one per template, fictional brands).
- Mid-build re-measures: article templates re-split at h2+h3 (R6), changelog index after its source changed (duplicate CTA removed).
