'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Key, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  User,
  Calendar,
  Copy,
  RefreshCw
} from 'lucide-react';

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  className: string;
}

interface Passphrase {
  childId: string;
  code: string;
  validFrom: string;
  validUntil: string;
  isUsed: boolean;
}

interface AttendanceRecord {
  _id: string;
  childId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string;
}

export default function SafeSchoolPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [passphrases, setPassphrases] = useState<Record<string, Passphrase>>({});
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord[]>>({});
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Fetch children
      const childrenRes = await fetch(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const childrenData = await childrenRes.json();
      
      if (childrenData.status && childrenData.data) {
        setChildren(childrenData.data);
        
        if (childrenData.data.length > 0) {
          setSelectedChild(childrenData.data[0]._id);
          
          // Fetch passphrases and attendance for each child
          for (const child of childrenData.data) {
            await fetchChildData(child._id, token);
          }
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChildData = async (childId: string, token: string | null) => {
    try {
      // Fetch passphrase
      const passphraseRes = await fetch(`${API_URL}/passphrases/child/${childId}/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const passphraseData = await passphraseRes.json();
      
      if (passphraseData.status && passphraseData.data) {
        setPassphrases(prev => ({
          ...prev,
          [childId]: passphraseData.data,
        }));
      }

      // Fetch attendance
      const attendanceRes = await fetch(`${API_URL}/attendance/child/${childId}?limit=7`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const attendanceData = await attendanceRes.json();
      
      if (attendanceData.status && attendanceData.data) {
        setAttendance(prev => ({
          ...prev,
          [childId]: attendanceData.data,
        }));
      }
    } catch (error) {
      console.error('Fetch child data error:', error);
    }
  };

  const copyPassphrase = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '--:--';
    return new Date(dateString).toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked_in':
        return 'bg-blue-100 text-blue-800';
      case 'checked_out':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedChildData = children.find(c => c._id === selectedChild);
  const selectedPassphrase = selectedChild ? passphrases[selectedChild] : null;
  const selectedAttendance = selectedChild ? attendance[selectedChild] || [] : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Safe School</h1>
          <p className="text-gray-600">Manage passphrases and track attendance</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {children.map(child => (
            <button
              key={child._id}
              onClick={() => setSelectedChild(child._id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedChild === child._id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {child.firstName} {child.lastName}
            </button>
          ))}
        </div>
      )}

      {selectedChildData && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Passphrase */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Today's Passphrase</h2>
                <p className="text-sm text-gray-500">
                  For {selectedChildData.firstName}'s pickup
                </p>
              </div>
            </div>

            {selectedPassphrase ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-mono font-bold text-emerald-700 tracking-widest mb-2">
                    {selectedPassphrase.code}
                  </div>
                  <button
                    onClick={() => copyPassphrase(selectedPassphrase.code)}
                    className="flex items-center gap-2 mx-auto text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    {copiedCode === selectedPassphrase.code ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      Valid: {formatTime(selectedPassphrase.validFrom)} - {formatTime(selectedPassphrase.validUntil)}
                    </span>
                  </div>
                  {selectedPassphrase.isUsed && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                      Used
                    </span>
                  )}
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Security Reminder</p>
                      <p>Only share this code with authorized pickup persons. The code changes daily.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No passphrase generated for today</p>
                <p className="text-sm">Passphrases are generated each school day</p>
              </div>
            )}
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Attendance History</h2>
                <p className="text-sm text-gray-500">Last 7 days</p>
              </div>
            </div>

            {selectedAttendance.length > 0 ? (
              <div className="space-y-3">
                {selectedAttendance.map(record => (
                  <div
                    key={record._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm">
                        <div className="font-medium">{formatDate(record.date)}</div>
                        <div className="text-gray-500">
                          In: {formatTime(record.checkInTime)} | Out: {formatTime(record.checkOutTime)}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No attendance records yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Child Info Card */}
      {selectedChildData && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {selectedChildData.firstName} {selectedChildData.lastName}
              </h3>
              <p className="text-gray-600">{selectedChildData.schoolName}</p>
              <p className="text-sm text-gray-500">Class: {selectedChildData.className}</p>
            </div>
          </div>
        </div>
      )}

      {children.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Added</h3>
          <p className="text-gray-600 mb-6">
            To use Safe School features, you need to:
          </p>
          <div className="max-w-md mx-auto text-left space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Create or select a school</p>
                <p className="text-sm text-gray-600">Go to My Schools and add your child's school</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add your child</p>
                <p className="text-sm text-gray-600">Click on the school and use "Add Child" button</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Return here</p>
                <p className="text-sm text-gray-600">Safe School features will be available</p>
              </div>
            </div>
          </div>
          <a
            href="/dashboard/schools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
          >
            Go to My Schools
          </a>
        </div>
      )}
    </div>
  );
}
