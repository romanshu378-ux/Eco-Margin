// EcoMargin — Professional HTML Email Templates
// src/templates/emailTemplates.js
'use strict'

/**
  * Generates Customer Confirmation Email HTML
  */
function getCustomerConfirmationTemplate({ customerName, leadId, product, date }) {
  const currentYear = new Date().getFullYear()
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }
    .header { background: linear-gradient(135deg, #065f46 0%, #059669 100%); padding: 30px; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
    .content { padding: 30px; line-height: 1.6; color: #cbd5e1; }
    .info-card { background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 20px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; }
    .info-label { color: #94a3b8; font-weight: 600; }
    .info-val { color: #10b981; font-weight: 700; }
    .btn { display: inline-block; background-color: #10b981; color: #0f172a; font-weight: 700; text-decoration: none; padding: 12px 24px; borderRadius: 6px; margin-top: 15px; }
    .footer { background-color: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ EcoMargin EV Infrastructure</h1>
    </div>
    <div class="content">
      <h2>Thank You for Reaching Out, ${customerName}!</h2>
      <p>We have successfully received your enquiry regarding <strong>${product || 'EV Charging Infrastructure'}</strong>. Our technical engineering team is reviewing your requirements and will get back to you within 24 business hours.</p>
      
      <div class="info-card">
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 10px; font-size: 16px;">Summary of Your Inquiry</div>
        <div style="margin-bottom: 6px;"><span class="info-label">Enquiry Reference ID:</span> <span class="info-val">#EM-${leadId || 'NEW'}</span></div>
        <div style="margin-bottom: 6px;"><span class="info-label">Requirement:</span> <span class="info-val">${product || 'AC / DC Charger Purchase'}</span></div>
        <div><span class="info-label">Submitted Date:</span> <span class="info-val">${date || new Date().toLocaleDateString('en-IN')}</span></div>
      </div>

      <p>If you have any urgent queries, feel free to reach out to our dedicated support team at <a href="mailto:support@ecomargin.com" style="color: #10b981;">support@ecomargin.com</a> or call our sales line at <strong>+91-8302313065</strong>.</p>
      
      <div style="text-align: center; margin-top: 25px;">
        <a href="https://www.ecomargin.in" class="btn">Explore Product Catalog</a>
      </div>
    </div>
    <div class="footer">
      © ${currentYear} EcoMargin Infrastructure Pvt. Ltd. | Shiv Colony, Tijara Phatak, Alwar, Rajasthan 301001<br>
      Leading OEM EV Charger Manufacturer & Turnkey EPC Contractor
    </div>
  </div>
</body>
</html>
  `
}

/**
  * Generates Admin Sales Notification Email HTML
  */
function getAdminNotificationTemplate({ name, company, phone, email, product, message, leadId, time }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
    .card { background-color: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 25px; max-width: 600px; margin: 0 auto; }
    .badge { background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    td { padding: 10px; border-bottom: 1px solid #334155; }
    .label { font-weight: 600; color: #94a3b8; width: 35%; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0; color: #38bdf8;">🔔 New Sales RFQ Enquiry #${leadId || ''}</h2>
      <span class="badge">NEW LEAD</span>
    </div>
    <p style="color: #cbd5e1; font-size: 14px;">A new B2B customer enquiry has been submitted on ecomargin.in.</p>
    
    <table>
      <tr><td class="label">Customer Name:</td><td style="font-weight: 700; color: #ffffff;">${name}</td></tr>
      <tr><td class="label">Company / Org:</td><td>${company || 'Individual / Not Specified'}</td></tr>
      <tr><td class="label">Work Email:</td><td><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
      <tr><td class="label">Phone Number:</td><td><a href="tel:${phone}" style="color: #10b981; font-weight: 700;">${phone}</a></td></tr>
      <tr><td class="label">Product Interest:</td><td style="color: #f59e0b; font-weight: 700;">${product || 'General EV Inquiry'}</td></tr>
      <tr><td class="label">Inquiry Message:</td><td>${message || 'No additional notes provided.'}</td></tr>
      <tr><td class="label">Received Time:</td><td>${time || new Date().toLocaleString()}</td></tr>
    </table>

    <div style="margin-top: 25px; text-align: center;">
      <a href="https://admin.ecomargin.in/leads" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 700; display: inline-block;">Open Admin Panel & Send Quotation</a>
    </div>
  </div>
</body>
</html>
  `
}

module.exports = {
  getCustomerConfirmationTemplate,
  getAdminNotificationTemplate,
}
