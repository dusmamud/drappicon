import Panel from './Panel'
import Stage from './Stage'
import type { GeneratorApi } from './useGenerator'

export default function DesktopGenerator({ api }: { api: GeneratorApi }) {
  const { state } = api
  return (
    <div data-panel-root className="mx-auto grid w-full max-w-7xl grid-cols-[400px_1fr] items-stretch gap-8 px-4 sm:px-6">
      <Panel api={api} />
      <div className="min-w-0 pt-1">
        <Stage api={api} />
        {state.error && (
          <p className="mx-auto mt-4 max-w-lg rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}
      </div>
    </div>
  )
}
