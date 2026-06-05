/**
 * Email Notification Service for Systematics Education
 * Uses Resend (HTTP-based) — works on Vercel serverless
 * Falls back to Nodemailer SMTP for local development
 */

const { Resend } = require('resend');
const nodemailer = require('nodemailer');

let resendClient = null;
let smtpTransporter = null;

/**
 * Get the email sending method (Resend preferred, SMTP fallback)
 */
function getResend() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
    console.log('📧 Resend email client ready');
  }
  return resendClient;
}

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
 * Tries Resend first (works on Vercel), falls back to SMTP (local dev)
 */
async function sendEmail(to, subject, html) {
  try {
    // Method 1: Resend (HTTP-based — works on Vercel)
    const resend = getResend();
    if (resend) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const { data, error } = await resend.emails.send({
        from: `Systematics Education <${fromEmail}>`,
        to: [to],
        subject,
        html,
      });

      if (error) {
        console.error(`❌ Resend error to ${to}:`, error.message);
        return false;
      }
      console.log(`📧 Email sent to ${to} via Resend — ID: ${data.id}`);
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
