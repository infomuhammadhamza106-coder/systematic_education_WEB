const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

// POST /api/orders
router.post('/', async (req, res) => {
  const { items, customerName, email, phone, city, paymentMethod, bankTransferRef } = req.body;

  if (!items || !items.length || !customerName || !phone || !city) {
    return res.status(400).json({ success: false, message: 'Missing required order fields.' });
  }

  if (paymentMethod === 'bank' && !bankTransferRef?.trim()) {
    return res.status(400).json({ success: false, message: 'Transaction ID is required for bank transfer orders.' });
  }

  const subtotal       = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalKg        = items.reduce((kg,  item) => kg  + item.qty * 0.5, 0);
  const deliveryCharge = city.toLowerCase() === 'lahore' ? 300 : Math.ceil(350 * totalKg);
  const grandTotal     = subtotal + deliveryCharge;
  const orderId        = 'SE-' + Date.now();

  const { error } = await supabase.from('orders').insert({
    order_id:          orderId,
    customer_name:     customerName,
    email:             email || '',
    phone,
    city,
    payment_method:    paymentMethod || 'bank',
    bank_transfer_ref: paymentMethod === 'bank' ? (bankTransferRef?.trim() || '') : '',
    items,
    subtotal,
    delivery_charge:   deliveryCharge,
    grand_total:       grandTotal,
    status:            'Pending',
    created_at:        new Date().toISOString(),
  });

  if (error) {
    console.error('❌ Order insert error:', error.message);
    return res.status(500).json({ success: false, message: 'Could not save order. Please try WhatsApp.' });
  }

  console.log('🛒 Order saved:', orderId);

  const itemList = items.map(i => `${i.qty}× ${i.name}`).join(', ');
  const waMsg    = `Hi! I'd like to place an order.\nOrder ID: ${orderId}\nName: ${customerName}\nPhone: ${phone}\nCity: ${city}\nItems: ${itemList}\nTotal: Rs. ${grandTotal}`;

  res.json({
    success: true,
    message: `Order placed! Please transfer Rs. ${grandTotal} to Account: 0110 0020 0007 1137 (Systematics Education SMC-PVT LTD).`,
    order:   { orderId, customerName, email, phone, city, items, subtotal, deliveryCharge, grandTotal, status: 'Pending' },
    bankDetails: {
      accountName:   'Systematics Education (SMC-PVT) LTD',
      accountNumber: '0110 0020 0007 1137',
      bank:          'UBL (United Bank Limited)',
      iban:          'PK86UNIL0109000051137001',
      amount:        grandTotal,
    },
    whatsappUrl: `https://wa.me/923218488802?text=${encodeURIComponent(waMsg)}`,
  });
});

// PATCH /api/orders/:id/payment-ref
router.patch('/:id/payment-ref', async (req, res) => {
  const { bankTransferRef } = req.body;
  if (!bankTransferRef?.trim()) {
    return res.status(400).json({ success: false, message: 'Transfer reference is required.' });
  }

  const { error } = await supabase
    .from('orders')
    .update({ bank_transfer_ref: bankTransferRef.trim(), updated_at: new Date().toISOString() })
    .eq('order_id', req.params.id);

  if (error) {
    return res.status(500).json({ success: false, message: 'Could not save reference.' });
  }

  console.log(`💳 Payment ref saved for ${req.params.id}`);
  res.json({ success: true, message: 'Payment reference submitted! We will verify and confirm shortly.' });
});

module.exports = router;
