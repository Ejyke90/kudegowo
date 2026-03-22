'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Plus, Search, ChevronRight, Users, BookOpen, AlertCircle } from 'lucide-react';
import { schoolProfileApi, SchoolType, type SchoolProfile } from '@/lib/api';
import { isDemoMode, getDemoSchools } from '@/lib/demo-data';
import { getAuthUser } from '@/lib/auth';

const SCHOOL_TYPE_LABELS: Record<string, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  combined: 'Combined',
  nursery: 'Nursery',
};

const SCHOOL_TYPE_COLORS: Record<string, string> = {
  primary: 'bg-blue-100 text-blue-700',
  secondary: 'bg-purple-100 text-purple-700',
  combined: 'bg-green-100 text-green-700',
  nursery: 'bg-yellow-100 text-yellow-700',
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const isSchoolAdmin = user?.role === 'admin' || user?.role === 'school_admin';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    schoolType: SchoolType.PRIMARY as SchoolType,
    address: '',
    city: '',
    state: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadSchools();
  }, [search]);

  async function loadSchools() {
    try {
      setLoading(true);
      
      // Use demo data if in demo mode
      if (isDemoMode()) {
        let demoSchools = getDemoSchools() as unknown as SchoolProfile[];
        if (search) {
          demoSchools = demoSchools.filter(s => 
            s.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        setSchools(demoSchools);
        setLoading(false);
        return;
      }
      
      const data = await schoolProfileApi.list({ search: search || undefined });
      setSchools(data.schoolProfiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load schools');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setCreating(true);
    try {
      await schoolProfileApi.create(formData);
      setShowCreateForm(false);
      setFormData({ name: '', schoolType: SchoolType.PRIMARY, address: '', city: '', state: '', contactEmail: '', contactPhone: '' });
      loadSchools();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create school');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isSchoolAdmin ? 'School Management' : 'My Schools'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isSchoolAdmin 
              ? 'Manage your school profile and settings'
              : 'Manage school profiles for your children\'s schools'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add School
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create School Profile</h2>
          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">School Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Greensprings School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">School Type *</label>
                <select
                  required
                  value={formData.schoolType}
                  onChange={(e) => setFormData({ ...formData, schoolType: e.target.value as SchoolType })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="combined">Combined (Primary & Secondary)</option>
                  <option value="nursery">Nursery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. 12 Admiralty Way"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Lagos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Lagos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. info@school.ng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. +2348012345678"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create School'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schools..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* School List */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading schools...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : schools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No schools yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a school profile to start managing your children&apos;s fees.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First School
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
              <Link
                key={school._id}
                href={`/dashboard/schools/${school._id}`}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{school.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${SCHOOL_TYPE_COLORS[school.schoolType] || 'bg-gray-100 text-gray-700'}`}>
                          {SCHOOL_TYPE_LABELS[school.schoolType] || school.schoolType}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    {school.city && (
                      <span>{school.city}{school.state ? `, ${school.state}` : ''}</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      View details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
