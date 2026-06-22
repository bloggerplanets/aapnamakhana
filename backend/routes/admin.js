const express = require('express');
const jwt = require('jsonwebtoken');
const { products, orders, users } = require('../data/products');

const router = express.Router();
const JWT_SECRET = 'aapnamakhana_demo_secret_2025';

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/stats', adminAuth, (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;
  const pendingOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  const monthlyData = [
    { month: 'Jan', revenue: 12400 },
    { month: 'Feb', revenue: 18900 },
    { month: 'Mar', revenue: 15600 },
    { month: 'Apr', revenue: 22300 },
    { month: 'May', revenue: 28100 },
    { month: 'Jun', revenue: totalRevenue || 31500 }
  ];

  const topProducts = products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5)
    .map(p => ({ name: p.name, sales: p.reviews, revenue: p.reviews * p.price }));

  res.json({
    stats: { totalRevenue, totalOrders, totalProducts, totalUsers, pendingOrders, deliveredOrders },
    monthlyData,
    topProducts,
    recentOrders: orders.slice(-5).reverse()
  });
});

router.get('/products', adminAuth, (req, res) => {
  res.json({ products });
});

router.put('/products/:id', adminAuth, (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  Object.assign(product, req.body);
  res.json({ product, message: 'Product updated' });
});

router.post('/products', adminAuth, (req, res) => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  const newProduct = { id: newId, rating: 0, reviews: 0, featured: false, ...req.body };
  products.push(newProduct);
  res.json({ product: newProduct, message: 'Product created' });
});

router.delete('/products/:id', adminAuth, (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1)[0];
  res.json({ product: deleted, message: 'Product deleted' });
});

router.get('/orders', adminAuth, (req, res) => {
  res.json({ orders });
});

router.put('/orders/:id/status', adminAuth, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status;
  res.json({ order, message: 'Order status updated' });
});

module.exports = router;
