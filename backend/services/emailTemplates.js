/**
 * Email Templates for Systematics Education
 * Beautiful, branded HTML emails for order notifications
 */

const BRAND = {
  name: 'Systematics Education',
  color: '#4f46e5',
  colorDark: '#3730a3',
  colorLight: '#eef2ff',
  whatsapp: '0321 8488802',
  website: 'systematics.com.pk',
};

/**
 * Shared email wrapper with branding
 */
function emailWrapper(title, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.color},${BRAND.colorDark});padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">📚 ${BRAND.name}</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Pakistan's Official ACCA & CIMA Study Material Distributor</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 6px;color:#6b7280;font-size:12px;">WhatsApp: ${BRAND.whatsapp} | ${BRAND.website}</p>
              <p style="margin:0;color:#9ca3af;font-size:11px;">© ${new Date().getFullYear()} ${BRAND.name} (SMC-PVT) LTD. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Format items into an HTML table
 */
function itemsTable(items) {
  const rows = items.map(i => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f3;font-size:14px;color:#374151;">${i.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f3;font-size:14px;color:#6b7280;text-align:center;">${i.qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f3;font-size:14px;color:#374151;text-align:right;font-weight:600;">Rs. ${(i.price * i.qty).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin:16px 0;">
      <tr style="background:#f9fafb;">
        <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Item</th>
        <th style="padding:10px 12px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Qty</th>
        <th style="padding:10px 12px;text-align:right;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Amount</th>
      </tr>
      ${rows}
    </table>`;
}

/**
 * Order confirmation email for the CUSTOMER
 */
function orderConfirmationCustomer(order) {
  const { orderId, customerName, items, subtotal, deliveryCharge, grandTotal, paymentMethod, city } = order;
  const isCOD = paymentMethod === 'cod';

  const paymentSection = isCOD
    ? `<div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:14px 16px;margin-top:16px;">
         <p style="margin:0;font-size:14px;color:#92400e;font-weight:600;">💵 Cash on Delivery</p>
         <p style="margin:4px 0 0;font-size:13px;color:#a16207;">Pay Rs. ${grandTotal.toLocaleString()} when your books arrive.</p>
       </div>`
    : `<div style="background:${BRAND.colorLight};border:1px solid #c7d2fe;border-radius:8px;padding:14px 16px;margin-top:16px;">
         <p style="margin:0;font-size:14px;color:${BRAND.colorDark};font-weight:600;">🏦 Bank Transfer</p>
         <p style="margin:6px 0 2px;font-size:13px;color:#4338ca;">Bank: <strong>UBL — United Bank Limited</strong></p>
         <p style="margin:2px 0;font-size:13px;color:#4338ca;">Account: <strong style="font-family:monospace;">0110 0020 0007 1137</strong></p>
         <p style="margin:2px 0;font-size:13px;color:#4338ca;">Name: <strong>Systematics Education (SMC-PVT) LTD</strong></p>
         <p style="margin:2px 0;font-size:13px;color:#4338ca;">IBAN: <strong style="font-family:monospace;">PK86UNIL0109000051137001</strong></p>
       </div>`;

  const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#d1fae5;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:28px;">✅</div>
      <h2 style="margin:12px 0 4px;color:#111827;font-size:20px;">Order Confirmed!</h2>
      <p style="margin:0;color:#6b7280;font-size:14px;">Order ID: <strong style="color:${BRAND.color};">${orderId}</strong></p>
    </div>

    <p style="font-size:15px;color:#374151;line-height:1.6;">
      Hi <strong>${customerName}</strong>,<br/>
      Thank you for your order! Here's your order summary:
    </p>

    ${itemsTable(items)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Subtotal</td>
        <td style="padding:6px 0;font-size:14px;color:#374151;text-align:right;">Rs. ${subtotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Delivery (${city})</td>
        <td style="padding:6px 0;font-size:14px;color:#374151;text-align:right;">Rs. ${deliveryCharge.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:16px;color:#111827;font-weight:700;border-top:2px solid #e5e7eb;">Total</td>
        <td style="padding:8px 0;font-size:16px;color:${BRAND.color};font-weight:700;text-align:right;border-top:2px solid #e5e7eb;">Rs. ${grandTotal.toLocaleString()}</td>
      </tr>
    </table>

    ${paymentSection}

    <div style="margin-top:24px;text-align:center;">
      <a href="https://wa.me/923218488802?text=Hi!%20My%20order%20ID%20is%20${orderId}" target="_blank" 
         style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
        💬 Chat on WhatsApp
      </a>
    </div>

    <p style="margin-top:20px;font-size:13px;color:#9ca3af;text-align:center;">
      Questions? Reply to this email or WhatsApp us at ${BRAND.whatsapp}
    </p>
  `;

  return emailWrapper(`Order Confirmed - ${orderId}`, body);
}

/**
 * New order alert email for the OWNER
 */
function newOrderAlertOwner(order) {
  const { orderId, customerName, email, phone, city, address, items, subtotal, deliveryCharge, grandTotal, paymentMethod, bankTransferRef } = order;

  const body = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#fef3c7;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:28px;">🛒</div>
      <h2 style="margin:12px 0 4px;color:#111827;font-size:20px;">New Order Received!</h2>
      <p style="margin:0;color:#6b7280;font-size:14px;">Order ID: <strong style="color:${BRAND.color};">${orderId}</strong></p>
    </div>

    <!-- Customer Details -->
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:16px;">
      <h3 style="margin:0 0 10px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Customer Details</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;font-size:14px;color:#6b7280;width:100px;">Name</td><td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;">${customerName}</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Phone</td><td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;">${phone}</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Email</td><td style="padding:4px 0;font-size:14px;color:#111827;">${email || 'Not provided'}</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">City</td><td style="padding:4px 0;font-size:14px;color:#111827;">${city}</td></tr>
        <tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Address</td><td style="padding:4px 0;font-size:14px;color:#111827;">${address || 'Not provided'}</td></tr>
      </table>
    </div>

    <!-- Payment Info -->
    <div style="background:${paymentMethod === 'cod' ? '#fef3c7' : BRAND.colorLight};border:1px solid ${paymentMethod === 'cod' ? '#fcd34d' : '#c7d2fe'};border-radius:8px;padding:14px 16px;margin-bottom:16px;">
      <p style="margin:0;font-size:14px;font-weight:600;color:${paymentMethod === 'cod' ? '#92400e' : BRAND.colorDark};">
        Payment: ${paymentMethod === 'cod' ? '💵 Cash on Delivery' : '🏦 Bank Transfer'}
      </p>
      ${bankTransferRef ? `<p style="margin:4px 0 0;font-size:13px;color:#4338ca;">Transaction ID: <strong>${bankTransferRef}</strong></p>` : ''}
    </div>

    <!-- Items -->
    <h3 style="margin:0 0 4px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Order Items</h3>
    ${itemsTable(items)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Subtotal</td>
        <td style="padding:4px 0;font-size:14px;color:#374151;text-align:right;">Rs. ${subtotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Delivery</td>
        <td style="padding:4px 0;font-size:14px;color:#374151;text-align:right;">Rs. ${deliveryCharge.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:16px;color:#111827;font-weight:700;border-top:2px solid #e5e7eb;">Grand Total</td>
        <td style="padding:6px 0;font-size:16px;color:${BRAND.color};font-weight:700;text-align:right;border-top:2px solid #e5e7eb;">Rs. ${grandTotal.toLocaleString()}</td>
      </tr>
    </table>

    <div style="margin-top:20px;text-align:center;">
      <a href="https://wa.me/${phone.replace(/^0/, '92')}?text=Hi%20${encodeURIComponent(customerName)}!%20We%20received%20your%20order%20${orderId}." target="_blank"
         style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
        💬 WhatsApp Customer
      </a>
    </div>
  `;

  return emailWrapper(`🛒 New Order - ${orderId}`, body);
}

module.exports = { orderConfirmationCustomer, newOrderAlertOwner };
