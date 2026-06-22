import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) return;

    fetch('/api/orders', { headers: { 'Authorization': `Bearer ${auth.token}` } })
      .then(r => r.json())
      .then(data => setOrders(data.orders));

    fetch('/api/auth/profile', { headers: { 'Authorization': `Bearer ${auth.token}` } })
      .then(r => r.json())
      .then(setProfile);
  }, [user]);

  if (!user) return null;

  const statusColors = {
    confirmed: 'var(--warning)',
    processing: 'var(--accent)',
    shipped: 'var(--primary)',
    delivered: 'var(--success)',
    cancelled: 'var(--error)'
  };

  return (
    <div className="account-page">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>My Account</h1>
        <div className="account-layout">
          <div className="account-sidebar">
            <div className="user-info">
              <div className="user-avatar">{user.name?.[0] || 'U'}</div>
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <div className="sidebar-nav">
              <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>&#128230; My Orders</button>
              <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>&#128100; Profile</button>
              <button className={tab === 'addresses' ? 'active' : ''} onClick={() => setTab('addresses')}>&#128205; Addresses</button>
              <button onClick={() => { logout(); navigate('/'); }} style={{ color: 'var(--error)' }}>&#128682; Logout</button>
            </div>
          </div>

          <div className="account-content">
            {tab === 'orders' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Order History</h2>
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">&#128230;</div>
                    <h3>No orders yet</h3>
                    <p>Start shopping to see your orders here</p>
                  </div>
                ) : orders.map(order => (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div>
                        <div className="order-id">{order.id}</div>
                        <div className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      </div>
                      <span className="badge" style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <div className="order-item" key={idx}>
                          <span>{item.name} x {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">Total: ₹{order.total}</div>
                      <button className="btn btn-secondary btn-sm" onClick={() => alert(`Invoice for ${order.id}\n\nThis is a demo - PDF generation will be available in production.`)}>
                        Download Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Profile Information</h2>
                <div className="glass-card">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input className="input-field" value={user.name || ''} readOnly />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input className="input-field" value={user.email || ''} readOnly />
                  </div>
                  <div className="input-group">
                    <label>Phone</label>
                    <input className="input-field" value={profile?.phone || ''} readOnly />
                  </div>
                  <div className="input-group">
                    <label>Role</label>
                    <input className="input-field" value={user.role || 'customer'} readOnly />
                  </div>
                </div>
              </div>
            )}

            {tab === 'addresses' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Saved Addresses</h2>
                <div className="glass-card" style={{ marginBottom: '16px' }}>
                  <div className="address-type">Home</div>
                  <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>123 MG Road, Andheri West, Mumbai, Maharashtra - 400058</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone: 9876543210</p>
                </div>
                <button className="btn btn-secondary">+ Add New Address</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
