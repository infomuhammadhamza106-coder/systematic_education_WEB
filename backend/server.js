require('dotenv').config();
const express = require('express');
const cors    = require('cors');

// DB connection (initialises pool & tests connection)
require('./db');

const productRoutes = require('./routes/products');
const contactRoutes = require('./routes/contact');
const orderRoutes   = require('./routes/orders');
const adminRoutes   = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/contact',  contactRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/admin',    adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Systematics Education API running', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Systematics Education API  →  http://localhost:${PORT}`);
  console.log(`📚 Products  →  /api/products/acca`);
  console.log(`🛒 Orders    →  POST /api/orders`);
  console.log(`🔐 Admin     →  /api/admin/orders\n`);
});
