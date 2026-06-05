/**
 * Email Notification Service for Systematics Education
 * Uses Brevo (HTTP-based) — works on Vercel, no DNS changes needed
 * Falls back to Nodemailer SMTP for local development
 */

const Brevo = require('@getbrevo/brevo');
const nodemailer = require('nodemailer');

let brevoClient = null;
let smtpTransporter = null;

/**
 * Get Brevo API client (HTTP-based, works on Vercel)
 */
function getBrevo() {
  if (!brevoClient && process.env.BREVO_API_KEY) {
    brevoClient = new Brevo.TransactionalEmailsApi();
    brevoClient.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    console.log('📧 Brevo email client ready');
  }
  return brevoClient;
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
    // Method 1: Brevo (HTTP-based — works on Vercel)
    const brevo = getBrevo();
    if (brevo) {
      const senderEmail = process.env.BREVO_SENDER_EMAIL || 'madiha@systematics.com.pk';
      const senderName = process.env.BREVO_SENDER_NAME || 'Systematics Education';

      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.sender = { name: senderName, email: senderEmail };
      sendSmtpEmail.to = [{ email: to }];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = html;

      const result = await brevo.sendTransacEmail(sendSmtpEmail);
      console.log(`📧 Email sent to ${to} via Brevo — ID: ${result.body.messageId}`);
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
