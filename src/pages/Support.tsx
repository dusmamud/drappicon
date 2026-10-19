import { Heart, Mail } from 'lucide-react'
import mascotGif from '../assets/mascot.gif'

export default function Support() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-14 text-center">
      <img src={mascotGif} alt="DrAppIcon mascot" className="mx-auto h-32 w-32 rounded-3xl object-cover shadow-card" />
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
        Support DrAppIcon
      </h1>
      <p className="mx-auto mt-3 max-w-md text-slate-500">
        DrAppIcon is free for everyone, forever. If it saved you time, sharing it with
        another developer is the best way to keep it growing.
      </p>
      <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100">
          <Heart className="h-5 w-5 text-primary-600" />
          <h2 className="mt-2 font-bold text-slate-900">Other ways to help</h2>
          <p className="mt-1 text-sm text-slate-500">
            Share DrAppIcon with a developer friend, or tell us what to build next.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100">
          <Mail className="h-5 w-5 text-primary-600" />
          <h2 className="mt-2 font-bold text-slate-900">Contact</h2>
          <p className="mt-1 text-sm text-slate-500">
            Questions or feedback: support@drappicon.dusrel.com
          </p>
        </div>
      </div>
    </main>
  )
}
