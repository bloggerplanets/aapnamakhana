const express = require('express');
const jwt = require('jsonwebtoken');
const { products } = require('../data/products');

const router = express.Router();
const JWT_SECRET = 'aapnamakhana_demo_secret_2025';

const wishlists = {};

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
  const ids = wishlists[req.user.id] || [];
  const items = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  res.json({ items, count: items.length });
});

router.post('/add', auth, (req, res) => {
  const { productId } = req.body;
  if (!wishlists[req.user.id]) wishlists[req.user.id] = [];
  if (!wishlists[req.user.id].includes(productId)) {
    wishlists[req.user.id].push(productId);
  }
  res.json({ message: 'Added to wishlist', count: wishlists[req.user.id].length });
});

router.delete('/remove/:productId', auth, (req, res) => {
  if (!wishlists[req.user.id]) wishlists[req.user.id] = [];
  wishlists[req.user.id] = wishlists[req.user.id].filter(id => id !== Number(req.params.productId));
  res.json({ message: 'Removed from wishlist' });
});

module.exports = router;
