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

function passengerListHtml(passengers) {
  return passengers
    .map(
      (p, i) =>
        `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
          <span style="font-size:13px;color:#94a3b8">${passengers.length > 1 ? `Passenger ${i + 1}` : "Passenger"}</span>
          <span style="font-size:13px;color:#1a2e3b;font-weight:600">${p.firstName} ${p.lastName}</span>
        </div>`
    )
    .join("");
}

function passengerTableRows(passengers) {
  return passengers
    .map(
      (p, i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;width:35%">${passengers.length > 1 ? `Passenger ${i + 1}` : "Passenger"}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;font-weight:600">${p.firstName} ${p.lastName}</td>
        </tr>`
    )
    .join("");
}

function buildCustomerHtml(data) {
  const { passengers, email, service, trip, purpose } = data;
  const primaryName = `${passengers[0].firstName} ${passengers[0].lastName}`;
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fffe;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
      <div style="background:#1a2e3b;padding:32px 24px;text-align:center">
        <img src="https://thedummytickets.com/logo.png" alt="TheDummyTickets" style="height:48px;margin-bottom:12px" />
        <p style="color:#94a3b8;margin:0;font-size:14px">Order Confirmation</p>
      </div>
      <div style="padding:32px 24px">
        <p style="font-size:16px;color:#1a2e3b;margin:0 0 8px">Hi <strong>${primaryName}</strong>,</p>
        <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0 0 24px">
          Thank you for your order! We've received your booking request for
          <strong style="color:#0d9488"> ${passengers.length} passenger${passengers.length > 1 ? "s" : ""}</strong>
          and our team is preparing your
          <strong style="color:#0d9488"> ${service === "both" ? "flight ticket + hotel booking" : service === "hotel" ? "hotel booking" : "flight ticket"}</strong>.
          You'll receive your verified document within <strong>10–30 minutes</strong>.
        </p>
        <div style="background:#fff;border-radius:12px;padding:20px;border:1px solid #e2e8f0;margin-bottom:24px">
          <h3 style="font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Your Order Summary</h3>
          ${passengerListHtml(passengers)}
          ${summaryRow("Service", service === "both" ? "Flight + Hotel" : service === "hotel" ? "Hotel Booking" : "Flight Ticket")}
          ${trip ? summaryRow("Trip Type", trip) : ""}
          ${summaryRow("Purpose", purpose)}
          ${flightRows(data)}
          ${hotelRows(data)}
        </div>
        <div style="background:#f0fdfa;border-radius:12px;padding:16px;border:1px solid #ccfbf1;text-align:center;margin-bottom:24px">
          <p style="margin:0;font-size:14px;color:#0f766e">
            <strong>What's next?</strong><br/>
            Our team will verify your details and send the ticket to <strong>${email}</strong> and your WhatsApp.
          </p>
        </div>
        <p style="font-size:13px;color:#94a3b8;margin:0;text-align:center">
          Questions? Reply to this email or WhatsApp us at <strong>+91 97735 96446</strong>
        </p>
      </div>
      <div style="background:#f1f5f9;padding:16px 24px;text-align:center">
        <p style="font-size:12px;color:#94a3b8;margin:0">© ${new Date().getFullYear()} TheDummyTickets · thedummytickets.com</p>
      </div>
    </div>`;
}

function buildCompanyHtml(data) {
  const {
    passengers, email, whatsapp, service, trip, purpose,
    origin, destination, departDate, returnDate,
    hotelCity, checkIn, checkOut,
  } = data;
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0d9488;padding:20px 24px;border-radius:12px 12px 0 0">
        <img src="https://thedummytickets.com/logo.png" alt="TheDummyTickets" style="height:36px;margin-bottom:8px;display:block" />
        <h2 style="color:#fff;margin:0;font-size:18px">New Booking — ${passengers.length} Passenger${passengers.length > 1 ? "s" : ""}</h2>
      </div>
      <div style="padding:24px;background:#fff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#334155">
          ${passengerTableRows(passengers)}
          ${tableRow("Email", email)}
          ${tableRow("WhatsApp", whatsapp)}
          ${tableRow("Service", service)}
          ${trip ? tableRow("Trip Type", trip) : ""}
          ${tableRow("Purpose", purpose)}
          ${origin ? tableRow("From", origin) : ""}
          ${destination ? tableRow("To", destination) : ""}
          ${departDate ? tableRow("Departure", departDate) : ""}
          ${returnDate ? tableRow("Return", returnDate) : ""}
          ${hotelCity ? tableRow("Hotel City", hotelCity) : ""}
          ${checkIn ? tableRow("Check-in", checkIn) : ""}
          ${checkOut ? tableRow("Check-out", checkOut) : ""}
        </table>
      </div>
    </div>`;
}

function summaryRow(label, value) {
  return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
    <span style="font-size:13px;color:#94a3b8">${label}</span>
    <span style="font-size:13px;color:#1a2e3b;font-weight:600">${value}</span>
  </div>`;
}

function flightRows(d) {
  if (!d.origin) return "";
  return `
    ${summaryRow("From → To", `${d.origin} → ${d.destination}`)}
    ${summaryRow("Departure", d.departDate)}
    ${d.returnDate ? summaryRow("Return", d.returnDate) : ""}`;
}

function hotelRows(d) {
  if (!d.hotelCity) return "";
  return `
    ${summaryRow("Hotel City", d.hotelCity)}
    ${summaryRow("Check-in", d.checkIn)}
    ${summaryRow("Check-out", d.checkOut)}`;
}

function tableRow(label, value) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;width:35%">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;font-weight:600">${value}</td>
  </tr>`;
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

    const transporter = createTransporter();
    const fromField = `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS || SMTP_USER}>`;
    const primaryName = `${passengers[0].firstName} ${passengers[0].lastName}`;

    await Promise.all([
      transporter.sendMail({
        from: fromField,
        to: email,
        subject: `Booking Confirmed — TheDummyTickets`,
        html: buildCustomerHtml(data),
      }),
      transporter.sendMail({
        from: fromField,
        to: COMPANY_EMAIL || SMTP_USER,
        subject: `New Order: ${primaryName} + ${passengers.length} pax — ${data.service}`,
        html: buildCompanyHtml(data),
        replyTo: email,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
