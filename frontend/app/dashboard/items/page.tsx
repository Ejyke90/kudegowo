'use client';

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search,
  Tag,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { isDemoMode, getDemoSchools } from '@/lib/demo-data';

interface PaymentItem {
  _id: string;
  name: string;
  description: string;
  amount: number;
  category: string;
  schoolId: string;
  schoolName: string;
  isRecurring: boolean;
  frequency?: string;
  dueDate?: string;
}

const DEMO_PAYMENT_ITEMS: PaymentItem[] = [
  {
    _id: 'item-1',
    name: 'Tuition Fee - Term 2',
    description: 'Second term tuition fee for 2024 academic year',
    amount: 450000,
    category: 'Tuition',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: true,
    frequency: 'termly',
    dueDate: '2024-04-15',
  },
  {
    _id: 'item-2',
    name: 'School Bus - Monthly',
    description: 'Monthly school bus transportation fee',
    amount: 25000,
    category: 'Transport',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: true,
    frequency: 'monthly',
  },
  {
    _id: 'item-3',
    name: 'Meal Plan - Weekly',
    description: 'Weekly meal plan subscription',
    amount: 15000,
    category: 'Meals',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: true,
    frequency: 'weekly',
  },
  {
    _id: 'item-4',
    name: 'Books and Materials',
    description: 'Textbooks and learning materials for Term 2',
    amount: 35000,
    category: 'Books',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: false,
  },
  {
    _id: 'item-5',
    name: 'Extra-curricular Activities',
    description: 'Sports, music, and arts programs',
    amount: 20000,
    category: 'Activities',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: true,
    frequency: 'termly',
  },
  {
    _id: 'item-6',
    name: 'School Uniform',
    description: 'Complete uniform set including PE kit',
    amount: 45000,
    category: 'Uniform',
    schoolId: 'demo-school-1',
    schoolName: 'Greensprings School',
    isRecurring: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Tuition: 'bg-blue-100 text-blue-700',
  Transport: 'bg-green-100 text-green-700',
  Meals: 'bg-orange-100 text-orange-700',
  Books: 'bg-purple-100 text-purple-700',
  Activities: 'bg-pink-100 text-pink-700',
  Uniform: 'bg-yellow-100 text-yellow-700',
};

export default function PaymentItemsPage() {
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    
    if (isDemoMode()) {
      setItems(DEMO_PAYMENT_ITEMS);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/payment-items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setItems(data.data);
      }
    } catch (error) {
      console.error('Fetch items error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = search === '' || 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <h1 className="text-2xl font-semibold text-gray-900">Payment Items</h1>
          <p className="mt-1 text-sm text-gray-500">Manage fee categories and payment items</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add Payment Item</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <div className="flex items-center text-sm text-yellow-700">
                <AlertCircle className="h-4 w-4 mr-2" />
                This feature is available in the full version
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payment items..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                categoryFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="mt-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search ? 'Try adjusting your search' : 'Add payment items to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₦{item.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {item.isRecurring ? (
                        <span className="capitalize">{item.frequency}</span>
                      ) : (
                        <span>One-time</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{item.schoolName}</span>
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
