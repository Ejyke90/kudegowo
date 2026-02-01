'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, Users, Clock, MapPin, Phone, CheckCircle, Bell, Camera, FileText, Activity } from 'lucide-react';

export function SchoolSafetyWireframe() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">School Safety Management</h2>
        <p className="text-gray-600">Comprehensive safety system for emergency alerts, attendance tracking, and incident reporting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Safety Metrics Cards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Safe</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">98%</div>
          <div className="text-sm text-gray-600">Safety Score</div>
          <div className="text-xs text-gray-500 mt-1">This month</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">1,247</div>
          <div className="text-sm text-gray-600">Students Checked In</div>
          <div className="text-xs text-gray-500 mt-1">96% attendance</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Low</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">2</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
          <div className="text-xs text-gray-500 mt-1">Minor incidents</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Camera className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Online</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">24</div>
          <div className="text-sm text-gray-600">CCTV Active</div>
          <div className="text-xs text-gray-500 mt-1">All zones covered</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Safety Dashboard */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Safety Dashboard
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('alerts')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'alerts' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Alerts
                </button>
                <button 
                  onClick={() => setActiveTab('attendance')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Attendance
                </button>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Emergency Quick Actions */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergency Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Fire Emergency
                    </button>
                    <button className="bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Alert
                    </button>
                    <button className="bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Medical Emergency
                    </button>
                    <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                      <Users className="w-4 h-4 mr-2" />
                      Lockdown
                    </button>
                  </div>
                </div>

                {/* Recent Incidents */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Recent Incidents</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-3" />
                        <div>
                          <div className="font-medium text-sm">Minor Injury - Playground</div>
                          <div className="text-xs text-gray-500">Student scraped knee during recess</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">2 hours ago</div>
                        <div className="text-xs text-green-600">Resolved</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium text-sm">Visitor Check-in</div>
                          <div className="text-xs text-gray-500">Parent pickup - Primary 2</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">3 hours ago</div>
                        <div className="text-xs text-blue-600">Completed</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                        <div>
                          <div className="font-medium text-sm">Safety Drill Completed</div>
                          <div className="text-xs text-gray-500">Fire drill - All buildings</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Yesterday</div>
                        <div className="text-xs text-green-600">Success</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety Zones Status */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Safety Zones Status</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Main Building</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-600">12 CCTV cameras • All operational</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Playground</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-600">6 CCTV cameras • All operational</div>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Parking Lot</span>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-600">4 CCTV cameras • 1 maintenance</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Sports Field</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-600">2 CCTV cameras • All operational</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-4">
                {/* Alert System */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Alert System Configuration
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parent SMS Alerts</span>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Staff Email Notifications</span>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Team Radio</span>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert Templates */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Alert Templates</h4>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-sm mb-1">Fire Emergency</div>
                      <div className="text-xs text-gray-600">Evacuate immediately. Assembly point: Sports Field.</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-sm mb-1">Security Alert</div>
                      <div className="text-xs text-gray-600">Lockdown initiated. Stay in classrooms. Follow staff instructions.</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-sm mb-1">Medical Emergency</div>
                      <div className="text-xs text-gray-600">Medical team responding. Clear hallways immediately.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-4">
                {/* Real-time Attendance */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Real-time Attendance
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">1,247</div>
                      <div className="text-xs text-gray-600">Present</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">38</div>
                      <div className="text-xs text-gray-600">Absent</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">5</div>
                      <div className="text-xs text-gray-600">Late</div>
                    </div>
                  </div>
                </div>

                {/* Class-wise Attendance */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Class-wise Attendance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Primary 1A</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">28/30</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Primary 2B</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">32/32</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">JSS 1A</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">35/38</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Visitor Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Visitor Management
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Active Visitors</span>
                  <span className="text-sm font-bold text-purple-600">8</span>
                </div>
                <div className="text-xs text-gray-600">All checked in properly</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Parent Pickups</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Maintenance</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deliveries</span>
                  <span className="font-medium">1</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Check In New Visitor
              </button>
            </div>
          </div>

          {/* Incident Reporting */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-600" />
              Incident Reporting
            </h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Reports this month</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Minor</span>
                  <span className="font-medium text-green-600">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Moderate</span>
                  <span className="font-medium text-yellow-600">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Major</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
              </div>

              <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                Report New Incident
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-600" />
              Emergency Contacts
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-red-50 rounded">
                <div className="font-medium text-sm">School Security</div>
                <div className="text-xs text-gray-600">0800-123-4567</div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <div className="font-medium text-sm">Local Police</div>
                <div className="text-xs text-gray-600">0800-222-9999</div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <div className="font-medium text-sm">Medical Services</div>
                <div className="text-xs text-gray-600">0800-111-8888</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
