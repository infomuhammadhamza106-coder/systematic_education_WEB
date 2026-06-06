/**
 * Email Notification Service for Systematics Education
 * Uses cPanel PHP endpoint (HTTP) for reliable delivery
 * Falls back to Nodemailer SMTP for local development
 */

const nodemailer = require('nodemailer');

let smtpTransporter = null;

/**
 * Send email via cPanel PHP endpoint (HTTP — works on Vercel!)
 */
async function sendViaCpanel(to, subject, html) {
  const endpoint = process.env.CPANEL_EMAIL_URL;
  const apiKey = process.env.CPANEL_EMAIL_KEY;
  if (!endpoint || !apiKey) return null;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify({ to, subject, html }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || `cPanel email error: ${res.status}`);
  }

  return data.message;
}

/**
 * Get SMTP transporter (fallback for local dev)
 */
function getSMTP() {
  if (!smtpTransporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

    smtpTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: parseInt(SMTP_PORT || '587', 10) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    console.log(`📧 SMTP transporter ready (${SMTP_USER} via ${SMTP_HOST})`);
  }
  return smtpTransporter;
}

/**
 * Send an email (fire-and-forget, never throws)
 * Tries cPanel PHP first (HTTP, works on Vercel), falls back to SMTP (local dev)
 */
async function sendEmail(to, subject, html) {
  try {
    // Method 1: cPanel PHP endpoint (HTTP — works on Vercel)
    if (process.env.CPANEL_EMAIL_URL) {
      const result = await sendViaCpanel(to, subject, html);
      console.log(`📧 Email sent to ${to} via cPanel — ${result}`);
      return true;
    }

    // Method 2: SMTP (for local development)
    const transport = getSMTP();
    if (transport) {
      const info = await transport.sendMail({
        from: `"Systematics Education" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
      console.log(`📧 Email sent to ${to} via SMTP — ID: ${info.messageId}`);
      return true;
    }

    console.warn(`📧 Skipped email to ${to} — no email provider configured`);
    return false;
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
    return false;
  }
}

module.exports = { sendEmail };
