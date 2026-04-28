import crypto from "crypto";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const {
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "587",
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM_NAME = "TheDummyTickets",
  MAIL_FROM_ADDRESS,
  COMPANY_EMAIL,
} = process.env;

function createTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/** Unique order id: TDT-YYYYMMDD-XXXXXX (alphanumeric, collision-resistant) */
function generateOrderId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `TDT-${y}${m}${day}-${rand}`;
}

function escapeHtml(s) {
  if (s == null || s === "") return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function serviceLabel(service) {
  if (service === "both") return "Flight + Hotel";
  if (service === "hotel") return "Hotel booking";
  return "Flight ticket";
}

const PURPOSE_LABELS = {
  visa: "Visa application",
  immigration: "Immigration",
  proof: "Proof of return",
  passport: "Passport renewal",
  extension: "Visa extension",
};

function purposeLabel(purpose) {
  return PURPOSE_LABELS[purpose] || purpose || "—";
}

/** Matches public/logo/ — embedded in emails via CID (no hotlinking) */
const PARTNER_AIRLINE_ASSETS = [
  ["air-india.png", "Air India"],
  ["emirates.jpeg", "Emirates"],
  ["qatar-airways.png", "Qatar Airways"],
  ["british-airways.png", "British Airways"],
  ["klm.png", "KLM"],
  ["canada.png", "Air Canada"],
  ["thai.png", "Thai Airways"],
  ["egypt-air.png", "EgyptAir"],
  ["garuda.jpeg", "Garuda Indonesia"],
];

function mimeForFile(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

function getPublicSiteBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://thedummytickets.com";
}

/**
 * Inline images as MIME attachments so clients load them without fetching URLs.
 * Falls back to absolute URLs if files are not on disk (e.g. some serverless deploys).
 * @returns {{ attachments: import('nodemailer').Attachment[], cids: { logo: string | null, paymentQr: string | null, airline: (string|null)[] }, baseUrl: string }}
 */
function getMailImageAttachments() {
  const baseUrl = getPublicSiteBaseUrl();
  const publicDir = path.join(process.cwd(), "public");
  const attachments = [];
  /** @type {{ logo: string | null, paymentQr: string | null, airline: (string|null)[] }} */
  const cids = { logo: null, paymentQr: null, airline: [] };

  const logoPath = path.join(publicDir, "logo-final.png");
  try {
    if (fs.existsSync(logoPath)) {
      const cid = "brandlogo@eml.thedummytickets";
      attachments.push({
        filename: "logo-final.png",
        content: fs.readFileSync(logoPath),
        contentType: "image/png",
        cid,
        contentDisposition: "inline",
      });
      cids.logo = cid;
    }
  } catch (e) {
    console.error("Email: could not read logo-final.png", e);
  }

  const paymentQrPath = path.join(publicDir, "payment-qr.png");
  try {
    if (fs.existsSync(paymentQrPath)) {
      const cid = "paymentqr@eml.thedummytickets";
      attachments.push({
        filename: "payment-qr.png",
        content: fs.readFileSync(paymentQrPath),
        contentType: "image/png",
        cid,
        contentDisposition: "inline",
      });
      cids.paymentQr = cid;
    }
  } catch (e) {
    console.error("Email: could not read payment-qr.png", e);
  }

  PARTNER_AIRLINE_ASSETS.forEach(([file], index) => {
    cids.airline[index] = null;
    const filePath = path.join(publicDir, "logo", file);
    try {
      if (fs.existsSync(filePath)) {
        const cid = `al${index}@eml.thedummytickets`;
        attachments.push({
          filename: file,
          content: fs.readFileSync(filePath),
          contentType: mimeForFile(file),
          cid,
          contentDisposition: "inline",
        });
        cids.airline[index] = cid;
      }
    } catch (e) {
      console.error(`Email: could not read logo/${file}`, e);
    }
  });

  return { attachments, cids, baseUrl };
}

function partnerAirlineLogosHtml(cids, baseUrl) {
  const rows = [];
  for (let i = 0; i < PARTNER_AIRLINE_ASSETS.length; i += 3) {
    const chunk = PARTNER_AIRLINE_ASSETS.slice(i, i + 3);
    const tds = chunk
      .map(([file, alt], j) => {
        const idx = i + j;
        const cid = cids.airline[idx];
        const src = cid
          ? `cid:${cid}`
          : `${baseUrl}/logo/${encodeURI(file)}`;
        return `<td style="padding:10px 8px;text-align:center;width:33%;vertical-align:middle;">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" style="max-height:28px;max-width:100px;width:auto;height:auto;display:inline-block;vertical-align:middle;" />
          </td>`;
      })
      .join("");
    rows.push(`<tr>${tds}</tr>`);
  }
  return `
          <tr>
            <td style="padding:20px 28px 8px;border-top:1px solid #f4f4f5;background-color:#fafafa;">
              <p style="margin:0 0 12px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;text-align:center;">Sample tickets — airlines we support</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:100%;">
                ${rows.join("")}
              </table>
            </td>
          </tr>`;
}

function passengerDisplayName(p) {
  const t = (p.title && String(p.title).trim()) || "Mr";
  return `${t} ${p.firstName} ${p.lastName}`.trim();
}

function passengerListHtml(passengers) {
  return passengers
    .map(
      (p, i) => {
        const nationalityHtml = p.nationality
          ? `<span style="display:block;margin-top:2px;font-size:12px;font-weight:500;color:#0f766e;">${escapeHtml(p.nationality)}</span>`
          : "";
        return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px;width:40%">${passengers.length > 1 ? `Passenger ${i + 1}` : "Passenger"}</td>
          <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:600">${escapeHtml(passengerDisplayName(p))}${nationalityHtml}</td>
        </tr>`;
      }
    )
    .join("");
}

function whatsappFull(data) {
  const cc = (data.whatsappCountryCode && String(data.whatsappCountryCode).trim()) || "";
  const num = (data.whatsapp && String(data.whatsapp).trim()) || "";
  const combined = [cc, num].filter(Boolean).join(" ").trim();
  return combined || num || "—";
}

function buildCustomerHtml(data, cids, baseUrl) {
  const { orderId, passengers, email, service, trip, purpose } = data;
  const logoSrc = cids.logo ? `cid:${cids.logo}` : `${baseUrl}/logo-final.png`;
  const logoImg = `<img src="${escapeHtml(logoSrc)}" alt="The Dummy Tickets" width="200" style="display:block;margin:0 auto 16px;max-height:52px;width:auto;height:auto;" />`;
  const primaryName = escapeHtml(passengerDisplayName(passengers[0]));
  const svc = serviceLabel(service);
  const paymentQrSrc = cids.paymentQr
    ? `cid:${cids.paymentQr}`
    : `${baseUrl}/payment-qr.png`;
  const tripRow = trip
    ? `<tr><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Trip type</td><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(trip)}</td></tr>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;border:1px solid #e4e4e7;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#0d9488,#14b8a6);"></td>
          </tr>
          <tr>
            <td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #f4f4f5;">
              ${logoImg}
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">Order confirmation</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;">
              <p style="margin:0 0 8px;font-size:15px;color:#18181b;line-height:1.5;">Hello ${primaryName},</p>
              <p style="margin:0 0 24px;font-size:14px;color:#52525b;line-height:1.65;">
                Thank you for choosing TheDummyTickets. Your request is confirmed. We are preparing your <strong style="color:#0f766e;font-weight:600;">${escapeHtml(svc)}</strong> for <strong style="color:#18181b;">${passengers.length}</strong> passenger${passengers.length > 1 ? "s" : ""}. Delivery is typically within <strong style="color:#18181b;">10–30 minutes</strong>.
              </p>
              <div style="background-color:#f0fdfa;border:1px solid #ccfbf1;border-radius:6px;padding:16px 20px;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#0d9488;">Your order ID</p>
                <p style="margin:0;font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace;font-size:20px;font-weight:700;letter-spacing:0.04em;color:#134e4a;">${escapeHtml(orderId)}</p>
                <p style="margin:10px 0 0;font-size:12px;color:#64748b;line-height:1.5;">Quote this ID in WhatsApp or email for faster support.</p>
              </div>
              <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a1a1aa;">Order summary</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:8px;">
                ${passengerListHtml(passengers)}
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Service</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:600">${escapeHtml(svc)}</td>
                </tr>
                ${tripRow}
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Purpose</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(purposeLabel(purpose))}</td>
                </tr>
                ${flightRows(data)}
                ${hotelRows(data)}
              </table>
              <div style="margin-top:24px;padding:16px;background-color:#fafafa;border-radius:6px;border:1px solid #f4f4f5;">
                <p style="margin:0;font-size:13px;color:#52525b;line-height:1.6;">
                  <strong style="color:#18181b;">Next step:</strong> We will send your documents to <strong style="color:#0d9488;">${escapeHtml(email)}</strong> and your WhatsApp number on file.
                </p>
              </div>
              <div style="margin-top:16px;padding:18px;background-color:#fffbeb;border:1px solid #fde68a;border-radius:8px;text-align:center;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#a16207;">Payment QR</p>
                <p style="margin:0 0 12px;font-size:13px;color:#713f12;line-height:1.5;">
                  Scan this QR to complete payment. After paying, share your screenshot on WhatsApp with Order ID <strong>${escapeHtml(orderId)}</strong>.
                </p>
                <img src="${escapeHtml(paymentQrSrc)}" alt="UPI payment QR code for TheDummyTickets" width="220" style="display:block;margin:0 auto 10px;border-radius:8px;border:1px solid #f5e7b7;max-width:100%;height:auto;" />
                <p style="margin:0;font-size:12px;color:#a16207;">Need help? WhatsApp <strong style="color:#18181b;">+91 97735 96446</strong></p>
              </div>
            </td>
          </tr>
          ${partnerAirlineLogosHtml(cids, baseUrl)}
          <tr>
            <td style="padding:24px 32px;background-color:#fafafa;border-top:1px solid #f4f4f5;">
              <p style="margin:0;font-size:12px;color:#71717a;text-align:center;line-height:1.6;">
                Questions? Reply to this message or WhatsApp <strong style="color:#18181b;">+91 97735 96446</strong><br/>
                <span style="color:#a1a1aa;">thedummytickets.com</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#d4d4d8;">© ${new Date().getFullYear()} TheDummyTickets. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCompanyHtml(data, cids, baseUrl) {
  const {
    orderId, passengers, email, service, trip, purpose,
    origin, destination, departDate, returnDate,
    hotelCity, checkIn, checkOut,
  } = data;

  const logoSrc = cids.logo ? `cid:${cids.logo}` : `${baseUrl}/logo-final.png`;
  const logoImg = `<img src="${escapeHtml(logoSrc)}" alt="The Dummy Tickets" width="160" style="display:block;margin-bottom:12px;max-height:44px;width:auto;height:auto;opacity:0.95;" />`;

  const rows = [
    tableRow("Order ID", orderId, true),
    ...passengers.flatMap((p, i) => {
      const labelPrefix = passengers.length > 1 ? `Passenger ${i + 1}` : "Passenger";
      return [
        tableRow(`${labelPrefix} First name`, p.firstName || "—"),
        tableRow(`${labelPrefix} Last name`, p.lastName || "—"),
        tableRow(`${labelPrefix} Nationality`, p.nationality || "—"),
      ];
    }),
    tableRow("Email", email),
    tableRow("WhatsApp", whatsappFull(data)),
    tableRow("Service", serviceLabel(service)),
    ...(trip ? [tableRow("Trip type", trip)] : []),
    tableRow("Purpose", purposeLabel(purpose)),
    ...(origin ? [tableRow("From", origin)] : []),
    ...(destination ? [tableRow("To", destination)] : []),
    ...(departDate ? [tableRow("Departure", departDate)] : []),
    ...(returnDate ? [tableRow("Return", returnDate)] : []),
    ...(hotelCity ? [tableRow("Hotel city", hotelCity)] : []),
    ...(checkIn ? [tableRow("Check-in", checkIn)] : []),
    ...(checkOut ? [tableRow("Check-out", checkOut)] : []),
    ...multiCityRows(data),
    ...hotelStayRows(data),
  ].join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:8px;border:1px solid #e4e4e7;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:#18181b;">
              ${logoImg}
              <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#a1a1aa;">New booking</p>
              <p style="margin:8px 0 0;font-family:ui-monospace,SFMono-Regular,monospace;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">${escapeHtml(orderId)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;background:#0d9488;height:3px;"></td>
          </tr>
          <tr>
            <td style="padding:24px 28px 32px;">
              <p style="margin:0 0 16px;font-size:13px;color:#52525b;">${passengers.length} passenger${passengers.length > 1 ? "s" : ""} · ${escapeHtml(serviceLabel(service))}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #f4f4f5;border-radius:6px;overflow:hidden;">
                ${rows}
              </table>
              <p style="margin:20px 0 0;font-size:12px;color:#a1a1aa;">Reply-to is set to customer email for one-click response.</p>
            </td>
          </tr>
          ${partnerAirlineLogosHtml(cids, baseUrl)}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function flightRows(d) {
  const flights = Array.isArray(d.multiCityFlights) ? d.multiCityFlights : [];
  if (flights.length) {
    return flights
      .map(
        (f, i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Flight ${i + 1}</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(f.origin || "—")} → ${escapeHtml(f.destination || "—")} (${escapeHtml(f.departDate || "—")})</td>
    </tr>`
      )
      .join("");
  }
  if (!d.origin) return "";
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Route</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.origin)} → ${escapeHtml(d.destination)}</td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Departure</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.departDate)}</td>
    </tr>
    ${d.returnDate ? `<tr><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Return</td><td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.returnDate)}</td></tr>` : ""}`;
}

function hotelRows(d) {
  const stays = Array.isArray(d.hotelStays) ? d.hotelStays : [];
  if (stays.length) {
    return stays
      .map(
        (h, i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Hotel ${i + 1}</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(h.city || "—")} | ${escapeHtml(h.checkIn || "—")} to ${escapeHtml(h.checkOut || "—")}</td>
    </tr>`
      )
      .join("");
  }
  if (!d.hotelCity) return "";
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Hotel city</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.hotelCity)}</td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Check-in</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.checkIn)}</td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px">Check-out</td>
      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:500">${escapeHtml(d.checkOut)}</td>
    </tr>`;
}

function tableRow(label, value, highlight) {
  const v = escapeHtml(value);
  const bg = highlight ? "background-color:#f0fdfa;" : "";
  return `<tr style="${bg}">
    <td style="padding:12px 16px;border-bottom:1px solid #f4f4f5;color:#71717a;font-size:13px;width:36%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #f4f4f5;color:#18181b;font-size:14px;font-weight:${highlight ? "700" : "600"};font-family:${highlight ? "ui-monospace,SFMono-Regular,monospace" : "inherit"};letter-spacing:${highlight ? "0.02em" : "0"};">${v}</td>
  </tr>`;
}

function multiCityRows(data) {
  const flights = Array.isArray(data.multiCityFlights) ? data.multiCityFlights : [];
  return flights.flatMap((f, i) => [
    tableRow(`Flight ${i + 1} From`, f?.origin || "—"),
    tableRow(`Flight ${i + 1} To`, f?.destination || "—"),
    tableRow(`Flight ${i + 1} Date`, f?.departDate || "—"),
  ]);
}

function hotelStayRows(data) {
  const stays = Array.isArray(data.hotelStays) ? data.hotelStays : [];
  return stays.flatMap((h, i) => [
    tableRow(`Hotel ${i + 1} City`, h?.city || "—"),
    tableRow(`Hotel ${i + 1} Check-in`, h?.checkIn || "—"),
    tableRow(`Hotel ${i + 1} Check-out`, h?.checkOut || "—"),
  ]);
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { passengers, email } = data;

    if (!passengers?.length || !passengers[0].firstName || !passengers[0].lastName || !email) {
      return NextResponse.json(
        { error: "At least one passenger (first & last name) and email are required." },
        { status: 400 }
      );
    }

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("SMTP credentials not configured in .env.local");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support via WhatsApp." },
        { status: 503 }
      );
    }

    const orderId = generateOrderId();
    const payload = { ...data, orderId };

    const { attachments, cids, baseUrl } = getMailImageAttachments();

    const transporter = createTransporter();
    const fromField = `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS || SMTP_USER}>`;
    const primaryName = `${passengers[0].firstName} ${passengers[0].lastName}`;

    await Promise.all([
      transporter.sendMail({
        from: fromField,
        to: email,
        subject: `Order ${orderId} confirmed — TheDummyTickets`,
        html: buildCustomerHtml(payload, cids, baseUrl),
        attachments,
      }),
      transporter.sendMail({
        from: fromField,
        to: COMPANY_EMAIL || SMTP_USER,
        subject: `[${orderId}] New booking — ${primaryName} (${passengers.length} pax)`,
        html: buildCompanyHtml(payload, cids, baseUrl),
        replyTo: email,
        attachments,
      }),
    ]);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
