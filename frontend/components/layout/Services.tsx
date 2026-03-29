'use client';

import { 
  CreditCard, 
  Utensils, 
  Bus, 
  Users, 
  X, 
  Shield, 
  Bell, 
  BookOpen, 
  Award, 
  MapPin, 
  Heart, 
  Smartphone,
  GraduationCap,
  FileCheck,
  AlertTriangle,
  Coins,
  Building2,
  ClipboardCheck,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Core Platform Services
const coreServices = [
  {
    name: 'Safe School',
    description: 'Comprehensive safety management with daily passphrases, real-time attendance tracking, emergency SOS alerts, and parent notifications — compliant with regional standards.',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    features: ['Daily Passphrases', 'Attendance Tracking', 'Emergency Alerts', 'Parent Notifications'],
    link: '/dashboard/safe-school',
    badge: 'Safety Certified',
  },
  {
    name: 'School Payments',
    description: 'Cashless fee collection via card, bank transfer, USSD, and digital wallets. Automated payment schedules and instant receipts.',
    icon: CreditCard,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    features: ['Multiple Payment Methods', 'Auto-Scheduling', 'Instant Receipts', 'Fee Management'],
    link: '/dashboard/scheduled-payments',
    badge: 'PCI Compliant',
  },
  {
    name: 'Financial Literacy',
    description: 'KudiCoins rewards system teaching children savings, budgeting, and financial responsibility through gamified learning.',
    icon: Coins,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    features: ['KudiCoins Rewards', 'Savings Goals', 'Educational Quizzes', 'Achievement Badges'],
    link: '/dashboard/financial-literacy',
    badge: 'Central Bank Aligned',
  },
  {
    name: 'Meal Management',
    description: 'Digital menu browsing, meal pre-ordering, dietary preference tracking, and nutritional information for school canteens.',
    icon: Utensils,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    features: ['Digital Menus', 'Pre-ordering', 'Dietary Tracking', 'Nutrition Info'],
    link: '/dashboard/meals',
    badge: 'Food Safety Certified',
  },
];

// Compliance Frameworks - Extensible structure for multiple standards across Africa
const complianceFrameworks = [
  {
    id: 'sslag',
    name: 'SSLAG',
    fullName: 'Safe Schools Lagos',
    description: 'Lagos State Safety Commission framework for school safety compliance',
    logo: '🛡️',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    region: 'Nigeria',
  },
  {
    id: 'waec',
    name: 'WAEC',
    fullName: 'West African Examinations Council',
    description: 'Regional examination and academic standards across 5 West African countries',
    logo: '🎓',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    region: 'West Africa',
  },
  {
    id: 'cambridge',
    name: 'Cambridge',
    fullName: 'Cambridge Assessment International',
    description: 'International curriculum and examination standards',
    logo: '�',
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    region: 'International',
  },
  {
    id: 'ib',
    name: 'IB',
    fullName: 'International Baccalaureate',
    description: 'Global education framework for primary, middle, and diploma years',
    logo: '�',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    region: 'International',
  },
];

// Safety & Compliance Services - Framework agnostic
const safetyServices = [
  {
    name: 'Safety Training',
    description: 'Mandatory safety training modules for staff, parents, and students aligned with your chosen framework.',
    icon: BookOpen,
    features: ['Video Modules', 'Interactive Quizzes', 'Progress Tracking', 'Certificates'],
  },
  {
    name: 'Certification Tracking',
    description: 'Track certifications and compliance status across multiple frameworks and standards.',
    icon: Award,
    features: ['Multi-Framework', 'Audit Scheduling', 'Compliance Reports', 'League Table'],
  },
  {
    name: 'Emergency Preparedness',
    description: 'Emergency drill scheduling, incident reporting, and crisis management protocols.',
    icon: AlertTriangle,
    features: ['Drill Scheduling', 'Incident Reports', 'Crisis Protocols', 'First Aid Tracking'],
  },
  {
    name: 'Transportation Safety',
    description: 'GPS tracking for school buses, driver verification, and route optimization.',
    icon: Bus,
    features: ['GPS Tracking', 'Driver Verification', 'Route Optimization', 'Parent Alerts'],
  },
  {
    name: 'Health & Wellness',
    description: 'Student health records, vaccination tracking, and wellness monitoring.',
    icon: Heart,
    features: ['Health Records', 'Vaccination Tracking', 'Wellness Checks', 'Medical Alerts'],
  },
  {
    name: 'Facility Safety',
    description: 'Infrastructure safety audits, maintenance scheduling, and compliance checklists.',
    icon: Building2,
    features: ['Safety Audits', 'Maintenance Logs', 'Compliance Checklists', 'Inspection Reports'],
  },
];

// Additional Services
const additionalServices = [
  {
    name: 'AI Onboarding',
    description: 'Conversational AI assistant for seamless school and parent registration.',
    icon: Sparkles,
  },
  {
    name: 'Multi-Channel Notifications',
    description: 'SMS, WhatsApp, and push notifications for real-time updates.',
    icon: Bell,
  },
  {
    name: 'Club & Activities',
    description: 'After-school club management, bookings, and payment processing.',
    icon: Users,
  },
  {
    name: 'School Trips',
    description: 'Excursion management with consent forms and payment collection.',
    icon: MapPin,
  },
];

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: {
          fullName: string;
          phone: string;
        };
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export function Services() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: '',
    amount: '',
    fullName: '',
    phone: '',
  });
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const publicKey = 'pk_test_8dc6e561b7f6328c1d6a3b8a8c6f3e2a8d6c5e6f'; // Real Paystack test public key

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    script.onerror = (error) => {
      console.error('Failed to load Paystack script:', error);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
    setPaymentData({ email: '', amount: '', fullName: '', phone: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paystackLoaded) {
      alert('Payment gateway is still loading. Please wait a moment and try again.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: paymentData.email,
      amount: parseFloat(paymentData.amount) * 100, // Convert to kobo
      currency: 'NGN',
      ref: 'REF_' + new Date().getTime(),
      metadata: {
        fullName: paymentData.fullName,
        phone: paymentData.phone,
      },
      callback: (response: { reference: string }) => {
        alert('Payment successful! Reference: ' + response.reference);
        handleClosePaymentForm();
      },
      onClose: () => {
        alert('Payment window closed. Please try again.');
      }
    });

    handler.openIframe();
  };

  return (
    <>
      <div className="py-20 bg-gradient-to-b from-white to-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Our Platform
            </span>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Complete School Management
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
              A comprehensive digital platform combining safety, payments, and education in one integrated solution — designed for African schools, compliant with regional and international standards.
            </p>
          </div>

          {/* Core Services - Large Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {coreServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={service.name}
                  className={`relative group rounded-3xl ${service.bgColor} p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden`}
                >
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                        <ServiceIcon className="w-8 h-8 text-white" />
                      </div>
                      {service.badge && (
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold border border-gray-200">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-white/60 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {service.name === 'School Payments' ? (
                      <button
                        onClick={() => setShowPaymentForm(true)}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay Now
                      </button>
                    ) : (
                      <Link
                        href={service.link}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                      >
                        Learn More
                        <span className="text-lg">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety & Compliance Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Safety & Compliance</h3>
                <p className="text-gray-500">SSLAG Framework Implementation</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={service.name}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                      <ServiceIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">More Platform Features</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {additionalServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={service.name}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ServiceIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance Frameworks Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Supported Compliance Frameworks</h3>
              <p className="text-gray-600">Choose the standards that matter to your school — we support multiple frameworks</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {complianceFrameworks.map((framework) => (
                <div
                  key={framework.id}
                  className={`${framework.bgColor} rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all group cursor-pointer`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{framework.logo}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{framework.name}</h4>
                      <span className="text-xs text-gray-500">{framework.region}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{framework.fullName}</p>
                  <p className="text-xs text-gray-500">{framework.description}</p>
                </div>
              ))}
            </div>

            {/* Partnership Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <Award className="w-8 h-8 text-amber-400" />
                    <span className="text-2xl font-bold">Multi-Framework Compliance</span>
                  </div>
                  <p className="text-gray-300 max-w-xl">
                    Kudegowo supports multiple compliance frameworks. Whether you follow SSLAG, UBEC, Cambridge, or other standards — our platform adapts to your requirements.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {complianceFrameworks.map((f) => (
                    <span key={f.id} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paystack Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Pay with Paystack</h3>
              <button
                onClick={handleClosePaymentForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={paymentData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={paymentData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={paymentData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleInputChange}
                  required
                  min="100"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-accent transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!paymentData.email || !paymentData.amount || !paymentData.fullName || !paymentData.phone || !paystackLoaded}
                >
                  {paystackLoaded ? 'Pay Now with Paystack' : 'Loading Payment Gateway...'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Secured by Paystack • Nigerian payment gateway</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
