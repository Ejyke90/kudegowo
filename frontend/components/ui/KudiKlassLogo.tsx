'use client';

import React from 'react';

export function KudiKlassLogo({ size = "medium", className = "" }: { size?: "small" | "medium" | "large", className?: string }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10", 
    large: "w-12 h-12"
  };

  const textSizes = {
    small: "8px" as const,
    medium: "10px" as const,
    large: "12px" as const
  };

  const iconSizes = {
    small: 12 as const,
    medium: 16 as const,
    large: 20 as const
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Logo Container */}
      <div className="w-full h-full relative">
        {/* Nigerian Flag Background Circle */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div className="flex-1 bg-green-600"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-green-600"></div>
          </div>
        </div>
        
        {/* White Text Background for Better Contrast */}
        <div className="absolute inset-x-2 top-1 bottom-1 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
          {/* KudiKlass Text Overlay */}
          <div className="text-center">
            <div className="font-bold text-primary leading-none" style={{ fontSize: textSizes[size] }}>
              KUDI
            </div>
            <div className="font-bold text-primary leading-none" style={{ fontSize: textSizes[size] }}>
              KLASS
            </div>
          </div>
        </div>
        
        {/* Payment Icon Overlay */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
          <svg 
            width={iconSizes[size]} 
            height={iconSizes[size]} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
              stroke="#00875A" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Text-only version for headers
export function KudiKlassTextLogo({ size = "medium", className = "" }: { size?: "small" | "medium" | "large", className?: string }) {
  const sizeClasses = {
    small: "text-lg",
    medium: "text-2xl", 
    large: "text-3xl"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`font-bold ${sizeClasses[size]} bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
        Kudi
        <span className="text-secondary">Klass</span>
      </div>
    </div>
  );
}
