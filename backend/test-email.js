// Test cPanel PHP email endpoint
async function test() {
  const url = 'https://systematics.com.pk/email-api/send.php';
  const apiKey = 'se-mail-key-8x7k2m9p4w';

  console.log('Testing cPanel email endpoint...\n');

  // Test 1: Send to madiha (owner)
  console.log('1. Sending to madiha@systematics.com.pk...');
  const res1 = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify({
      to: 'madiha@systematics.com.pk',
      subject: '✅ Order Alert Test - Systematics Education',
      html: '<h2>🎉 Email delivery working!</h2><p>This confirms that order alerts are being delivered to your inbox.</p>',
    }),
  });
  const data1 = await res1.json();
  console.log('Result:', data1);

  // Test 2: Send to Gmail (customer)
  console.log('\n2. Sending to Gmail (customer test)...');
  const res2 = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify({
      to: 'info.muhammadhamza106@gmail.com',
      subject: '✅ Customer Email Test - Systematics Education',
      html: '<h2>🎉 Customer emails working!</h2><p>This confirms customers will receive order confirmations.</p>',
    }),
  });
  const data2 = await res2.json();
  console.log('Result:', data2);
}

test();
