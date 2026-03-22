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
  RefreshCw,
  BookOpen,
  Award,
  GraduationCap,
  Video,
  FileText,
  Lightbulb,
  Play,
  Download,
  Users,
  Clock as TimeIcon,
  MapPin,
  Star,
  TrendingUp,
  Target
} from 'lucide-react';
import { 
  isDemoMode, 
  getDemoUser, 
  getDemoChildren,
  DEMO_CHILDREN, 
  DEMO_PASSPHRASES, 
  DEMO_ATTENDANCE 
} from '@/lib/demo-data';
import { getAuthUser } from '@/lib/auth';

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
  checkInTime: string;
  checkOutTime: string | null;
  status: string;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'interactive' | 'document';
  progress: number;
  category: string;
  thumbnail?: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  score: number;
  certificateUrl: string;
}

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  tags: string[];
}

interface SchoolSafetyRating {
  overall: number;
  categories: {
    physicalSecurity: number;
    emergencyPreparedness: number;
    staffTraining: number;
    facilitySafety: number;
    healthAndWellness: number;
    digitalSafety: number;
  };
  certified: boolean;
  certificationLevel: 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement';
  lastAudit: string;
  nextAudit: string;
  standards: {
    oshaCompliance: boolean;
    fireSafetyCode: boolean;
    healthDepartmentApproval: boolean;
    educationBoardAccreditation: boolean;
  };
  metrics: {
    emergencyDrillsPerYear: number;
    staffCertifiedPercentage: number;
    incidentResponseTime: number;
    safetyTrainingHours: number;
    parentSatisfactionScore: number;
    studentSafetyIncidents: number;
    facilityInspectionsPassed: number;
    emergencyProtocolsUpdated: string;
  };
}

