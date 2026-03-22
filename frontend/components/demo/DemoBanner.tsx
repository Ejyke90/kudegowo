'use client';

import { useState } from 'react';
import { AlertTriangle, X, Settings, RotateCcw, Users } from 'lucide-react';
import Link from 'next/link';

interface DemoBannerProps {
  onReset?: () => void;
}

export default function DemoBanner({ onReset }: DemoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-amber-500 text-amber-950">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Demo Mode - Data will reset periodically
            </span>
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
              className="p-1 hover:bg-amber-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Credentials Modal */}
      {showCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Demo Credentials</h2>
              <button
                onClick={() => setShowCredentials(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <CredentialRow
                  role="Parent 1"
                  email="ada.okonkwo@demo.com"
                  password="Demo123!"
                />
                <CredentialRow
                  role="Parent 2"
                  email="chidi.eze@demo.com"
                  password="Demo123!"
                />
                <CredentialRow
                  role="School Admin"
                  email="admin@greensprings.demo.com"
                  password="Demo123!"
                />
                <CredentialRow
                  role="Tutor"
                  email="tutor@demo.com"
                  password="Demo123!"
                />
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
