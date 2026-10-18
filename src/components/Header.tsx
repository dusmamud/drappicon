import { Link, NavLink } from 'react-router'
import logo from '../assets/logo.svg'

export default function Header() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition ${isActive ? 'text-primary-700' : 'text-slate-600 hover:text-primary-700'}`
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="DrAppIcon logo" className="h-9 w-9 rounded-xl shadow-sm" />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Dr<span className="text-primary-600">AppIcon</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-5">
          <NavLink to="/" className={linkCls} end>
            Generator
          </NavLink>
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
