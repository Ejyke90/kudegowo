'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatWindow from '@/components/chat/ChatWindow';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const router = useRouter();
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const handleComplete = () => {
    // Redirect to dashboard after onboarding
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💚</span>
            <span className="font-bold text-xl text-emerald-600">KudEgOwo</span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let's Get You Started
          </h1>
          <p className="text-gray-600">
            Our AI assistant will guide you through setting up your account
          </p>
        </div>

        <div className="h-[600px]">
          <ChatWindow 
            sessionId={sessionId}
            onComplete={handleComplete}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@kudegowo.com" className="text-emerald-600 hover:underline">
              support@kudegowo.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
