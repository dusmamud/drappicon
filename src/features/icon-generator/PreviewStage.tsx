import type { GeneratorApi } from './useGenerator'

function IconView({
  api,
  clip,
  px,
}: {
  api: GeneratorApi
  clip: 'circle' | 'squircle' | 'square'
  px: number
}) {
  const { state } = api
  const radius = clip === 'circle' ? '50%' : clip === 'squircle' ? '28%' : '12%'
  return (
    <div
      className="relative shrink-0 overflow-hidden shadow-card"
      style={{
        width: px,
        height: px,
        borderRadius: radius,
        background: state.backgroundColor === 'transparent' ? undefined : state.backgroundColor,
      }}
    >
      {state.backgroundColor === 'transparent' && <div className="checkerboard absolute inset-0" />}
      {state.foregroundUrl ? (
        <img
          src={state.foregroundUrl}
          alt="Icon preview"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ padding: `${state.padding}%` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-[10px] font-semibold text-slate-400">
          No image
        </div>
      )}
      {state.badge.enabled && state.badge.text.trim() && (
        <span
          className="absolute bottom-[4%] right-[4%] rounded-full px-1.5 py-px text-[9px] font-bold"
          style={{ background: state.badge.background, color: state.badge.color }}
        >
          {state.badge.text}
        </span>
      )}
    </div>
  )
}

export default function PreviewStage({ api }: { api: GeneratorApi }) {
  const { state } = api
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-center gap-5 sm:gap-7">
        <div className="flex flex-col items-center gap-1.5">
          <IconView api={api} clip="circle" px={84} />
          <span className="text-[11px] font-semibold text-slate-400">Round</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <IconView api={api} clip="squircle" px={84} />
          <span className="text-[11px] font-semibold text-slate-400">Squircle</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <IconView api={api} clip="square" px={84} />
          <span className="text-[11px] font-semibold text-slate-400">Legacy</span>
        </div>
      </div>

      <div className="flex items-start justify-center gap-4 sm:gap-8">
        {/* iPhone mockup */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[118px] rounded-[26px] border-[5px] border-slate-900 bg-gradient-to-b from-primary-100 via-white to-primary-50 p-2 shadow-card">
            <div className="mx-auto mb-2 h-3.5 w-12 rounded-full bg-slate-900" />
            <div className="flex flex-col items-center gap-1 py-1">
              <IconView api={api} clip="squircle" px={52} />
              <span className="max-w-[90px] truncate text-[9px] font-medium text-slate-600">
                {state.fileName.replace(/_/g, ' ') || 'My App'}
              </span>
            </div>
            <div className="mt-1 grid grid-cols-4 gap-1.5 px-0.5 pb-1">
              {['#34d399', '#60a5fa', '#f472b6', '#fbbf24'].map((c) => (
                <div key={c} className="aspect-square rounded-[22%]" style={{ background: c }} />
              ))}
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">iPhone</span>
        </div>

        {/* Android mockup */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[118px] rounded-[20px] border-[5px] border-slate-800 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 p-2 shadow-card">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[8px] font-semibold text-white/80">9:41</span>
              <div className="h-2.5 w-2.5 rounded-full bg-black/60 ring-1 ring-white/20" />
            </div>
            <div className="flex flex-col items-center gap-1 py-1">
              <IconView api={api} clip="circle" px={52} />
              <span className="max-w-[90px] truncate text-[9px] font-medium text-white/85">
                {state.fileName.replace(/_/g, ' ') || 'My App'}
              </span>
            </div>
            <div className="mt-1 grid grid-cols-4 gap-1.5 px-0.5 pb-1">
              {['#f87171', '#4ade80', '#93c5fd', '#e879f9'].map((c) => (
                <div key={c} className="aspect-square rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">Android</span>
        </div>
      </div>

      {state.progress && (
        <div className="space-y-1">
          <div className="h-2 overflow-hidden rounded-full bg-primary-100">
            <div
              className="h-full rounded-full bg-primary-600 transition-all"
              style={{ width: `${Math.round((state.progress.done / state.progress.total) * 100)}%` }}
            />
          </div>
          <p className="text-center text-xs font-medium text-slate-500">{state.progress.label}</p>
        </div>
      )}
    </div>
  )
}
