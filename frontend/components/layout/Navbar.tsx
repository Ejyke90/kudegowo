"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { features } from '@/lib/features';
import { KudiKlassLogo } from '@/components/ui/KudiKlassLogo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
              <KudiKlassLogo size="medium" />
              <span className="text-2xl font-bold text-primary">KudiKlass</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-gray-700 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#who-we-help" className="text-gray-700 hover:text-primary transition-colors">
              Who We Help
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            {features.enableAuth && (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  Login
                </Link>
                {/* Nigerian Flag */}
                <div className="text-6xl font-bold text-gray-600 leading-none">
                  🇳🇬
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="#services" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              Services
            </Link>
            <Link 
              href="#who-we-help" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              Who We Help
            </Link>
            <Link 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              About
            </Link>
            {features.enableAuth && (
              <Link 
                href="/login" 
                className="block w-full text-center mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
