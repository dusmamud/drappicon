import { ControlsBody, DropzoneBox } from './Controls'
import PreviewStage from './PreviewStage'
import type { GeneratorApi } from './useGenerator'

export default function DesktopGenerator({ api }: { api: GeneratorApi }) {
  const { state, actions } = api
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-[400px_1fr] gap-6 px-4">
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100">
        <h2 className="mb-5 text-lg font-bold text-slate-900">Customize Icon</h2>
        <ControlsBody api={api} />
      </div>
      <div className="flex flex-col rounded-3xl bg-gradient-to-b from-primary-50/70 via-white to-white p-6 shadow-soft ring-1 ring-slate-100">
        {!state.foregroundUrl ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-10">
            <div className="w-full max-w-md">
              <DropzoneBox
                onFile={actions.handleForeground}
                url={null}
                label="Drop image here or click to upload"
              />
            </div>
            <p className="max-w-sm text-center text-sm text-slate-500">
              Upload one image and DrAppIcon prepares every iOS and Android size for you — right
              here in your browser. Nothing is uploaded to a server.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center py-4">
            <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
              Live Preview
            </h3>
            <PreviewStage api={api} />
          </div>
        )}
      </div>
    </div>
  )
}
