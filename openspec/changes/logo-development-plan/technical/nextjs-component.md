# Next.js Responsive Logo Component

## Component Architecture

### Component Structure
**File Organization**:
```
components/
├── logo/
│   ├── Logo.tsx              # Main logo component
│   ├── LogoVariant.tsx       # Logo variant component
│   ├── LogoResponsive.tsx    # Responsive wrapper
│   ├── LogoTheme.tsx         # Theme-aware logo
│   ├── Logo.types.ts         # TypeScript definitions
│   ├── Logo.constants.ts     # Component constants
│   └── index.ts              # Component exports
```

**Component Hierarchy**:
- **Logo**: Base logo component
- **LogoVariant**: Variant-specific implementations
- **LogoResponsive**: Responsive behavior wrapper
- **LogoTheme**: Theme-aware logo component

## TypeScript Definitions

### Type Definitions
```typescript
// logo.types.ts
export interface LogoProps {
  variant?: 'cultural-shield' | 'shielded-achievement';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  theme?: 'light' | 'dark' | 'auto';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'data-testid'?: string;
}

export interface LogoVariantProps {
  variant: 'cultural-shield' | 'shielded-achievement';
  size: number;
  theme: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

export interface LogoResponsiveProps extends LogoProps {
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export interface LogoThemeProps extends LogoProps {
  currentTheme?: 'light' | 'dark';
}

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type LogoVariant = 'cultural-shield' | 'shielded-achievement';
export type LogoTheme = 'light' | 'dark' | 'auto';
```

### Component Constants
```typescript
// logo.constants.ts
export const LOGO_SIZES = {
  xs: 16,
  sm: 32,
  md: 64,
  lg: 120,
  xl: 240,
  '2xl': 480,
} as const;

export const LOGO_VARIANTS = {
  'cultural-shield': {
    name: 'Cultural Security Shield',
    description: 'Security-focused logo with Nigerian cultural elements',
    svgPath: '/assets/svg/logos/cultural-shield-primary.svg',
    iconPath: '/assets/svg/logos/cultural-shield-icon.svg',
  },
  'shielded-achievement': {
    name: 'Shielded Achievement',
    description: 'Achievement-focused logo with security elements',
    svgPath: '/assets/svg/logos/shielded-achievement-primary.svg',
    iconPath: '/assets/svg/logos/shielded-achievement-icon.svg',
  },
} as const;

export const LOGO_THEMES = {
  light: {
    background: '#FFFFFF',
    primary: '#0066CC',
    secondary: '#E6A500',
    accent: '#28A745',
  },
  dark: {
    background: '#1A1A1A',
    primary: '#E6A500',
    secondary: '#28A745',
    accent: '#0066CC',
  },
} as const;

export const DEFAULT_LOGO_PROPS: Partial<LogoProps> = {
  variant: 'cultural-shield',
  size: 'lg',
  theme: 'auto',
  responsive: true,
};
```

## Base Logo Component

### Main Logo Component
```typescript
// Logo.tsx
import React, { forwardRef, useMemo } from 'react';
import { LogoProps, LogoVariantProps } from './logo.types';
import { LOGO_SIZES, LOGO_VARIANTS, DEFAULT_LOGO_PROPS } from './logo.constants';
import LogoVariant from './LogoVariant';

const Logo = forwardRef<HTMLDivElement, LogoProps>(({
  variant = DEFAULT_LOGO_PROPS.variant as 'cultural-shield',
  size = DEFAULT_LOGO_PROPS.size as 'lg',
  theme = DEFAULT_LOGO_PROPS.theme as 'auto',
  responsive = DEFAULT_LOGO_PROPS.responsive as true,
  className = '',
  style = {},
  onClick,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'data-testid': testId,
  ...props
}, ref) => {
  // Calculate logo size
  const logoSize = useMemo(() => LOGO_SIZES[size], [size]);

  // Determine theme
  const logoTheme = useMemo(() => {
    if (theme === 'auto') {
      return typeof window !== 'undefined' && 
             window.matchMedia('(prefers-color-scheme: dark)').matches 
             ? 'dark' 
             : 'light';
    }
    return theme;
  }, [theme]);

  // Generate CSS classes
  const cssClasses = useMemo(() => {
    const classes = [
      'logo',
      `logo--variant-${variant}`,
      `logo--size-${size}`,
      `logo--theme-${logoTheme}`,
    ];

    if (responsive) {
      classes.push('logo--responsive');
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, size, logoTheme, responsive, className]);

  // Generate inline styles
  const inlineStyles = useMemo(() => ({
    '--logo-size': `${logoSize}px`,
    '--logo-variant': variant,
    '--logo-theme': logoTheme,
    ...style,
  }), [logoSize, variant, logoTheme, style]);

  // Generate accessibility attributes
  const accessibilityProps = useMemo(() => ({
    role: 'img',
    'aria-label': ariaLabel || `${LOGO_VARIANTS[variant].name} Logo`,
    'data-testid': testId || 'logo-component',
  }), [variant, ariaLabel, testId]);

  return (
    <div
      ref={ref}
      className={cssClasses}
      style={inlineStyles}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...accessibilityProps}
      {...props}
    >
      <LogoVariant
        variant={variant}
        size={logoSize}
        theme={logoTheme}
        className="logo__variant"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
```

