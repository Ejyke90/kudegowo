'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, Settings, RotateCcw, Users, Building2 } from 'lucide-react';
import Link from 'next/link';
import { getDemoSchoolContext, type DemoSchoolContext } from '@/lib/demo-data';

interface DemoBannerProps {
  onReset?: () => void;
}

const SCHOOL_NAMES: Record<DemoSchoolContext, string> = {
  default: 'Chrisland Schools', // Default to Chrisland
  chrisland: 'Chrisland Schools',
  riverside: 'Riverside Schools',
};

const SCHOOL_COLORS: Record<DemoSchoolContext, string> = {
  default: 'bg-blue-500 text-white', // Default to Chrisland color
  chrisland: 'bg-blue-500 text-white',
  riverside: 'bg-cyan-500 text-white',
};

export default function DemoBanner({ onReset }: DemoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);
  const [schoolContext, setSchoolContext] = useState<DemoSchoolContext>('default');

  useEffect(() => {
    setSchoolContext(getDemoSchoolContext());
  }, []);

  if (!isVisible) return null;

  const bannerColor = SCHOOL_COLORS[schoolContext];
  const schoolName = SCHOOL_NAMES[schoolContext];

  return (
    <>
      <div className={bannerColor}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Demo Mode - {schoolName}
            </span>
            {schoolContext !== 'default' && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">
                Beta Tester
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCredentials(true)}
              className="flex items-center gap-1 text-sm hover:underline"
            >
              <Users className="w-4 h-4" />
              Credentials
            </button>
            
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-sm hover:underline"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            
            <Link
              href="/demo/controls"
              className="flex items-center gap-1 text-sm hover:underline"
            >
              <Settings className="w-4 h-4" />
              Controls
            </Link>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:opacity-80 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Credentials Modal */}
      {showCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Demo Credentials - {schoolName}</h2>
              <button
                onClick={() => setShowCredentials(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {(schoolContext === 'default' || schoolContext === 'chrisland') && (
                  <>
                    <CredentialRow role="Parent (Amaka)" email="amaka.obi@chrisland.demo.com" password="Demo123!" />
                    <CredentialRow role="Parent (Tunde)" email="tunde.adeyemi@chrisland.demo.com" password="Demo123!" />
                    <CredentialRow role="Parent (Funke)" email="funke.williams@chrisland.demo.com" password="Demo123!" />
                    <CredentialRow role="School Admin" email="admin@chrisland.demo.com" password="Demo123!" />
                  </>
                )}
                {schoolContext === 'riverside' && (
                  <>
                    <CredentialRow role="Parent (Bola)" email="bola.johnson@riverside.demo.com" password="Demo123!" />
                    <CredentialRow role="Parent (Kemi)" email="kemi.adekunle@riverside.demo.com" password="Demo123!" />
                    <CredentialRow role="Parent (Segun)" email="segun.bakare@riverside.demo.com" password="Demo123!" />
                    <CredentialRow role="School Admin" email="admin@riverside.demo.com" password="Demo123!" />
                  </>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Test Cards</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success:</span>
                    <code className="bg-gray-100 px-2 py-0.5 rounded">4084 0840 8408 4081</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insufficient:</span>
                    <code className="bg-gray-100 px-2 py-0.5 rounded">4084 0840 8408 4082</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Declined:</span>
                    <code className="bg-gray-100 px-2 py-0.5 rounded">4084 0840 8408 4083</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CredentialRow({ role, email, password }: { role: string; email: string; password: string }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="font-medium text-sm">{role}</div>
        <div className="text-xs text-gray-500">{email}</div>
      </div>
      <button
        onClick={() => copyToClipboard(email)}
        className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200"
      >
        Copy
      </button>
    </div>
  );
}
