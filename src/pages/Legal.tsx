import ReactMarkdown from 'react-markdown'
import { usePageMeta } from '../lib/useTitle'
import remarkGfm from 'remark-gfm'

export default function Legal({
  markdown,
  title,
  description,
}: {
  markdown: string
  title: string
  description: string
}) {
  usePageMeta(title, description)
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <article className="prose-legal space-y-4 text-slate-600 dark:text-slate-300 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-slate-900 dark:[&_h1]:text-white [&_h2]:pt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_strong]:text-slate-800 dark:[&_strong]:text-slate-100 [&_a]:text-primary-700 dark:[&_a]:text-primary-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </main>
  )
}
