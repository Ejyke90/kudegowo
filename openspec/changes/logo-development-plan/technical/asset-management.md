# Frontend Asset Management

## Asset Organization Structure

### File System Organization
```
public/
├── assets/
│   ├── logos/
│   │   ├── svg/
│   │   │   ├── cultural-shield/
│   │   │   │   ├── cultural-shield-primary.svg
│   │   │   │   ├── cultural-shield-simplified.svg
│   │   │   │   ├── cultural-shield-icon.svg
│   │   │   │   └── cultural-shield-monochrome.svg
│   │   │   ├── shielded-achievement/
│   │   │   │   ├── shielded-achievement-primary.svg
│   │   │   │   ├── shielded-achievement-simplified.svg
│   │   │   │   ├── shielded-achievement-icon.svg
│   │   │   │   └── shielded-achievement-monochrome.svg
│   │   │   └── components/
│   │   │       ├── shield-base.svg
│   │   │       ├── cultural-pattern.svg
│   │   │       ├── educational-symbol.svg
│   │   │       └── achievement-symbol.svg
│   │   ├── png/
│   │   │   ├── cultural-shield/
│   │   │   │   ├── cultural-shield-primary-240x240.png
│   │   │   │   ├── cultural-shield-primary-120x120.png
│   │   │   │   ├── cultural-shield-primary-64x64.png
│   │   │   │   ├── cultural-shield-primary-32x32.png
│   │   │   │   └── cultural-shield-monochrome-240x240.png
│   │   │   └── shielded-achievement/
│   │   │       ├── shielded-achievement-primary-240x240.png
│   │   │       ├── shielded-achievement-primary-120x120.png
│   │   │       ├── shielded-achievement-primary-64x64.png
│   │   │       ├── shielded-achievement-primary-32x32.png
│   │   │       └── shielded-achievement-monochrome-240x240.png
│   │   ├── ico/
│   │   │   ├── favicon.ico
│   │   │   ├── favicon-16x16.ico
│   │   │   └── favicon-32x32.ico
│   │   └── social/
│   │       ├── facebook/
│   │       │   ├── facebook-profile-400x400.png
│   │       │   └── facebook-cover-851x315.png
│   │       ├── twitter/
│   │       │   ├── twitter-profile-400x400.png
│   │       │   └── twitter-header-1500x500.png
│   │       ├── instagram/
│   │       │   └── instagram-profile-320x320.png
│   │       ├── linkedin/
│   │       │   ├── linkedin-profile-400x400.png
│   │       │   └── linkedin-cover-1584x396.png
│   │       └── youtube/
│   │           ├── youtube-profile-800x800.png
│   │           └── youtube-banner-2560x1440.png
│   ├── icons/
│   │   ├── app-icons/
│   │   │   ├── ios/
│   │   │   │   ├── Icon-60@2x.png (120x120)
│   │   │   │   ├── Icon-60@3x.png (180x180)
│   │   │   │   ├── Icon-76.png (76x76)
│   │   │   │   ├── Icon-76@2x.png (152x152)
│   │   │   │   ├── Icon-83.5@2x.png (167x167)
│   │   │   │   └── Icon-1024.png (1024x1024)
│   │   │   └── android/
│   │   │       ├── ic_launcher.xml
│   │   │       ├── ic_launcher_round.xml
│   │   │       └── mipmap-*/ic_launcher.png
│   │   ├── pwa/
│   │   │   ├── icon-192x192.png
│   │   │   └── icon-512x512.png
│   │   └── favicons/
│   │       ├── favicon-16x16.png
│   │       ├── favicon-32x32.png
│   │       ├── favicon-96x96.png
│   │       └── favicon-192x192.png
│   └── brand/
│       ├── color-palette.png
│       ├── typography-guide.png
│       ├── usage-guidelines.pdf
│       └── brand-assets.zip
├── favicon.ico
├── favicon.svg
├── apple-touch-icon.png
├── apple-touch-icon-180x180.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── site.webmanifest
└── browserconfig.xml
```

## Asset Configuration

### Next.js Configuration
```javascript
// next.config.js
const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
  esModule: true,
  webpack(config, options) {
    // Custom webpack configuration for logo assets
    config.resolve.alias = {
      ...config.resolve.alias,
      '@logos': path.resolve(__dirname, 'public/assets/logos'),
      '@icons': path.resolve(__dirname, 'public/assets/icons'),
      '@brand': path.resolve(__dirname, 'public/assets/brand'),
    };

    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      removeDimensions: true,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
});
```

