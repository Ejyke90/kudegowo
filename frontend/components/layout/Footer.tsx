import Link from 'next/link';
import { SafeNetWordmark } from '@/components/ui/SafeNetMark';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <SafeNetWordmark size="md" variant="full" />
            </div>
            <p className="text-gray-400 text-sm">
              Nigeria's safety net for schools — payments, safety, and education in one platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Cashless Payments</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Meal Manager</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">School Trips</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Club Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Parent Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">School Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kudegowo SafeNet. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
