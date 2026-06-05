// Test Brevo REST API - uses .env for credentials
require('dotenv').config();

async function test() {
  console.log('Testing Brevo REST API...');

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Systematics Education', email: 'madiha@systematics.com.pk' },
      to: [{ email: 'madiha@systematics.com.pk' }],
      subject: '✅ Test - Order Notifications Working!',
      htmlContent: '<h2>🎉 Email notifications are working!</h2><p>This is a test from Systematics Education via Brevo.</p>',
    }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log('✅ Email sent!', data);
  } else {
    console.error('❌ Error:', data);
  }
}

test();
