'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Plus, Search, ChevronRight, Users, BookOpen, AlertCircle, MapPin, Phone, Mail, X } from 'lucide-react';
import { schoolProfileApi, SchoolType, type SchoolProfile } from '@/lib/api';
import { isDemoMode, getDemoSchools } from '@/lib/demo-data';
import { getAuthUser } from '@/lib/auth';

const SCHOOL_TYPE_LABELS: Record<string, string> = {
  primary: 'Primary School',
  secondary: 'Secondary School',
  combined: 'Combined School',
  nursery: 'Nursery School',
};

const SCHOOL_TYPE_COLORS: Record<string, string> = {
  primary: 'from-blue-500 to-indigo-600',
  secondary: 'from-purple-500 to-violet-600',
  combined: 'from-green-500 to-emerald-600',
  nursery: 'from-amber-500 to-orange-600',
};

const SCHOOL_TYPE_BG: Record<string, string> = {
  primary: 'bg-blue-50',
  secondary: 'bg-purple-50',
  combined: 'bg-green-50',
  nursery: 'bg-amber-50',
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isSchoolAdmin ? 'School Management' : 'My Schools'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isSchoolAdmin 
              ? 'Manage your school profile and settings'
              : 'Manage school profiles for your children\'s schools'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          Add School
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New School</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. Greensprings School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School Type *</label>
                    <select
                      required
                      value={formData.schoolType}
                      onChange={(e) => setFormData({ ...formData, schoolType: e.target.value as SchoolType })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="primary">Primary School</option>
                      <option value="secondary">Secondary School</option>
                      <option value="combined">Combined (Primary & Secondary)</option>
                      <option value="nursery">Nursery School</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. 12 Admiralty Way"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. Lagos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. Lagos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. info@school.ng"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. +2348012345678"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create School'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schools by name..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* School List */}
      <div>
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading schools...
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-3" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No schools yet</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Add a school profile to start managing your children&apos;s fees and payments.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Your First School
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Link
                key={school._id}
                href={`/dashboard/schools/${school._id}`}
                className={`${SCHOOL_TYPE_BG[school.schoolType] || 'bg-gray-50'} rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${SCHOOL_TYPE_COLORS[school.schoolType] || 'from-gray-500 to-gray-600'} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{school.name}</h3>
                <span className="inline-block px-3 py-1 bg-white/60 text-gray-700 rounded-lg text-sm font-medium mb-4">
                  {SCHOOL_TYPE_LABELS[school.schoolType] || school.schoolType}
                </span>

                {(school.city || school.contactEmail || school.contactPhone) && (
                  <div className="space-y-2 pt-4 border-t border-gray-200/50">
                    {school.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{school.city}{school.state ? `, ${school.state}` : ''}</span>
                      </div>
                    )}
                    {school.contactEmail && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{school.contactEmail}</span>
                      </div>
                    )}
                    {school.contactPhone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{school.contactPhone}</span>
                      </div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
