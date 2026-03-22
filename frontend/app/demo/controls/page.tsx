'use client';

import { useState } from 'react';
import { 
  RotateCcw, 
  CreditCard, 
  Bell, 
  AlertTriangle, 
  Users,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function DemoControlsPage() {
  const [isResetting, setIsResetting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset the database? This will clear all demo data.')) {
      return;
    }

    setIsResetting(true);
    try {
      const response = await fetch(`${API_URL}/demo/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Reset failed');

      showNotification('success', 'Database reset successfully');
    } catch (error) {
      showNotification('error', 'Failed to reset database');
    } finally {
      setIsResetting(false);
    }
  };

  const simulatePayment = async (status: 'success' | 'failed') => {
    try {
      const response = await fetch(`${API_URL}/demo/simulate/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          childId: 'demo-child-id',
          feeType: 'tuition',
          amount: 450000,
          status,
        }),
      });

      if (!response.ok) throw new Error('Simulation failed');

      showNotification('success', `Payment ${status} simulated`);
    } catch (error) {
      showNotification('error', 'Failed to simulate payment');
    }
  };

  const simulateAttendance = async (action: 'check_in' | 'check_out') => {
    try {
      const response = await fetch(`${API_URL}/demo/simulate/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          childId: 'demo-child-id',
          action,
        }),
      });

      if (!response.ok) throw new Error('Simulation failed');

      showNotification('success', `${action.replace('_', ' ')} simulated`);
    } catch (error) {
      showNotification('error', 'Failed to simulate attendance');
    }
  };

  const simulateEmergency = async (severity: string) => {
    try {
      const response = await fetch(`${API_URL}/demo/simulate/emergency`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          schoolId: 'demo-school-id',
          type: 'security',
          severity,
          message: `This is a ${severity} severity test alert`,
        }),
      });

      if (!response.ok) throw new Error('Simulation failed');

      showNotification('success', 'Emergency alert simulated');
    } catch (error) {
      showNotification('error', 'Failed to simulate emergency');
    }
  };

  const testNotification = async (channel: string) => {
    try {
      const response = await fetch(`${API_URL}/demo/test-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ channel }),
      });

      if (!response.ok) throw new Error('Test failed');

      showNotification('success', `${channel} notification sent`);
    } catch (error) {
      showNotification('error', 'Failed to send notification');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold">Demo Controls</h1>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            Demo Mode
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Database Reset */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold">Database Reset</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Reset the database to its initial seed state. All demo data will be restored.
            </p>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isResetting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Reset Database
                </>
              )}
            </button>
          </div>

          {/* Payment Simulation */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold">Payment Events</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Simulate payment success or failure events.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => simulatePayment('success')}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Success
              </button>
              <button
                onClick={() => simulatePayment('failed')}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Failed
              </button>
            </div>
          </div>

          {/* Attendance Simulation */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold">Attendance Events</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Simulate check-in and check-out events.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => simulateAttendance('check_in')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Check In
              </button>
              <button
                onClick={() => simulateAttendance('check_out')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Check Out
              </button>
            </div>
          </div>

          {/* Emergency Alerts */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold">Emergency Alerts</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Simulate emergency alerts with different severity levels.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => simulateEmergency('low')}
                className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
              >
                Low
              </button>
              <button
                onClick={() => simulateEmergency('medium')}
                className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                Medium
              </button>
              <button
                onClick={() => simulateEmergency('high')}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
              >
                High
              </button>
            </div>
          </div>

          {/* Notification Testing */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold">Test Notifications</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Send test notifications through different channels.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => testNotification('email')}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                Email
              </button>
              <button
                onClick={() => testNotification('sms')}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                SMS
              </button>
              <button
                onClick={() => testNotification('push')}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                Push
              </button>
              <button
                onClick={() => testNotification('whatsapp')}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                WhatsApp
              </button>
            </div>
          </div>

          {/* Persona Switching */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold">Switch Persona</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Quickly switch between demo user accounts.
            </p>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 text-left">
                👩 Ada Okonkwo (Parent)
              </button>
              <button className="w-full px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 text-left">
                👨 Chidi Eze (Parent)
              </button>
              <button className="w-full px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 text-left">
                🏫 School Admin
              </button>
            </div>
          </div>
        </div>

        {/* Demo Script */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Demo Script</h2>
          <div className="prose prose-sm max-w-none">
            <ol className="space-y-3">
              <li>
                <strong>Login as Parent (Ada)</strong> - Use ada.okonkwo@demo.com / Demo123!
              </li>
              <li>
                <strong>View Dashboard</strong> - Show children, upcoming payments, notifications
              </li>
              <li>
                <strong>Make a Payment</strong> - Use test card 4084 0840 8408 4081
              </li>
              <li>
                <strong>Check Safe School</strong> - View today's passphrase, attendance history
              </li>
              <li>
                <strong>Explore Financial Literacy</strong> - Show KudiCoins, savings goals, quizzes
              </li>
              <li>
                <strong>Order a Meal</strong> - Pre-order lunch for tomorrow
              </li>
              <li>
                <strong>Switch to School Admin</strong> - Show attendance board, emergency alerts
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