### Logo Variant Component
```typescript
// LogoVariant.tsx
import React, { useMemo } from 'react';
import Image from 'next/image';
import { LogoVariantProps } from './logo.types';
import { LOGO_VARIANTS } from './logo.constants';

const LogoVariant: React.FC<LogoVariantProps> = ({
  variant,
  size,
  theme,
  className = '',
  style = {},
}) => {
  // Get variant configuration
  const variantConfig = useMemo(() => LOGO_VARIANTS[variant], [variant]);

  // Determine image source based on size
  const imageSrc = useMemo(() => {
    if (size <= 32) {
      return variantConfig.iconPath;
    }
    return variantConfig.svgPath;
  }, [size, variantConfig]);

  // Generate image dimensions
  const imageDimensions = useMemo(() => ({
    width: size,
    height: size,
  }), [size]);

  // Generate CSS classes
  const cssClasses = useMemo(() => {
    const classes = [
      'logo__variant',
      `logo__variant--${variant}`,
      `logo__variant--theme-${theme}`,
    ];

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, theme, className]);

  // Generate inline styles
  const inlineStyles = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  }), [size, style]);

  return (
    <div className={cssClasses} style={inlineStyles}>
      <Image
        src={imageSrc}
        alt={`${variantConfig.name} Logo`}
        width={imageDimensions.width}
        height={imageDimensions.height}
        className="logo__image"
        priority={size >= 120} // Priority load for larger logos
        quality={95}
        unoptimized={true} // Use unoptimized for SVG files
      />
    </div>
  );
};

export default LogoVariant;
```

## Responsive Logo Component

### Responsive Wrapper
```typescript
// LogoResponsive.tsx
import React, { useState, useEffect, useMemo } from 'react';
import Logo from './Logo';
import { LogoResponsiveProps } from './logo.types';

const LogoResponsive: React.FC<LogoResponsiveProps> = ({
  size = 'lg',
  responsive = true,
  breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
  ...props
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('desktop');
  const [currentSize, setCurrentSize] = useState(size);

  // Determine current breakpoint
  useEffect(() => {
    if (!responsive) return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let newBreakpoint = 'desktop';
      let newSize = size;

      if (width < breakpoints.mobile) {
        newBreakpoint = 'mobile';
        newSize = 'sm';
      } else if (width < breakpoints.tablet) {
        newBreakpoint = 'tablet';
        newSize = 'md';
      } else if (width < breakpoints.desktop) {
        newBreakpoint = 'desktop';
        newSize = 'lg';
      } else {
        newBreakpoint = 'desktop';
        newSize = 'xl';
      }

      setCurrentBreakpoint(newBreakpoint);
      setCurrentSize(newSize);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [responsive, breakpoints, size]);

  // Generate responsive classes
  const responsiveClasses = useMemo(() => {
    if (!responsive) return '';

    return [
      'logo--responsive',
      `logo--breakpoint-${currentBreakpoint}`,
      `logo--size-${currentSize}`,
    ].join(' ');
  }, [responsive, currentBreakpoint, currentSize]);

  return (
    <Logo
      size={currentSize}
      className={responsiveClasses}
      responsive={false} // Disable internal responsiveness
      {...props}
    />
  );
};

export default LogoResponsive;
```

## Theme-Aware Logo Component

