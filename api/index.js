const express = require('express');
const cors = require('cors');

const authRoutes = require('../backend/routes/auth');
const productRoutes = require('../backend/routes/products');
const cartRoutes = require('../backend/routes/cart');
const wishlistRoutes = require('../backend/routes/wishlist');
const orderRoutes = require('../backend/routes/orders');
const adminRoutes = require('../backend/routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AapnaMakhana API is running' });
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
