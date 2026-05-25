const express = require('express');
const router = express.Router();
const { accaProducts, cimaProducts } = require('../data/products');

// GET /api/products/acca
router.get('/acca', (req, res) => {
  const { category, q } = req.query;
  let results = accaProducts;
  if (category && category !== 'all') {
    results = results.filter(p => p.category === category);
  }
  if (q) {
    const query = q.toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );
  }
  res.json({ success: true, count: results.length, data: results });
});

// GET /api/products/cima
router.get('/cima', (req, res) => {
  const { category } = req.query;
  let results = cimaProducts;
  if (category && category !== 'all') {
    results = results.filter(p => p.category === category);
  }
  res.json({ success: true, count: results.length, data: results });
});

// GET /api/products/acca/:id
router.get('/acca/:id', (req, res) => {
  const product = accaProducts.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

// GET /api/products/cima/:id
router.get('/cima/:id', (req, res) => {
  const product = cimaProducts.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

module.exports = router;