### Theme Wrapper
```typescript
// LogoTheme.tsx
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { LogoThemeProps } from './logo.types';

const LogoTheme: React.FC<LogoThemeProps> = ({
  theme = 'auto',
  currentTheme,
  ...props
}) => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  // Handle theme detection
  useEffect(() => {
    const updateTheme = () => {
      if (currentTheme) {
        setActiveTheme(currentTheme);
      } else if (theme === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light';
        setActiveTheme(systemTheme);
      } else {
        setActiveTheme(theme);
      }
    };

    updateTheme();

    // Listen for system theme changes if auto
    if (theme === 'auto' && !currentTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);

      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    }
  }, [theme, currentTheme]);

  return (
    <Logo
      theme={activeTheme}
      className={`logo--theme-${activeTheme}`}
      {...props}
    />
  );
};

export default LogoTheme;
```

## CSS Implementation

### Component Styles
```css
/* components/logo/Logo.module.css */
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--logo-size, 120px);
  height: var(--logo-size, 120px);
  transition: var(--transition-logo);
  cursor: pointer;
}

.logo:hover {
  transform: var(--logo-hover-transform, scale(1.05));
  filter: var(--logo-hover-filter, brightness(1.1));
}

.logo:focus {
  outline: var(--logo-focus-outline, 2px solid var(--brand-primary-blue));
  outline-offset: 2px;
}

.logo:active {
  transform: var(--logo-active-transform, scale(0.98));
}

/* Variant Styles */
.logo--variant-cultural-shield {
  color: var(--brand-primary-blue);
}

.logo--variant-shielded-achievement {
  color: var(--brand-primary-blue);
}

/* Size Styles */
.logo--size-xs {
  --logo-size: 16px;
}

.logo--size-sm {
  --logo-size: 32px;
}

.logo--size-md {
  --logo-size: 64px;
}

.logo--size-lg {
  --logo-size: 120px;
}

.logo--size-xl {
  --logo-size: 240px;
}

.logo--size-2xl {
  --logo-size: 480px;
}

/* Theme Styles */
.logo--theme-light {
  background-color: var(--theme-bg-primary, #FFFFFF);
  color: var(--theme-logo-primary, #0066CC);
}

.logo--theme-dark {
  background-color: var(--theme-bg-primary, #1A1A1A);
  color: var(--theme-logo-primary, #E6A500);
}

/* Responsive Styles */
.logo--responsive {
  width: auto;
  height: auto;
}

@media (max-width: 768px) {
  .logo--responsive {
    --logo-size: 64px;
  }
}

@media (max-width: 576px) {
  .logo--responsive {
    --logo-size: 32px;
  }
}

/* Breakpoint Styles */
.logo--breakpoint-mobile {
  --logo-size: 32px;
}

.logo--breakpoint-tablet {
  --logo-size: 64px;
}

.logo--breakpoint-desktop {
  --logo-size: 120px;
}

/* Variant Container */
.logo__variant {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: var(--transition-logo);
}

/* Loading State */
.logo--loading {
  opacity: 0.6;
  pointer-events: none;
}

.logo--loading .logo__image {
  filter: blur(2px);
}

/* Error State */
.logo--error {
  opacity: 0.4;
  background-color: var(--semantic-error-light);
  border: 2px dashed var(--semantic-error);
}

.logo--error::after {
  content: "Logo";
  font-size: 0.8em;
  color: var(--semantic-error);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Usage Examples

### Basic Usage
```typescript
// Basic logo usage
import Logo from '@/components/logo';

function Header() {
  return (
    <header className="header">
      <Logo variant="cultural-shield" size="lg" />
    </header>
  );
}
```

### Responsive Usage
```typescript
// Responsive logo usage
import LogoResponsive from '@/components/logo/LogoResponsive';

function Navigation() {
  return (
    <nav className="navigation">
      <LogoResponsive
        variant="shielded-achievement"
        size="xl"
        breakpoints={{
          mobile: 768,
          tablet: 1024,
          desktop: 1200,
        }}
      />
    </nav>
  );
}
```

### Theme-Aware Usage
```typescript
// Theme-aware logo usage
import LogoTheme from '@/components/logo/LogoTheme';

function ThemedComponent() {
  return (
    <div className="themed-component">
      <LogoTheme
        variant="cultural-shield"
        size="lg"
        theme="auto"
        currentTheme="dark"
      />
    </div>
  );
}
```

### Advanced Usage
```typescript
// Advanced logo usage with event handlers
import Logo, { LogoProps } from '@/components/logo';

