import { useEffect } from 'react'

/** Sets the browser tab title for a page (the SPA ships a single index.html). */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

function setMeta(selector: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.content = value
}

/**
 * Per-page SEO/AEO meta: title plus the description and social tags, so each
 * route presents its own summary to crawlers and link previews that render JS.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
  }, [title, description])
}
