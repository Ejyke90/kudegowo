'use client';

import { useState, useEffect } from 'react';
import {
  CalendarClock, Clock, CheckCircle2, XCircle, AlertTriangle,
  SkipForward, Ban, RefreshCw
} from 'lucide-react';
import { scheduledPaymentApi, PaymentStatus, type ScheduledPayment, type ScheduledPaymentSummary } from '@/lib/api';

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
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Scheduled Payments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your recurring and scheduled payment obligations</p>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-sm text-gray-500">Pending</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.pendingCount}</p>
            <p className="text-xs text-gray-500">₦{summary.pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-sm text-gray-500">Completed</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.completedCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="ml-2 text-sm text-gray-500">Failed</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.failedCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm text-gray-500">Total Due</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">₦{summary.pendingAmount.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="mt-6 flex items-center space-x-2">
        <span className="text-sm text-gray-500">Filter:</span>
        {['', 'pending', 'completed', 'failed', 'cancelled', 'skipped'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status || 'All'}
          </button>
        ))}
      </div>

      {/* Payment List */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading payments...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <CalendarClock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled payments</h3>
            <p className="mt-1 text-sm text-gray-500">
              Schedule payments from your school fee categories.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => {
              const config = STATUS_CONFIG[payment.status] || STATUS_CONFIG.pending;
              const StatusIcon = config.icon;
              const childObj = typeof payment.child === 'object' ? payment.child : null;
              const isPending = payment.status === 'pending';
              const isOverdue = isPending && new Date(payment.scheduledDate) < new Date();
              const isProcessing = actionLoading === payment._id;

              return (
                <div key={payment._id} className={`bg-white shadow rounded-lg p-4 ${isOverdue ? 'border-l-4 border-red-400' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <StatusIcon className={`h-5 w-5 ${
                          payment.status === 'completed' ? 'text-green-500' :
                          payment.status === 'failed' ? 'text-red-500' :
                          payment.status === 'pending' ? 'text-yellow-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {payment.feeType}
                          {childObj && (
                            <span className="text-gray-500 font-normal"> — {childObj.firstName} {childObj.lastName}</span>
                          )}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(payment.scheduledDate).toLocaleDateString('en-NG', {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </span>
                          {isOverdue && (
                            <span className="text-xs text-red-600 font-medium flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-0.5" /> Overdue
                            </span>
                          )}
                          {payment.retryCount > 0 && (
                            <span className="text-xs text-orange-600">Retry {payment.retryCount}/3</span>
                          )}
                          {payment.isAutoGenerated && (
                            <span className="text-xs text-blue-500">Auto-generated</span>
                          )}
                        </div>
                        {payment.failureReason && (
                          <p className="text-xs text-red-500 mt-1">{payment.failureReason}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-gray-900">₦{payment.amount.toLocaleString()}</span>

                      {isPending && (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleSkip(payment._id)}
                            disabled={isProcessing}
                            title="Skip"
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-md disabled:opacity-50"
                          >
                            <SkipForward className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCancel(payment._id)}
                            disabled={isProcessing}
                            title="Cancel"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md disabled:opacity-50"
                          >
                            <Ban className="h-4 w-4" />
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
