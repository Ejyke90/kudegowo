import Link from 'next/link';
import { Home, CreditCard, History, Users, User, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Payment Items', href: '/dashboard/items', icon: CreditCard },
  { name: 'Transaction History', href: '/dashboard/history', icon: History },
  { name: 'My Children', href: '/dashboard/children', icon: Users },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-6">
                <span className="text-xl font-bold text-primary">Naija Eazy Pay</span>
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
            <Link href="/login" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                   <div className="inline-block h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                       <User className="h-5 w-5 text-gray-500" />
                   </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Parent User
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    Sign out
                  </p>
                </div>
                <LogOut className="ml-auto h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
