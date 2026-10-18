import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Check, ImagePlus, Pipette, RefreshCw, X } from 'lucide-react'
import type { GeneratorApi } from './useGenerator'
import { MAX_FILE_BYTES } from './useGenerator'

export const COLOR_PRESETS = [
  '#ffffff',
  '#000000',
  '#8b5cf6',
  '#2563eb',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#64748b',
]

export function DropzoneBox({
  onFile,
  url,
  label,
  compact = false,
}: {
  onFile: (f: File) => void
  url: string | null
  label: string
  compact?: boolean
}) {
  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) onFile(files[0])
    },
    [onFile],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [], 'image/svg+xml': [], 'image/webp': [] },
    maxSize: MAX_FILE_BYTES,
    multiple: false,
  })
  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed text-center transition ${
        isDragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-primary-50/50'
      } ${compact ? 'px-3 py-3' : 'px-4 py-6'}`}
    >
      <input {...getInputProps()} />
      {url ? (
        <div className="flex items-center justify-center gap-3">
          <img src={url} alt="" className="h-11 w-11 rounded-xl object-cover shadow" />
          <div className="text-left">
            <p className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <Check className="h-4 w-4" /> Image ready
            </p>
            <p className="text-xs text-slate-500">Tap or drop to change</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1.5">
          <ImagePlus className="h-7 w-7 text-primary-500" />
          <p className="text-sm font-semibold text-slate-700">{label}</p>
          <p className="text-xs text-slate-400">PNG, JPG, SVG or WebP · up to 10 MB</p>
        </div>
      )}
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{children}</h3>
  )
}

export function BackgroundPicker({ api }: { api: GeneratorApi }) {
  const { state, actions } = api
  return (
    <div className="space-y-2.5">
      <SectionTitle>Background colour</SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        {COLOR_PRESETS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Background ${c}`}
            onClick={() => actions.setBackgroundColor(c)}
            className={`h-8 w-8 rounded-full border shadow-sm transition ${
              state.backgroundColor === c ? 'ring-2 ring-primary-500 ring-offset-2' : 'border-slate-200'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
        <button
          type="button"
          onClick={() => actions.setBackgroundColor('transparent')}
          className={`checkerboard h-8 w-8 rounded-full border shadow-sm ${
            state.backgroundColor === 'transparent' ? 'ring-2 ring-primary-500 ring-offset-2' : 'border-slate-200'
          }`}
          aria-label="Transparent background"
        />
        <label
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
          title="Custom colour"
        >
          <Pipette className="h-4 w-4 text-slate-500" />
          <input
            type="color"
            className="absolute inset-0 cursor-pointer opacity-0"
            value={state.backgroundColor === 'transparent' ? '#ffffff' : state.backgroundColor}
            onChange={(e) => actions.setBackgroundColor(e.target.value)}
          />
        </label>
        <span className="ml-1 font-mono text-xs uppercase text-slate-500">
          {state.backgroundColor}
        </span>
      </div>
    </div>
  )
}

export function ControlsBody({ api, onDone }: { api: GeneratorApi; onDone?: () => void }) {
  const { state, actions } = api
  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <SectionTitle>Foreground image</SectionTitle>
        <DropzoneBox
          onFile={actions.handleForeground}
          url={state.foregroundUrl}
          label="Tap to upload an image"
          compact
        />
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <SectionTitle>Padding / zoom</SectionTitle>
          <span className="text-xs font-semibold text-primary-600">{state.padding}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={45}
          value={state.padding}
          onChange={(e) => actions.setPadding(Number(e.target.value))}
          className="rel-range w-full"
          aria-label="Padding"
        />
      </div>

      <BackgroundPicker api={api} />

      <div className="space-y-2.5">
        <SectionTitle>Icon file name</SectionTitle>
        <input
          type="text"
          value={state.fileName}
          onChange={(e) => actions.setFileName(e.target.value.replace(/[^\w-]/g, ''))}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm outline-none focus:border-primary-400 focus:bg-white"
          placeholder="ic_launcher"
        />
      </div>

      <div className="space-y-2.5">
        <SectionTitle>Platforms & format</SectionTitle>
        <div className="flex flex-wrap gap-2">
          <ToggleChip
            active={state.includeAndroid}
            onClick={() => actions.setIncludeAndroid(!state.includeAndroid)}
            label="Android"
          />
          <ToggleChip
            active={state.includeIos}
            onClick={() => actions.setIncludeIos(!state.includeIos)}
            label="iOS"
          />
          <div className="ml-auto flex overflow-hidden rounded-full border border-slate-200">
            {(['png', 'webp'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => actions.setAndroidFormat(f)}
                className={`px-3 py-1.5 text-xs font-bold uppercase ${
                  state.androidFormat === f ? 'bg-primary-600 text-white' : 'bg-white text-slate-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-400">Format applies to Android files; iOS is always PNG.</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5">
        <label className="flex cursor-pointer items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">Badge & advanced</span>
          <input
            type="checkbox"
            checked={state.badge.enabled}
            onChange={(e) => actions.setBadge({ ...state.badge, enabled: e.target.checked })}
            className="h-4 w-4 accent-primary-600"
          />
        </label>
        {state.badge.enabled && (
          <div className="space-y-2.5">
            <input
              type="text"
              value={state.badge.text}
              maxLength={8}
              onChange={(e) => actions.setBadge({ ...state.badge, text: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-400"
              placeholder="Badge text, e.g. NEW"
            />
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Badge colour</span>
              <input
                type="color"
                value={state.badge.background}
                onChange={(e) => actions.setBadge({ ...state.badge, background: e.target.value })}
                className="h-7 w-10 cursor-pointer rounded border border-slate-200 bg-white"
              />
            </div>
          </div>
        )}
        <div className="space-y-2 border-t border-slate-200 pt-3">
          <SectionTitle>Monochrome layer (Android themed icons)</SectionTitle>
          {state.monoUrl ? (
            <div className="flex items-center gap-2">
              <img src={state.monoUrl} alt="" className="h-9 w-9 rounded-lg object-cover shadow" />
              <span className="text-xs font-medium text-emerald-600">Monochrome image set</span>
              <button
                type="button"
                onClick={actions.clearMono}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          ) : (
            <DropzoneBox onFile={actions.handleMono} url={null} label="Add monochrome image (optional)" compact />
          )}
        </div>
      </div>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{state.error}</p>
      )}

      <div className="space-y-2">
        <button
          type="button"
          disabled={!state.foreground || state.generating}
          onClick={() => {
            void actions.generate()
            onDone?.()
          }}
          className="w-full rounded-2xl bg-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state.generating
            ? `Generating… ${state.progress ? `${state.progress.done}/${state.progress.total}` : ''}`
            : 'Download Icons'}
        </button>
        {state.foreground && (
          <button
            type="button"
            onClick={actions.reset}
            className="flex w-full items-center justify-center gap-1.5 py-1 text-xs font-semibold text-slate-400 hover:text-slate-600"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Start over
          </button>
        )}
      </div>
    </div>
  )
}

function ToggleChip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
        active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )
}
