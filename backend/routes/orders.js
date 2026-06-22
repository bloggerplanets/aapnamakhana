const express = require('express');
const jwt = require('jsonwebtoken');
const { orders: mockOrders } = require('../data/products');

const router = express.Router();
const JWT_SECRET = 'aapnamakhana_demo_secret_2025';

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/', auth, (req, res) => {
  const userOrders = mockOrders.filter(o => o.userId === req.user.id);
  res.json({ orders: userOrders });
});

router.get('/:id', auth, (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

router.post('/create', auth, (req, res) => {
  const { items, address, paymentMethod } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items in order' });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = {
    id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
    userId: req.user.id,
    items,
    total,
    status: 'confirmed',
    address: address || '123 MG Road, Mumbai, Maharashtra - 400001',
    paymentMethod: paymentMethod || 'UPI',
    createdAt: new Date().toISOString()
  };
  mockOrders.push(newOrder);
  res.json({ order: newOrder, message: 'Order placed successfully!' });
});

router.post('/create-payment', auth, (req, res) => {
  const { amount } = req.body;
  res.json({
    razorpayOrderId: 'order_mock_' + Date.now(),
    amount,
    currency: 'INR',
    key: 'rzp_test_mock_key'
  });
});

router.post('/verify-payment', auth, (req, res) => {
  res.json({ verified: true, message: 'Payment verified successfully (mock)' });
});

module.exports = router;
