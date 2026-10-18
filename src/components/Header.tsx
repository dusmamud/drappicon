import { Link, NavLink } from 'react-router'
import logo from '../assets/logo.svg'

// Slim header used on sub-pages (the home page leads with the in-page brand hero instead).
export default function Header() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition ${isActive ? 'text-primary-700' : 'text-slate-600 hover:text-primary-700'}`
  return (
    <header className="border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="DrAppIcon logo" className="h-9 w-9" />
          <span className="font-hand text-[28px] font-bold leading-none text-ink">DrAppIcon</span>
        </Link>
        <nav className="ml-auto flex items-center gap-5">
          <Link to="/" className="text-sm font-semibold text-slate-600 transition hover:text-primary-700">
            Generator
          </Link>
          <a href="/#api" className="hidden text-sm font-semibold text-slate-600 transition hover:text-primary-700 sm:block">
            API
          </a>
          <NavLink to="/support-us" className={linkCls}>
            Support Us
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
