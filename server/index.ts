import cors from "cors";
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const app = express();
const port = Number(process.env.PORT ?? 3002);

app.use(cors({ origin: true }));
app.use(express.json({ limit: "50kb" }));

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const hasSmtpConfig = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

function validateContact(body: ContactPayload) {
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

async function saveInquiry(inquiry: Record<string, string>) {
  const dataDir = path.join(rootDir, "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "inquiries.jsonl"), `${JSON.stringify(inquiry)}\n`);
}

async function sendInquiryEmail(inquiry: Record<string, string>) {
  if (!hasSmtpConfig()) return { sent: false, reason: "SMTP is not configured." };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const to =
    process.env.CONTACT_TO ??
    "Liptonmourin@yogiecorp.com, akhtar@yogiecorp.com, yogie@yogiecorp.com";
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER;

  await transporter.sendMail({
    to,
    from,
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "yogie-corporation-api" });
});

app.post("/api/contact", async (req, res) => {
  const result = validateContact(req.body);

  if ("error" in result) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }

  try {
    await saveInquiry(result.inquiry);
    const mail = await sendInquiryEmail(result.inquiry);
    res.json({
      ok: true,
      message: mail.sent
        ? "Inquiry sent successfully."
        : "Inquiry saved. Email delivery will work after SMTP is configured.",
      emailSent: mail.sent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Unable to submit inquiry right now." });
  }
});

const clientDist = path.join(rootDir, "dist");
app.use(express.static(clientDist));
app.use((_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(port, () => {
  console.log(`YOGIE CORPORATION server running on http://127.0.0.1:${port}`);
});
