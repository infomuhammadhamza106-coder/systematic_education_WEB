const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'systematics2025';
const ADMIN_TOKEN    = 'se-admin-token-2025';

// Map DB snake_case → camelCase for frontend
const mapOrder = (row) => ({
  orderId:         row.order_id,
  customerName:    row.customer_name,
  email:           row.email,
  phone:           row.phone,
  city:            row.city,
  paymentMethod:   row.payment_method,
  items:           row.items,
  subtotal:        parseFloat(row.subtotal),
  deliveryCharge:  parseFloat(row.delivery_charge),
  grandTotal:      parseFloat(row.grand_total),
  bankTransferRef: row.bank_transfer_ref || '',
  trackingNumber:  row.tracking_number   || '',
  status:          row.status,
  createdAt:       row.created_at,
  updatedAt:       row.updated_at,
});

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: ADMIN_TOKEN });
  }
  return res.status(401).json({ success: false, message: 'Invalid password.' });
});

// Auth middleware
router.use((req, res, next) => {
  if (req.headers['x-admin-token'] !== ADMIN_TOKEN) {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
  next();
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, orders: (data || []).map(mapOrder) });
});

// GET /api/admin/orders/:id
router.get('/orders/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', req.params.id)
    .single();

  if (error || !data) return res.status(404).json({ success: false, message: 'Order not found.' });
  res.json({ success: true, order: mapOrder(data) });
});

// PATCH /api/admin/orders/:id/status
router.patch('/orders/:id/status', async (req, res) => {
  const VALID = ['Pending', 'Payment Received', 'Ready to Ship', 'Dispatched', 'Cancelled'];
  const { status, trackingNumber } = req.body;

  if (!VALID.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const updateData = { status, updated_at: new Date().toISOString() };
  if (trackingNumber) updateData.tracking_number = trackingNumber;

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('order_id', req.params.id)
    .select()
    .single();

  if (error || !data) return res.status(404).json({ success: false, message: 'Order not found.' });

  console.log(`✅ Order ${req.params.id} → ${status}`);
  res.json({ success: true, order: mapOrder(data) });
});

// DELETE /api/admin/orders/:id
router.delete('/orders/:id', async (req, res) => {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('order_id', req.params.id);

  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, message: 'Order deleted.' });
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  const { data: orders, error } = await supabase.from('orders').select('status, grand_total');

  if (error) return res.status(500).json({ success: false, message: error.message });

  const all = orders || [];
  res.json({
    success: true,
    stats: {
      total:           all.length,
      pending:         all.filter(o => o.status === 'Pending').length,
      paymentReceived: all.filter(o => o.status === 'Payment Received').length,
      readyToShip:     all.filter(o => o.status === 'Ready to Ship').length,
      dispatched:      all.filter(o => o.status === 'Dispatched').length,
      revenue:         all.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + parseFloat(o.grand_total || 0), 0),
    },
  });
});

// GET /api/admin/contacts
router.get('/contacts', async (req, res) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, contacts: data || [] });
});

module.exports = router;
