# Deployment Guide

Network Solutions manages the domain and DNS. It does not automatically host this Node/Express website just because the domain was bought there.

## Important Security Step

The Network Solutions password was shared in chat. Change that password before updating DNS or giving access to anyone else.

## Recommended Hosting

Use a Node-capable host such as Render or Railway. This project includes `render.yaml` for Render.

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

Environment variables:

```text
CONTACT_TO=liptonmouran@yogiecorporation.com, akhter@yogiecorporation.com
CONTACT_FROM=website@yogiecorporation.com
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

## Network Solutions DNS

After the app is deployed, the host will provide DNS records.

Typical records:

```text
CNAME  www  your-host-name-from-render-or-railway
A      @    host-provided-ip-address
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
