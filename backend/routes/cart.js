const express = require('express');
const jwt = require('jsonwebtoken');
const { products } = require('../data/products');

const router = express.Router();
const JWT_SECRET = 'aapnamakhana_demo_secret_2025';

const carts = {};

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
  const cart = carts[req.user.id] || [];
  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);
  const total = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  res.json({ items: cartWithProducts, total, itemCount: cart.reduce((sum, item) => sum + item.quantity, 0) });
});

router.post('/add', auth, (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const existing = carts[req.user.id].find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[req.user.id].push({ productId, quantity });
  }
  res.json({ message: 'Added to cart', itemCount: carts[req.user.id].reduce((s, i) => s + i.quantity, 0) });
});

router.put('/update', auth, (req, res) => {
  const { productId, quantity } = req.body;
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const item = carts[req.user.id].find(i => i.productId === productId);
  if (item) {
    if (quantity <= 0) {
      carts[req.user.id] = carts[req.user.id].filter(i => i.productId !== productId);
    } else {
      item.quantity = quantity;
    }
  }
  res.json({ message: 'Cart updated' });
});

router.delete('/remove/:productId', auth, (req, res) => {
  if (!carts[req.user.id]) carts[req.user.id] = [];
  carts[req.user.id] = carts[req.user.id].filter(i => i.productId !== Number(req.params.productId));
  res.json({ message: 'Removed from cart' });
});

router.delete('/clear', auth, (req, res) => {
  carts[req.user.id] = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
