import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService, itemService, paymentService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [paymentItems, setPaymentItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [showTopup, setShowTopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [balanceRes, itemsRes, transactionsRes] = await Promise.all([
        userService.getBalance(),
        itemService.getAll({ isActive: true }),
        paymentService.getTransactions()
      ]);
      setBalance(balanceRes.data.balance);
      setPaymentItems(itemsRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async (e) => {
    e.preventDefault();
    try {
      await paymentService.topUp({ amount: parseFloat(topupAmount) });
      setTopupAmount('');
      setShowTopup(false);
      fetchData();
      alert('Top up successful!');
    } catch (error) {
      alert(error.response?.data?.error || 'Top up failed');
    }
  };

  const handlePayment = async (itemId) => {
    try {
      await paymentService.makePayment({ paymentItemId: itemId });
      fetchData();
      alert('Payment successful!');
    } catch (error) {
      alert(error.response?.data?.error || 'Payment failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kudegowo</h1>
        <div className="header-actions">
          <span>Welcome, {user.firstName}!</span>
          {user.role === 'admin' && (
            <button onClick={() => navigate('/admin')} className="btn-admin">Admin Panel</button>
          )}
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="balance-card">
          <h2>Account Balance</h2>
          <div className="balance-amount">₦{balance.toLocaleString()}</div>
          <button onClick={() => setShowTopup(!showTopup)} className="btn-topup">
            Top Up Balance
          </button>
          {showTopup && (
            <form onSubmit={handleTopup} className="topup-form">
              <input
                type="number"
                placeholder="Enter amount"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                required
                min="100"
              />
              <button type="submit">Add Funds</button>
            </form>
          )}
        </div>

        <div className="payment-items">
          <h2>Available Payment Items</h2>
          <div className="items-grid">
            {paymentItems.map((item) => (
              <div key={item._id} className="payment-item-card">
                <div className="item-category">{item.category}</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-amount">₦{item.amount.toLocaleString()}</div>
                <button
                  onClick={() => handlePayment(item._id)}
                  className="btn-pay"
                  disabled={balance < item.amount}
                >
                  {balance < item.amount ? 'Insufficient Balance' : 'Pay Now'}
                </button>
              </div>
            ))}
          </div>
          {paymentItems.length === 0 && (
            <p className="no-items">No payment items available at the moment.</p>
          )}
        </div>

        <div className="transactions">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction._id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-type">{transaction.type}</div>
                  <div className="transaction-date">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'topup' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          {transactions.length === 0 && (
            <p className="no-transactions">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
