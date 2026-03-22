## ADDED Requirements

### Requirement: CSS custom properties for brand palette
The global stylesheet SHALL define the following CSS custom properties on `:root`:
- `--kd-blue`: `#0066CC`
- `--kd-gold`: `#E6A500`
- `--kd-navy`: `#003366`

#### Scenario: Custom properties available globally
- **WHEN** any component references `var(--kd-blue)`
- **THEN** the computed value is `#0066CC`

### Requirement: Tailwind color tokens
The Tailwind configuration SHALL expose the brand colors as `kd-blue`, `kd-gold`, and `kd-navy` so that classes like `bg-kd-blue`, `text-kd-gold`, `border-kd-navy` work.

#### Scenario: Tailwind class applies brand color
- **WHEN** an element has class `bg-kd-blue`
- **THEN** its background color is `#0066CC`

### Requirement: Favicon references branded icon
The application's `<head>` MUST include `<link rel="icon" href="/logos/kudegowo-favicon-color.svg" type="image/svg+xml">` so browsers display the Kudegowo mark in tabs.

#### Scenario: Browser tab shows Kudegowo favicon
- **WHEN** a user navigates to any page of the application
- **THEN** the browser tab displays the Kudegowo K mark instead of the default Next.js icon
