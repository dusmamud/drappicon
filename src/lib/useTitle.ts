import { useEffect } from 'react'

/** Sets the browser tab title for a page (the SPA ships a single index.html). */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
