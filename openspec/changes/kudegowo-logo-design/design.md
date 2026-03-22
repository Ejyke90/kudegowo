## Context

Kudegowo is a Next.js 16 + React 19 + Tailwind CSS 4 school-payments platform targeting Nigerian parents and school administrators. The current logo is a placeholder `KudegowoLogo.tsx` component built with CSS divs, tiny inline SVGs, and hardcoded text — it has no brand presence. The `frontend/public/` directory contains only default Next.js assets; there are no branded SVG files or a custom favicon.

**Constraints:**
- Icon-only format — no wordmark in the logo mark itself
- Must work from 16px favicon to 240px hero placement
- Must render crisply on both light and dark backgrounds
- SVG-first with PNG fallback not required (modern browser target)
- No new npm dependencies — pure SVG + React

**Stakeholders:**
- Parents (trust perception on every page load)
- School administrators (professional credibility)
- Development team (component API, asset pipeline)

## Goals / Non-Goals

**Goals:**
- Deliver a distinctive abstract "K" mark that communicates security + education
- Provide 4 size variants (primary 240px, simplified 64px, icon 32px, favicon 16px)
- Provide 4 color variants (full color, monochrome, on-dark, on-light)
- Ship an accessible, responsive React component with a clean API
- Establish CSS custom properties for the brand palette

**Non-Goals:**
- Full brand guidelines document (typography system, copywriting tone, etc.)
- Wordmark / logotype design
- Marketing collateral (social banners, business cards)
- Animation / motion design for the logo
- Print-ready CMYK conversions

## Decisions

### 1. Abstract "K" Mark Concept
**Decision:** The logo is a stylized letter "K" whose negative space forms a shield silhouette, with a subtle graduation-cap angle at the top-right arm.
**Rationale:** A lettermark ties directly to the brand name; the embedded shield conveys security without a literal shield icon; the cap angle hints at education. Alternatives considered: literal shield-with-book (too busy at small sizes), Naira symbol integration (too finance-heavy, loses education story).

### 2. Color Palette
**Decision:** Three-color system:
| Token | Hex | Role |
|-------|-----|------|
| `--kd-blue` | `#0066CC` | Primary fill — trust, reliability |
| `--kd-gold` | `#E6A500` | Accent — cultural warmth, achievement |
| `--kd-navy` | `#003366` | Deep variant — contrast, text |

**Rationale:** Blue is the global default for financial trust. Gold references Nigerian cultural richness (Adire, royalty). Navy provides accessible contrast. Alternative considered: Green + Gold (too close to Nigerian flag, less fintech authority).

### 3. SVG Architecture
**Decision:** Single inline SVG per variant with `viewBox="0 0 240 240"`, no external pattern files, no `<use>` references. Each variant is a self-contained `<svg>` element.
**Rationale:** Inline SVGs avoid extra network requests, work with Next.js Image optimization, and are trivially tree-shaken. Sprite sheets add complexity for only 4 icons.

### 4. React Component API
**Decision:**
```tsx
<KudegowoLogo
  size="md"          // "xs" | "sm" | "md" | "lg" | "xl" — maps to pixel sizes
  variant="color"    // "color" | "mono" | "on-dark" | "on-light"
  className=""       // passthrough for positioning
/>
```
**Rationale:** Named sizes avoid magic numbers; variant prop selects fill colors at render time via a lookup object; className passthrough keeps the component composable with Tailwind. Alternative considered: separate components per variant (too many exports, harder to maintain).

### 5. Favicon Strategy
**Decision:** Ship a single `favicon.svg` using the 32px icon variant. Add a 32×32 PNG `favicon.ico` fallback generated from the SVG.
**Rationale:** SVG favicons are supported in all modern browsers and scale to any tab/bookmark size. The `.ico` fallback covers Safari < 15 and older edge cases. Alternative: multiple `<link rel="icon" sizes="...">` entries (overkill for current browser matrix).

### 6. Cultural Texture
**Decision:** A single row of Adire-inspired triangular dots runs diagonally across the K's vertical stroke at 15% opacity.
**Rationale:** Adds Nigerian identity without cluttering the mark. At small sizes the texture gracefully disappears, preserving the clean K silhouette. Alternative: Ankara pattern fill (too noisy at favicon scale).

## Risks / Trade-offs

**Risk:** Abstract K may not immediately read as "education" to new users → **Mitigation:** The mark is always shown alongside the "Kudegowo" wordmark in the navbar; education context comes from surrounding UI. The icon alone is used only for favicon/app-icon where space is limited.

**Risk:** Gold on blue may fail WCAG contrast at small sizes → **Mitigation:** Gold is decorative texture only; all functional elements (shield shape, K form) use blue-on-white or white-on-navy which exceed 4.5:1 contrast.

**Risk:** Inline SVG increases HTML payload → **Mitigation:** Optimized SVG is < 2KB; gzip reduces to < 800 bytes. Negligible versus typical page weight.

**Trade-off:** Icon-only logo requires the wordmark "Kudegowo" to be rendered separately in text → **Accepted:** This gives more flexibility for responsive layouts and keeps the mark sharp at all sizes.

## Migration Plan

1. Add SVG assets to `frontend/public/logos/`
2. Rewrite `KudegowoLogo.tsx` with new component API
3. Update all import sites (navbar, footer, pitch deck, etc.)
4. Replace `favicon.ico` with branded SVG + ICO fallback
5. Add `<meta property="og:image">` with primary logo
6. **Rollback:** Git revert; old placeholder component is in history

## Open Questions

- Should we also create an `apple-touch-icon.png` (180×180) for iOS home screen?
- Does the pitch deck (`/pitch`) need a separate logo lockup or can it use the same icon + text combo?
