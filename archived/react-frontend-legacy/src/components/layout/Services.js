import { CreditCard, Utensils, Bus, Users, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Services.css';

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

export function Services() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: '',
    amount: '',
    fullName: '',
    phone: '',
  });
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const publicKey = 'pk_test_1234567890abcdef'; // Replace with your actual Paystack public key

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCashlessPaymentClick = () => {
    setShowPaymentForm(true);
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
    setPaymentData({ email: '', amount: '', fullName: '', phone: '' });
  };

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = (e) => {
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
      callback: function(response) {
        alert('Payment successful! Reference: ' + response.reference);
        handleClosePaymentForm();
      },
      onClose: function() {
        alert('Payment window closed. Please try again.');
      }
    });

    handler.openIframe();
  };

  return (
    <>
      <section className="services">
        <div className="container">
          <h2>Why Choose Naija EazyPay?</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div 
                key={service.name} 
                className={`service ${service.name === 'Cashless Payments' ? 'service-clickable' : ''}`}
                onClick={service.name === 'Cashless Payments' ? handleCashlessPaymentClick : undefined}
              >
                <div className="service-icon">
                  <service.icon className="icon" />
                </div>
                <h3>
                  {service.name}
                  {service.name === 'Cashless Payments' && (
                    <span className="click-hint">(Click to pay)</span>
                  )}
                </h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paystack Payment Modal */}
      {showPaymentForm && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <div className="payment-modal-header">
              <h3>Pay with Paystack</h3>
              <button onClick={handleClosePaymentForm} className="close-btn">
                <X className="close-icon" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={paymentData.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={paymentData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={paymentData.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount (₦)</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleInputChange}
                  required
                  min="100"
                  step="0.01"
                  className="form-input"
                  placeholder="Enter amount"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="paystack-btn"
                  disabled={!paymentData.email || !paymentData.amount || !paymentData.fullName || !paymentData.phone || !paystackLoaded}
                >
                  {paystackLoaded ? 'Pay Now with Paystack' : 'Loading Payment Gateway...'}
                </button>
              </div>
            </form>

            <div className="payment-footer">
              <p>Secured by Paystack • Nigerian payment gateway</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
