'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertCircle, Building2, CalendarClock, Users,
  ChevronRight, Plus, AlertTriangle, Clock,
  Shield, Coins, UtensilsCrossed, CreditCard,
  TrendingUp, Bell, Sparkles, ArrowUpRight
} from 'lucide-react';
import {
  schoolProfileApi, scheduledPaymentApi,
  PaymentStatus,
  type SchoolProfile, type ScheduledPayment, type ScheduledPaymentSummary
} from '@/lib/api';
import { 
  isDemoMode, 
  getDemoSchools, 
  getDemoPayments, 
  DEMO_PAYMENT_SUMMARY, 
} from '@/lib/demo-data';
import { getAuthUser } from '@/lib/auth';

// Quick action cards for the dashboard
const quickActions = [
  {
    title: 'Safe School',
    description: 'Check passphrases & attendance',
    icon: Shield,
    href: '/dashboard/safe-school',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Payments',
    description: 'View scheduled payments',
    icon: CreditCard,
    href: '/dashboard/scheduled-payments',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Financial Literacy',
    description: 'KudiCoins & savings goals',
    icon: Coins,
    href: '/dashboard/financial-literacy',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Meals',
    description: 'Pre-order school meals',
    icon: UtensilsCrossed,
    href: '/dashboard/meals',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
];

export default function DashboardPage() {
  const [schools, setSchools] = useState<SchoolProfile[]>([]);
  const [pendingPayments, setPendingPayments] = useState<ScheduledPayment[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<ScheduledPaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const isSchoolAdmin = user?.role === 'admin' || user?.role === 'school_admin';

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      
      // Use demo data if in demo mode
      if (isDemoMode()) {
        const demoSchools = getDemoSchools() as unknown as SchoolProfile[];
        const demoPayments = getDemoPayments().filter(p => p.status === PaymentStatus.PENDING) as unknown as ScheduledPayment[];
        setSchools(demoSchools);
        setPendingPayments(demoPayments);
        setPaymentSummary(DEMO_PAYMENT_SUMMARY);
        setLoading(false);
        return;
      }
      
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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your children's schools</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <Link
            href="/dashboard/scheduled-payments"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            New Payment
          </Link>
        </div>
      </div>

      {/* Overdue Alerts Banner */}
      {overduePayments.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {overduePayments.length} Overdue Payment{overduePayments.length > 1 ? 's' : ''}
              </h3>
              <div className="mt-2 space-y-1 text-red-100">
                {overduePayments.slice(0, 3).map((payment) => (
                  <p key={payment._id}>
                    {payment.feeType} for {getChildName(payment)} — ₦{payment.amount.toLocaleString()}
                  </p>
                ))}
                {overduePayments.length > 3 && (
                  <p className="font-medium">+ {overduePayments.length - 3} more overdue items</p>
                )}
              </div>
              <Link 
                href="/dashboard/scheduled-payments" 
                className="inline-flex items-center gap-1 mt-4 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Pay Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Due Alerts */}
      {upcomingPayments.length > 0 && overduePayments.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Upcoming Payments</h3>
              <div className="mt-2 space-y-1 text-amber-100">
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

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.bgColor} rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                <ActionIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Summary Stats */}
      {paymentSummary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">SCHOOLS</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{schools.length}</p>
            <p className="text-sm text-gray-500">Enrolled</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">PENDING</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{paymentSummary.pendingCount}</p>
            <p className="text-sm text-gray-500">₦{paymentSummary.pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 ${overduePayments.length > 0 ? 'bg-red-100' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
                <AlertTriangle className={`h-5 w-5 ${overduePayments.length > 0 ? 'text-red-600' : 'text-gray-400'}`} />
              </div>
              <span className="text-xs text-gray-400 font-medium">OVERDUE</span>
            </div>
            <p className={`mt-4 text-3xl font-bold ${overduePayments.length > 0 ? 'text-red-600' : 'text-gray-900'}`}>{overduePayments.length}</p>
            <p className="text-sm text-gray-500">Payments</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">COMPLETED</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{paymentSummary.completedCount}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>
      )}

      {/* My Schools Quick Summary - Only for parents */}
      {!isSchoolAdmin && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My Schools</h2>
            <Link href="/dashboard/schools" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading schools...
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schools yet</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Add your first school to start managing fees and payments.
              </p>
              <Link
                href="/dashboard/schools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Your First School
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schools.map((school) => (
                <Link
                  key={school._id}
                  href={`/dashboard/schools/${school._id}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{school.name}</h3>
                      <p className="text-sm text-gray-500">
                        {school.city}{school.state ? `, ${school.state}` : ''}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pending Payments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Payments</h2>
          <Link href="/dashboard/scheduled-payments" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {pendingPayments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarClock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No pending payments at the moment</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Child</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">School</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingPayments.slice(0, 10).map((payment) => {
                    const isOverdue = new Date(payment.scheduledDate) < now;
                    return (
                      <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900 capitalize">{payment.feeType}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{getChildName(payment)}</td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{getSchoolName(payment)}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(payment.scheduledDate).toLocaleDateString('en-NG', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-semibold text-gray-900">₦{payment.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {isOverdue ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              Overdue
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
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
