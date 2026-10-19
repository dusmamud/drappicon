import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * App-style theme toggle: a floating round button (top-right) that switches
 * between light and dark. The initial theme is applied before paint by the
 * inline script in index.html (saved choice in localStorage, otherwise the
 * system preference); this button flips it and saves the new choice.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('drappicon-theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className="fixed right-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/85 text-slate-600 shadow-card backdrop-blur transition hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-night-800/85 dark:text-amber-300 dark:hover:bg-night-700 dark:hover:text-amber-200"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
