// Quick SMTP test script - trying port 587 (STARTTLS)
require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  console.log('Testing SMTP on port 587 (STARTTLS)...');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('User:', process.env.SMTP_USER);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000, // 10s timeout
    socketTimeout: 10000,
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful on port 587!');

    const info = await transporter.sendMail({
      from: `"Systematics Education" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: '✅ Test Email - Systematics Education',
      html: '<h2>Email is working!</h2><p>If you see this, your SMTP setup is correct.</p>',
    });

    console.log('✅ Test email sent! Message ID:', info.messageId);
    console.log('Check your inbox (and Junk folder)');
  } catch (err) {
    console.error('❌ Port 587 Error:', err.message);
    
    // Also try port 26 (alternate SMTP port used by some hosts)
    console.log('\nTrying port 26...');
    try {
      const t2 = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 26,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        connectionTimeout: 10000,
        socketTimeout: 10000,
      });
      await t2.verify();
      console.log('✅ Port 26 works!');
      const info = await t2.sendMail({
        from: `"Systematics Education" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: '✅ Test Email - Systematics Education',
        html: '<h2>Email is working!</h2><p>Port 26 works. Your SMTP setup is correct.</p>',
      });
      console.log('✅ Test email sent! Message ID:', info.messageId);
    } catch (err2) {
      console.error('❌ Port 26 Error:', err2.message);
      console.log('\n❌ All ports failed. SMTP may be blocked by your network/ISP.');
    }
  }
}

test();
