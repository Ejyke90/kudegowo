import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { features } from '@/lib/features';
import { KudegowoTextLogo } from '@/components/ui/KudegowoLogo';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="mb-4">
                <KudegowoTextLogo size="large" />
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Smart School Payments</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Africa's leading digital payment platform for Nigerian schools. Manage meals, trips, clubs, and fees all in one place. Trusted by parents and schools nationwide.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {features.enableAuth && (
                  <div className="rounded-md shadow">
                    <Link
                      href="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-accent md:py-4 md:text-lg md:px-10"
                    >
                      For Parents
                    </Link>
                  </div>
                )}
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <div className="rounded-md shadow">
                    <Link
                      href="/register-school"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-accent md:py-4 md:text-lg md:px-10"
                    >
                      For Schools
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/images/nigerian-school-kids.jpg"
          alt="Happy Nigerian school children"
        />
      </div>
    </div>
  );
}
