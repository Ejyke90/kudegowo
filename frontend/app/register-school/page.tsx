import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function RegisterSchoolPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-primary hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-primary">
            <h3 className="text-2xl leading-6 font-medium text-white">
              Register Your School
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-blue-100">
              Join the Naija Eazy Pay network and go cashless today.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="sm:p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="school-name" className="block text-sm font-medium text-gray-700">
                      School Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="school-name"
                        id="school-name"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Contact First Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Contact Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Official School Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="school-type" className="block text-sm font-medium text-gray-700">
                      School Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="school-type"
                        name="school-type"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      >
                        <option>Primary School</option>
                        <option>Secondary School</option>
                        <option>Multi-Academy Trust</option>
                        <option>Tertiary Institution</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Submit Registration
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
           <h4 className="text-lg font-medium text-blue-900 mb-4">Why join Naija Eazy Pay?</h4>
           <ul className="space-y-3">
              <li className="flex items-start">
                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                 <span className="text-blue-800">Eliminate cash handling risks and administrative burden.</span>
              </li>
              <li className="flex items-start">
                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                 <span className="text-blue-800">Real-time reporting on all income streams.</span>
              </li>
              <li className="flex items-start">
                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                 <span className="text-blue-800">Integrated communication tools to reach parents instantly.</span>
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
}
