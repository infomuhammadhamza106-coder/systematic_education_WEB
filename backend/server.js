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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://systematic-education-web.vercel.app',
  'https://systematics.com.pk',
  'https://www.systematics.com.pk',
  (process.env.FRONTEND_URL || '').trim(),
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any vercel.app subdomain or listed origin
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
}));
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

// Debug: test email sending from deployed environment
app.get('/api/test-email', async (req, res) => {
  const { sendEmail } = require('./services/notifications');
  const cpanelUrl = process.env.CPANEL_EMAIL_URL || 'NOT SET';
  const cpanelKey = process.env.CPANEL_EMAIL_KEY ? 'SET (' + process.env.CPANEL_EMAIL_KEY.substring(0, 5) + '...)' : 'NOT SET';
  
  try {
    const result = await sendEmail(
      'madiha@systematics.com.pk',
      '✅ Vercel Deploy Test — ' + new Date().toISOString(),
      '<h2>Email from Vercel works!</h2><p>CPANEL_EMAIL_URL: ' + cpanelUrl + '</p>'
    );
    res.json({ 
      success: true, 
      emailResult: result,
      env: { CPANEL_EMAIL_URL: cpanelUrl, CPANEL_EMAIL_KEY: cpanelKey }
    });
  } catch (err) {
    res.json({ 
      success: false, 
      error: err.message,
      env: { CPANEL_EMAIL_URL: cpanelUrl, CPANEL_EMAIL_KEY: cpanelKey }
    });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Only start server when run directly (not on Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Systematics Education API  →  http://localhost:${PORT}`);
    console.log(`📚 Products  →  /api/products/acca`);
    console.log(`🛒 Orders    →  POST /api/orders`);
    console.log(`🔐 Admin     →  /api/admin/orders\n`);
  });
}

// Export for Vercel serverless
module.exports = app;
