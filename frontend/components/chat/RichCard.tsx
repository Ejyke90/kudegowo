'use client';

import { School, User, CreditCard, Calendar, MapPin, Phone } from 'lucide-react';

interface RichCardProps {
  type: 'school' | 'child' | 'fee' | 'payment';
  data: Record<string, any>;
  onAction?: (action: string, data: any) => void;
}

export default function RichCard({ type, data, onAction }: RichCardProps) {
  if (type === 'school') {
    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-emerald-50 px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-800">{data.name}</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{data.address}, {data.city}</span>
          </div>
          {data.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.fees && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500 mb-2">Fee Categories:</p>
              <div className="flex flex-wrap gap-1">
                {data.fees.map((fee: any, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {fee.name}: ₦{fee.amount.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {onAction && (
          <div className="px-4 py-3 bg-gray-50 border-t flex gap-2">
            <button
              onClick={() => onAction('select', data)}
              className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              Select School
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === 'child') {
    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-blue-50 px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">
              {data.firstName} {data.lastName}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <School className="w-4 h-4" />
            <span>{data.schoolName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Class: {data.className}</span>
          </div>
        </div>
        {onAction && (
          <div className="px-4 py-3 bg-gray-50 border-t flex gap-2">
            <button
              onClick={() => onAction('view', data)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === 'fee') {
    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-amber-50 px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">{data.name}</span>
            </div>
            <span className="text-lg font-bold text-amber-700">
              ₦{data.amount.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
          {data.childName && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <User className="w-4 h-4" />
              <span>For: {data.childName}</span>
            </div>
          )}
        </div>
        {onAction && (
          <div className="px-4 py-3 bg-gray-50 border-t flex gap-2">
            <button
              onClick={() => onAction('pay', data)}
              className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700"
            >
              Pay Now
            </button>
            <button
              onClick={() => onAction('schedule', data)}
              className="px-3 py-2 border border-amber-600 text-amber-600 rounded-lg text-sm font-medium hover:bg-amber-50"
            >
              Schedule
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === 'payment') {
    const statusColors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };

    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">Payment</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[data.status as keyof typeof statusColors] || statusColors.pending
            }`}>
              {data.status}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold">₦{data.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Reference</span>
            <span className="font-mono text-sm">{data.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date</span>
            <span>{new Date(data.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
