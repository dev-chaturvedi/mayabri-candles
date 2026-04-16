const nodemailer = require("nodemailer");

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
};

const formatMoney = (amount, currency = "INR") => {
  return `${currency.toUpperCase()} ${(amount / 100).toFixed(2)}`;
};

const buildOrderEmailHtml = ({ customerName, sessionId, items, amountTotal, currency, receiptUrl }) => {
  const rows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${formatMoney(
            item.totalAmount,
            currency
          )}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#2f2014;">
      <h2 style="margin:0 0 12px;">MayAbri Candles - Order Confirmation</h2>
      <p>Hi ${customerName || "there"},</p>
      <p>Thank you for your order. Your payment has been received successfully.</p>
      <p><strong>Order ID:</strong> ${sessionId}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 0;border-bottom:2px solid #ddd;">Item</th>
            <th style="text-align:center;padding:8px 0;border-bottom:2px solid #ddd;">Qty</th>
            <th style="text-align:right;padding:8px 0;border-bottom:2px solid #ddd;">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:16px;"><strong>Total Paid:</strong> ${formatMoney(
        amountTotal,
        currency
      )}</p>
      ${
        receiptUrl
          ? `<p><a href="${receiptUrl}" target="_blank" rel="noreferrer">View payment receipt</a></p>`
          : ""
      }
      <p style="margin-top:22px;">Regards,<br/>MayAbri Candles</p>
    </div>
  `;
};

const sendOrderConfirmationEmail = async (payload) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP config missing. Skipping order confirmation email.");
    return false;
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: payload.customerEmail,
    subject: `Order Confirmed - ${payload.sessionId}`,
    html: buildOrderEmailHtml(payload),
  });

  return true;
};

module.exports = { sendOrderConfirmationEmail };
