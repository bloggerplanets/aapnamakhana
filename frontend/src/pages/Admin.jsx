import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const emptyProduct = {
  name: '', category: 'Classic Roasted', price: '', stock: '', description: '', image: '', weight: '', flavor: '', featured: false
};

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('overview');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getAuth = () => JSON.parse(localStorage.getItem('am_auth'));

  const loadData = () => {
    const auth = getAuth();
    if (!auth) return;
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(setStats);
    fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(data => setOrders(data.orders));
    fetch('/api/admin/products', { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(data => setProducts(data.products));
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    loadData();
  }, [user]);

  if (!user || user.role !== 'admin') return null;

  const statusColors = {
    confirmed: 'var(--warning)',
    processing: 'var(--accent)',
    shipped: 'var(--primary)',
    delivered: 'var(--success)',
    cancelled: 'var(--error)'
  };

  const categories = ['Classic Roasted', 'Flavored Makhana', 'Makhana Mix', 'Raw Makhana', 'Kheer Mix', 'Gift Box'];

  const openCreate = () => {
    setFormData(emptyProduct);
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setFormData({ ...p, price: p.price, stock: p.stock });
    setEditingProduct(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const auth = getAuth();
    const body = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
    try {
      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        setProducts(products.map(p => p.id === editingProduct ? data.product : p));
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        setProducts([...products, data.product]);
      }
      setShowForm(false);
      setFormData(emptyProduct);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const auth = getAuth();
    await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>Admin Dashboard</h1>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon revenue">&#128176;</div>
            <div className="stat-value">₹{stats?.stats?.totalRevenue?.toLocaleString() || '0'}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orders">&#128230;</div>
            <div className="stat-value">{stats?.stats?.totalOrders || 0}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon products">&#128722;</div>
            <div className="stat-value">{stats?.stats?.totalProducts || 0}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon users">&#128101;</div>
            <div className="stat-value">{stats?.stats?.totalUsers || 0}</div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['overview', 'orders', 'products'].map(t => (
            <button key={t} className={`filter-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'overview' && stats && (
          <div className="admin-grid">
            <div className="admin-panel">
              <h3>Revenue Overview</h3>
              <div className="chart-placeholder">
                {stats.monthlyData?.map((d, i) => (
                  <div
                    key={i}
                    className="chart-bar"
                    style={{
                      height: `${(d.revenue / 35000) * 100}%`,
                      background: `linear-gradient(to top, var(--primary), var(--primary-light))`
                    }}
                  >
                    <span className="bar-value">₹{(d.revenue / 1000).toFixed(0)}k</span>
                    <span className="bar-label">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-panel">
              <h3>Top Products</h3>
              {stats.topProducts?.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.sales} sales</div>
                  </div>
                  <div style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{p.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="admin-panel">
            <h3>All Orders</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: '600' }}>{order.id}</td>
                      <td>{order.items.map(i => i.name).join(', ')}</td>
                      <td style={{ fontWeight: '600' }}>₹{order.total}</td>
                      <td>
                        <span className="badge" style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="sort-select"
                          value={order.status}
                          onChange={async (e) => {
                            const auth = getAuth();
                            await fetch(`/api/admin/orders/${order.id}/status`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
                              body: JSON.stringify({ status: e.target.value })
                            });
                            setOrders(orders.map(o => o.id === order.id ? { ...o, status: e.target.value } : o));
                          }}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className="admin-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Product Management</h3>
              <button className="btn btn-primary" onClick={openCreate}>+ Add Product</button>
            </div>

            {showForm && (
              <div className="product-form">
                <h4 style={{ marginBottom: '16px' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter product name" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="input-field sort-select" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input className="input-field" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input className="input-field" type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>
                    <input className="input-field" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} placeholder="e.g. 100g" />
                  </div>
                  <div className="form-group">
                    <label>Flavor</label>
                    <input className="input-field" value={formData.flavor} onChange={e => setFormData({ ...formData, flavor: e.target.value })} placeholder="e.g. Classic Salted" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Image URL</label>
                    <input className="input-field" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Description</label>
                    <textarea className="input-field" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Product description..." />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                      Featured Product
                    </label>
                  </div>
                </div>
                {formData.image && (
                  <div style={{ margin: '16px 0', textAlign: 'center' }}>
                    <img src={formData.image} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button className="btn btn-primary" onClick={handleSave} disabled={saving || !formData.name || !formData.price}>
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingProduct(null); }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td>
                        <img src={p.image} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                      </td>
                      <td style={{ fontWeight: '600' }}>{p.name}</td>
                      <td><span className="badge badge-primary">{p.category}</span></td>
                      <td>₹{p.price}</td>
                      <td>
                        <span className={`badge ${p.stock < 50 ? 'badge-error' : 'badge-success'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td>{p.featured ? '⭐' : '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="btn btn-sm btn-secondary" onClick={() => openEdit(p)}>Edit</button>
                          <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--error)' }} onClick={() => handleDelete(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