### Asset Manifest Configuration
```javascript
// public/manifest.json
{
  "name": "KudiKlass",
  "short_name": "KudiKlass",
  "description": "Africa's leading digital payment platform for Nigerian schools",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0066CC",
  "theme_color": "#0066CC",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/assets/icons/pwa/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/icons/pwa/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/logos/svg/cultural-shield-icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "finance", "productivity"],
  "lang": "en",
  "dir": "ltr",
  "scope": "/",
  "prefer_related_applications": false
}
```

## Asset Management System

### Asset Registry
```typescript
// lib/assetRegistry.ts
export interface AssetConfig {
  path: string;
  type: 'svg' | 'png' | 'ico' | 'jpg';
  size: number;
  variant: 'cultural-shield' | 'shielded-achievement';
  format: 'primary' | 'simplified' | 'icon' | 'monochrome';
  theme?: 'light' | 'dark';
  responsive?: boolean;
}

export class AssetRegistry {
  private static assets: Map<string, AssetConfig> = new Map();

  static register(assetId: string, config: AssetConfig): void {
    this.assets.set(assetId, config);
  }

  static get(assetId: string): AssetConfig | undefined {
    return this.assets.get(assetId);
  }

  static getAll(): Map<string, AssetConfig> {
    return new Map(this.assets);
  }

  static getByVariant(variant: string): AssetConfig[] {
    return Array.from(this.assets.values()).filter(
      asset => asset.variant === variant
    );
  }

  static getByType(type: string): AssetConfig[] {
    return Array.from(this.assets.values()).filter(
      asset => asset.type === type
    );
  }
}

// Register logo assets
AssetRegistry.register('cultural-shield-primary-svg', {
  path: '/assets/logos/svg/cultural-shield/cultural-shield-primary.svg',
  type: 'svg',
  size: 240,
  variant: 'cultural-shield',
  format: 'primary',
  responsive: true,
});

AssetRegistry.register('cultural-shield-simplified-svg', {
  path: '/assets/logos/svg/cultural-shield/cultural-shield-simplified.svg',
  type: 'svg',
  size: 120,
  variant: 'cultural-shield',
  format: 'simplified',
  responsive: true,
});

AssetRegistry.register('cultural-shield-icon-svg', {
  path: '/assets/logos/svg/cultural-shield/cultural-shield-icon.svg',
  type: 'svg',
  size: 64,
  variant: 'cultural-shield',
  format: 'icon',
  responsive: true,
});

AssetRegistry.register('shielded-achievement-primary-svg', {
  path: '/assets/logos/svg/shielded-achievement/shielded-achievement-primary.svg',
  type: 'svg',
  size: 240,
  variant: 'shielded-achievement',
  format: 'primary',
  responsive: true,
});

AssetRegistry.register('shielded-achievement-simplified-svg', {
  path: '/assets/logos/svg/shielded-achievement/shielded-achievement-simplified.svg',
  type: 'svg',
  size: 120,
  variant: 'shielded-achievement',
  format: 'simplified',
  responsive: true,
});

AssetRegistry.register('shielded-achievement-icon-svg', {
  path: '/assets/logos/svg/shielded-achievement/shielded-achievement-icon.svg',
  type: 'svg',
  size: 64,
  variant: 'shielded-achievement',
  format: 'icon',
  responsive: true,
});
```

