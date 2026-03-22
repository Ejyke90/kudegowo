'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Building2, Users, CalendarClock, AlertCircle,
  ArrowLeft, Plus, Trash2
} from 'lucide-react';
import {
  schoolProfileApi, childApi, scheduledPaymentApi,
  type SchoolProfile, type Child, type ScheduledPayment,
  PaymentStatus,
} from '@/lib/api';

const FEE_TYPE_COLORS: Record<string, string> = {
  tuition: 'bg-blue-100 text-blue-700',
  meals: 'bg-orange-100 text-orange-700',
  transport: 'bg-green-100 text-green-700',
  uniform: 'bg-purple-100 text-purple-700',
  books: 'bg-yellow-100 text-yellow-700',
  trips: 'bg-pink-100 text-pink-700',
  extracurricular: 'bg-indigo-100 text-indigo-700',
  other: 'bg-gray-100 text-gray-700',
};

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [school, setSchool] = useState<SchoolProfile | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'children' | 'payments'>('children');

  // Child form state
  const [showChildForm, setShowChildForm] = useState(false);
  const [childForm, setChildForm] = useState({ firstName: '', lastName: '', grade: '', studentId: '' });
  const [childFormError, setChildFormError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      const [schoolData, childrenData, paymentsData] = await Promise.all([
        schoolProfileApi.get(id),
        childApi.list({ schoolProfile: id }),
        scheduledPaymentApi.list({ schoolProfile: id }),
      ]);
      setSchool(schoolData.schoolProfile);
      setChildren(childrenData.children);
      setPayments(paymentsData.scheduledPayments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddChild(e: React.FormEvent) {
    e.preventDefault();
    setChildFormError(null);
    try {
      await childApi.create({ ...childForm, schoolProfile: id });
      setShowChildForm(false);
      setChildForm({ firstName: '', lastName: '', grade: '', studentId: '' });
      loadData();
    } catch (err) {
      setChildFormError(err instanceof Error ? err.message : 'Failed to add child');
    }
  }

  async function handleDeactivateChild(childId: string) {
    if (!confirm('Deactivate this child? Pending scheduled payments will be cancelled.')) return;
    try {
      await childApi.deactivate(childId);
      loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to deactivate child');
    }
  }

  async function handleCancelPayment(paymentId: string) {
    if (!confirm('Cancel this scheduled payment?')) return;
    try {
      await scheduledPaymentApi.cancel(paymentId);
      loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel payment');
    }
  }

  const pendingPayments = payments.filter(p => p.status === PaymentStatus.PENDING);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!school) return <div className="text-center py-12 text-gray-500">School not found</div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/schools" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Schools
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold text-gray-900">{school.name}</h1>
              <p className="text-sm text-gray-500">
                {school.city}{school.state ? `, ${school.state}` : ''}
                {school.address ? ` — ${school.address}` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="ml-2 text-sm text-gray-500">Children</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{children.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CalendarClock className="h-5 w-5 text-green-500" />
            <span className="ml-2 text-sm text-gray-500">Pending Payments</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{pendingPayments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertCircle className={`h-5 w-5 ${payments.filter(p => p.status === PaymentStatus.FAILED).length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
            <span className="ml-2 text-sm text-gray-500">Failed</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{payments.filter(p => p.status === PaymentStatus.FAILED).length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('children')}
            className={`py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'children'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-1" />
            Children ({children.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-1 border-b-2 text-sm font-medium ${activeTab === 'payments'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CalendarClock className="h-4 w-4 inline mr-1" />
            Payments ({payments.length})
          </button>
        </nav>
      </div>

      {/* Children Tab */}
      {activeTab === 'children' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Children</h2>
            <button
              onClick={() => setShowChildForm(!showChildForm)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Child
            </button>
          </div>

          {showChildForm && (
            <div className="bg-white shadow rounded-lg p-5 mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Add a Child</h3>
              {childFormError && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{childFormError}</div>
              )}
              <form onSubmit={handleAddChild} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required placeholder="First Name *" value={childForm.firstName}
                  onChange={(e) => setChildForm({ ...childForm, firstName: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <input required placeholder="Last Name *" value={childForm.lastName}
                  onChange={(e) => setChildForm({ ...childForm, lastName: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <input placeholder="Grade (e.g. Year 5)" value={childForm.grade}
                  onChange={(e) => setChildForm({ ...childForm, grade: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <input placeholder="Student ID (optional)" value={childForm.studentId}
                  onChange={(e) => setChildForm({ ...childForm, studentId: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <div className="sm:col-span-2 flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowChildForm(false)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit"
                    className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Add Child</button>
                </div>
              </form>
            </div>
          )}

          {children.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <Users className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No children added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {children.map((child) => (
                <div key={child._id} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {child.firstName[0]}{child.lastName[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{child.firstName} {child.lastName}</p>
                      <p className="text-xs text-gray-500">
                        {child.grade || 'No grade set'}
                        {child.studentId && ` — ID: ${child.studentId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!child.isActive && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Inactive</span>
                    )}
                    <button onClick={() => handleDeactivateChild(child._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Scheduled Payments</h2>
            <Link
              href="/dashboard/scheduled-payments"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all payments →
            </Link>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <CalendarClock className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No payments for this school yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => {
                const childObj = typeof payment.child === 'object' ? payment.child : null;
                const isOverdue = payment.status === PaymentStatus.PENDING && new Date(payment.scheduledDate) < new Date();
                return (
                  <div key={payment._id} className={`bg-white shadow rounded-lg p-4 ${isOverdue ? 'border-l-4 border-red-400' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-gray-900 capitalize">{payment.feeType}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${FEE_TYPE_COLORS[payment.feeType] || FEE_TYPE_COLORS.other}`}>
                            {payment.feeType}
                          </span>
                          {payment.isRecurring && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                              {payment.recurrenceRule?.frequency}
                            </span>
                          )}
                          {isOverdue && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Overdue</span>
                          )}
                        </div>
                        {childObj && (
                          <p className="text-xs text-gray-500 mt-1">
                            {childObj.firstName} {childObj.lastName}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Scheduled: {new Date(payment.scheduledDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-gray-900">₦{payment.amount.toLocaleString()}</span>
                        {payment.status === PaymentStatus.PENDING && (
                          <button onClick={() => handleCancelPayment(payment._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
