import cors from "cors";
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  product?: unknown;
  quantity?: unknown;
  destination?: unknown;
  message?: unknown;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const app = express();
const port = Number(process.env.PORT ?? 3002);
const allowedOrigins = new Set([
  "https://yogiecorp.com",
  "https://www.yogiecorp.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  })
);
app.use(express.json({ limit: "50kb" }));

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const hasEmailConfig = () => Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_RECIPIENT);

function validateInquiry(body: ContactPayload = {}) {
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

async function saveInquiry(inquiry: Record<string, string>) {
  const dataDir = path.join(rootDir, "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "inquiries.jsonl"), `${JSON.stringify(inquiry)}\n`);
}

async function sendInquiryEmail(inquiry: Record<string, string>) {
  if (!hasEmailConfig()) {
    throw new Error("Resend is not configured.");
  }

  const resendApiKey = process.env.RESEND_API_KEY as string;
  const inquiryRecipient = process.env.INQUIRY_RECIPIENT as string;
  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    to: inquiryRecipient,
    from: "Yogie Website <inquiries@yogiecorp.com>",
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

  if (error) {
    throw new Error(error.message);
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/inquiries", async (req, res) => {
  const result = validateInquiry(req.body);

  if ("error" in result) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }

  try {
    await saveInquiry(result.inquiry);
    await sendInquiryEmail(result.inquiry);
    res.json({
      ok: true,
      message: "Inquiry sent successfully."
    });
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
});

app.post("/api/contact", async (req, res) => {
  res.redirect(307, "/api/inquiries");
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("API request failed:", {
    message: error.message,
    name: error.name
  });

  if (error instanceof SyntaxError) {
    res.status(400).json({ ok: false, error: "Invalid JSON request body." });
    return;
  }

  res.status(403).json({ ok: false, error: "Request origin is not allowed." });
});

const clientDist = path.join(rootDir, "dist");
app.use(express.static(clientDist));
app.use((_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(port, () => {
  console.log(`YOGIE CORPORATION server running on http://127.0.0.1:${port}`);
});
