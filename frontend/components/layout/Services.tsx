'use client';

import { CreditCard, Utensils, Bus, Users, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
  {
    name: 'Cashless Payments',
    description: 'Secure online payments for tuition, uniforms, and more. No more cash handling risks.',
    icon: CreditCard,
  },
  {
    name: 'Meal Manager',
    description: 'Pre-order and pay for school meals. View menus and dietary information.',
    icon: Utensils,
  },
  {
    name: 'School Trips',
    description: 'Manage consent forms and payments for excursions easily.',
    icon: Bus,
  },
  {
    name: 'Club Management',
    description: 'Book and pay for after-school clubs and activities.',
    icon: Users,
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
      <div className="py-12 bg-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one place
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive platform handles all aspects of school money management.
            </p>
            {/* Nigerian Flag Badge */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-primary rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-px">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="text-white font-bold text-sm">🇳🇬</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {services.map((service) => (
                <div 
                  key={service.name} 
                  className="relative"
                >
                  {service.name === 'Cashless Payments' ? (
                    <div className="p-4 rounded-lg border-2 border-primary bg-white">
                      <dt className="relative">
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                          <service.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{service.description}</dd>
                      <div className="mt-4 ml-16">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPaymentForm(true);
                          }}
                          className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        >
                          💳 Pay Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <dt className="relative">
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                          <service.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{service.description}</dd>
                    </>
                  )}
                </div>
              ))}
            </dl>
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
