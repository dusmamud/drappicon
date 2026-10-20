import { useEffect } from 'react'

export interface Faq {
  q: string
  a: string
}

/**
 * Injects FAQPage structured data while the page is mounted. The questions and
 * answers must match the visible FAQ on the same page (they do — both render
 * from the same list). Serves answer engines and non-Google search features;
 * Google restricts FAQ rich results to government/health sites.
 */
export function useFaqJsonLd(faqs: Faq[], id: string) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [faqs, id])
}

/** Visible FAQ cards — concise, answer-first, the format answer engines quote. */
export default function FaqBlock({
  faqs,
  heading = 'Common questions',
}: {
  faqs: Faq[]
  heading?: string
}) {
  return (
    <>
      <h2 className="mt-16 text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white">
        {heading}
      </h2>
      <div className="mx-auto mt-6 max-w-3xl space-y-4">
        {faqs.map((f) => (
          <div
            key={f.q}
            className="rounded-3xl bg-white p-6 text-left shadow-soft ring-1 ring-slate-100 dark:bg-night-800 dark:ring-white/10"
          >
            <h3 className="font-bold text-ink dark:text-white">{f.q}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
