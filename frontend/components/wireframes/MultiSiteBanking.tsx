'use client';

import React from 'react';
import { Building2, ArrowRight, PieChart, Users, Settings, TrendingUp } from 'lucide-react';

export function MultiSiteBankingWireframe() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Multi-Site Banking</h2>
        <p className="text-gray-600">Manage funds across multiple school sites with centralized control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sites Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                School Sites Overview
              </h3>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Add Site
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Main Campus - Ikoyi</div>
                      <div className="text-sm text-gray-500">Primary & Secondary • 1,200 students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₦1.2M</div>
                    <div className="text-xs text-green-600">+15% vs last month</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">₦850K</div>
                    <div className="text-xs text-gray-500">School Fees</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦250K</div>
                    <div className="text-xs text-gray-500">Meals</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦100K</div>
                    <div className="text-xs text-gray-500">Transport</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    1,156 students paid (96%)
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View Details →</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Junior Campus - Victoria Island</div>
                      <div className="text-sm text-gray-500">Primary Only • 800 students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₦680K</div>
                    <div className="text-xs text-green-600">+8% vs last month</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">₦480K</div>
                    <div className="text-xs text-gray-500">School Fees</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦150K</div>
                    <div className="text-xs text-gray-500">Meals</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦50K</div>
                    <div className="text-xs text-gray-500">Others</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    744 students paid (93%)
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View Details →</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Senior Campus - Lekki</div>
                      <div className="text-sm text-gray-500">Secondary Only • 600 students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₦520K</div>
                    <div className="text-xs text-red-600">-2% vs last month</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">₦400K</div>
                    <div className="text-xs text-gray-500">School Fees</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦80K</div>
                    <div className="text-xs text-gray-500">Meals</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">₦40K</div>
                    <div className="text-xs text-gray-500">Transport</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    540 students paid (90%)
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View Details →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Allocation & Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Fund Allocation
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Central Operations</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Main Campus</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Junior Campus</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Senior Campus</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium mb-1">Total Funds Available</div>
              <div className="text-2xl font-bold text-gray-800">₦2.4M</div>
              <div className="text-xs text-gray-500">Across all sites</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-600" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">Transfer Funds Between Sites</span>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm">Generate Consolidated Report</span>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm">Manage Site Permissions</span>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm">Configure Auto-Allocation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
