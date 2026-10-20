import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import logo from '../assets/logo.svg'
import ThemeToggle from './ThemeToggle'

export default function Footer() {
  const colTitle = 'text-[15px] font-bold text-slate-900 dark:text-white'
  const link = 'text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
  return (
    <footer className="border-t border-slate-200/70 text-slate-500 dark:border-white/10 dark:text-slate-400">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl p-1">
              <img src={logo} alt="" className="h-full w-full" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">DrAppIcon</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            A fast, private way to turn one image into a complete app icon set for iOS and
            Android — generated locally, right in your browser.
          </p>
          <div className="mt-5">
            <ThemeToggle />
          </div>
        </div>
        <div>
          <h4 className={colTitle}>Product</h4>
          <ul className="mt-4 space-y-2.5">
            <li><a href="/#editor" className={link}>Editor</a></li>
            <li><Link to="/features" className={link}>Features</Link></li>
            <li><Link to="/instructions" className={link}>Instructions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={colTitle}>Explore</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/how-it-works" className={link}>How It Works</Link></li>
            <li><Link to="/about" className={link}>About</Link></li>
            <li><Link to="/support-us" className={link}>Support Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className={colTitle}>Resources</h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="https://developer.apple.com/design/human-interface-guidelines/app-icons" target="_blank" rel="noreferrer" className={link}>
                iOS Guidelines
              </a>
            </li>
            <li>
              <a href="https://developer.android.com/develop/ui/views/launch/icon_design_adaptive" target="_blank" rel="noreferrer" className={link}>
                Android Guidelines
              </a>
            </li>
            
          </ul>
        </div>
        <div>
          <h4 className={colTitle}>Legal</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className={link}>Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className={link}>Cookie Policy</Link></li>
            <li><Link to="/dpa" className={link}>DPA</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/70 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-[13px] text-slate-500 sm:px-6">
          <p>© {new Date().getFullYear()} DrAppIcon · A Dusrel product · support@drappicon.dusrel.com</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> for developers
          </p>
        </div>
      </div>
    </footer>
  )
}