### Asset Loader
```typescript
// lib/assetLoader.ts
import { AssetRegistry } from './assetRegistry';

export interface AssetLoadOptions {
  variant: 'cultural-shield' | 'shielded-achievement';
  size: number;
  format?: 'primary' | 'simplified' | 'icon' | 'monochrome';
  type?: 'svg' | 'png';
  theme?: 'light' | 'dark';
}

export class AssetLoader {
  private static cache: Map<string, any> = new Map();

  static async loadAsset(options: AssetLoadOptions): Promise<string> {
    const cacheKey = this.generateCacheKey(options);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const asset = this.findBestAsset(options);
    if (!asset) {
      throw new Error(`Asset not found for options: ${JSON.stringify(options)}`);
    }

    const assetUrl = this.optimizeAssetUrl(asset, options);
    this.cache.set(cacheKey, assetUrl);
    
    return assetUrl;
  }

  private static generateCacheKey(options: AssetLoadOptions): string {
    return `${options.variant}-${options.size}-${options.format || 'primary'}-${options.type || 'svg'}-${options.theme || 'auto'}`;
  }

  private static findBestAsset(options: AssetLoadOptions): AssetConfig | undefined {
    const assets = AssetRegistry.getByVariant(options.variant);
    
    return assets.find(asset => {
      const sizeMatch = asset.size >= options.size;
      const formatMatch = !options.format || asset.format === options.format;
      const typeMatch = !options.type || asset.type === options.type;
      
      return sizeMatch && formatMatch && typeMatch;
    });
  }

  private static optimizeAssetUrl(asset: AssetConfig, options: AssetLoadOptions): string {
    let url = asset.path;
    
    // Add size parameter for PNG assets
    if (asset.type === 'png' && options.size !== asset.size) {
      const sizeStr = `${options.size}x${options.size}`;
      url = url.replace(/-\d+x\d+\./, `-${sizeStr}.`);
    }
    
    // Add theme parameter
    if (options.theme && asset.theme !== options.theme) {
      url = url.replace(/(\.svg|\.png)$/, `-${options.theme}$1`);
    }
    
    return url;
  }

  static preloadAssets(variants: string[]): Promise<void[]> {
    const preloadPromises = variants.map(variant => {
      return this.loadAsset({
        variant: variant as 'cultural-shield' | 'shielded-achievement',
        size: 240,
        format: 'primary',
        type: 'svg',
      });
    });

    return Promise.allSettled(preloadPromises).then(() => []);
  }

  static clearCache(): void {
    this.cache.clear();
  }
}
```

### Asset Optimizer
```typescript
// lib/assetOptimizer.ts
import sharp from 'sharp';
import { promises as fs } from 'fs';

export interface OptimizationOptions {
  quality?: number;
  format?: 'png' | 'jpg' | 'webp';
  resize?: { width: number; height: number };
  progressive?: boolean;
}

export class AssetOptimizer {
  static async optimizeImage(
    inputPath: string,
    outputPath: string,
    options: OptimizationOptions = {}
  ): Promise<void> {
    const {
      quality = 90,
      format = 'png',
      resize,
      progressive = true,
    } = options;

    let pipeline = sharp(inputPath);

    // Apply resizing if specified
    if (resize) {
      pipeline = pipeline.resize(resize.width, resize.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
    }

    // Apply format-specific optimizations
    switch (format) {
      case 'png':
        pipeline = pipeline.png({
          quality,
          progressive,
          compressionLevel: 9,
        });
        break;
      case 'jpg':
        pipeline = pipeline.jpeg({
          quality,
          progressive,
        });
        break;
      case 'webp':
        pipeline = pipeline.webp({
          quality,
        });
        break;
    }

    await pipeline.toFile(outputPath);
  }

  static async optimizeSvg(inputPath: string, outputPath: string): Promise<void> {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    try {
      // Use SVGO for SVG optimization
      await execAsync(`npx svgo "${inputPath}" --output="${outputPath}" --precision=3 --multipass`);
    } catch (error) {
      console.error('SVG optimization failed:', error);
      // Fallback: copy original file
      await fs.copyFile(inputPath, outputPath);
    }
  }

  static async generateResponsiveImages(
    baseName: string,
    inputPath: string,
    outputDir: string,
    sizes: number[]
  ): Promise<void[]> {
    const promises = sizes.map(async (size) => {
      const outputPath = `${outputDir}/${baseName}-${size}x${size}.png`;
      await this.optimizeImage(inputPath, outputPath, {
        resize: { width: size, height: size },
        quality: 85,
        progressive: true,
      });
    });

    return Promise.all(promises);
  }
}
```

## Asset Management Hooks

### React Hook for Asset Loading
```typescript
// hooks/useLogoAsset.ts
import { useState, useEffect, useCallback } from 'react';
import { AssetLoader, AssetLoadOptions } from '../lib/assetLoader';

export interface UseLogoAssetOptions extends AssetLoadOptions {
  preload?: boolean;
  fallback?: string;
}

export const useLogoAsset = (options: UseLogoAssetOptions) => {
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadAsset = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const url = await AssetLoader.loadAsset(options);
      setAssetUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load asset');
      if (options.fallback) {
        setAssetUrl(options.fallback);
      }
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    loadAsset();
  }, [loadAsset]);

  // Preload assets if requested
  useEffect(() => {
    if (options.preload) {
      AssetLoader.preloadAssets(['cultural-shield', 'shielded-achievement']);
    }
  }, [options.preload]);

  return {
    assetUrl,
    isLoading,
    error,
    reload: loadAsset,
  };
};
```

