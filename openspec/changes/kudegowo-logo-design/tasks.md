## 1. SVG Logo Asset Creation

- [x] 1.1 Create primary (240px) color variant SVG — abstract K mark with shield negative space, graduation-cap angle, Adire diagonal texture
- [x] 1.2 Create primary mono, on-dark, and on-light variants
- [x] 1.3 Create simplified (64px) color variant — K-shield silhouette without decorative texture
- [x] 1.4 Create simplified mono, on-dark, and on-light variants
- [x] 1.5 Create icon (32px) color variant — essential geometric K form
- [x] 1.6 Create icon mono, on-dark, and on-light variants
- [x] 1.7 Create favicon (16px) color variant — minimal legible K
- [x] 1.8 Create favicon mono, on-dark, and on-light variants
- [x] 1.9 Place all SVGs in `frontend/public/logos/` with naming convention `kudegowo-<size>-<variant>.svg`

## 2. Brand Color System

- [x] 2.1 Add CSS custom properties `--kd-blue`, `--kd-gold`, `--kd-navy` to global stylesheet
- [x] 2.2 Extend Tailwind config with `kd-blue`, `kd-gold`, `kd-navy` color tokens

## 3. React Component

- [x] 3.1 Rewrite `KudegowoLogo.tsx` with new API: `size` (xs/sm/md/lg/xl), `variant` (color/mono/on-dark/on-light), `className`
- [x] 3.2 Map size prop to correct SVG variant and pixel dimensions
- [x] 3.3 Add `role="img"`, `aria-label="Kudegowo logo"`, and `<title>` element for accessibility
- [x] 3.4 Remove old `KudegowoTextLogo` export or update it to use new brand system

## 4. Favicon & Meta Tags

- [x] 4.1 Replace `frontend/app/favicon.ico` with branded `favicon.svg` + `.ico` fallback
- [x] 4.2 Update `<head>` with `<link rel="icon" href="/logos/kudegowo-favicon-color.svg" type="image/svg+xml">`
- [x] 4.3 Add `<meta property="og:image">` referencing the primary logo

## 5. Frontend Integration

- [x] 5.1 Update navbar logo reference to use new `<KudegowoLogo>` component
- [x] 5.2 Update footer logo reference
- [x] 5.3 Update pitch deck (`/pitch`) logo usage
- [x] 5.4 Update Hero component to use new logo

## 6. Verification

- [x] 6.1 Visually verify SVG variants render correctly in browser
- [x] 6.2 Verify favicon set via metadata in layout.tsx
- [x] 6.3 Verify component works at multiple size props (sm, md, lg, xl)
- [x] 6.4 Verify accessibility — aria-label="Kudegowo logo" present in DOM
- [x] 6.5 Verify Tailwind brand color tokens registered (kd-blue, kd-gold, kd-navy)
