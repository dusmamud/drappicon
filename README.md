# DrAppIcon — Create Mobile App Icons

Generate your app icon easily. DrAppIcon builds complete **iOS + Adaptive Android** icon sets from a single image — 100% in the browser. No uploads, no server: your images never leave your device.

**Live (planned):** https://drappicon.dusrel.com — a Dusrel product.

## Features
- Upload PNG / JPG / SVG / WebP (up to 10 MB), drag-and-drop or tap
- Live previews: round / squircle / legacy shapes + iPhone & Android device mockups
- Padding (zoom) slider, background colour with auto dominant-colour detection, presets + custom picker + transparent
- Optional badge text and monochrome layer (Android themed icons)
- Android: legacy + round icons (ldpi–xxxhdpi), adaptive foregrounds, `mipmap-anydpi-v26` XML, background colour XML, Play Store 512 icon
- iOS: full `AppIcon.appiconset` with `Contents.json` (18 entries incl. 1024 marketing)
- PNG or WebP for Android; one-click ZIP download (JSZip + FileSaver, lazy-loaded)
- Dedicated mobile experience: auto-opening Customize bottom sheet, floating action pills
- Pages: Generator, Support Us, Privacy Policy, Terms of Service, Cookie Policy, DPA

## Stack
React 18.3.1 + TypeScript + Vite + Tailwind CSS v3 · react-router v7 · framer-motion · lucide-react · react-dropzone · react-markdown + remark-gfm · jszip + file-saver (lazy chunks)

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

## Deploy (Cloudflare Pages)
Static build (`dist/`), SPA fallback to `index.html` for all routes, then attach the custom domain `drappicon.dusrel.com`.

## QA
`qa/` holds browser verification screenshots. `qa.html` + `src/qa.tsx` + `vite.qa.config.ts` form a harness that drives the real generator with a synthetic upload (`npx vite build -c vite.qa.config.ts`); they are not part of the product build.

## Verification status (v1, 2026-10-19)
Verified locally with headless Chrome (Puppeteer) against the production build:
desktop 1440×900 and mobile 390×844 flows — upload → auto background colour (#2563EB from the test image) → live previews → sheet (mobile) → ZIP download → thank-you modal. The generated ZIP contains 38 files (Android set + iOS AppIcon.appiconset with an 18-entry Contents.json); icon dimensions spot-checked (1024, 512, 432, 192, 180 px). No page errors; no horizontal overflow on mobile; floating pills do not overlap. Screenshots in `qa/`.
