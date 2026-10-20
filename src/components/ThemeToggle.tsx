import { useCallback, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function isDark() {
  return typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
}

/**
 * Theme toggle: the pill button in the site footer that switches between
 * light and dark. The initial theme is applied before paint by the inline
 * script in index.html (saved choice in localStorage, otherwise the system
 * preference); toggling flips it and saves the new choice.
 *
 * The button stays in sync if the `dark` class on <html> changes any other
 * way (MutationObserver) or the saved choice changes in another tab
 * (storage event).
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(isDark)

  useEffect(() => {
    const sync = () => setDark(isDark())
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'drappicon-theme') setDark(e.newValue === 'dark')
    }
    window.addEventListener('storage', onStorage)
    return () => {
      observer.disconnect()
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = useCallback(() => {
    const next = !isDark()
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('drappicon-theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    setDark(next)
  }, [])

  const label = dark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      data-theme-toggle="footer"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-night-800/85 dark:text-amber-300 dark:hover:bg-night-700 dark:hover:text-amber-200"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{dark ? 'Light theme' : 'Dark theme'}</span>
    </button>
  )
}
