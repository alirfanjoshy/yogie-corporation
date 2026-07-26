import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  quantity?: string;
  destination?: string;
  message?: string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type VercelRequest = {
  method?: string;
  body?: ContactPayload;
};

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const hasSmtpConfig = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

function validateContact(body: ContactPayload = {}) {
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
  if (!product) return { error: "Please choose a product." };
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
  if (!hasSmtpConfig()) return { sent: false };

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
    to:
      process.env.CONTACT_TO ??
      "liptonmouran@yogiecorporation.com, akhter@yogiecorporation.com",
    from: process.env.CONTACT_FROM ?? process.env.SMTP_USER,
    replyTo: inquiry.email,
    subject: `New YOGIE CORPORATION inquiry: ${inquiry.product}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || "Not provided"}`,
      `Product: ${inquiry.product}`,
      `Quantity: ${inquiry.quantity || "Not provided"}`,
      `Destination: ${inquiry.destination || "Not provided"}`,
      "",
      inquiry.message
    ].join("\n")
  });

  return { sent: true };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).json(null);
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const result = validateContact(req.body);

  if ("error" in result) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }

  try {
    const mail = await sendInquiryEmail(result.inquiry);
    res.json({
      ok: true,
      message: mail.sent
        ? "Inquiry sent successfully."
        : "Inquiry received. Email delivery will work after SMTP is configured.",
      emailSent: mail.sent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Unable to submit inquiry right now." });
  }
}
