## Why

Kudegowo currently relies on a placeholder logo component — a circular div with tiny inline SVGs and CSS text — that lacks professional brand presence. The platform handles sensitive financial transactions for Nigerian schools, and a polished, distinctive brand mark is critical for establishing trust with parents and administrators. The existing OpenSpec `logo-development-plan` change references the retired "KudiKlass" brand and cannot be reused. A fresh, icon-only abstract "K" mark will give Kudegowo a modern fintech identity that scales from favicon to marketing materials.

## What Changes

- **BREAKING**: Replace the placeholder `KudegowoLogo` component with a professional SVG-based logo system
- Create an abstract "K" mark incorporating shield/education elements in Trust Blue + Gold palette
- Produce scalable SVG assets at primary (240px), simplified (64px), icon (32px), and favicon (16px) sizes
- Build monochrome, dark-background, and light-background variants
- Replace the default Next.js `favicon.ico` with a branded Kudegowo favicon
- Implement an accessible, responsive React logo component with proper ARIA attributes
- Establish CSS custom properties for the brand color palette

## Capabilities

### New Capabilities
- `kudegowo-brand-mark`: Abstract "K" icon mark — primary logo asset with all size and color variants
- `logo-component`: Accessible, responsive React component exposing the logo for use across the frontend
- `brand-colors`: CSS custom property system for the Kudegowo color palette (Trust Blue, Cultural Gold, Dark Navy)

### Modified Capabilities
<!-- No existing specs to modify — openspec/specs/ is currently empty -->

## Impact

- **Frontend Components**: `KudegowoLogo.tsx` rewritten; all import sites updated
- **Static Assets**: New SVG files in `frontend/public/`; favicon replaced
- **HTML Meta**: `<link rel="icon">` and Open Graph image tags updated
- **Styling**: New CSS custom properties added to the global stylesheet
- **Dependencies**: None — pure SVG + React; no new packages required
