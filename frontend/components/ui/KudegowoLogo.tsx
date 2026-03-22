'use client';

import React from 'react';
import Image from 'next/image';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LogoVariant = 'color' | 'mono' | 'on-dark' | 'on-light';

interface KudegowoLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const SIZES: Record<LogoSize, number> = {
  xs: 24,
  sm: 40,
  md: 48,
  lg: 80,
  xl: 120,
};

export function KudegowoLogo({ size = 'md', variant = 'color', className = '' }: KudegowoLogoProps) {
  const px = SIZES[size];

  return (
    <Image
      src="/images/version_2.png"
      alt="KudEgOwo Logo"
      width={px}
      height={px}
      className={className}
      priority
    />
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
