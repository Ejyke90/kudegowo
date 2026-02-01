# Color Codes and Typography Specifications

## Table of Contents
1. [Color System Overview](#color-system-overview)
2. [Primary Brand Colors](#primary-brand-colors)
3. [Secondary Colors](#secondary-colors)
4. [Color Usage Guidelines](#color-usage-guidelines)
5. [Typography System](#typography-system)
6. [Font Specifications](#font-specifications)
7. [Typography Usage](#typography-usage)
8. [Accessibility Standards](#accessibility-standards)
9. [Technical Implementation](#technical-implementation)
10. [Resources](#resources)

---

## Color System Overview

### Color Philosophy
The KudiKlass color system is designed to communicate security, cultural pride, educational growth, and professional reliability. Each color has been carefully selected to serve specific psychological and functional purposes while maintaining accessibility and cultural relevance.

### Color Hierarchy
1. **Primary Colors**: Core brand identity colors
2. **Secondary Colors**: Supporting and functional colors
3. **Neutral Colors**: Background and text colors
4. **Semantic Colors**: Status and functional colors

### Color Naming Convention
- **Brand Colors**: `--brand-{color-name}`
- **Semantic Colors**: `--semantic-{purpose}-{intensity}`
- **Neutral Colors**: `--neutral-{tone}`
- **Utility Colors**: `--utility-{purpose}`

---

## Primary Brand Colors

### Professional Blue
**Primary brand color representing security, trust, and professionalism**

#### Color Values
- **Hex**: `#0066CC`
- **RGB**: `rgb(0, 102, 204)`
- **RGBA**: `rgba(0, 102, 204, 1)`
- **HSL**: `hsl(210, 100%, 40%)`
- **HSV**: `hsv(210, 100%, 80%)`
- **CMYK**: `c100 m60 y0 k20`
- **Pantone**: `2935 C`
- **RAL**: `5010`

#### CSS Variables
```css
:root {
  --brand-primary-blue: #0066CC;
  --brand-primary-blue-rgb: 0, 102, 204;
  --brand-primary-blue-hsl: 210, 100%, 40%;
  --brand-primary-blue-cmyk: 100, 60, 0, 20;
}
```

#### Usage Guidelines
- **Primary Applications**: Main brand color, security elements
- **Minimum Contrast**: 4.5:1 on white background
- **Psychology**: Trust, reliability, professionalism
- **Cultural Context**: Professional business color in Nigeria

#### Variations
```css
:root {
  --brand-primary-blue-50: #E6F2FF;  /* Lightest */
  --brand-primary-blue-100: #CCE5FF;
  --brand-primary-blue-200: #99CCFF;
  --brand-primary-blue-300: #66B2FF;
  --brand-primary-blue-400: #3399FF;
  --brand-primary-blue-500: #0066CC;  /* Base */
  --brand-primary-blue-600: #0052A3;
  --brand-primary-blue-700: #004080;
  --brand-primary-blue-800: #002D5C;
  --brand-primary-blue-900: #001A39;  /* Darkest */
}
```

### Cultural Gold
**Secondary brand color representing cultural pride, achievement, and celebration**

#### Color Values
- **Hex**: `#E6A500`
- **RGB**: `rgb(230, 165, 0)`
- **RGBA**: `rgba(230, 165, 0, 1)`
- **HSL**: `hsl(42, 100%, 45%)`
- **HSV**: `hsv(42, 100%, 90%)`
- **CMYK**: `c0 m30 y100 k0`
- **Pantone**: `130 C`
- **RAL**: `1021`

#### CSS Variables
```css
:root {
  --brand-cultural-gold: #E6A500;
  --brand-cultural-gold-rgb: 230, 165, 0;
  --brand-cultural-gold-hsl: 42, 100%, 45%;
  --brand-cultural-gold-cmyk: 0, 30, 100, 0;
}
```

#### Usage Guidelines
- **Primary Applications**: Cultural elements, achievement symbols
- **Minimum Contrast**: 3.1:1 on white background (large text only)
- **Psychology**: Success, celebration, cultural pride
- **Cultural Context**: Gold represents prosperity in Nigerian culture

#### Variations
```css
:root {
  --brand-cultural-gold-50: #FFF9E6;  /* Lightest */
  --brand-cultural-gold-100: #FFF3CC;
  --brand-cultural-gold-200: #FFE699;
  --brand-cultural-gold-300: #FFD966;
  --brand-cultural-gold-400: #FFCC33;
  --brand-cultural-gold-500: #E6A500;  /* Base */
  --brand-cultural-gold-600: #CC9400;
  --brand-cultural-gold-700: #B38000;
  --brand-cultural-gold-800: #996B00;
  --brand-cultural-gold-900: #805600;  /* Darkest */
}
```

### Growth Green
**Tertiary brand color representing education, growth, and prosperity**

#### Color Values
- **Hex**: `#28A745`
- **RGB**: `rgb(40, 167, 69)`
- **RGBA**: `rgba(40, 167, 69, 1)`
- **HSL**: `hsl(134, 64%, 41%)`
- **HSV**: `hsv(134, 76%, 65%)`
- **CMYK**: `c85 m0 y100 k0`
- **Pantone**: `7489 C`
- **RAL**: `6038`

#### CSS Variables
```css
:root {
  --brand-growth-green: #28A745;
  --brand-growth-green-rgb: 40, 167, 69;
  --brand-growth-green-hsl: 134, 64%, 41%;
  --brand-growth-green-cmyk: 85, 0, 100, 0;
}
```

#### Usage Guidelines
- **Primary Applications**: Educational elements, success indicators
- **Minimum Contrast**: 4.5:1 on white background
- **Psychology**: Growth, education, prosperity
- **Cultural Context**: Green represents growth and prosperity in Nigeria

#### Variations
```css
:root {
  --brand-growth-green-50: #E8F5E8;  /* Lightest */
  --brand-growth-green-100: #D4EDD4;
  --brand-growth-green-200: #A3D9A3;
  --brand-growth-green-300: #72C572;
  --brand-growth-green-400: #41B141;
  --brand-growth-green-500: #28A745;  /* Base */
  --brand-growth-green-600: #1E7E34;
  --brand-growth-green-700: #155524;
  --brand-growth-green-800: #0D2B15;
  --brand-growth-green-900: #06140B;  /* Darkest */
}
```

### Dark Blue
**Supporting brand color for typography and emphasis**

#### Color Values
- **Hex**: `#003366`
- **RGB**: `rgb(0, 51, 102)`
- **RGBA**: `rgba(0, 51, 102, 1)`
- **HSL**: `hsl(210, 100%, 20%)`
- **HSV**: `hsv(210, 100%, 40%)`
- **CMYK**: `c100 m80 y0 k60`
- **Pantone**: `280 C`
- **RAL**: `5020`

#### CSS Variables
```css
:root {
  --brand-dark-blue: #003366;
  --brand-dark-blue-rgb: 0, 51, 102;
  --brand-dark-blue-hsl: 210, 100%, 20%;
  --brand-dark-blue-cmyk: 100, 80, 0, 60;
}
```

#### Usage Guidelines
- **Primary Applications**: Typography, important elements
- **Minimum Contrast**: 7.1:1 on white background
- **Psychology**: Authority, stability, depth
- **Cultural Context**: Professional business color

#### Variations
```css
:root {
  --brand-dark-blue-50: #E6E9F0;  /* Lightest */
  --brand-dark-blue-100: #CDD3E0;
  --brand-dark-blue-200: #9BA7C1;
  --brand-dark-blue-300: #6A7BA2;
  --brand-dark-blue-400: #384F82;
  --brand-dark-blue-500: #003366;  /* Base */
  --brand-dark-blue-600: #002855;
  --brand-dark-blue-700: #001D44;
  --brand-dark-blue-800: #001233;
  --brand-dark-blue-900: #000722;  /* Darkest */
}
```

---

## Secondary Colors

### Neutral Colors

#### White
- **Hex**: `#FFFFFF`
- **RGB**: `rgb(255, 255, 255)`
- **CMYK**: `c0 m0 y0 k0`
- **Usage**: Primary background color

#### Light Gray
- **Hex**: `#F8F9FA`
- **RGB**: `rgb(248, 249, 250)`
- **CMYK**: `c2 m1 y1 k0`
- **Usage**: Secondary backgrounds, subtle elements

#### Medium Gray
- **Hex**: `#6C757D`
- **RGB**: `rgb(108, 117, 125)`
- **CMYK**: `c60 m45 y40 k25`
- **Usage**: Secondary text, borders

#### Dark Gray
- **Hex**: `#343A40`
- **RGB**: `rgb(52, 58, 64)`
- **CMYK**: `c70 m55 y45 k60`
- **Usage**: Headings, important text

#### Black
- **Hex**: `#000000`
- **RGB**: `rgb(0, 0, 0)`
- **CMYK**: `c0 m0 y0 k100`
- **Usage**: Maximum contrast, emphasis

### Semantic Colors

#### Success Colors
```css
:root {
  --semantic-success: var(--brand-growth-green);
  --semantic-success-light: rgba(var(--brand-growth-green-rgb), 0.1);
  --semantic-success-medium: rgba(var(--brand-growth-green-rgb), 0.2);
  --semantic-success-dark: rgba(var(--brand-growth-green-rgb), 0.8);
}
```

#### Warning Colors
```css
:root {
  --semantic-warning: var(--brand-cultural-gold);
  --semantic-warning-light: rgba(var(--brand-cultural-gold-rgb), 0.1);
  --semantic-warning-medium: rgba(var(--brand-cultural-gold-rgb), 0.2);
  --semantic-warning-dark: rgba(var(--brand-cultural-gold-rgb), 0.8);
}
```

#### Error Colors
```css
:root {
  --semantic-error: #DC3545;
  --semantic-error-light: rgba(220, 53, 69, 0.1);
  --semantic-error-medium: rgba(220, 53, 69, 0.2);
  --semantic-error-dark: rgba(220, 53, 69, 0.8);
}
```

#### Info Colors
```css
:root {
  --semantic-info: var(--brand-primary-blue);
  --semantic-info-light: rgba(var(--brand-primary-blue-rgb), 0.1);
  --semantic-info-medium: rgba(var(--brand-primary-blue-rgb), 0.2);
  --semantic-info-dark: rgba(var(--brand-primary-blue-rgb), 0.8);
}
```

---

## Color Usage Guidelines

### Color Hierarchy

#### Primary Colors (60%)
- Professional Blue: Main brand color
- Cultural Gold: Cultural elements
- Growth Green: Educational elements

#### Secondary Colors (30%)
- Dark Blue: Typography and emphasis
- Neutral Grays: Supporting elements

#### Accent Colors (10%)
- Semantic colors: Status indicators
- Utility colors: Functional elements

### Color Combinations

#### Approved Combinations
```css
:root {
  /* Professional Combinations */
  --combo-professional-primary: var(--brand-primary-blue);
  --combo-professional-secondary: var(--brand-dark-blue);
  --combo-professional-accent: var(--brand-cultural-gold);
  
  /* Cultural Combinations */
  --combo-cultural-primary: var(--brand-cultural-gold);
  --combo-cultural-secondary: var(--brand-primary-blue);
  --combo-cultural-accent: var(--brand-growth-green);
  
  /* Educational Combinations */
  --combo-educational-primary: var(--brand-growth-green);
  --combo-educational-secondary: var(--brand-primary-blue);
  --combo-educational-accent: var(--brand-cultural-gold);
}
```

#### Contrast Requirements
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio
- **UI Elements**: 3:1 minimum contrast ratio
- **Graphics**: 3:1 for adjacent colors

### Color Accessibility

#### WCAG Compliance
```css
:root {
  /* AA Compliant Combinations */
  --aa-text-primary: var(--brand-dark-blue) on var(--brand-white);
  --aa-text-secondary: var(--brand-medium-gray) on var(--brand-white);
  --aa-ui-primary: var(--brand-primary-blue) on var(--brand-white);
  --aa-ui-secondary: var(--brand-cultural-gold) on var(--brand-primary-blue);
  
  /* AAA Compliant Combinations */
  --aaa-text-primary: var(--brand-black) on var(--brand-white);
  --aaa-text-secondary: var(--brand-dark-blue) on var(--brand-white);
  --aaa-ui-primary: var(--brand-dark-blue) on var(--brand-white);
  --aaa-ui-secondary: var(--brand-primary-blue) on var(--brand-white);
}
```

#### Color Blindness Considerations
- Test with deuteranopia (green-blind) simulation
- Test with protanopia (red-blind) simulation
- Test with tritanopia (blue-blind) simulation
- Provide alternative visual cues beyond color

---

## Typography System

### Font Family Hierarchy

#### Primary Font Family
**Inter Modified** - Custom modified version of Inter
- **Designer**: Rasmus Andersson (modified for KudiKlass)
- **Characteristics**: Clean, modern, with Nigerian cultural warmth
- **Weights**: 100-900 (9 weights available)
- **Styles**: Normal, Italic
- **Languages**: Latin, extended Latin characters

#### Secondary Font Family
**Inter** - Standard version
- **Usage**: Fallback and supporting typography
- **Characteristics**: Consistent with Inter Modified
- **Weights**: 100-900 (9 weights available)
- **Styles**: Normal, Italic

#### Monospace Font Family
**SF Mono** / **Consolas** / **Monaco**
- **Usage**: Code, technical content, data
- **Characteristics**: Monospaced, technical
- **Weights**: Regular, Bold
- **Styles**: Normal, Italic

#### System Font Stack
```css
:root {
  --font-family-primary: 'Inter Modified', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --font-family-secondary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --font-family-monospace: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
  --font-family-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}
```

### Font Weight System

#### Weight Scale
```css
:root {
  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
}
```

#### Weight Usage Guidelines
- **Thin (100)**: Display use only, large headlines
- **Extra Light (200)**: Limited use, elegant applications
- **Light (300)**: Supporting text, elegant headings
- **Normal (400)**: Body text, standard content
- **Medium (500)**: Emphasis, subheadings
- **Semi Bold (600)**: Subheadings, navigation
- **Bold (700)**: Headings, logo, emphasis
- **Extra Bold (800)**: Strong emphasis, display
- **Black (900)**: Display use only, impact

---

## Font Specifications

### Typography Scale

#### Modular Scale
**Base**: 16px (1rem)
**Ratio**: 1.25 (Major Third)
**Scale**: Geometric progression

#### Display Sizes
```css
:root {
  --font-size-display-2xl: 6rem;      /* 96px */
  --font-size-display-xl: 4.5rem;     /* 72px */
  --font-size-display-lg: 3.75rem;     /* 60px */
  --font-size-display-md: 3rem;       /* 48px */
  --font-size-display-sm: 2.5rem;     /* 40px */
}
```

#### Heading Sizes
```css
:root {
  --font-size-h1: 3.052rem;    /* 48.83px */
  --font-size-h2: 2.441rem;    /* 39.06px */
  --font-size-h3: 1.953rem;    /* 31.25px */
  --font-size-h4: 1.562rem;    /* 25px */
  --font-size-h5: 1.25rem;     /* 20px */
  --font-size-h6: 1rem;        /* 16px */
}
```

#### Body Text Sizes
```css
:root {
  --font-size-large: 1.25rem;     /* 20px */
  --font-size-base: 1rem;         /* 16px */
  --font-size-small: 0.875rem;    /* 14px */
  --font-size-xs: 0.75rem;        /* 12px */
}
```

#### Logo Typography Sizes
```css
:root {
  --font-size-logo-2xl: 4rem;      /* 64px */
  --font-size-logo-xl: 3rem;       /* 48px */
  --font-size-logo-lg: 2rem;       /* 32px */
  --font-size-logo-md: 1.5rem;     /* 24px */
  --font-size-logo-sm: 1rem;       /* 16px */
  --font-size-logo-xs: 0.75rem;    /* 12px */
}
```

### Line Height System

#### Line Height Scale
```css
:root {
  --line-height-tight: 1.1;
  --line-height-snug: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;
}
```

#### Line Height Usage
- **Tight (1.1)**: Headings, display text
- **Snug (1.2)**: Logo typography, navigation
- **Normal (1.5)**: Body text, paragraphs
- **Relaxed (1.6)**: Long-form content
- **Loose (1.8)**: Spacious layouts

### Letter Spacing System

#### Letter Spacing Scale
```css
:root {
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

#### Letter Spacing Usage
- **Tight (-0.025em)**: Headings, condensed text
- **Normal (0)**: Body text, standard content
- **Wide (0.025em)**: Logo typography, emphasis
- **Wider (0.05em)**: Navigation, buttons
- **Widest (0.1em)**: Display text, special cases

---

## Typography Usage

### Typography Hierarchy

#### Hierarchy Levels
1. **Display**: Hero sections, major announcements
2. **Headings**: Section organization, content structure
3. **Body Text**: Main content, descriptions
4. **Supporting Text**: Secondary information, captions
5. **Fine Print**: Legal text, disclaimers

#### Semantic Usage
```css
:root {
  /* Display Typography */
  --typography-display-font-family: var(--font-family-primary);
  --typography-display-font-weight: var(--font-weight-bold);
  --typography-display-line-height: var(--line-height-tight);
  --typography-display-letter-spacing: var(--letter-spacing-tight);
  
  /* Heading Typography */
  --typography-heading-font-family: var(--font-family-primary);
  --typography-heading-font-weight: var(--font-weight-bold);
  --typography-heading-line-height: var(--line-height-tight);
  --typography-heading-letter-spacing: var(--letter-spacing-tight);
  
  /* Body Typography */
  --typography-body-font-family: var(--font-family-primary);
  --typography-body-font-weight: var(--font-weight-normal);
  --typography-body-line-height: var(--line-height-normal);
  --typography-body-letter-spacing: var(--letter-spacing-normal);
  
  /* Supporting Typography */
  --typography-supporting-font-family: var(--font-family-primary);
  --typography-supporting-font-weight: var(--font-weight-normal);
  --typography-supporting-line-height: var(--line-height-normal);
  --typography-supporting-letter-spacing: var(--letter-spacing-normal);
}
```

### Responsive Typography

#### Fluid Typography
```css
:root {
  /* Fluid Typography using clamp() */
  --fluid-h1: clamp(2rem, 5vw, 3.052rem);
  --fluid-h2: clamp(1.5rem, 4vw, 2.441rem);
  --fluid-h3: clamp(1.25rem, 3vw, 1.953rem);
  --fluid-body: clamp(0.875rem, 2vw, 1rem);
}
```

#### Breakpoint-Specific Typography
```css
:root {
  /* Mobile Typography */
  --mobile-h1: 2rem;
  --mobile-h2: 1.5rem;
  --mobile-body: 1rem;
  
  /* Tablet Typography */
  --tablet-h1: 2.5rem;
  --tablet-h2: 2rem;
  --tablet-body: 1rem;
  
  /* Desktop Typography */
  --desktop-h1: 3.052rem;
  --desktop-h2: 2.441rem;
  --desktop-body: 1rem;
}
```

### Typography Components

#### Heading Components
```css
.heading-1 {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--brand-dark-blue);
}

.heading-2 {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--brand-dark-blue);
}
```

#### Body Text Components
```css
.body-text {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--brand-dark-gray);
}

.body-text-large {
  font-size: var(--font-size-large);
  line-height: var(--line-height-relaxed);
}

.body-text-small {
  font-size: var(--font-size-small);
  line-height: var(--line-height-normal);
}
```

---

## Accessibility Standards

### Color Accessibility

#### WCAG Compliance Matrix
| Color Combination | Contrast Ratio | WCAG Level | Usage |
|------------------|----------------|------------|-------|
| Dark Blue on White | 15.8:1 | AAA | All text |
| Primary Blue on White | 4.5:1 | AA | Normal text |
| Cultural Gold on White | 3.1:1 | AA | Large text only |
| Growth Green on White | 4.6:1 | AA | All text |
| Medium Gray on White | 4.5:1 | AA | Secondary text |

#### Color Blindness Testing
- **Deuteranopia**: Green-blind simulation
- **Protanopia**: Red-blind simulation
- **Tritanopia**: Blue-blind simulation
- **Achromatopsia**: Complete color blindness

#### Alternative Visual Cues
- **Patterns**: Use patterns for color differentiation
- **Icons**: Supplement colors with icons
- **Text Labels**: Add text labels to color-coded elements
- **Shapes**: Use different shapes for different meanings

### Typography Accessibility

#### Readability Standards
- **Font Size**: Minimum 16px for body text
- **Line Height**: Minimum 1.5 for body text
- **Letter Spacing**: Minimum 0.05em for headings
- **Font Weight**: Minimum 400 for body text

#### Contrast Requirements
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)
- **UI Components**: 3:1 minimum contrast ratio
- **Graphics**: 3:1 for adjacent colors

---

## Technical Implementation

### CSS Implementation

#### CSS Variables
```css
:root {
  /* Color Variables */
  --brand-primary-blue: #0066CC;
  --brand-cultural-gold: #E6A500;
  --brand-growth-green: #28A745;
  --brand-dark-blue: #003366;
  
  /* Typography Variables */
  --font-family-primary: 'Inter Modified', 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --line-height-normal: 1.5;
  
  /* System Variables */
  --spacing-unit: 1rem;
  --border-radius: 0.25rem;
  --transition-duration: 0.2s;
}
```

#### Utility Classes
```css
/* Color Utilities */
.text-primary-blue { color: var(--brand-primary-blue); }
.text-cultural-gold { color: var(--brand-cultural-gold); }
.text-growth-green { color: var(--brand-growth-green); }
.text-dark-blue { color: var(--brand-dark-blue); }

.bg-primary-blue { background-color: var(--brand-primary-blue); }
.bg-cultural-gold { background-color: var(--brand-cultural-gold); }
.bg-growth-green { background-color: var(--brand-growth-green); }
.bg-dark-blue { background-color: var(--brand-dark-blue); }

/* Typography Utilities */
.font-primary { font-family: var(--font-family-primary); }
.font-secondary { font-family: var(--font-family-secondary); }
.font-mono { font-family: var(--font-family-monospace); }

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-small); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-large); }
.text-xl { font-size: var(--font-size-h5); }
.text-2xl { font-size: var(--font-size-h4); }
.text-3xl { font-size: var(--font-size-h3); }
.text-4xl { font-size: var(--font-size-h2); }
.text-5xl { font-size: var(--font-size-h1); }

.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
```

### SCSS Implementation

#### SCSS Variables
```scss
// Color Variables
$brand-primary-blue: #0066CC;
$brand-cultural-gold: #E6A500;
$brand-growth-green: #28A745;
$brand-dark-blue: #003366;

// Typography Variables
$font-family-primary: 'Inter Modified', 'Inter', sans-serif;
$font-size-base: 1rem;
$font-weight-normal: 400;
$line-height-normal: 1.5;

// SCSS Functions
@function brand-color($color) {
  @return map-get((
    'primary-blue': $brand-primary-blue,
    'cultural-gold': $brand-cultural-gold,
    'growth-green': $brand-growth-green,
    'dark-blue': $brand-dark-blue
  ), $color);
}

@function font-size($size) {
  @return map-get((
    'xs': 0.75rem,
    'sm': 0.875rem,
    'base': 1rem,
    'lg': 1.25rem,
    'xl': 1.5rem,
    '2xl': 2rem
  ), $size);
}
```

#### SCSS Mixins
```scss
// Typography Mixin
@mixin typography($size, $weight: normal, $line-height: normal) {
  font-family: $font-family-primary;
  font-size: font-size($size);
  font-weight: $weight;
  line-height: $line-height;
}

// Color Mixin
@mixin brand-color($color, $property: color) {
  #{$property}: brand-color($color);
}

// Responsive Typography Mixin
@mixin responsive-typography($mobile-size, $desktop-size) {
  font-size: $mobile-size;
  
  @media (min-width: 768px) {
    font-size: $desktop-size;
  }
}
```

### JavaScript Implementation

#### JavaScript Color Utilities
```javascript
// Color Utilities
const BrandColors = {
  primaryBlue: '#0066CC',
  culturalGold: '#E6A500',
  growthGreen: '#28A745',
  darkBlue: '#003366',
};

export const getColor = (colorName) => {
  return BrandColors[colorName] || BrandColors.primaryBlue;
};

export const getContrastColor = (backgroundColor) => {
  // Calculate luminance and return appropriate text color
  const rgb = hexToRgb(backgroundColor);
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
```

#### JavaScript Typography Utilities
```javascript
// Typography Utilities
const Typography = {
  fontFamily: {
    primary: "'Inter Modified', 'Inter', sans-serif",
    secondary: "'Inter', sans-serif",
    monospace: "'SF Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const getTypography = (type, property) => {
  return Typography[type]?.[property] || Typography.base[property];
};

export const getResponsiveSize = (mobileSize, desktopSize) => {
  return {
    mobile: mobileSize,
    desktop: desktopSize,
  };
};
```

---

## Resources

### Color Resources

#### Color Palettes
- **Adobe Color**: KudiKlass brand palette
- **Coolors**: Brand color combinations
- **Color Hunt**: Color inspiration
- **Paletton**: Color scheme generator

#### Color Tools
- **Contrast Checker**: WebAIM Contrast Checker
- **Color Blindness Simulator**: Coblis
- **Color Converter**: RGB to HEX converter
- **Color Picker**: Browser developer tools

### Typography Resources

#### Font Resources
- **Google Fonts**: Inter font family
- **Adobe Fonts**: Professional font library
- **Font Squirrel**: Free font resources
- **Typewolf**: Typography inspiration

#### Typography Tools
- **Font Pairing**: Google Font Pairing
- **Type Scale**: Modular scale calculator
- **Font Size Calculator**: Responsive typography
- **Line Height Calculator**: Optimal line height

### Implementation Resources

#### CSS Frameworks
- **Tailwind CSS**: Utility-first CSS
- **Bootstrap**: Component framework
- **Material UI**: React component library
- **Chakra UI**: Accessible React components

#### Development Tools
- **PostCSS**: CSS transformation tool
- **SASS**: CSS preprocessor
- **Stylelint**: CSS linter
- **PurgeCSS**: CSS optimizer

---

*This document provides comprehensive specifications for KudiKlass color and typography systems. All implementations must follow these guidelines to maintain brand consistency and accessibility standards.*
