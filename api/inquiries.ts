import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  product?: unknown;
  quantity?: unknown;
  destination?: unknown;
  message?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type VercelRequest = {
  method?: string;
  headers?: {
    origin?: string;
  };
  body?: InquiryPayload;
};

const allowedOrigins = new Set([
  "https://yogiecorp.com",
  "https://www.yogiecorp.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const hasSmtpConfig = () =>
  Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM &&
      process.env.INQUIRY_RECIPIENT
  );

function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers?.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function validateInquiry(body: InquiryPayload = {}) {
  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const product = clean(body.product);
  const quantity = clean(body.quantity);
  const destination = clean(body.destination);
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2) return { error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (phone.length < 7) return { error: "Please enter a valid phone number." };
  if (!product) return { error: "Please choose a product." };
  if (!quantity) return { error: "Please enter the quantity." };
  if (!destination) return { error: "Please enter the destination." };
  if (message.length < 10) return { error: "Please add a short message." };

  return {
    inquiry: {
      id: randomUUID(),
      receivedAt: new Date().toISOString(),
      name,
      email,
      phone,
      product,
      quantity,
      destination,
      message
    }
  };
}

async function sendInquiryEmail(inquiry: Record<string, string>) {
  if (!hasSmtpConfig()) {
    throw new Error("SMTP is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    to: process.env.INQUIRY_RECIPIENT,
    from: process.env.SMTP_FROM,
    replyTo: inquiry.email,
    subject: `New YOGIE CORPORATION inquiry: ${inquiry.product}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Product: ${inquiry.product}`,
      `Quantity: ${inquiry.quantity}`,
      `Destination: ${inquiry.destination}`,
      "",
      inquiry.message
    ].join("\n")
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  const origin = req.headers?.origin;
  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ ok: false, error: "Request origin is not allowed." });
    return;
  }

  if (req.method === "OPTIONS") {
    res.status(204).json(null);
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const result = validateInquiry(req.body);

  if ("error" in result) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }

  try {
    await sendInquiryEmail(result.inquiry);
    res.json({ ok: true, message: "Inquiry sent successfully." });
  } catch (error) {
    console.error("Inquiry submission failed:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "UnknownError"
    });
    res.status(500).json({
      ok: false,
      error: "Unable to submit inquiry right now. Please contact us directly."
    });
  }
}