### React Hook for Asset Optimization
```typescript
// hooks/useAssetOptimization.ts
import { useState, useCallback } from 'react';
import { AssetOptimizer, OptimizationOptions } from '../lib/assetOptimizer';

export interface UseAssetOptimizationOptions {
  inputPath: string;
  outputPath: string;
  options?: OptimizationOptions;
}

export const useAssetOptimization = (options: UseAssetOptimizationOptions) => {
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const optimizeAsset = useCallback(async () => {
    try {
      setIsOptimizing(true);
      setError('');
      setProgress(0);

      await AssetOptimizer.optimizeImage(
        options.inputPath,
        options.outputPath,
        options.options
      );

      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setIsOptimizing(false);
    }
  }, [options]);

  return {
    optimizeAsset,
    isOptimizing,
    progress,
    error,
  };
};
```

## Asset Management Components

### Asset Provider Component
```typescript
// components/AssetProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AssetLoader } from '../lib/assetLoader';

interface AssetContextType {
  preloadAssets: () => Promise<void>;
  getAssetUrl: (variant: string, size: number) => Promise<string>;
  isAssetsLoaded: boolean;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  const preloadAssets = async (): Promise<void> => {
    try {
      await AssetLoader.preloadAssets(['cultural-shield', 'shielded-achievement']);
      setIsAssetsLoaded(true);
    } catch (error) {
      console.error('Failed to preload assets:', error);
    }
  };

  const getAssetUrl = async (variant: string, size: number): Promise<string> => {
    return AssetLoader.loadAsset({
      variant: variant as 'cultural-shield' | 'shielded-achievement',
      size,
      format: 'primary',
      type: 'svg',
    });
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  return (
    <AssetContext.Provider
      value={{
        preloadAssets,
        getAssetUrl,
        isAssetsLoaded,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = (): AssetContextType => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
```

### Optimized Logo Component
```typescript
// components/OptimizedLogo.tsx
import React from 'react';
import { useLogoAsset } from '../hooks/useLogoAsset';
import { useAssets } from './AssetProvider';

interface OptimizedLogoProps {
  variant: 'cultural-shield' | 'shielded-achievement';
  size: number;
  className?: string;
  alt?: string;
}

const OptimizedLogo: React.FC<OptimizedLogoProps> = ({
  variant,
  size,
  className = '',
  alt,
}) => {
  const { isAssetsLoaded } = useAssets();
  const { assetUrl, isLoading, error } = useLogoAsset({
    variant,
    size,
    format: size <= 64 ? 'icon' : 'primary',
    type: 'svg',
    preload: true,
  });

  if (error) {
    return (
      <div className={`logo-error ${className}`}>
        <span>Logo Error</span>
      </div>
    );
  }

  if (isLoading || !isAssetsLoaded) {
    return (
      <div className={`logo-loading ${className}`}>
        <div className="logo-spinner" />
      </div>
    );
  }

  return (
    <img
      src={assetUrl}
      alt={alt || `${variant} Logo`}
      className={`optimized-logo ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
};

export default OptimizedLogo;
```

## Build Integration

### Asset Build Script
```javascript
// scripts/buildAssets.js
const fs = require('fs').promises;
const path = require('path');
const { AssetOptimizer } = require('../lib/assetOptimizer');

const ASSETS_CONFIG = [
  {
    input: 'public/assets/logos/svg/cultural-shield/cultural-shield-primary.svg',
    outputDir: 'public/assets/logos/png/cultural-shield',
    baseName: 'cultural-shield-primary',
    sizes: [32, 64, 120, 240],
  },
  {
    input: 'public/assets/logos/svg/shielded-achievement/shielded-achievement-primary.svg',
    outputDir: 'public/assets/logos/png/shielded-achievement',
    baseName: 'shielded-achievement-primary',
    sizes: [32, 64, 120, 240],
  },
];

