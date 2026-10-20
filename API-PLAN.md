# DrAppIcon API — Future Plan

Status: **Planned** (decided 2026-10-20). Not built yet — the landing page no
longer advertises an API until this actually ships.

## Goal

Let developers generate the same iOS + Android icon ZIP the website produces,
programmatically, with an API key — for CI pipelines, app builders and tools.

## Stack (decided)

**Hono + TypeScript + Sharp + SQLite + Fly.io, behind Cloudflare**

- **Hono** — small, fast, TypeScript-first. The same code can later move to
  Cloudflare Workers without a rewrite if scale demands it.
- **Sharp** — server-side image processing (libvips). Maps 1:1 to the web
  engine's canvas work: resize, background fill, padding/zoom, rounded clips,
  badge, PNG/WebP encode. Output ZIP must stay identical to the web output
  (same sizes, `Contents.json`, adaptive-icon XML).
- **SQLite** — API keys, usage counts and quotas for v1. Zero extra infra.
  Move to Postgres/Supabase only when a self-serve dashboard arrives.
- **Fly.io** — one small always-on machine (~$2–5/mo), no cold starts.
- **Cloudflare in front** — `api.drappicon.dusrel.com`, WAF + edge rate limits.

## API shape (v1)

- `POST /v1/generate` — `Authorization: Bearer <api-key>`; image as multipart
  upload **or** base64 JSON; options mirror the website (background colour,
  size/padding, badge, monochrome, format). Response: the ZIP, synchronously
  (generation takes ~1–2 s, no job queue).
- `GET /v1/account` — credit balance + usage for the key.

## Keys, billing, limits

- Keys look like `drapp_live_…`; only their SHA-256 hash is stored.
- Free tier per key (e.g. 20 generations/month), then pay-as-you-go credits
  via Stripe (market reference: IconCraft charges $0.25/icon; target
  $0.10–0.15). Credits never expire.
- Per-key rate limit (e.g. 60 req/min) + monthly quota, enforced in the auth
  middleware. Max upload 10 MB, same as the website.

## Rules

- **Never store user images** — process in memory, discard after responding.
- Validate image type from the file bytes (Sharp metadata), never the
  extension.
- The web generator stays free and unchanged; the API sells automation.

## Phases

1. Core service: engine port to Sharp + endpoint + key auth + quota.
2. Stripe credits + key issuing (admin/manual first).
3. Self-serve dashboard (signup, keys, usage) — Supabase Auth if needed.
4. Only then: put the API section back on the landing page.
