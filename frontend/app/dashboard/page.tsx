'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertCircle, Building2, CalendarClock, Users,
  ChevronRight, Plus, AlertTriangle, Clock
} from 'lucide-react';
import {
  schoolProfileApi, scheduledPaymentApi,
  PaymentStatus,
  type SchoolProfile, type ScheduledPayment, type ScheduledPaymentSummary
} from '@/lib/api';

export default function DashboardPage() {
  const [schools, setSchools] = useState<SchoolProfile[]>([]);
  const [pendingPayments, setPendingPayments] = useState<ScheduledPayment[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<ScheduledPaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const [schoolsData, paymentsData, summaryData] = await Promise.all([
        schoolProfileApi.list({ limit: 5 }).catch(() => ({ schoolProfiles: [] })),
        scheduledPaymentApi.list({ status: PaymentStatus.PENDING, limit: 10 }).catch(() => ({ scheduledPayments: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } })),
        scheduledPaymentApi.summary().catch(() => ({ pendingCount: 0, pendingAmount: 0, failedCount: 0, completedCount: 0 })),
      ]);
      setSchools(schoolsData.schoolProfiles);
      setPendingPayments(paymentsData.scheduledPayments);
      setPaymentSummary(summaryData);
    } catch {
      // Dashboard gracefully degrades — widgets show empty states
    } finally {
      setLoading(false);
    }
  }

  const now = new Date();
  const overduePayments = pendingPayments.filter(p => new Date(p.scheduledDate) < now);
  const upcomingPayments = pendingPayments.filter(p => new Date(p.scheduledDate) >= now);

  function getChildName(payment: ScheduledPayment): string {
    if (typeof payment.child === 'object') return `${payment.child.firstName} ${payment.child.lastName}`;
    return 'Child';
  }

  function getSchoolName(payment: ScheduledPayment): string {
    if (typeof payment.schoolProfile === 'object') return payment.schoolProfile.name;
    return 'School';
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Overdue Alerts Banner */}
      {overduePayments.length > 0 && (
        <div className="mt-4 rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {overduePayments.length} Overdue Payment{overduePayments.length > 1 ? 's' : ''}
              </h3>
              <div className="mt-2 text-sm text-red-700 space-y-1">
                {overduePayments.slice(0, 3).map((payment) => (
                  <p key={payment._id}>
                    {payment.feeType} for {getChildName(payment)} — ₦{payment.amount.toLocaleString()}
                  </p>
                ))}
                {overduePayments.length > 3 && (
                  <p className="font-medium">
                    + {overduePayments.length - 3} more overdue items
                  </p>
                )}
              </div>
              <div className="mt-3">
                <Link href="/dashboard/scheduled-payments" className="text-sm font-medium text-red-800 hover:text-red-600 underline">
                  View all scheduled payments →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Due Alerts */}
      {upcomingPayments.length > 0 && (
        <div className="mt-4 rounded-md bg-yellow-50 p-4 border border-yellow-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Upcoming Payments</h3>
              <div className="mt-2 text-sm text-yellow-700 space-y-1">
                {upcomingPayments.slice(0, 3).map((payment) => {
                  const daysUntil = Math.ceil((new Date(payment.scheduledDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <p key={payment._id}>
                      {payment.feeType} for {getChildName(payment)} — ₦{payment.amount.toLocaleString()}
                      {' '}(due in {daysUntil} day{daysUntil !== 1 ? 's' : ''})
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {paymentSummary && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm text-gray-500">Schools</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{schools.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-sm text-gray-500">Pending Payments</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{paymentSummary.pendingCount}</p>
            <p className="text-xs text-gray-500">₦{paymentSummary.pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 ${overduePayments.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
              <span className="ml-2 text-sm text-gray-500">Overdue</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{overduePayments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-sm text-gray-500">Failed</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{paymentSummary.failedCount}</p>
          </div>
        </div>
      )}

      {/* My Schools Quick Summary */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900">My Schools</h2>
          <Link href="/dashboard/schools" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-4 text-center py-8 text-gray-500 text-sm">Loading...</div>
        ) : schools.length === 0 ? (
          <div className="mt-4 text-center py-10 bg-white rounded-lg shadow">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No schools yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add your first school to start managing fees and payments.
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard/schools"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First School
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
              <Link
                key={school._id}
                href={`/dashboard/schools/${school._id}`}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{school.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {school.city}{school.state ? `, ${school.state}` : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pending Payments Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Pending Payments</h2>
          <Link href="/dashboard/scheduled-payments" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>

        {pendingPayments.length === 0 ? (
          <div className="mt-4 text-center py-8 bg-white rounded-lg shadow">
            <CalendarClock className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No pending payments</p>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fee Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Child
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scheduled
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingPayments.slice(0, 10).map((payment) => {
                    const isOverdue = new Date(payment.scheduledDate) < now;
                    return (
                      <tr key={payment._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {payment.feeType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getChildName(payment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getSchoolName(payment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(payment.scheduledDate).toLocaleDateString('en-NG', {
                            month: 'short', day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₦{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isOverdue ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Overdue
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
