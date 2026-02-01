import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { itemService } from '../services/api';
import './Admin.css';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'meal',
    amount: '',
    schoolId: 'default-school'
  });

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
    fetchItems();
  }, [user, navigate]);

  const fetchItems = async () => {
    try {
      const response = await itemService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await itemService.update(editingItem._id, formData);
      } else {
        await itemService.create(formData);
      }
      setFormData({ name: '', description: '', category: 'meal', amount: '', schoolId: 'default-school' });
      setShowForm(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      alert(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category,
      amount: item.amount,
      schoolId: item.schoolId
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.delete(id);
        fetchItems();
      } catch (error) {
        alert(error.response?.data?.error || 'Delete failed');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>Naija EazyPay Admin</h1>
        <div className="header-actions">
          <span>Welcome, {user?.firstName}!</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-section">
          <div className="section-header">
            <h2>Payment Items Management</h2>
            <button onClick={() => { setShowForm(!showForm); setEditingItem(null); }} className="btn-add">
              {showForm ? 'Cancel' : 'Add New Item'}
            </button>
          </div>

          {showForm && (
            <div className="item-form">
              <h3>{editingItem ? 'Edit Payment Item' : 'Create New Payment Item'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                      <option value="meal">Meal</option>
                      <option value="trip">Trip</option>
                      <option value="uniform">Uniform</option>
                      <option value="book">Book</option>
                      <option value="tuition">Tuition</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Amount (₦)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <button type="submit" className="btn-submit">
                  {editingItem ? 'Update Item' : 'Create Item'}
                </button>
              </form>
            </div>
          )}

          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td><span className="category-badge">{item.category}</span></td>
                    <td>{item.description || '-'}</td>
                    <td>₦{item.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && (
              <p className="no-items">No payment items found. Create your first item above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
