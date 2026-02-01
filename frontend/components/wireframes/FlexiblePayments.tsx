'use client';

import React from 'react';
import { CreditCard, Smartphone, Banknote, RefreshCw, Shield, Clock } from 'lucide-react';

export function FlexiblePaymentsWireframe() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Flexible Payment Options</h2>
        <p className="text-gray-600">Multiple payment methods including card, bank transfer, USSD, and auto-topup</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Payment Methods</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-green-500 bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CreditCard className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-medium">Card Payment</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Pay with Visa, Mastercard, or Verve</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Processing fee:</span>
                    <span className="font-medium">1.5%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Settlement:</span>
                    <span className="font-medium">T+1</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Daily limit:</span>
                    <span className="font-medium">₦500K</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  PCI DSS Compliant
                </div>
              </div>

              <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Smartphone className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Direct bank deposit or transfer</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Processing fee:</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Settlement:</span>
                    <span className="font-medium">Instant</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Supported banks:</span>
                    <span className="font-medium">25+</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-blue-600">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Auto-reconciliation
                </div>
              </div>

              <div className="border-2 border-purple-500 bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Smartphone className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="font-medium">USSD Payment</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Dial *123*456# to pay</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Processing fee:</span>
                    <span className="font-medium">₦50</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Settlement:</span>
                    <span className="font-medium">T+2</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>No internet required:</span>
                    <span className="font-medium">✓</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-purple-600">
                  <Clock className="w-3 h-3 mr-1" />
                  Available 24/7
                </div>
              </div>

              <div className="border-2 border-orange-500 bg-orange-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Banknote className="w-6 h-6 text-orange-600 mr-2" />
                  <span className="font-medium">PayPoint</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Cash payment at authorized agents</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Processing fee:</span>
                    <span className="font-medium">₦100</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Settlement:</span>
                    <span className="font-medium">T+3</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Agent locations:</span>
                    <span className="font-medium">500+</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-orange-600">
                  <Banknote className="w-3 h-3 mr-1" />
                  Cash accepted
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Topup & Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Auto-Topup Settings</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Auto-Topup Enabled</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">When balance falls below ₦1,000</div>
                <div className="text-xs text-gray-600 mt-1">Auto-add ₦5,000 from saved card</div>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Low Balance Alerts</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">Send SMS when balance &lt; ₦2,000</div>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Payment Reminders</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">Remind 3 days before due date</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most Used Method</span>
                <span className="font-medium text-sm">Card (45%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fastest Processing</span>
                <span className="font-medium text-sm">Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lowest Fees</span>
                <span className="font-medium text-sm">Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-medium text-sm text-green-600">98.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