export default function SafeSchoolPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [passphrases, setPassphrases] = useState<Record<string, Passphrase>>({});
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord[]>>({});
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'training' | 'certification' | 'workshops' | 'ratings'>('overview');
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [schoolSafetyRating, setSchoolSafetyRating] = useState<SchoolSafetyRating | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Use demo data if in demo mode
      if (isDemoMode()) {
        const user = getDemoUser();
        let demoChildren;
        
        if (user?.role === 'admin') {
          // For admin users, show all children
          demoChildren = DEMO_CHILDREN.map((c: any) => ({
            _id: c._id,
            firstName: c.firstName,
            lastName: c.lastName,
            schoolName: c.schoolName,
            className: c.className,
          }));
        } else {
          // For parent users, show only their children
          demoChildren = getDemoChildren().map((c: any) => ({
            _id: c._id,
            firstName: c.firstName,
            lastName: c.lastName,
            schoolName: c.schoolName,
            className: c.className,
          }));
        }
        
        setChildren(demoChildren);
        setPassphrases(DEMO_PASSPHRASES);
        setAttendance(DEMO_ATTENDANCE);
        
        if (demoChildren.length > 0) {
          setSelectedChild(demoChildren[0]._id);
        }
        
        // Set demo training modules
        setTrainingModules([
          {
            id: '1',
            title: 'Child Safety Basics',
            description: 'Essential safety protocols for child protection',
            duration: '45 min',
            type: 'video',
            progress: 100,
            category: 'Fundamentals',
          },
          {
            id: '2',
            title: 'Emergency Response Procedures',
            description: 'Step-by-step guide for emergency situations',
            duration: '30 min',
            type: 'interactive',
            progress: 60,
            category: 'Emergency',
          },
          {
            id: '3',
            title: 'Cyber Safety for Kids',
            description: 'Protecting children in digital environments',
            duration: '25 min',
            type: 'document',
            progress: 30,
            category: 'Digital',
          },
          {
            id: '4',
            title: 'Bullying Prevention',
            description: 'Identifying and preventing bullying behavior',
            duration: '40 min',
            type: 'video',
            progress: 0,
            category: 'Social',
          },
        ]);
        
        // Set demo certifications
        setCertifications([
          {
            id: '1',
            title: 'Child Safety Certified Parent',
            issuer: 'National Safety Council',
            issueDate: '2024-01-15',
            expiryDate: '2025-01-15',
            status: 'active',
            score: 92,
            certificateUrl: '#',
          },
          {
            id: '2',
            title: 'Emergency First Aid',
            issuer: 'Red Cross',
            issueDate: '2023-11-20',
            expiryDate: '2024-11-20',
            status: 'expired',
            score: 88,
            certificateUrl: '#',
          },
          {
            id: '3',
            title: 'Digital Safety Advocate',
            issuer: 'TechSafe Institute',
            issueDate: '2024-02-01',
            expiryDate: '2025-02-01',
            status: 'active',
            score: 95,
            certificateUrl: '#',
          },
        ]);
        
        // Set demo workshops
        setWorkshops([
          {
            id: '1',
            title: 'Parent-Child Safety Workshop',
            description: 'Interactive workshop for families to learn safety together',
            date: '2024-03-25',
            time: '10:00 AM',
            duration: '2 hours',
            location: 'School Auditorium',
            instructor: 'Dr. Sarah Johnson',
            capacity: 50,
            registered: 32,
            status: 'upcoming',
            tags: ['Family', 'Interactive', 'Certificate'],
          },
          {
            id: '2',
            title: 'Digital Safety for Parents',
            description: 'Understanding online risks and protection measures',
            date: '2024-03-28',
            time: '6:00 PM',
            duration: '1.5 hours',
            location: 'Online - Zoom',
            instructor: 'Tech Safety Team',
            capacity: 100,
            registered: 78,
            status: 'upcoming',
            tags: ['Online', 'Technology', 'Parents'],
          },
          {
            id: '3',
            title: 'Emergency Preparedness Training',
            description: 'Hands-on training for emergency situations',
            date: '2024-03-15',
            time: '9:00 AM',
            duration: '3 hours',
            location: 'Community Center',
            instructor: 'Emergency Services',
            capacity: 30,
            registered: 30,
            status: 'completed',
            tags: ['Hands-on', 'Certificate', 'Essential'],
          },
        ]);
        
        // Set demo school safety rating based on industry standards
        setSchoolSafetyRating({
          overall: 88,
          categories: {
            physicalSecurity: 92,
            emergencyPreparedness: 85,
            staffTraining: 90,
            facilitySafety: 87,
            healthAndWellness: 86,
            digitalSafety: 82,
          },
          certified: true,
          certificationLevel: 'Good',
          lastAudit: '2024-02-15',
          nextAudit: '2024-08-15',
          standards: {
            oshaCompliance: true,
            fireSafetyCode: true,
            healthDepartmentApproval: true,
            educationBoardAccreditation: true,
          },
          metrics: {
            emergencyDrillsPerYear: 16,
            staffCertifiedPercentage: 94,
            incidentResponseTime: 3.5,
            safetyTrainingHours: 24,
            parentSatisfactionScore: 91,
            studentSafetyIncidents: 1.2,
            facilityInspectionsPassed: 8,
            emergencyProtocolsUpdated: '2024-01-10',
          },
        });
        setIsLoading(false);
        return;
      }
      
      // Non-demo mode API calls
      const token = localStorage.getItem('token');
      
      // Fetch children
      const childrenRes = await fetch(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (childrenRes.ok) {
        const childrenData = await childrenRes.json();
        const childrenArray = Array.isArray(childrenData) ? childrenData : (childrenData.data || []);
        setChildren(childrenArray);
        if (childrenArray.length > 0 && !selectedChild) {
          setSelectedChild(childrenArray[0]._id);
        }
      } else {
        // Ensure children is always an array even on API failure
        setChildren([]);
      }
      
      // Fetch passphrases
      const passphraseRes = await fetch(`${API_URL}/passphrases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (passphraseRes.ok) {
        const passphraseData = await passphraseRes.json();
        setPassphrases(passphraseData.data || {});
      } else {
        setPassphrases({});
      }
      
      // Fetch attendance
      const attendanceRes = await fetch(`${API_URL}/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (attendanceRes.ok) {
        const attendanceData = await attendanceRes.json();
        setAttendance(attendanceData.data || {});
      } else {
        setAttendance({});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkshopStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'interactive':
        return Lightbulb;
      case 'document':
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getUserRole = () => {
    // First try to get the actual authenticated user
    const authUser = getAuthUser();
    if (authUser?.role) return authUser.role;
    
    // Fallback to demo user
    const user = getDemoUser();
    return user?.role || 'parent';
  };

  const getRatingColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getCertificationLevelColor = (level: string) => {
    switch (level) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-emerald-100 text-emerald-800';
      case 'Satisfactory':
        return 'bg-blue-100 text-blue-800';
      case 'Needs Improvement':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Computed values
  const selectedChildData = Array.isArray(children) ? children.find(c => c._id === selectedChild) : null;
  const selectedPassphrase = selectedChild ? passphrases[selectedChild] : null;
  const selectedAttendance = selectedChild ? attendance[selectedChild] || [] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Safe School data...</p>
        </div>
      </div>
    );
  }

  if (!isDemoMode() && children.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Children Found</h2>
          <p className="text-gray-600 mb-6">
            Add children to your profile to access Safe School features.
          </p>
          <a
            href="/dashboard/schools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
          >
            Go to My Schools
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Safe School</h1>
                <p className="text-sm text-gray-500">
                  {getUserRole() === 'admin' ? 'School Safety Dashboard' : 'Child Safety & Security'}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {children.map((child) => (
                <button
                  key={child._id}
                  onClick={() => setSelectedChild(child._id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedChild === child._id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {child.firstName} {child.lastName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'training'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training
            </button>
            <button
              onClick={() => setActiveTab('certification')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certification'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Certification
            </button>
            <button
              onClick={() => setActiveTab('workshops')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workshops'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workshops
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ratings'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Safety Ratings
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {selectedChildData && (getUserRole() === 'parent' || getUserRole() === 'admin') && (
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
                        For {selectedChildData.firstName}'s pickup {getUserRole() === 'admin' ? '(Admin View)' : ''}
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
                      <p className="text-sm text-gray-500">Last 7 days {getUserRole() === 'admin' ? '(All Students)' : ''}</p>
                    </div>
                  </div>

                  {selectedAttendance.length > 0 ? (
                    <div className="space-y-3">
                      {selectedAttendance.map((record) => (
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

            {/* School Safety Rating Summary */}
            {schoolSafetyRating && isDemoMode() && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">School Safety Rating</h2>
                    <p className="text-sm text-gray-500">
                      {selectedChildData?.schoolName || 'Greensprings School'} {getUserRole() === 'admin' ? '(Admin Dashboard)' : ''}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getRatingBgColor(schoolSafetyRating.overall)} mb-4`}>
                      <div>
                        <div className={`text-3xl font-bold ${getRatingColor(schoolSafetyRating.overall)}`}>
                          {schoolSafetyRating.overall}
                        </div>
                        <div className="text-xs text-gray-600">Overall</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {schoolSafetyRating.certified && (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-emerald-600">Certified</span>
                        </>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCertificationLevelColor(schoolSafetyRating.certificationLevel)}`}>
                      {schoolSafetyRating.certificationLevel} Rating
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Industry Standard Categories</h4>
                    {Object.entries(schoolSafetyRating.categories).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {category === 'physicalSecurity' ? 'Physical Security' :
                           category === 'emergencyPreparedness' ? 'Emergency Preparedness' :
                           category === 'staffTraining' ? 'Staff Training' :
                           category === 'facilitySafety' ? 'Facility Safety' :
                           category === 'healthAndWellness' ? 'Health & Wellness' :
                           category === 'digitalSafety' ? 'Digital Safety' : category}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                score >= 90 ? 'bg-green-500' :
                                score >= 80 ? 'bg-emerald-500' :
                                score >= 70 ? 'bg-blue-500' :
                                score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${getRatingColor(score)}`}>
                            {score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Last Audit: {formatDate(schoolSafetyRating.lastAudit)}
                    </div>
                    <button 
                      onClick={() => setActiveTab('ratings')}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      View Detailed Report →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Safety Training Modules</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingModules.map((module) => {
                  const IconComponent = getModuleIcon(module.type);
                  return (
                    <div key={module.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-gray-500">{module.duration}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {module.category}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                        {module.progress === 100 ? 'Review' : module.progress > 0 ? 'Continue' : 'Start'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Safety Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCertificationStatusColor(cert.status)}`}>
                            {cert.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Issued by {cert.issuer}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Issue Date:</span>
                            <div className="font-medium">{formatDate(cert.issueDate)}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Expiry Date:</span>
                            <div className="font-medium">{formatDate(cert.expiryDate)}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Score:</span>
                            <div className="font-medium">{cert.score}%</div>
                          </div>
                          <div>
                            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                              View Certificate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Award className="w-8 h-8 text-amber-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Safety Workshops</h2>
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <div key={workshop.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{workshop.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getWorkshopStatusColor(workshop.status)}`}>
                            {workshop.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{workshop.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(workshop.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{workshop.time} ({workshop.duration})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{workshop.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Instructor: <span className="font-medium">{workshop.instructor}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {workshop.registered}/{workshop.capacity} registered
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {workshop.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {workshop.status === 'upcoming' && (
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                          {workshop.registered < workshop.capacity ? 'Register' : 'Join Waitlist'}
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                          Learn More
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ratings' && schoolSafetyRating && (
          <div className="space-y-6">
            {/* Rating Overview */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">School Safety Rating Report</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getRatingBgColor(schoolSafetyRating.overall)} mb-4`}>
                    <div>
                      <div className={`text-4xl font-bold ${getRatingColor(schoolSafetyRating.overall)}`}>
                        {schoolSafetyRating.overall}
                      </div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {schoolSafetyRating.certified && (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-600">Certified</span>
                      </div>
                    )}
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getCertificationLevelColor(schoolSafetyRating.certificationLevel)}`}>
                      {schoolSafetyRating.certificationLevel} Rating
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-4">Industry Standards Compliance</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg text-center ${schoolSafetyRating.standards.oshaCompliance ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`text-lg font-bold mb-1 ${schoolSafetyRating.standards.oshaCompliance ? 'text-green-700' : 'text-red-700'}`}>
                        {schoolSafetyRating.standards.oshaCompliance ? '✓' : '✗'}
                      </div>
                      <div className="text-xs font-medium">OSHA</div>
                      <div className="text-xs text-gray-600">Compliance</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${schoolSafetyRating.standards.fireSafetyCode ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`text-lg font-bold mb-1 ${schoolSafetyRating.standards.fireSafetyCode ? 'text-green-700' : 'text-red-700'}`}>
                        {schoolSafetyRating.standards.fireSafetyCode ? '✓' : '✗'}
                      </div>
                      <div className="text-xs font-medium">Fire Safety</div>
                      <div className="text-xs text-gray-600">Code</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${schoolSafetyRating.standards.healthDepartmentApproval ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`text-lg font-bold mb-1 ${schoolSafetyRating.standards.healthDepartmentApproval ? 'text-green-700' : 'text-red-700'}`}>
                        {schoolSafetyRating.standards.healthDepartmentApproval ? '✓' : '✗'}
                      </div>
                      <div className="text-xs font-medium">Health Dept</div>
                      <div className="text-xs text-gray-600">Approval</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${schoolSafetyRating.standards.educationBoardAccreditation ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`text-lg font-bold mb-1 ${schoolSafetyRating.standards.educationBoardAccreditation ? 'text-green-700' : 'text-red-700'}`}>
                        {schoolSafetyRating.standards.educationBoardAccreditation ? '✓' : '✗'}
                      </div>
                      <div className="text-xs font-medium">Education</div>
                      <div className="text-xs text-gray-600">Board</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Category Performance</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(schoolSafetyRating.categories).map(([category, score]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {category === 'physicalSecurity' ? 'Physical Security' :
                           category === 'emergencyPreparedness' ? 'Emergency Preparedness' :
                           category === 'staffTraining' ? 'Staff Training' :
                           category === 'facilitySafety' ? 'Facility Safety' :
                           category === 'healthAndWellness' ? 'Health & Wellness' :
                           category === 'digitalSafety' ? 'Digital Safety' : category}
                        </span>
                        <span className={`text-lg font-bold ${getRatingColor(score)}`}>{score}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            score >= 90 ? 'bg-green-500' :
                            score >= 80 ? 'bg-emerald-500' :
                            score >= 70 ? 'bg-blue-500' :
                            score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Safety Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">Emergency Drills</div>
                        <div className="text-xs text-gray-500">Industry Standard: 12+ per year</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">{schoolSafetyRating.metrics.emergencyDrillsPerYear}</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.emergencyDrillsPerYear >= 12 ? '✓ Meets Standard' : '⚠ Below Standard'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-sm">Staff Certified</div>
                        <div className="text-xs text-gray-500">Industry Standard: 80%+ certified</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-emerald-600">{schoolSafetyRating.metrics.staffCertifiedPercentage}%</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.staffCertifiedPercentage >= 80 ? '✓ Exceeds Standard' : '⚠ Below Standard'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="font-medium text-sm">Incident Response Time</div>
                        <div className="text-xs text-gray-500">Industry Standard: &lt;5 minutes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-amber-600">{schoolSafetyRating.metrics.incidentResponseTime} min</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.incidentResponseTime <= 5 ? '✓ Meets Standard' : '⚠ Below Standard'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-sm">Safety Training Hours</div>
                        <div className="text-xs text-gray-500">Industry Standard: 16+ hours annually</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-purple-600">{schoolSafetyRating.metrics.safetyTrainingHours} hrs</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.safetyTrainingHours >= 16 ? '✓ Exceeds Standard' : '⚠ Below Standard'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-sm">Student Safety Incidents</div>
                        <div className="text-xs text-gray-500">Industry Standard: &lt;5 per 1000 students</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-red-600">{schoolSafetyRating.metrics.studentSafetyIncidents}</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.studentSafetyIncidents < 5 ? '✓ Excellent' : '⚠ Needs Attention'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-sm">Facility Inspections</div>
                        <div className="text-xs text-gray-500">Industry Standard: Quarterly inspections</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-indigo-600">{schoolSafetyRating.metrics.facilityInspectionsPassed}/8</div>
                      <div className="text-xs text-green-600">
                        {schoolSafetyRating.metrics.facilityInspectionsPassed >= 6 ? '✓ On Track' : '⚠ Behind Schedule'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Satisfaction & Improvement */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Parent Satisfaction & Improvement
                </h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Parent Satisfaction Score</span>
                    <span className="text-sm font-semibold text-emerald-600">{schoolSafetyRating.metrics.parentSatisfactionScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${schoolSafetyRating.metrics.parentSatisfactionScore}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Industry Standard: 75%+ satisfaction | Current: {schoolSafetyRating.metrics.parentSatisfactionScore >= 75 ? '✓ Meets Standard' : '⚠ Below Standard'}
                  </div>
                </div>

                {getUserRole() === 'admin' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Industry Standards Improvement Plan</h4>
                    <div className="space-y-2">
                      {schoolSafetyRating.categories.emergencyPreparedness < 85 && (
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium text-amber-800">Emergency Preparedness</div>
                              <div className="text-amber-700">
                                Industry Standard: 85%+ | Current: {schoolSafetyRating.categories.emergencyPreparedness}%
                              </div>
                              <div className="text-amber-600 mt-1">
                                Action: Increase drills to 16/year, update response protocols
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {schoolSafetyRating.categories.digitalSafety < 85 && (
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium text-amber-800">Digital Safety</div>
                              <div className="text-amber-700">
                                Industry Standard: 85%+ | Current: {schoolSafetyRating.categories.digitalSafety}%
                              </div>
                              <div className="text-amber-600 mt-1">
                                Action: Implement cyber safety curriculum, update filtering systems
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {schoolSafetyRating.categories.physicalSecurity >= 90 && schoolSafetyRating.categories.staffTraining >= 90 && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium text-green-800">Exceeds Industry Standards</div>
                              <div className="text-green-700">
                                Physical Security & Staff Training exceed 90% benchmark
                              </div>
                              <div className="text-green-600 mt-1">
                                Maintain current protocols and share best practices
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {getUserRole() === 'parent' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Industry Standards Compliance</h4>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-800">
                        <p className="mb-2">
                          <strong>{schoolSafetyRating.certificationLevel} Rating:</strong> The school meets 
                          {schoolSafetyRating.certificationLevel === 'Excellent' ? ' and exceeds' : 
                           schoolSafetyRating.certificationLevel === 'Good' ? ' industry' : 
                           schoolSafetyRating.certificationLevel === 'Satisfactory' ? ' basic' : ' minimum'} 
                          safety standards.
                        </p>
                        <p className="mb-2">
                          This rating is based on industry standards from OSHA, Fire Safety Codes, Health Department regulations, and Education Board requirements.
                        </p>
                        <p>
                          The school is {schoolSafetyRating.certified ? 'fully certified' : 'working toward certification'} and maintains comprehensive safety protocols that meet or exceed national guidelines.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <div className="text-sm text-emerald-800">
                        <p className="font-medium mb-1">Key Industry Metrics Met:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Emergency Drills: {schoolSafetyRating.metrics.emergencyDrillsPerYear}/year (Standard: 12+)</li>
                          <li>• Staff Certification: {schoolSafetyRating.metrics.staffCertifiedPercentage}% (Standard: 80%+)</li>
                          <li>• Response Time: {schoolSafetyRating.metrics.incidentResponseTime} min (Standard: &lt;5 min)</li>
                          <li>• Safety Training: {schoolSafetyRating.metrics.safetyTrainingHours} hrs/year (Standard: 16+)</li>
                          <li>• Parent Satisfaction: {schoolSafetyRating.metrics.parentSatisfactionScore}% (Standard: 75%+)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">Parent Partnership:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Attend safety workshops and training sessions</li>
                          <li>• Review and update emergency contact information</li>
                          <li>• Participate in parent satisfaction surveys</li>
                          <li>• Report safety concerns to school administration</li>
                          <li>• Support safety protocols at home and school events</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons for Admin */}
      {getUserRole() === 'admin' && activeTab === 'ratings' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Administrative Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                Download Full Report
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                Schedule New Audit
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
                Update Safety Protocols
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
