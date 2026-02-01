'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, Filter } from 'lucide-react';

export function SmartReportingWireframe() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Reporting & Analytics</h2>
        <p className="text-gray-600">Real-time insights into payments, attendance, and financial performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Key Metrics Cards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">₦2.4M</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="text-xs text-gray-500 mt-1">This month</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">+5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">1,847</div>
          <div className="text-sm text-gray-600">Active Students</div>
          <div className="text-xs text-gray-500 mt-1">95% payment rate</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">-3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">89%</div>
          <div className="text-sm text-gray-600">Collection Rate</div>
          <div className="text-xs text-gray-500 mt-1">On-time payments</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-orange-600" />
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Due</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">₦145K</div>
          <div className="text-sm text-gray-600">Outstanding</div>
          <div className="text-xs text-gray-500 mt-1">23 students</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Revenue Overview
              </h3>
              <div className="flex items-center space-x-2">
                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">Monthly</button>
                <button className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">Weekly</button>
                <button className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">Daily</button>
              </div>
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm">Revenue Chart Visualization</div>
                <div className="text-xs">Jan: ₦2.1M | Feb: ₦2.4M | Mar: ₦2.3M</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">₦2.4M</div>
                <div className="text-xs text-gray-600">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">+12%</div>
                <div className="text-xs text-gray-600">vs Last Month</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">₦28.8M</div>
                <div className="text-xs text-gray-600">YTD Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Categories</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">School Fees</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Meals</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Transport</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Others</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">Export Financial Report</span>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm">Filter by Class/Grade</span>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm">View Parent Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
