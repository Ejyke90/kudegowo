'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users,
  CheckCircle,
  School,
  UserCircle,
  ArrowRight,
  Shield,
  Coins,
  UtensilsCrossed,
  LogIn,
  Loader2,
  BookOpen,
  Award,
  GraduationCap,
  Building2,
  Play,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  Eye,
  Copy,
  Check,
  Zap,
  Star,
  ArrowUpRight,
  Layout,
  CreditCard,
  Bell,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { 
  setDemoSchoolContext, 
  getDemoSchoolContext,
  type DemoSchoolContext 
} from '@/lib/demo-data';


// Chrisland Schools demo users
const CHRISLAND_DEMO_USERS = [
  {
    name: 'Amaka Obi',
    role: 'Parent',
    children: 2,
    email: 'amaka.obi@chrisland.demo.com',
    password: 'Demo123!',
    icon: UserCircle,
    avatar: 'AO',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Abubakar Sani',
    role: 'Parent',
    children: 3,
    email: 'abubakar.sani@chrisland.demo.com',
    password: 'Demo123!',
    icon: Users,
    avatar: 'AS',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Funke Williams',
    role: 'Parent',
    children: 3,
    email: 'funke.williams@chrisland.demo.com',
    password: 'Demo123!',
    icon: UserCircle,
    avatar: 'FW',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'School Admin',
    role: 'Administrator',
    children: 0,
    email: 'admin@chrisland.demo.com',
    password: 'Demo123!',
    icon: School,
    avatar: 'SA',
    color: 'from-amber-500 to-orange-600',
  },
];

// Riverside Schools demo users
const RIVERSIDE_DEMO_USERS = [
  {
    name: 'Bola Johnson',
    role: 'Parent',
    children: 2,
    email: 'bola.johnson@riverside.demo.com',
    password: 'Demo123!',
    icon: UserCircle,
    avatar: 'BJ',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Kemi Adekunle',
    role: 'Parent',
    children: 3,
    email: 'kemi.adekunle@riverside.demo.com',
    password: 'Demo123!',
    icon: Users,
    avatar: 'KA',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Segun Bakare',
    role: 'Parent',
    children: 2,
    email: 'segun.bakare@riverside.demo.com',
    password: 'Demo123!',
    icon: UserCircle,
    avatar: 'SB',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'School Admin',
    role: 'Administrator',
    children: 0,
    email: 'admin@riverside.demo.com',
    password: 'Demo123!',
    icon: School,
    avatar: 'SA',
    color: 'from-amber-500 to-orange-600',
  },
];

// School context options (Beta testers only)
const SCHOOL_CONTEXTS = [
  {
    id: 'chrisland' as DemoSchoolContext,
    name: 'Chrisland Schools',
    description: "Nigeria's Leading Private School",
    tagline: '15 campuses across Nigeria',
    location: 'Lagos & Abuja',
    students: '12,000+',
    established: '1977',
    color: 'from-blue-600 to-indigo-700',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-50',
  },
  {
    id: 'riverside' as DemoSchoolContext,
    name: 'Riverside Schools',
    description: 'Nigerian + British Curricula',
    tagline: 'Cambridge Accredited Institution',
    location: 'Ogun State',
    students: '3,500+',
    established: '2005',
    color: 'from-cyan-600 to-teal-700',
    bgPattern: 'bg-gradient-to-br from-cyan-50 to-teal-50',
  },
];

// Feature highlights for the demo
const FEATURE_HIGHLIGHTS = [
  {
    title: 'Safe School',
    description: 'Daily passphrases, attendance tracking, and emergency alerts',
    icon: Shield,
    color: 'bg-emerald-100 text-emerald-600',
    link: '/dashboard/safe-school',
  },
  {
    title: 'Financial Literacy',
    description: 'KudiCoins rewards, savings goals, and educational quizzes',
    icon: Coins,
    color: 'bg-amber-100 text-amber-600',
    link: '/dashboard/financial-literacy',
  },
  {
    title: 'Meal Management',
    description: 'Digital menus, pre-ordering, and dietary preferences',
    icon: UtensilsCrossed,
    color: 'bg-rose-100 text-rose-600',
    link: '/dashboard/meals',
  },
  {
    title: 'School Payments',
    description: 'Fee schedules, automated payments, and transaction history',
    icon: CreditCard,
    color: 'bg-blue-100 text-blue-600',
    link: '/dashboard/scheduled-payments',
  },
];

