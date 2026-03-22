## ADDED Requirements

### Requirement: KudegowoLogo React component
The system SHALL export a `KudegowoLogo` component from `frontend/components/ui/KudegowoLogo.tsx`. The component MUST accept `size`, `variant`, and `className` props.

#### Scenario: Default render
- **WHEN** `<KudegowoLogo />` is rendered with no props
- **THEN** the component displays the primary color variant at medium (40px) size

### Requirement: Size prop maps to pixel dimensions
The `size` prop SHALL accept `"xs"` (16px), `"sm"` (32px), `"md"` (40px), `"lg"` (64px), `"xl"` (120px). The component MUST select the appropriate SVG variant for the requested size (favicon for xs, icon for sm, simplified for lg, primary for xl).

#### Scenario: Extra-small size renders favicon variant
- **WHEN** `<KudegowoLogo size="xs" />` is rendered
- **THEN** the favicon SVG variant is used at 16×16 pixels

#### Scenario: Extra-large size renders primary variant
- **WHEN** `<KudegowoLogo size="xl" />` is rendered
- **THEN** the primary SVG variant is used at 120×120 pixels

### Requirement: Variant prop controls color mode
The `variant` prop SHALL accept `"color"`, `"mono"`, `"on-dark"`, `"on-light"` and MUST render the corresponding SVG fills.

#### Scenario: Mono variant renders single-color
- **WHEN** `<KudegowoLogo variant="mono" />` is rendered
- **THEN** all fills use Dark Navy (#003366) only

### Requirement: Accessibility attributes
The component MUST render `role="img"` and `aria-label="Kudegowo logo"` on the root SVG element. A `<title>` element MUST be present inside the SVG.

#### Scenario: Screen reader announces logo
- **WHEN** a screen reader encounters the logo component
- **THEN** it announces "Kudegowo logo"

### Requirement: className passthrough
The `className` prop SHALL be applied to the outermost element for Tailwind positioning utilities.

#### Scenario: Custom class applied
- **WHEN** `<KudegowoLogo className="absolute top-4 left-4" />` is rendered
- **THEN** the outermost element has classes `absolute top-4 left-4`
