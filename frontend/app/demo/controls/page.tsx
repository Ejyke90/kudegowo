'use client';

import { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import Link from 'next/link';

const DEMO_USERS = [
  {
    name: 'Ada Okonkwo',
    role: 'Parent',
    email: 'ada.okonkwo@demo.com',
    password: 'Demo123!',
    icon: UserCircle,
    color: 'emerald',
  },
  {
    name: 'Chidi Eze',
    role: 'Parent',
    email: 'chidi.eze@demo.com',
    password: 'Demo123!',
    icon: Users,
    color: 'blue',
  },
  {
    name: 'School Admin',
    role: 'School Administrator',
    email: 'admin@greensprings.edu.ng',
    password: 'Demo123!',
    icon: School,
    color: 'purple',
  },
];

const JOURNEYS = [
  {
    title: 'Parent Journey',
    persona: 'Ada Okonkwo',
    icon: UserCircle,
    color: 'emerald',
    steps: [
      { title: 'Login', description: 'Use ada.okonkwo@demo.com / Demo123!', link: '/login' },
      { title: 'View Dashboard', description: 'See children, payments, and notifications', link: '/dashboard' },
      { title: 'Safe School', description: 'Check today\'s passphrase and attendance', link: '/dashboard/safe-school', icon: Shield },
      { title: 'Financial Literacy', description: 'View KudiCoins balance and savings goals', link: '/dashboard/financial-literacy', icon: Coins },
      { title: 'Meal Management', description: 'Pre-order meals for children', link: '/dashboard/meals', icon: UtensilsCrossed },
      { title: 'My Schools', description: 'Manage school profiles and fees', link: '/dashboard/schools' },
    ],
  },
  {
    title: 'School Admin Journey',
    persona: 'School Administrator',
    icon: School,
    color: 'purple',
    steps: [
      { title: 'Login', description: 'Use admin@greensprings.edu.ng / Demo123!', link: '/login' },
      { title: 'View Dashboard', description: 'See school overview and metrics', link: '/dashboard' },
      { title: 'Safe School Monitor', description: 'View attendance board and emergency alerts', link: '/dashboard/safe-school', icon: Shield },
      { title: 'Financial Overview', description: 'Track payments and KudiCoin distribution', link: '/dashboard/financial-literacy', icon: Coins },
      { title: 'Meal Planning', description: 'Manage menu and meal orders', link: '/dashboard/meals', icon: UtensilsCrossed },
      { title: 'School Management', description: 'Manage students and fee categories', link: '/dashboard/schools' },
    ],
  },
];

export default function DemoControlsPage() {
  const router = useRouter();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const loginAs = async (email: string, password: string, name: string) => {
    setLoading(email);
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      showNotification('success', `Logged in as ${name}`);
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      showNotification('error', 'Failed to switch persona');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-bold">Demo Journey Guide</h1>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            Demo Mode
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Persona Switching */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Quick Login
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {DEMO_USERS.map((user) => {
              const Icon = user.icon;
              return (
                <button
                  key={user.email}
                  onClick={() => loginAs(user.email, user.password, user.name)}
                  disabled={loading === user.email}
                  className={`p-4 border-2 rounded-lg hover:border-${user.color}-500 transition-colors text-left disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-${user.color}-100 rounded-full flex items-center justify-center`}>
                      {loading === user.email ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                      ) : (
                        <Icon className={`w-5 h-5 text-${user.color}-600`} />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">{user.email}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Journey Guides */}
        <div className="grid lg:grid-cols-2 gap-8">
          {JOURNEYS.map((journey) => {
            const JourneyIcon = journey.icon;
            return (
              <div key={journey.title} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-${journey.color}-100 rounded-lg flex items-center justify-center`}>
                    <JourneyIcon className={`w-6 h-6 text-${journey.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{journey.title}</h2>
                    <p className="text-sm text-gray-500">Login as {journey.persona}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {journey.steps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {StepIcon && <StepIcon className="w-4 h-4 text-gray-400" />}
                            <h3 className="font-semibold text-sm">{step.title}</h3>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                          {step.link && (
                            <Link 
                              href={step.link}
                              className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
                            >
                              Go to page <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Features */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Key Features to Demonstrate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Safe School</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Daily passphrase system</li>
                <li>• Real-time attendance tracking</li>
                <li>• Emergency alerts</li>
                <li>• Parent notifications</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold">Financial Literacy</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• KudiCoins rewards system</li>
                <li>• Savings goals tracking</li>
                <li>• Educational quizzes</li>
                <li>• Achievement badges</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <UtensilsCrossed className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Meal Management</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Digital menu browsing</li>
                <li>• Meal pre-ordering</li>
                <li>• Dietary preferences</li>
                <li>• Order history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-900">Demo Credentials</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-900">Parent (Ada)</div>
              <div className="font-mono text-xs text-blue-700">ada.okonkwo@demo.com</div>
              <div className="font-mono text-xs text-blue-700">Demo123!</div>
            </div>
            <div>
              <div className="font-semibold text-blue-900">Parent (Chidi)</div>
              <div className="font-mono text-xs text-blue-700">chidi.eze@demo.com</div>
              <div className="font-mono text-xs text-blue-700">Demo123!</div>
            </div>
            <div>
              <div className="font-semibold text-blue-900">School Admin</div>
              <div className="font-mono text-xs text-blue-700">admin@greensprings.edu.ng</div>
              <div className="font-mono text-xs text-blue-700">Demo123!</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
