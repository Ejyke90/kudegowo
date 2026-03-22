'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  School,
  Calendar,
  Edit,
  Trash2,
  AlertCircle
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isSchoolAdmin ? 'My Students' : 'My Children'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isSchoolAdmin 
              ? 'Manage student profiles and school information'
              : 'Manage your children\'s profiles and school information'
            }
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isSchoolAdmin ? 'Add Student' : 'Add Child'}
        </button>
      </div>

      {/* Add Child Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Child</h2>
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

      {/* Children List */}
      <div className="mt-6">
        {children.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No children added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add your children to start managing their school payments
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Child
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => {
              const age = calculateAge(child.dateOfBirth);
              return (
                <div key={child._id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {child.firstName[0]}{child.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {child.firstName} {child.lastName}
                          </h3>
                          {age && (
                            <p className="text-sm text-gray-500">{age} years old</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <School className="h-4 w-4 mr-2 text-gray-400" />
                        {child.schoolName}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {child.className}
                      </div>
                      {child.studentId && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          ID: {child.studentId}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        child.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
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
