// Test Resend - sending to account owner email (allowed without domain verification)
const { Resend } = require('resend');

const resend = new Resend('re_TLzPRsxJ_8sCmo5sbqW58o7TY2xkCac6N');

async function test() {
  console.log('Testing Resend API to your Gmail...');
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Systematics Education <onboarding@resend.dev>',
      to: ['info.muhammadhamza106@gmail.com'],
      subject: '✅ Systematics Education - Order Email Test',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#4f46e5;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;">📚 Systematics Education</h1>
          </div>
          <div style="padding:24px;background:#fff;border:1px solid #e5e7eb;">
            <h2 style="color:#16a34a;">🎉 Email Notifications Working!</h2>
            <p>This confirms the Resend API is connected correctly.</p>
            <p><strong>Next step:</strong> Verify your domain <code>systematics.com.pk</code> in Resend to send to all customers.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('✅ Email sent to your Gmail!');
    console.log('Email ID:', data.id);
    console.log('Check info.muhammadhamza106@gmail.com');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

test();
