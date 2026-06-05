/**
 * Email Notification Service for Systematics Education
 * Uses Brevo REST API (HTTP-based) — works on Vercel
 * Falls back to Nodemailer SMTP for local development
 */

const nodemailer = require('nodemailer');

let smtpTransporter = null;

/**
 * Send email via Brevo REST API (HTTP — works on Vercel)
 */
async function sendViaBrevo(to, subject, html) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return null;

  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'madiha@systematics.com.pk';
  const senderName = process.env.BREVO_SENDER_NAME || 'Systematics Education';

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Brevo API error: ${res.status}`);
  }

  return data.messageId;
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
 * Tries Brevo first (HTTP, works on Vercel), falls back to SMTP (local dev)
 */
async function sendEmail(to, subject, html) {
  try {
    // Method 1: Brevo REST API (HTTP — works on Vercel)
    if (process.env.BREVO_API_KEY) {
      const messageId = await sendViaBrevo(to, subject, html);
      console.log(`📧 Email sent to ${to} via Brevo — ID: ${messageId}`);
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
