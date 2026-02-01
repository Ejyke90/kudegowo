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
        {/* School Payment Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
          {/* Graduation Cap Icon */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
            <svg 
              width={iconSizes[size]} 
              height={iconSizes[size]} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M22 10v6M2 10l10-5 10 5" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M6 12l-2 2" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M18 12l2 2" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
          
          {/* Payment Card Icon */}
          <div className="absolute bottom-1 right-1">
            <svg 
              width={iconSizes[size]} 
              height={iconSizes[size]} 
              viewBox="0 0 24 24" 
              fill="white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <rect x="7" y="9" width="10" height="6" rx="1" fill="blue" />
              <circle cx="9" cy="11" r="1" fill="white" />
            </svg>
          </div>
        </div>
        
        {/* KudiKlass Text Background */}
        <div className="absolute inset-x-1 top-1 bottom-1 bg-white rounded-full flex items-center justify-center">
          {/* KudiKlass Text */}
          <div className="text-center">
            <div className="font-bold text-gray-800 leading-none" style={{ fontSize: textSizes[size] }}>
              KUDI
            </div>
            <div className="font-bold text-gray-800 leading-none" style={{ fontSize: textSizes[size] }}>
              KLASS
            </div>
          </div>
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
