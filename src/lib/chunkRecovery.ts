/**
 * Recovery for "Failed to fetch dynamically imported module" (version skew):
 * a tab that was opened before the latest deployment still points at lazy
 * chunks (e.g. JSZip, loaded only when a download starts) whose hashed file
 * names no longer exist on the server. Retrying the import cannot help —
 * the browser caches the failed module fetch — so the one reliable cure is
 * a single page reload, which picks up the fresh index and chunk names.
 *
 * Guarded via sessionStorage so it can never loop: if a reload already
 * happened within the last 10 seconds and the chunk STILL fails, this
 * returns false and the caller surfaces a normal error instead.
 */
const KEY = 'drappicon-chunk-reload-at'

export function reloadOnceForStaleChunk(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0)
    if (Date.now() - last <= 10_000) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    /* storage unavailable — reload anyway, a single attempt is still safe
       enough here because the fresh build's chunks exist */
  }
  window.location.reload()
  return true
}

/** True when an error looks like a failed lazy-chunk/module fetch. */
export function isChunkLoadError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e)
  return (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('error loading dynamically imported module')
  )
}
