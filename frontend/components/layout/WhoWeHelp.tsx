import Link from 'next/link';
import { School, GraduationCap, Building2, UserCheck } from 'lucide-react';

const sectors = [
  {
    name: 'Primary Schools',
    description: 'Simplify cash collection for dinners, trips, and clubs. Save admin time and improve safety.',
    icon: School,
  },
  {
    name: 'Secondary Schools',
    description: 'Complete income management system. Handle complex payment items and reduce cash on premises.',
    icon: GraduationCap,
  },
  {
    name: 'Multi-Academy Trusts',
    description: 'Centralized reporting and management across all your schools. Real-time financial visibility.',
    icon: Building2,
  },
  {
    name: 'Local Authorities',
    description: 'Streamline payments and reporting for all maintained schools in your authority.',
    icon: UserCheck,
  },
];

export function WhoWeHelp() {
  return (
    <div className="py-16 bg-white" id="who-we-help">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Who We Help</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Solutions for every educational setting
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you are a small primary school or a large multi-academy trust, Kudegowo scales to meet your needs.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <div key={sector.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-secondary rounded-md shadow-lg">
                        <sector.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{sector.name}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
           <Link
              href="/register-school"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Register Your School
            </Link>
        </div>
      </div>
    </div>
  );
}
