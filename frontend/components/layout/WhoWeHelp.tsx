import Link from 'next/link';
import { School, GraduationCap, Building2, UserCheck, Users, Shield, Award, BookOpen } from 'lucide-react';

const sectors = [
  {
    name: 'Private Schools',
    description: 'SSLAG-compliant safety management, cashless payments, and parent engagement for leading private institutions.',
    icon: School,
    features: ['BOS Certification', 'Fee Management', 'Parent Portal'],
  },
  {
    name: 'Public Schools',
    description: 'Affordable safety and payment solutions aligned with Lagos State education standards and UBEC guidelines.',
    icon: GraduationCap,
    features: ['Government Compliance', 'Subsidized Plans', 'Mass Enrollment'],
  },
  {
    name: 'School Groups & MATs',
    description: 'Centralized dashboard for multi-campus operations with unified reporting and safety monitoring.',
    icon: Building2,
    features: ['Multi-Campus View', 'Consolidated Reports', 'Group Analytics'],
  },
  {
    name: 'Parents & Guardians',
    description: 'Real-time visibility into child safety, attendance, payments, and academic progress from any device.',
    icon: Users,
    features: ['Mobile App', 'Instant Alerts', 'Payment History'],
  },
];

export function WhoWeHelp() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white" id="who-we-help">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            Who We Serve
          </span>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Built for Nigerian Schools
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            From single-campus private schools to state-wide public school networks, Kudegowo scales to meet your safety and payment needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sectors.map((sector) => {
            const SectorIcon = sector.icon;
            return (
              <div 
                key={sector.name} 
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform">
                  <SectorIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{sector.description}</p>
                <div className="flex flex-wrap gap-2">
                  {sector.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-200">Schools Onboarded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-purple-200">Students Protected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₦2B+</div>
              <div className="text-purple-200">Payments Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-purple-200">Uptime Guarantee</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/register-school"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Register Your School
            </Link>
            <Link
              href="/demo/controls"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-purple-300 hover:text-purple-600 transition-all"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
