import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <div className="container">
          <h1 className="logo">Naija EazyPay</h1>
          <nav>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link nav-btn">Get Started</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>School Payments Made Easy</h1>
            <p>
              The modern way for parents to pay for school meals, trips, uniforms, and more. 
              Secure, convenient, and designed for Nigerian schools.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Start Free Today</Link>
              <Link to="/login" className="btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Naija EazyPay?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">💳</div>
              <h3>Easy Payments</h3>
              <p>Pay for school items quickly and securely from your account balance</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Convenient Access</h3>
              <p>Access your account anytime, anywhere from your computer or mobile device</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>Your data is encrypted and protected with industry-standard security</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <h3>Track Spending</h3>
              <p>Monitor all your transactions and keep track of your spending history</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Instant Top-up</h3>
              <p>Add funds to your account instantly and never miss a payment</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎓</div>
              <h3>School Approved</h3>
              <p>Trusted by schools across Nigeria for secure payment processing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up with your email and create your parent account</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Top Up Balance</h3>
              <p>Add funds to your account using your preferred payment method</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Make Payments</h3>
              <p>Browse and pay for school items instantly from your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of parents using Naija EazyPay for hassle-free school payments</p>
          <Link to="/register" className="btn-primary">Create Free Account</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Naija EazyPay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