async function buildAssets() {
  console.log('Building logo assets...');
  
  for (const config of ASSETS_CONFIG) {
    console.log(`Processing ${config.baseName}...`);
    
    // Ensure output directory exists
    await fs.mkdir(config.outputDir, { recursive: true });
    
    // Generate responsive images
    await AssetOptimizer.generateResponsiveImages(
      config.baseName,
      config.input,
      config.outputDir,
      config.sizes
    );
    
    console.log(`✓ ${config.baseName} completed`);
  }
  
  console.log('✓ All logo assets built successfully');
}

buildAssets().catch(console.error);
```

### Package.json Scripts
```json
{
  "scripts": {
    "build:assets": "node scripts/buildAssets.js",
    "optimize:assets": "node scripts/optimizeAssets.js",
    "validate:assets": "node scripts/validateAssets.js",
    "prebuild": "npm run build:assets",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Performance Monitoring

### Asset Performance Metrics
```typescript
// lib/assetPerformance.ts
export interface AssetPerformanceMetrics {
  loadTime: number;
  fileSize: number;
  cacheHitRate: number;
  errorRate: number;
  optimizationRatio: number;
}

export class AssetPerformanceMonitor {
  private static metrics: Map<string, AssetPerformanceMetrics> = new Map();

  static recordLoad(assetId: string, loadTime: number, fileSize: number): void {
    const existing = this.metrics.get(assetId) || {
      loadTime: 0,
      fileSize: 0,
      cacheHitRate: 0,
      errorRate: 0,
      optimizationRatio: 0,
    };

    this.metrics.set(assetId, {
      ...existing,
      loadTime,
      fileSize,
    });
  }

  static recordCacheHit(assetId: string): void {
    const existing = this.metrics.get(assetId);
    if (existing) {
      this.metrics.set(assetId, {
        ...existing,
        cacheHitRate: existing.cacheHitRate + 1,
      });
    }
  }

  static recordError(assetId: string): void {
    const existing = this.metrics.get(assetId);
    if (existing) {
      this.metrics.set(assetId, {
        ...existing,
        errorRate: existing.errorRate + 1,
      });
    }
  }

  static getMetrics(assetId: string): AssetPerformanceMetrics | undefined {
    return this.metrics.get(assetId);
  }

  static getAllMetrics(): Map<string, AssetPerformanceMetrics> {
    return new Map(this.metrics);
  }

  static generateReport(): string {
    const metrics = this.getAllMetrics();
    let report = 'Asset Performance Report\n';
    report += '=' .repeat(50) + '\n';

    for (const [assetId, metric] of metrics) {
      report += `\n${assetId}:\n`;
      report += `  Load Time: ${metric.loadTime}ms\n`;
      report += `  File Size: ${metric.fileSize}KB\n`;
      report += `  Cache Hit Rate: ${metric.cacheHitRate}\n`;
      report += `  Error Rate: ${metric.errorRate}\n`;
    }

    return report;
  }
}
```

## Success Metrics

### Performance Metrics
- **Load Time**: < 100ms for all logo assets
- **File Size**: < 5KB for SVG files, < 50KB for PNG files
- **Cache Hit Rate**: 95%+ for returning users
- **Error Rate**: < 1% for asset loading

### Developer Experience
- **Easy Integration**: Simple API for asset loading
- **Type Safety**: Full TypeScript support
- **Documentation**: Comprehensive documentation
- **Tooling**: Automated optimization tools

### Maintenance Metrics
- **Build Time**: < 30 seconds for asset optimization
- **Bundle Size**: < 10KB for asset management code
- **Test Coverage**: 95%+ test coverage
- **Documentation**: 100% API documentation

## Maintenance Guidelines

### Regular Maintenance
**Daily**:
- Monitor asset performance metrics
- Check for asset loading errors
- Validate cache performance

**Weekly**:
- Review asset optimization settings
- Update asset registry if needed
- Check for new optimization opportunities

**Monthly**:
- Run full asset optimization
- Update asset documentation
- Review asset organization structure

### Evolution Strategy
**Technology Updates**:
- Adopt new image optimization tools
- Implement new asset formats (WebP, AVIF)
- Update to latest optimization libraries
- Enhance performance monitoring

**Feature Updates**:
- Add new logo variants
- Implement advanced caching strategies
- Add real-time asset optimization
- Enhance developer tooling

**Process Improvements**:
- Automate asset validation
- Implement continuous optimization
- Add performance alerts
- Enhance error handling
