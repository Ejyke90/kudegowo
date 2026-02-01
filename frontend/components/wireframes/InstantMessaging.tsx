'use client';

import React from 'react';
import { MessageSquare, Bell, Clock, Check, Send, AlertTriangle } from 'lucide-react';

export function InstantMessagingWireframe() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Instant Messaging & Reminders</h2>
        <p className="text-gray-600">Send payment alerts, reminders, and important updates to parents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composition */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Send Message
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>All Parents</option>
                  <option>Primary 1 Parents</option>
                  <option>Parents with Overdue Payments</option>
                  <option>Custom Selection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 border-2 border-blue-500 bg-blue-50 rounded-lg text-sm">
                    <Bell className="w-4 h-4 mx-auto mb-1" />
                    Payment Reminder
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg text-sm">
                    <MessageSquare className="w-4 h-4 mx-auto mb-1" />
                    General Notice
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg text-sm">
                    <AlertTriangle className="w-4 h-4 mx-auto mb-1" />
                    Urgent Alert
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg" 
                  rows={4}
                  placeholder="Dear Parents, This is a reminder that school fees for Term 2 are due by Friday, January 20th. Please ensure timely payment to avoid late fees. Thank you for your cooperation."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Channels</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">SMS (2,450 parents)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Email (2,120 parents)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">WhatsApp (1,890 parents)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Schedule for: <span className="font-medium">Immediately</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Messages & Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Messages Sent Today</span>
                <span className="font-bold text-lg">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Parents Reached</span>
                <span className="font-bold text-lg">2,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Open Rate</span>
                <span className="font-bold text-lg text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Response</span>
                <span className="font-bold text-lg text-blue-600">342</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Fee Reminder</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="text-xs text-gray-600">Sent to 2,450 parents</div>
                <div className="flex items-center mt-1">
                  <Check className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">89% delivered</span>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Menu Change</span>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <div className="text-xs text-gray-600">Sent to Primary 1 parents</div>
                <div className="flex items-center mt-1">
                  <Check className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">95% delivered</span>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Payment Confirmation</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <div className="text-xs text-gray-600">Auto-sent to 156 parents</div>
                <div className="flex items-center mt-1">
                  <Check className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">100% delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
