'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, CreditCard, History, Users, User, LogOut, Building2, CalendarClock, Shield, Coins, UtensilsCrossed } from 'lucide-react';
import { KudegowoLogo } from '@/components/ui/KudegowoLogo';
import { getAuthUser, logout } from '@/lib/auth';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Schools', href: '/dashboard/schools', icon: Building2 },
  { name: 'Scheduled Payments', href: '/dashboard/scheduled-payments', icon: CalendarClock },
  { name: 'Safe School', href: '/dashboard/safe-school', icon: Shield },
  { name: 'Financial Literacy', href: '/dashboard/financial-literacy', icon: Coins },
  { name: 'Meals', href: '/dashboard/meals', icon: UtensilsCrossed },
  { name: 'Payment Items', href: '/dashboard/items', icon: CreditCard },
  { name: 'Transaction History', href: '/dashboard/history', icon: History },
  { name: 'My Children', href: '/dashboard/children', icon: Users },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      logout();
    }
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex flex-col items-center flex-shrink-0 px-4 mb-6 gap-1">
                <KudegowoLogo size="md" variant="color" />
                <div className="text-center">
                  <div className="font-bold text-base text-gray-900">KudEgOwo</div>
                  <div className="text-xs text-gray-500 font-medium">Safe School Monitor</div>
                </div>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-blue-50 hover:text-primary transition-colors"
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-primary"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button onClick={handleLogout} className="flex-shrink-0 w-full group block text-left">
              <div className="flex items-center">
                <div>
                   <div className="inline-block h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                       <User className="h-5 w-5 text-primary" />
                   </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate">
                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                    {user?.role || 'User'}
                  </p>
                </div>
                <LogOut className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
