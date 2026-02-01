'use client';

import React, { useState } from 'react';
import { SmartMealManagementWireframe } from './SmartMealManagement';
import { InstantMessagingWireframe } from './InstantMessaging';
import { SmartReportingWireframe } from './SmartReporting';
import { FlexiblePaymentsWireframe } from './FlexiblePayments';
import { MultiSiteBankingWireframe } from './MultiSiteBanking';
import { Utensils, MessageSquare, BarChart3, CreditCard, Building2, ArrowLeft, ArrowRight } from 'lucide-react';

const wireframes = [
  {
    id: 'meals',
    title: 'Smart Meal Management',
    description: 'Pre-order meals, check balances, and manage dietary preferences',
    icon: Utensils,
    component: SmartMealManagementWireframe
  },
  {
    id: 'messaging',
    title: 'Instant Messaging & Reminders',
    description: 'Send payment alerts, reminders, and important updates to parents',
    icon: MessageSquare,
    component: InstantMessagingWireframe
  },
  {
    id: 'reporting',
    title: 'Smart Reporting & Analytics',
    description: 'Real-time insights into payments, attendance, and financial performance',
    icon: BarChart3,
    component: SmartReportingWireframe
  },
  {
    id: 'payments',
    title: 'Flexible Payment Options',
    description: 'Multiple payment methods including card, bank transfer, USSD, and auto-topup',
    icon: CreditCard,
    component: FlexiblePaymentsWireframe
  },
  {
    id: 'multisite',
    title: 'Multi-Site Banking',
    description: 'Manage funds across multiple school sites with centralized control',
    icon: Building2,
    component: MultiSiteBankingWireframe
  }
];

export function WireframeShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWireframe = wireframes[currentIndex];
  const CurrentComponent = currentWireframe.component;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + wireframes.length) % wireframes.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wireframes.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KudiKlass Feature Wireframes</h1>
              <p className="text-gray-600 mt-1">ParentPay-inspired features for the Nigerian market</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} of {wireframes.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {wireframes.map((wireframe, index) => {
              const Icon = wireframe.icon;
              return (
                <button
                  key={wireframe.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                    index === currentIndex
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{wireframe.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Wireframe Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <currentWireframe.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentWireframe.title}</h2>
                <p className="text-gray-600">{currentWireframe.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                disabled={currentIndex === wireframes.length - 1}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wireframe Display */}
      <div className="py-6">
        <CurrentComponent />
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Swipe through all wireframes to see the complete feature set
            </div>
            <div className="flex space-x-2">
              {wireframes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
