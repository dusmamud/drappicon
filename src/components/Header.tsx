import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.svg'

// Slim header used on sub-pages (the home page leads with the in-page brand hero instead).
// Responsive behaviour follows the WAI-APG disclosure pattern: at desktop widths
// the links sit inline; below the md breakpoint they collapse behind a hamburger
// button (aria-expanded / aria-controls) that opens a full-width panel under the
// bar. The panel closes on link click, on route change, on Escape, when focus
// leaves the header, and if the viewport grows back to desktop width.
export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close whenever navigation happens (also covers browser back/forward).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open ])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-slate-600 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300'}`

  const mobileLinkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center rounded-lg px-3 py-3 text-base font-semibold transition ${
      isActive
        ? 'bg-primary-50 text-primary-700 dark:bg-white/10 dark:text-primary-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-primary-700 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-primary-300'
    }`

  const close = () => setOpen(false)

  return (
    <header
      className="border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-night-900/85"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="DrAppIcon home">
          <img src={logo} alt="DrAppIcon logo" className="h-9 w-9" />
          <span className="font-hand text-[28px] font-bold leading-none text-ink dark:text-white">DrAppIcon</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center gap-5 md:flex" aria-label="Primary">
          <Link to="/" className="text-sm font-semibold text-slate-600 transition hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300">
            Generator
          </Link>
          <NavLink to="/features" className={linkCls}>
            Features
          </NavLink>
          <NavLink to="/how-it-works" className={linkCls}>
            How It Works
          </NavLink>
          <NavLink to="/support-us" className={linkCls}>
            Support Us
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {open && (
        <nav id="mobile-nav" className="border-t border-slate-200/70 dark:border-white/10 md:hidden" aria-label="Mobile">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            <NavLink to="/" end className={mobileLinkCls} onClick={close}>
              Generator
            </NavLink>
            <NavLink to="/features" className={mobileLinkCls} onClick={close}>
              Features
            </NavLink>
            <NavLink to="/how-it-works" className={mobileLinkCls} onClick={close}>
              How It Works
            </NavLink>
            <NavLink to="/support-us" className={mobileLinkCls} onClick={close}>
              Support Us
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
