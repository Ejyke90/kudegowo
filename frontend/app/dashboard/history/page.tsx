'use client';

import { useState, useEffect } from 'react';
import { 
  History, 
  ArrowUpRight, 
  ArrowDownLeft,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { isDemoMode, getDemoUser } from '@/lib/demo-data';

interface Transaction {
  _id: string;
  type: 'payment' | 'refund' | 'topup';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
  childName?: string;
  schoolName?: string;
}

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    _id: 'txn-1',
    type: 'payment',
    description: 'Tuition Fee - Term 2',
    amount: 450000,
    status: 'completed',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'TXN-2024-001234',
    childName: 'Chisom Okonkwo',
    schoolName: 'Greensprings School',
  },
  {
    _id: 'txn-2',
    type: 'payment',
    description: 'School Bus - March',
    amount: 25000,
    status: 'completed',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'TXN-2024-001198',
    childName: 'Emeka Okonkwo',
    schoolName: 'Greensprings School',
  },
  {
    _id: 'txn-3',
    type: 'payment',
    description: 'Meal Plan - Week 12',
    amount: 15000,
    status: 'completed',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'TXN-2024-001156',
    childName: 'Chisom Okonkwo',
    schoolName: 'Greensprings School',
  },
  {
    _id: 'txn-4',
    type: 'payment',
    description: 'Books and Materials',
    amount: 35000,
    status: 'completed',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'TXN-2024-001089',
    childName: 'Chisom Okonkwo',
    schoolName: 'Greensprings School',
  },
  {
    _id: 'txn-5',
    type: 'refund',
    description: 'Excursion Refund (Cancelled)',
    amount: 12000,
    status: 'completed',
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'REF-2024-000234',
    childName: 'Emeka Okonkwo',
    schoolName: 'Greensprings School',
  },
  {
    _id: 'txn-6',
    type: 'payment',
    description: 'Extra-curricular Activities',
    amount: 20000,
    status: 'completed',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    reference: 'TXN-2024-000987',
    childName: 'Chisom Okonkwo',
    schoolName: 'Greensprings School',
  },
];

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
};

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    
    if (isDemoMode()) {
      setTransactions(DEMO_TRANSACTIONS);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error('Fetch transactions error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesFilter = filter === 'all' || txn.type === filter;
    const matchesSearch = search === '' || 
      txn.description.toLowerCase().includes(search.toLowerCase()) ||
      txn.reference.toLowerCase().includes(search.toLowerCase()) ||
      txn.childName?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSpent = transactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter(t => t.type === 'refund' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
          <p className="mt-1 text-sm text-gray-500">View all your payment transactions</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <ArrowUpRight className="h-5 w-5 text-red-500" />
            <span className="ml-2 text-sm text-gray-500">Total Spent</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">₦{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <ArrowDownLeft className="h-5 w-5 text-green-500" />
            <span className="ml-2 text-sm text-gray-500">Total Refunds</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">₦{totalRefunds.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <History className="h-5 w-5 text-blue-500" />
            <span className="ml-2 text-sm text-gray-500">Transactions</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{transactions.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          {['all', 'payment', 'refund'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <History className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? 'Try adjusting your search' : 'Your transaction history will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <div key={txn._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${txn.type === 'refund' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {txn.type === 'refund' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{txn.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{txn.reference}</span>
                        {txn.childName && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{txn.childName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${txn.type === 'refund' ? 'text-green-600' : 'text-gray-900'}`}>
                      {txn.type === 'refund' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[txn.status]}`}>
                        {txn.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(txn.date).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
