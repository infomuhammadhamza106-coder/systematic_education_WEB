/**
 * Email Notification Service for Systematics Education
 * Uses cPanel PHP endpoint (HTTP) for delivery
 */

/**
 * Send an email via cPanel PHP endpoint
 */
async function sendEmail(to, subject, html) {
  const endpoint = process.env.CPANEL_EMAIL_URL;
  const apiKey = process.env.CPANEL_EMAIL_KEY;

  if (!endpoint || !apiKey) {
    console.warn(`📧 Skipped email to ${to} — CPANEL_EMAIL_URL or CPANEL_EMAIL_KEY not set`);
    return false;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ to, subject, html }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      console.log(`📧 Email sent to ${to} via cPanel — ${data.message}`);
      return true;
    } else {
      console.error(`❌ Email failed to ${to}: ${data.error || res.status}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Email error to ${to}:`, err.message);
    return false;
  }
}

module.exports = { sendEmail };
