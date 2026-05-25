const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  const { error } = await supabase.from('contacts').insert({
    name,
    email,
    phone:   phone   || '',
    subject: subject || '',
    message,
    created_at: new Date().toISOString(),
  });

  if (error) console.error('❌ Contact insert error:', error.message);
  else console.log('📧 Contact saved:', { name, email });

  // Always respond positively
  res.json({
    success: true,
    message: 'Message received! We will reply within 1 hour on WhatsApp.',
    whatsappUrl: `https://wa.me/923218488802?text=Hi, my name is ${encodeURIComponent(name)}. ${encodeURIComponent(message)}`,
  });
});

module.exports = router;
