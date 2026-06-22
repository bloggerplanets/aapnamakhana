const express = require('express');
const { products, categories } = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  const { category, search, sort, minPrice, maxPrice } = req.query;
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }
  if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

  res.json({ products: filtered, total: filtered.length });
});

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get('/featured', (req, res) => {
  const featured = products.filter(p => p.tags.includes('bestseller') || p.tags.includes('trending'));
  res.json(featured.slice(0, 6));
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  res.json({ product, related });
});

module.exports = router;
