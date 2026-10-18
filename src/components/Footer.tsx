import { Link } from 'react-router'
import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-extrabold text-slate-900">
              Dr<span className="text-primary-600">AppIcon</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-500">
            Generate your app icon easily. iOS + Adaptive Android icons, made entirely in your
            browser — by Dusrel.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900">Product</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-primary-700">Icon Generator</Link></li>
            <li><a href="/#api" className="hover:text-primary-700">API</a></li>
            <li><Link to="/support-us" className="hover:text-primary-700">Support Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to="/privacy-policy" className="hover:text-primary-700">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-primary-700">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-primary-700">Cookie Policy</Link></li>
            <li><Link to="/dpa" className="hover:text-primary-700">DPA</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} DrAppIcon · A Dusrel product · support@drappicon.dusrel.com
      </div>
    </footer>
  )
}