// Quick actions for navigation
const QUICK_ACTIONS = [
  { title: 'Dashboard', icon: Layout, link: '/dashboard', description: 'Overview & alerts' },
  { title: 'My Schools', icon: Building2, link: '/dashboard/schools', description: 'Manage schools' },
  { title: 'Payments', icon: CreditCard, link: '/dashboard/scheduled-payments', description: 'View payments' },
  { title: 'Safe School', icon: Shield, link: '/dashboard/safe-school', description: 'Safety features' },
];

export default function DemoControlsPage() {
  const router = useRouter();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [schoolContext, setSchoolContext] = useState<DemoSchoolContext>('chrisland');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'personas' | 'features' | 'credentials'>('personas');

  useEffect(() => {
    const savedContext = getDemoSchoolContext();
    if (savedContext === 'chrisland' || savedContext === 'riverside') {
      setSchoolContext(savedContext);
    } else {
      setSchoolContext('chrisland');
    }
  }, []);

  const handleSchoolContextChange = (context: DemoSchoolContext) => {
    setDemoSchoolContext(context);
    setSchoolContext(context);
  };

  const getDemoUsersForContext = () => {
    switch (schoolContext) {
      case 'chrisland':
        return CHRISLAND_DEMO_USERS;
      case 'riverside':
        return RIVERSIDE_DEMO_USERS;
      default:
        return CHRISLAND_DEMO_USERS;
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const loginAs = async (email: string, password: string, name: string) => {
    setLoading(email);
    try {
      const demoUsers: Record<string, { _id: string; email: string; firstName: string; lastName: string; role: string }> = {
        'amaka.obi@chrisland.demo.com': {
          _id: 'chrisland-user-parent1',
          email: 'amaka.obi@chrisland.demo.com',
          firstName: 'Amaka',
          lastName: 'Obi',
          role: 'parent',
        },
        'abubakar.sani@chrisland.demo.com': {
          _id: 'chrisland-user-parent2',
          email: 'abubakar.sani@chrisland.demo.com',
          firstName: 'Abubakar',
          lastName: 'Sani',
          role: 'parent',
        },
        'funke.williams@chrisland.demo.com': {
          _id: 'chrisland-user-parent3',
          email: 'funke.williams@chrisland.demo.com',
          firstName: 'Funke',
          lastName: 'Williams',
          role: 'parent',
        },
        'admin@chrisland.demo.com': {
          _id: 'chrisland-user-admin',
          email: 'admin@chrisland.demo.com',
          firstName: 'School',
          lastName: 'Administrator',
          role: 'admin',
        },
        'bola.johnson@riverside.demo.com': {
          _id: 'riverside-user-parent1',
          email: 'bola.johnson@riverside.demo.com',
          firstName: 'Bola',
          lastName: 'Johnson',
          role: 'parent',
        },
        'kemi.adekunle@riverside.demo.com': {
          _id: 'riverside-user-parent2',
          email: 'kemi.adekunle@riverside.demo.com',
          firstName: 'Kemi',
          lastName: 'Adekunle',
          role: 'parent',
        },
        'segun.bakare@riverside.demo.com': {
          _id: 'riverside-user-parent3',
          email: 'segun.bakare@riverside.demo.com',
          firstName: 'Segun',
          lastName: 'Bakare',
          role: 'parent',
        },
        'admin@riverside.demo.com': {
          _id: 'riverside-user-admin',
          email: 'admin@riverside.demo.com',
          firstName: 'School',
          lastName: 'Administrator',
          role: 'admin',
        },
      };

      const demoUser = demoUsers[email];
      if (demoUser) {
        localStorage.setItem('token', 'demo-token-' + demoUser._id);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        showNotification('success', `Welcome, ${name}!`);
        setTimeout(() => router.push('/dashboard'), 800);
        return;
      }

      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      showNotification('success', `Welcome, ${name}!`);
      setTimeout(() => router.push('/dashboard'), 800);
    } catch {
      showNotification('error', 'Failed to switch persona');
    } finally {
      setLoading(null);
    }
  };

  const currentDemoUsers = getDemoUsersForContext();
  const currentSchool = SCHOOL_CONTEXTS.find(s => s.id === schoolContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
            : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Shield className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Demo Experience</h1>
                  <p className="text-white/80 mt-1">Explore Kudegowo's features with sample data</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Demo Mode Active
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* School Selector Cards */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Select Demo School</h2>
              <p className="text-sm text-gray-500">Choose a beta partner school to explore</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {SCHOOL_CONTEXTS.map((school) => (
              <button
                key={school.id}
                onClick={() => handleSchoolContextChange(school.id)}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-300 text-left ${
                  schoolContext === school.id 
                    ? 'ring-2 ring-indigo-500 ring-offset-2 shadow-xl' 
                    : 'hover:shadow-lg border border-gray-200'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${school.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`p-6 ${school.bgPattern}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${school.color} flex items-center justify-center shadow-lg`}>
                      <School className="w-7 h-7 text-white" />
                    </div>
                    {schoolContext === school.id && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Selected
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{school.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{school.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {school.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Users className="w-3.5 h-3.5" />
                      {school.students} students
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      Est. {school.established}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex">
              {[
                { id: 'personas', label: 'Demo Personas', icon: Users },
                { id: 'features', label: 'Key Features', icon: Zap },
                { id: 'credentials', label: 'Credentials', icon: Eye },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Personas Tab */}
            {activeTab === 'personas' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quick Login</h3>
                    <p className="text-sm text-gray-500">Select a persona to explore {currentSchool?.name}</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentDemoUsers.map((user) => (
                    <button
                      key={user.email}
                      onClick={() => loginAs(user.email, user.password, user.name)}
                      disabled={loading === user.email}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-indigo-300 hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${user.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                          {loading === user.email ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            user.avatar
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
                          <p className="text-sm text-gray-500">{user.role}</p>
                          {user.children > 0 && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                              <Users className="w-3 h-3" />
                              {user.children} children
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400 truncate max-w-[140px]">{user.email}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Platform Features</h3>
                  <p className="text-sm text-gray-500">Explore what Kudegowo offers for schools and parents</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {FEATURE_HIGHLIGHTS.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <Link
                        key={feature.title}
                        href={feature.link}
                        className="group flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200 transition-all"
                      >
                        <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                          <FeatureIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Navigation</h4>
                  <div className="flex flex-wrap gap-3">
                    {QUICK_ACTIONS.map((action) => {
                      const ActionIcon = action.icon;
                      return (
                        <Link
                          key={action.title}
                          href={action.link}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                        >
                          <ActionIcon className="w-4 h-4" />
                          {action.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Demo Credentials</h3>
                  <p className="text-sm text-gray-500">Copy credentials to use in the login page</p>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-900">{currentSchool?.name}</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentDemoUsers.map((user) => (
                      <div
                        key={user.email}
                        className="bg-white rounded-xl p-4 border border-indigo-100"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${user.color} flex items-center justify-center text-white font-bold text-xs`}>
                            {user.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{user.name}</h4>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <code className="text-xs text-gray-700 truncate flex-1">{user.email}</code>
                            <button
                              onClick={() => copyToClipboard(user.email)}
                              className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              {copiedEmail === user.email ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <code className="text-xs text-gray-700">{user.password}</code>
                            <button
                              onClick={() => copyToClipboard(user.password)}
                              className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid - Always Visible */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Safe School</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Daily passphrase system
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Real-time attendance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Emergency alerts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Safety certifications
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Coins className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Financial Literacy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                KudiCoins rewards
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                Savings goals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                Educational quizzes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                Achievement badges
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Meal Management</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                Digital menu browsing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                Meal pre-ordering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                Dietary preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                Order history
              </li>
            </ul>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Ready to explore? Select a persona above to get started!</span>
          </div>
        </section>
      </main>
    </div>
  );
}
