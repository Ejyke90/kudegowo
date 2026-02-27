'use client';

import React from 'react';

const sizes = {
  sm: { box: 32, shield: 18, naira: 10, r: 7 },
  md: { box: 40, shield: 22, naira: 12, r: 9 },
  lg: { box: 56, shield: 32, naira: 17, r: 12 },
  xl: { box: 80, shield: 46, naira: 24, r: 16 },
};

type Size = keyof typeof sizes;

export function SafeNetMark({ size = 'md', className = '' }: { size?: Size; className?: string }) {
  const s = sizes[size];
  const cx = s.box / 2;
  const cy = s.box / 2;
  const sw = s.shield;
  const sh = s.shield * 1.15;
  const sx = cx - sw / 2;
  const sy = cy - sh / 2;

  return (
    <svg
      width={s.box}
      height={s.box}
      viewBox={`0 0 ${s.box} ${s.box}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`snGrad-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <clipPath id={`snClip-${size}`}>
          <rect width={s.box} height={s.box} rx={s.r} />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width={s.box} height={s.box} rx={s.r} fill={`url(#snGrad-${size})`} />

      {/* Shield */}
      <path
        d={`
          M ${cx} ${sy + 2}
          L ${sx + sw - 2} ${sy + sh * 0.32}
          L ${sx + sw - 2} ${sy + sh * 0.58}
          Q ${sx + sw - 2} ${sy + sh * 0.85} ${cx} ${sy + sh - 1}
          Q ${sx + 2} ${sy + sh * 0.85} ${sx + 2} ${sy + sh * 0.58}
          L ${sx + 2} ${sy + sh * 0.32}
          Z
        `}
        fill="white"
        fillOpacity="0.2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ₦ symbol inside shield */}
      <text
        x={cx}
        y={cy + s.naira * 0.38}
        textAnchor="middle"
        fontSize={s.naira}
        fontWeight="800"
        fill="white"
        fontFamily="system-ui, sans-serif"
      >
        ₦
      </text>
    </svg>
  );
}

export function SafeNetWordmark({
  size = 'md',
  variant = 'full',
  className = '',
}: {
  size?: Size;
  variant?: 'icon' | 'short' | 'full';
  className?: string;
}) {
  const textSizes: Record<Size, { name: string; sub: string }> = {
    sm: { name: 'text-sm',  sub: 'text-xs' },
    md: { name: 'text-xl',  sub: 'text-xs' },
    lg: { name: 'text-2xl', sub: 'text-sm' },
    xl: { name: 'text-4xl', sub: 'text-base' },
  };
  const t = textSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <SafeNetMark size={size} />
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight text-white ${t.name}`}>
            Kudegowo
          </span>
          {variant === 'full' && (
            <span className={`font-semibold text-emerald-400 ${t.sub} mt-0.5`}>
              SafeNet
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function SafeNetWordmarkDark({
  size = 'md',
  variant = 'full',
  className = '',
}: {
  size?: Size;
  variant?: 'icon' | 'short' | 'full';
  className?: string;
}) {
  const textSizes: Record<Size, { name: string; sub: string }> = {
    sm: { name: 'text-sm',  sub: 'text-xs' },
    md: { name: 'text-xl',  sub: 'text-xs' },
    lg: { name: 'text-2xl', sub: 'text-sm' },
    xl: { name: 'text-4xl', sub: 'text-base' },
  };
  const t = textSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <SafeNetMark size={size} />
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight text-gray-900 ${t.name}`}>
            Kudegowo
          </span>
          {variant === 'full' && (
            <span className={`font-semibold text-emerald-600 ${t.sub} mt-0.5`}>
              SafeNet
            </span>
          )}
        </div>
      )}
    </div>
  );
}
