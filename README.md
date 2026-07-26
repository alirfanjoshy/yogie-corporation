# YOGIE CORPORATION Website

Full-stack TypeScript website for YOGIE CORPORATION export/import trading.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

The frontend runs on port `5173`. The backend API runs on port `3002`.
Do not open `index.html` by double-clicking it for development; TypeScript and API proxying require the Vite dev server URL above.

## Contact Form Email

Copy `.env.example` to `.env` and fill in the real domain email SMTP settings from the email provider.

```bash
cp .env.example .env
```

Important values:

```text
CONTACT_TO=liptonmouran@yogiecorporation.com, akhter@yogiecorporation.com
CONTACT_FROM=website@yogiecorporation.com
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

Until SMTP is configured, contact form submissions are saved locally in `data/inquiries.jsonl`.

## Build

```bash
npm run build
npm start
```

For deployment on Vercel, import the GitHub repo and use the default Vite settings. The `api/` folder contains Vercel serverless functions for the contact form.

Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Add the environment variables from `.env.example` in Vercel Project Settings.

## Company Details

YOGIE CORPORATION  
78-43 267th Street  
Queens, NY 11004, USA

Contacts:

- Lipton: 718-791-2781
- Yogie: 347-635-9098
- Akhter: 929-327-3357
- Lipton email: liptonmouran@yogiecorporation.com
- Akhter email: akhter@yogiecorporation.com
