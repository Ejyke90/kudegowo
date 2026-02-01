'use client';

import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

export function SmartMealManagementWireframe() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Meal Management</h2>
        <p className="text-gray-600">Pre-order meals, check balances, and manage dietary preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Meal Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Weekly Meal Calendar
              </h3>
              <span className="text-sm text-gray-500">Week of Jan 15-21</span>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs font-medium text-gray-600 mb-2">{day}</div>
                  <div className={`border-2 rounded-lg p-3 ${index === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="text-xs font-medium mb-1">Jollof Rice</div>
                    <div className="text-xs text-gray-500">+ Chicken</div>
                    <div className="text-xs text-green-600 mt-1">₦500</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-800 mb-3">Today's Menu - Wednesday</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium text-sm">Jollof Rice with Chicken</div>
                      <div className="text-xs text-gray-500">Protein-rich, no peanuts</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">₦500</div>
                    <div className="text-xs text-green-600">Ordered</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded mr-2"></div>
                    <div>
                      <div className="font-medium text-sm">Efo Riro with Pounded Yam</div>
                      <div className="text-xs text-gray-500">Traditional, gluten-free</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">₦600</div>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance & Allergies Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Meal Balance
            </h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-800">₦3,450</div>
              <div className="text-sm text-gray-500">Current Balance</div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Top Up Balance
            </button>
            <div className="mt-4 text-xs text-gray-500">
              <div>• Auto-topup enabled</div>
              <div>• Low balance alerts at ₦1,000</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Dietary Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">No Peanuts</span>
                <div className="w-4 h-4 bg-red-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vegetarian Options</span>
                <div className="w-4 h-4 bg-green-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Halal Preferred</span>
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800">
              Edit Preferences →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
