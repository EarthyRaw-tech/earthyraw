# Earthy Raw Website

Next.js App Router project with a public marketing site, contact request handling, and protected admin pages for settings and lead management.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui components
- react-icons
- next-themes
- Supabase (primary persistence)
- Vercel Blob (JSON snapshot backups)
- Nodemailer (SMTP emails)

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and set values.

3. Optional but recommended: run [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL editor.

4. Start development:

```bash
npm run dev
```

5. Optional one-time migration of existing local data:

```bash
npm run backfill:supabase
```

## Data storage behavior

- If `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are configured:
  - Site settings are read/written from `public.site_settings`.
  - Lead submissions are stored in `public.lead_submissions`.
  - Settings history snapshots are inserted into `public.site_settings_history`.
  - Contact form rate limiting is enforced through `public.contact_rate_limits` + `increment_contact_rate_limit`.
- If Supabase is not configured:
  - App falls back to local files in `data/` for development compatibility.
- If `BLOB_READ_WRITE_TOKEN` is configured:
  - JSON snapshots are saved to Vercel Blob under `site-backups/...`.
  - Admin media uploads (logo/favicon/OG/homepage background) are stored in Blob and URLs are saved in settings.

## Main env vars

- `ADMIN_PASSWORD` (required, no default fallback)
- `ADMIN_SESSION_SECRET` (required, no default fallback)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (optional canonical/SEO fallback base URL)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional Search Console token)
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` (optional Bing Webmaster token)

## Admin routes

- `/admin/login`
- `/admin/settings`
- `/admin/leads`
