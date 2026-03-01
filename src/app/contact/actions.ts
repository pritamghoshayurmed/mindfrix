"use server";

import { resend } from "@/lib/resend";

const WEBHOOK_URL =
  "https://hook.eu1.make.com/nm93wshb9jwrx1b4r68a52j7n4legq6a";

export interface ContactFormData {
  businessName: string;
  founderName: string;
  phone: string;
  email: string;
  websiteLinks: string;
  businessIndustry: string;
  yearsInBusiness: string;
  lastMonthRevenue: string;
  monthlyMarketingSpend: string;
  monthlyCustomers: string;
  mainCustomerSource: string;
  salesSystem: string[];
  meetingDate: string;
}

function buildConfirmationEmail(data: ContactFormData): string {
  const meetingFormatted = data.meetingDate
    ? new Date(data.meetingDate).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBD";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #141414; border: 1px solid #222; border-radius: 16px; padding: 40px 32px; }
    .logo { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .tagline { color: #888; font-size: 14px; margin-bottom: 32px; }
    h1 { color: #fff; font-size: 22px; margin: 0 0 8px; }
    .greeting { color: #ccc; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
    .details-box { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .details-box h3 { color: #fff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px; }
    .detail-table { width: 100%; border-collapse: collapse; }
    .detail-row td { padding: 8px 0; border-bottom: 1px solid #222; vertical-align: top; }
    .detail-row:last-child td { border-bottom: none; }
    .detail-label { color: #888; font-size: 13px; width: 50%; }
    .detail-value { color: #fff; font-size: 13px; font-weight: 500; text-align: right; width: 50%; }
    .highlight-box { background: linear-gradient(135deg, #1a1a2e, #16213e); border: 1px solid #2a2a4a; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; text-align: center; }
    .highlight-box .date { color: #7c8aff; font-size: 18px; font-weight: 600; }
    .highlight-box .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .note { color: #888; font-size: 13px; line-height: 1.6; margin-bottom: 32px; }
    .footer { text-align: center; color: #555; font-size: 12px; margin-top: 32px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="logo">MindFrix</div>
      <div class="tagline">Brand Growth Partners</div>

      <h1>We've received your application! 🎉</h1>
      <p class="greeting">
        Hi <strong style="color:#fff">${data.founderName}</strong>,<br /><br />
        Thank you for reaching out to MindFrix. We've received your details for
        <strong style="color:#fff">${data.businessName}</strong> and our team is already reviewing your application.
      </p>

      <div class="highlight-box">
        <div class="label">Your Meeting Date</div>
        <div class="date">${meetingFormatted}</div>
      </div>

      <div class="details-box">
        <h3>Your Submission Summary</h3>
        <table class="detail-table">
          <tr class="detail-row">
            <td class="detail-label">Industry</td>
            <td class="detail-value">${data.businessIndustry}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Years in Business</td>
            <td class="detail-value">${data.yearsInBusiness}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Monthly Revenue</td>
            <td class="detail-value">₹${data.lastMonthRevenue}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Marketing Spend</td>
            <td class="detail-value">₹${data.monthlyMarketingSpend}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Monthly Customers</td>
            <td class="detail-value">${data.monthlyCustomers}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Main Customer Source</td>
            <td class="detail-value">${data.mainCustomerSource}</td>
          </tr>
          <tr class="detail-row">
            <td class="detail-label">Sales Systems</td>
            <td class="detail-value">${data.salesSystem.join(", ")}</td>
          </tr>
        </table>
      </div>

      <p class="note">
        Our team will reach out to you shortly via WhatsApp or email to confirm your meeting slot.
        If you have any questions in the meantime, simply reply to this email.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} MindFrix. All rights reserved.
    </div>
  </div>
</body>
</html>`;
}

function normalizePhone(raw: string): number {
  // Strip all spaces and non-digit characters except leading +
  const stripped = raw.replace(/\s+/g, "").replace(/[^\d+]/g, "");

  let digits: string;

  if (stripped.startsWith("+91")) {
    digits = "91" + stripped.slice(3);
  } else if (stripped.startsWith("91") && stripped.length === 12) {
    digits = stripped;
  } else {
    // Assume bare 10-digit number
    digits = "91" + stripped.replace(/^\+/, "");
  }

  return Number(digits);
}

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = { ...data, phone: normalizePhone(data.phone) };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Submission failed (status ${response.status}). Please try again.`,
      };
    }

    // Send confirmation email via Resend (fire-and-forget, don't block the user)
    resend.emails.send({
      from: "MindFrix <contact@mindfrix.com>",
      to: data.email,
      subject: `We've received your application, ${data.founderName}! — MindFrix`,
      html: buildConfirmationEmail(data),
    }).catch((err) => {
      console.error("Failed to send confirmation email:", err);
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
