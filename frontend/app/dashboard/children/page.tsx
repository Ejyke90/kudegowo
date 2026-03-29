'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  School,
  Calendar,
  Edit,
  Trash2,
  AlertCircle,
  GraduationCap,
  X,
  BadgeCheck,
  Clock
} from 'lucide-react';
import { isDemoMode, getDemoChildren, getDemoSchools } from '@/lib/demo-data';
import { getAuthUser } from '@/lib/auth';

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  schoolId: string;
  schoolName: string;
  className: string;
  dateOfBirth?: string;
  studentId?: string;
  isActive: boolean;
}

export default function MyChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const isSchoolAdmin = user?.role === 'admin' || user?.role === 'school_admin';

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    setIsLoading(true);
    
    if (isDemoMode()) {
      const demoChildren = getDemoChildren().map(c => ({
        _id: c._id,
        firstName: c.firstName,
        lastName: c.lastName,
        schoolId: c.schoolId,
        schoolName: c.schoolName,
        className: c.className,
        dateOfBirth: c.dateOfBirth,
        studentId: c.studentId,
        isActive: true,
      }));
      setChildren(demoChildren);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setChildren(data.data);
      }
    } catch (error) {
      console.error('Fetch children error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isSchoolAdmin ? 'My Students' : 'My Children'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isSchoolAdmin 
              ? 'Manage student profiles and school information'
              : 'Manage your children\'s profiles and school information'
            }
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          {isSchoolAdmin ? 'Add Student' : 'Add Child'}
        </button>
      </div>

      {/* Add Child Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New Child</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-amber-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">This feature is available in the full version</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Children List */}
      <div>
        {children.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No children added</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Add your children to start managing their school payments and activities
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Your First Child
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => {
              const age = calculateAge(child.dateOfBirth);
              return (
                <div key={child._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
                  {/* Card Header with Gradient */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <span className="text-xl font-bold">
                            {child.firstName[0]}{child.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            {child.firstName} {child.lastName}
                          </h3>
                          {age && (
                            <p className="text-blue-100 text-sm">{age} years old</p>
                          )}
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <School className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm">{child.schoolName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm">{child.className}</span>
                      </div>
                      {child.studentId && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                            <BadgeCheck className="h-4 w-4 text-gray-600" />
                          </div>
                          <span className="text-sm">ID: {child.studentId}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        child.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${child.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {child.isActive ? 'Active' : 'Inactive'}
                      </span>
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
