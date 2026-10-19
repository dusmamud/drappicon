// Small original Android robot glyph (the lucide set has no Android brand icon).
export function AndroidBot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.2 9.1a.9.9 0 0 0-.9.9v6.1a.9.9 0 1 0 1.8 0V10a.9.9 0 0 0-.9-.9Zm11.6 0a.9.9 0 0 0-.9.9v6.1a.9.9 0 1 0 1.8 0V10a.9.9 0 0 0-.9-.9ZM7.7 10v8.1c0 .5.4 1 .9 1h1.1v2.3c0 .8.6 1.4 1.3 1.4.8 0 1.4-.6 1.4-1.4V19h1.2v2.3c0 .8.6 1.4 1.4 1.4.7 0 1.3-.6 1.3-1.4V19h1.1c.5 0 .9-.4.9-1V10H7.7Zm9.5-6.1L16 2.8a.4.4 0 0 0-.6 0l-1.3 1.4a8.4 8.4 0 0 0-4.3 0L8.5 2.8a.4.4 0 0 0-.6 0L6.7 4c-1.2.7-2 1.8-2 3v1.1h14.3V7c0-1.2-.7-2.3-1.8-3.1ZM9.2 7.2a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Zm5.6 0a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Z" />
    </svg>
  )
}

/** Apple brand glyph supplied by Enzurien (2026-10-20) for the preview surfaces.
 *  fill=currentColor so each context (pills, captions, empty state) colours it. */
export function AppleBrand({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true">
      <path d="M128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4ZM223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.23,72.23,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127,127,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Z" />
    </svg>
  )
}

/** Android brand glyph supplied by Enzurien (2026-10-20), with the colour grading
 *  he asked for: a green grade running light at the top to deep at the bottom
 *  (Android green family) instead of the flat black of the supplied file. */
export function AndroidBrand({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="drapp-android-grade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="55%" stopColor="#3DDC84" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <path fill="url(#drapp-android-grade)" d="M207.06,80.67c-.74-.74-1.49-1.46-2.24-2.17l24.84-24.84a8,8,0,0,0-11.32-11.32l-26,26a111.43,111.43,0,0,0-128.55.19L37.66,42.34A8,8,0,0,0,26.34,53.66L51.4,78.72A113.38,113.38,0,0,0,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM92,160a12,12,0,1,1,12-12A12,12,0,0,1,92,160Zm72,0a12,12,0,1,1,12-12A12,12,0,0,1,164,160Z" />
    </svg>
  )
}
