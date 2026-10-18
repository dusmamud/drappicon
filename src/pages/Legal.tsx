import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Legal({ markdown }: { markdown: string }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <article className="prose-legal space-y-4 text-slate-600 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:pt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_strong]:text-slate-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </main>
  )
}
