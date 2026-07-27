# Deployment Guide

Network Solutions manages the domain and DNS. It does not automatically host this Node/Express website just because the domain was bought there.

## Important Security Step

The Network Solutions password was shared in chat. Change that password before updating DNS or giving access to anyone else.

## Recommended Hosting

Use Render for the Node/Express backend and Vercel for the Vite frontend.

Build command:

```bash
npm run build
```

Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variables:

```text
RESEND_API_KEY=
INQUIRY_RECIPIENT=Liptonmourin@yogiecorp.com, akhtar@yogiecorp.com, yogie@yogiecorp.com
```

In Vercel, add:

```text
VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com
```

## Network Solutions DNS

After the app is deployed, Vercel will provide DNS records.

Typical records:

```text
CNAME  www  cname.vercel-dns.com
A      @    76.76.21.21
```

In Network Solutions:

1. Log in.
2. Go to Domains.
3. Select the domain.
4. Open Advanced Tools.
5. Click Manage next to Advanced DNS Records.
6. Add or edit the records from the hosting provider.
7. Save changes.

DNS can take a few minutes to 24 hours to propagate.
