'use client';

import React from 'react';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LogoVariant = 'color' | 'mono' | 'on-dark' | 'on-light';

interface KudegowoLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const SIZES: Record<LogoSize, number> = {
  xs: 16,
  sm: 32,
  md: 40,
  lg: 64,
  xl: 120,
};

const FILLS: Record<LogoVariant, { shield: string; k: string; accent: string }> = {
  color:    { shield: '#0066CC', k: 'white',   accent: '#E6A500' },
  mono:     { shield: '#003366', k: 'white',   accent: '#003366' },
  'on-dark':  { shield: 'white',   k: '#003366', accent: '#E6A500' },
  'on-light': { shield: '#003366', k: 'white',   accent: '#E6A500' },
};

export function KudegowoLogo({ size = 'md', variant = 'color', className = '' }: KudegowoLogoProps) {
  const px = SIZES[size];
  const { shield, k, accent } = FILLS[variant];
  const showTexture = px >= 64;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kudegowo logo"
      className={className}
    >
      <title>Kudegowo Logo</title>

      {/* Shield shape */}
      {variant === 'color' ? (
        <>
          <defs>
            <linearGradient id={`kd-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077DD" />
              <stop offset="100%" stopColor="#0055AA" />
            </linearGradient>
          </defs>
          <path
            d="M120,18 L208,62 C212,64 214,68 214,72 L214,148 C214,152 212,156 208,159 L128,218 C124,221 118,221 114,218 L34,159 C30,156 28,152 28,148 L28,72 C28,68 30,64 34,62 Z"
            fill={`url(#kd-grad-${size})`}
          />
        </>
      ) : (
        <path
          d="M120,18 L208,62 C212,64 214,68 214,72 L214,148 C214,152 212,156 208,159 L128,218 C124,221 118,221 114,218 L34,159 C30,156 28,152 28,148 L28,72 C28,68 30,64 34,62 Z"
          fill={shield}
        />
      )}

      {/* Adire-inspired diagonal texture — only at larger sizes */}
      {showTexture && (
        <g opacity="0.12">
          <defs>
            <clipPath id={`sc-${size}`}>
              <path d="M120,18 L208,62 C212,64 214,68 214,72 L214,148 C214,152 212,156 208,159 L128,218 C124,221 118,221 114,218 L34,159 C30,156 28,152 28,148 L28,72 C28,68 30,64 34,62 Z" />
            </clipPath>
          </defs>
          <g clipPath={`url(#sc-${size})`}>
            <line x1="40" y1="60" x2="200" y2="220" stroke={accent} strokeWidth="18" strokeLinecap="round" />
            <line x1="60" y1="40" x2="220" y2="200" stroke={accent} strokeWidth="18" strokeLinecap="round" />
            <line x1="20" y1="80" x2="180" y2="240" stroke={accent} strokeWidth="18" strokeLinecap="round" />
            <g fill={accent} opacity="0.8">
              <polygon points="70,78 78,92 62,92" />
              <polygon points="100,108 108,122 92,122" />
              <polygon points="130,138 138,152 122,152" />
              <polygon points="160,168 168,182 152,182" />
            </g>
          </g>
        </g>
      )}

      {/* Abstract K letterform */}
      <g fill={k}>
        <rect x="72" y="62" width="28" height="118" rx="4" />
        <polygon points="100,108 170,62 178,62 182,68 174,74 108,118" />
        <polygon points="170,56 190,56 182,68 170,62" />
        <polygon points="100,132 108,124 178,180 170,188" />
      </g>

      {/* Gold accent on graduation-cap angle */}
      <line x1="170" y1="56" x2="190" y2="56" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function KudegowoTextLogo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const textClasses: Record<string, string> = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <div className={`font-bold ${textClasses[size]} bg-gradient-to-r from-kd-blue to-kd-navy bg-clip-text text-transparent`}>
        Kude<span className="text-kd-gold">gowo</span>
      </div>
      <div className="text-xs text-gray-600 font-medium">
        Smart School Payments
      </div>
    </div>
  );
}