function InteractiveLogo() {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Logo clicked!', event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    console.log('Logo focused!', event);
  };

  const logoProps: LogoProps = {
    variant: 'cultural-shield',
    size: 'lg',
    theme: 'auto',
    responsive: true,
    className: 'custom-logo',
    style: { margin: '1rem' },
    onClick: handleClick,
    onFocus: handleFocus,
    'aria-label': 'KudiKlass Cultural Security Shield Logo',
    'data-testid': 'interactive-logo',
  };

  return <Logo {...logoProps} />;
}
```

## Performance Optimization

### Image Optimization
```typescript
// Image optimization utilities
const getOptimizedImageSrc = (variant: string, size: number): string => {
  const basePath = '/assets/svg/logos';
  const fileName = `${variant}-${size <= 32 ? 'icon' : 'primary'}.svg`;
  return `${basePath}/${fileName}`;
};

const preloadLogoImages = (variants: string[]) => {
  variants.forEach(variant => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageSrc(variant, 240);
    document.head.appendChild(link);
  });
};
```

### Lazy Loading
```typescript
// Lazy loading wrapper
import { lazy, Suspense } from 'react';

const LazyLogo = lazy(() => import('./Logo'));

function LazyLogoWrapper(props: LogoProps) {
  return (
    <Suspense fallback={<div className="logo--loading" />}>
      <LazyLogo {...props} />
    </Suspense>
  );
}
```

### Memoization
```typescript
// Memoized logo component
import { memo } from 'react';

const MemoizedLogo = memo(Logo, (prevProps, nextProps) => {
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.size === nextProps.size &&
    prevProps.theme === nextProps.theme &&
    prevProps.responsive === nextProps.responsive &&
    prevProps.className === nextProps.className
  );
});

export default MemoizedLogo;
```

## Testing

### Unit Tests
```typescript
// __tests__/Logo.test.tsx
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('renders with default props', () => {
    render(<Logo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByLabelText(/Cultural Security Shield Logo/i)).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    render(<Logo variant="shielded-achievement" />);
    expect(screen.getByLabelText(/Shielded Achievement Logo/i)).toBeInTheDocument();
  });

  it('applies correct size class', () => {
    render(<Logo size="xl" />);
    const logo = screen.getByRole('img').closest('div');
    expect(logo).toHaveClass('logo--size-xl');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Logo onClick={handleClick} />);
    
    const logo = screen.getByRole('img').closest('div');
    logo?.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', () => {
    render(<Logo aria-label="Custom Logo Label" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom Logo Label');
  });
});
```

### Integration Tests
```typescript
// __tests__/Logo.integration.test.tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LogoTheme from '../LogoTheme';

describe('Logo Theme Integration', () => {
  it('adapts to theme changes', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <LogoTheme variant="cultural-shield" />
      </ThemeProvider>
    );
    
    const logo = screen.getByRole('img').closest('div');
    expect(logo).toHaveClass('logo--theme-dark');
  });
});
```

## Success Metrics

### Performance Metrics
- **Bundle Size**: < 5KB for logo components
- **Render Time**: < 50ms for initial render
- **Update Time**: < 20ms for prop changes
- **Memory Usage**: < 1MB for component instances

### Accessibility Metrics
- **WCAG Compliance**: 100% AA compliant
- **Screen Reader**: Full support for screen readers
- **Keyboard Navigation**: Complete keyboard accessibility
- **Color Contrast**: 4.5:1 minimum contrast ratio

### Developer Experience
- **TypeScript**: Full TypeScript support
- **Documentation**: Comprehensive component documentation
- **Testing**: 95%+ test coverage
- **Usability**: Easy to use and customize

## Maintenance Guidelines

### Component Updates
**Regular Maintenance**:
- **Monthly**: Performance monitoring and optimization
- **Quarterly**: Dependency updates and security patches
- **Annually**: Component architecture review
- **Continuous**: User feedback integration

**Version Control**:
- **Semantic Versioning**: Follow semver for releases
- **Changelog**: Maintain detailed changelog
- **Breaking Changes**: Clear communication for breaking changes
- **Backward Compatibility**: Maintain backward compatibility when possible

### Evolution Strategy
**Component Evolution**:
- **New Features**: Add new logo variants and sizes
- **Performance**: Continuous performance optimization
- **Accessibility**: Enhanced accessibility features
- **Developer Experience**: Improved developer tools and documentation

**Technology Updates**:
- **React Updates**: Stay current with React versions
- **Next.js Updates**: Maintain Next.js compatibility
- **CSS Updates**: Adopt new CSS features
- **Testing Tools**: Update testing tools and libraries
