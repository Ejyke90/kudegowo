## ADDED Requirements

### Requirement: Primary logo mark exists as optimized SVG
The system SHALL provide a primary abstract "K" mark as an inline SVG with `viewBox="0 0 240 240"`. The SVG file size MUST be under 5KB. The mark SHALL incorporate a shield silhouette in negative space and a graduation-cap angle on the top-right arm.

#### Scenario: Primary mark renders at full size
- **WHEN** the primary logo SVG is rendered in a 240×240 container
- **THEN** the abstract "K" mark is fully visible with shield negative space, graduation-cap angle, and Adire-inspired diagonal texture on the vertical stroke

### Requirement: Simplified logo variant at 64px
The system SHALL provide a simplified variant optimized for 64px rendering. Decorative texture (Adire dots) SHALL be removed. Core K-shield silhouette MUST remain recognizable.

#### Scenario: Simplified mark renders cleanly at 64px
- **WHEN** the simplified SVG is rendered in a 64×64 container
- **THEN** the K-shield silhouette is crisp with no visual artifacts or clutter from decorative elements

### Requirement: Icon variant at 32px
The system SHALL provide an icon variant optimized for 32px rendering. The mark MUST reduce to essential geometric forms only.

#### Scenario: Icon renders at 32px
- **WHEN** the icon SVG is rendered in a 32×32 container
- **THEN** the K form is recognizable and the shield shape is implied through geometry alone

### Requirement: Favicon variant at 16px
The system SHALL provide a favicon SVG suitable for browser tab display. The mark MUST be legible at 16×16 pixels.

#### Scenario: Favicon is legible in browser tab
- **WHEN** the favicon SVG is set as the page icon via `<link rel="icon">`
- **THEN** the K mark is distinguishable from other browser tabs at standard tab width

### Requirement: Color variants for all sizes
Each size variant SHALL support four color modes:
- `color`: Trust Blue (#0066CC) fill with Cultural Gold (#E6A500) accent
- `mono`: Single-color Dark Navy (#003366)
- `on-dark`: White fill for dark backgrounds
- `on-light`: Dark Navy fill for light backgrounds

#### Scenario: Color variant on white background
- **WHEN** the `color` variant is placed on a white (#FFFFFF) background
- **THEN** the blue fill and gold accent are fully visible with contrast ratio ≥ 3:1 for all graphical elements

#### Scenario: On-dark variant on navy background
- **WHEN** the `on-dark` variant is placed on a Dark Navy (#003366) background
- **THEN** the white fill provides contrast ratio ≥ 4.5:1

### Requirement: SVG files located in public directory
All logo SVG files SHALL be stored at `frontend/public/logos/` with the naming convention `kudegowo-<size>-<variant>.svg`.

#### Scenario: Asset files exist at expected paths
- **WHEN** a developer checks `frontend/public/logos/`
- **THEN** files matching `kudegowo-{primary,simplified,icon,favicon}-{color,mono,on-dark,on-light}.svg` exist
