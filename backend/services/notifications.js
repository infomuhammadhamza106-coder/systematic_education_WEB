/**
 * Email Notification Service for Systematics Education
 * Uses Nodemailer with custom domain SMTP
 */

const nodemailer = require('nodemailer');

// Create reusable transporter (lazy-initialized)
let transporter = null;

function getTransporter() {
  if (!transporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.warn('⚠️  Email not configured — missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env');
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: parseInt(SMTP_PORT || '587', 10) === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    console.log(`📧 Email transporter ready (${SMTP_USER} via ${SMTP_HOST})`);
  }

  return transporter;
}

/**
 * Send an email (fire-and-forget, never throws)
 * @param {string} to       - Recipient email address
 * @param {string} subject  - Email subject line
 * @param {string} html     - HTML email body
 * @returns {Promise<boolean>} - true if sent successfully
 */
async function sendEmail(to, subject, html) {
  try {
    const transport = getTransporter();
    if (!transport) {
      console.warn(`📧 Skipped email to ${to} — SMTP not configured`);
      return false;
    }

    const info = await transport.sendMail({
      from: `"Systematics Education" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to} — ID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
    return false;
  }
}

module.exports = { sendEmail };
