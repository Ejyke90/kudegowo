'use client';

import { useState, useEffect } from 'react';
import {
  CalendarClock, Clock, CheckCircle2, XCircle, AlertTriangle,
  SkipForward, Ban, RefreshCw, CreditCard, TrendingUp, Filter,
  Plus, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { scheduledPaymentApi, PaymentStatus, type ScheduledPayment, type ScheduledPaymentSummary } from '@/lib/api';
import { isDemoMode, getDemoPayments, DEMO_PAYMENT_SUMMARY } from '@/lib/demo-data';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: XCircle },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-700', icon: Ban },
  skipped: { label: 'Skipped', color: 'bg-purple-100 text-purple-700', icon: SkipForward },
};

export default function ScheduledPaymentsPage() {
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);
  const [summary, setSummary] = useState<ScheduledPaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadPayments();
  }, [statusFilter]);

  async function loadPayments() {
    try {
      setLoading(true);
      
      // Use demo data if in demo mode
      if (isDemoMode()) {
        let demoPayments = getDemoPayments() as unknown as ScheduledPayment[];
        if (statusFilter) {
          demoPayments = demoPayments.filter(p => p.status === statusFilter);
        }
        setPayments(demoPayments);
        setSummary(DEMO_PAYMENT_SUMMARY);
        setLoading(false);
        return;
      }
      
      const [data, summaryData] = await Promise.all([
        scheduledPaymentApi.list({
          status: (statusFilter as PaymentStatus) || undefined,
        }),
        scheduledPaymentApi.summary(),
      ]);
      setPayments(data.scheduledPayments);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  }

  async function handleSkip(id: string) {
    if (!confirm('Skip this payment? A new occurrence will be created if the fee is recurring.')) return;
    setActionLoading(id);
    try {
      await scheduledPaymentApi.skip(id);
      loadPayments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to skip');
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCancel(id: string) {
    if (!confirm('Cancel this scheduled payment?')) return;
    setActionLoading(id);
    try {
      await scheduledPaymentApi.cancel(id);
      loadPayments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Payments</h1>
          <p className="text-gray-600 mt-1">Manage your recurring and scheduled payment obligations</p>
        </div>
        <Link
          href="/dashboard/schools"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Schedule Payment
        </Link>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">PENDING</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{summary.pendingCount}</p>
            <p className="text-sm text-gray-500">₦{summary.pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">COMPLETED</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{summary.completedCount}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium">FAILED</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-red-600">{summary.failedCount}</p>
            <p className="text-sm text-gray-500">Needs attention</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-blue-200 font-medium">TOTAL DUE</span>
            </div>
            <p className="mt-4 text-3xl font-bold">₦{summary.pendingAmount.toLocaleString()}</p>
            <p className="text-sm text-blue-200">Outstanding balance</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['', 'pending', 'completed', 'failed', 'cancelled', 'skipped'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Payment List */}
      <div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading payments...
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
            <XCircle className="mx-auto h-12 w-12 text-red-400 mb-3" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarClock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No scheduled payments</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Schedule payments from your school fee categories to see them here.
            </p>
            <Link
              href="/dashboard/schools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Schedule Your First Payment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => {
              const config = STATUS_CONFIG[payment.status] || STATUS_CONFIG.pending;
              const StatusIcon = config.icon;
              const childObj = typeof payment.child === 'object' ? payment.child : null;
              const isPending = payment.status === 'pending';
              const isOverdue = isPending && new Date(payment.scheduledDate) < new Date();
              const isProcessing = actionLoading === payment._id;

              return (
                <div 
                  key={payment._id} 
                  className={`bg-white rounded-2xl border shadow-sm p-5 transition-all hover:shadow-md ${
                    isOverdue ? 'border-l-4 border-l-red-500 border-red-100' : 'border-gray-100'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        payment.status === 'completed' ? 'bg-green-100' :
                        payment.status === 'failed' ? 'bg-red-100' :
                        payment.status === 'pending' ? 'bg-amber-100' : 'bg-gray-100'
                      }`}>
                        <StatusIcon className={`w-6 h-6 ${
                          payment.status === 'completed' ? 'text-green-600' :
                          payment.status === 'failed' ? 'text-red-600' :
                          payment.status === 'pending' ? 'text-amber-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">
                          {payment.feeType}
                        </p>
                        {childObj && (
                          <p className="text-sm text-gray-500">{childObj.firstName} {childObj.lastName}</p>
                        )}
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${config.color}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(payment.scheduledDate).toLocaleDateString('en-NG', {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </span>
                          {isOverdue && (
                            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                              <AlertTriangle className="h-3 w-3" /> Overdue
                            </span>
                          )}
                          {payment.retryCount > 0 && (
                            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                              Retry {payment.retryCount}/3
                            </span>
                          )}
                          {payment.isAutoGenerated && (
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              Auto-generated
                            </span>
                          )}
                        </div>
                        {payment.failureReason && (
                          <p className="text-xs text-red-500 mt-2 bg-red-50 px-2 py-1 rounded">
                            {payment.failureReason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <span className="text-xl font-bold text-gray-900">₦{payment.amount.toLocaleString()}</span>

                      {isPending && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert('Pay Now functionality coming soon!')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all flex items-center gap-1"
                          >
                            Pay Now <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSkip(payment._id)}
                            disabled={isProcessing}
                            title="Skip this payment"
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg disabled:opacity-50 transition-colors"
                          >
                            <SkipForward className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleCancel(payment._id)}
                            disabled={isProcessing}
                            title="Cancel this payment"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                          >
                            <Ban className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
