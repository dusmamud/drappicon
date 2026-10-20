import { Heart, Link2, Mail, MessageSquare, Share2 } from 'lucide-react'
import mascotGif from '../assets/mascot.gif'
import FaqBlock, { useFaqJsonLd, type Faq } from '../features/home/FaqBlock'
import { usePageMeta } from '../lib/useTitle'

const WAYS = [
  {
    icon: Share2,
    title: 'Share it',
    text: 'Send DrAppIcon to a developer friend or mention it in your community. Most people find the tool because someone they trust pointed at it.',
  },
  {
    icon: MessageSquare,
    title: 'Send feedback',
    text: 'A missing size, a confusing step, an idea for the next feature — feedback is how a one-person tool knows what to build next.',
  },
  {
    icon: Link2,
    title: 'Link to it',
    text: 'Writing a tutorial, a README or a resource list? A link to DrAppIcon helps other developers find it and helps the site grow.',
  },
]

const FAQS: Faq[] = [
  {
    q: 'Is DrAppIcon really free?',
    a: 'Yes. Every size, every format and every feature is free, with no watermarks, no locked options and no account. There is no paid tier.',
  },
  {
    q: 'Will DrAppIcon stay free?',
    a: 'That is the plan. The tool costs little to run because generation happens in the visitor\u2019s own browser, and it is maintained by Dusrel as part of a family of free developer tools.',
  },
  {
    q: 'Who makes DrAppIcon?',
    a: 'Dusrel, an independent one-person studio. The same studio maintains the tool, answers the support mail and ships the updates.',
  },
  {
    q: 'How do I report a bug or request a feature?',
    a: 'Write to support@drappicon.dusrel.com with the details — what you uploaded, what you expected, and what happened. Reports with a sample image are the easiest to act on.',
  },
]

export default function Support() {
  usePageMeta(
    'Support DrAppIcon',
    'Support DrAppIcon: the free iOS and Android app icon generator by Dusrel. Share it with a developer, send feedback, or link to it — and find answers about cost, the maker, and bug reports.',
  )
  useFaqJsonLd(FAQS, 'support-faq-jsonld')
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14">
      <div className="text-center">
        <img src={mascotGif} alt="DrAppIcon mascot" className="mx-auto h-32 w-32 rounded-3xl object-cover shadow-card" />
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Support DrAppIcon
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
          DrAppIcon is free for everyone, forever. If it saved you time, sharing it with
          another developer is the best way to keep it growing.
        </p>
      </div>

      <h2 className="mt-14 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        Ways to support
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {WAYS.map((w) => (
          <div
            key={w.title}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <w.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
            <h3 className="mt-3 font-bold text-ink dark:text-white">{w.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {w.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
          <Heart className="h-5 w-5 text-primary-600" />
          <h2 className="mt-2 font-bold text-slate-900 dark:text-white">Why it matters</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            DrAppIcon is a one-person project with no ads and no paid tier. Every share
            and every piece of feedback directly decides whether it keeps improving —
            and who hears about it next.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10">
          <Mail className="h-5 w-5 text-primary-600" />
          <h2 className="mt-2 font-bold text-slate-900 dark:text-white">Contact</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Questions or feedback:{' '}
            <a
              href="mailto:support@drappicon.dusrel.com"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
            >
              support@drappicon.dusrel.com
            </a>
          </p>
        </div>
      </div>

      <FaqBlock faqs={FAQS} />
    </main>
  )
}
