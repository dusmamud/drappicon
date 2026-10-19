import { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDashed,
  Contrast,
  Pipette,
  Upload,
  UploadCloud,
  X,
} from 'lucide-react'
import { Link } from 'react-router'
import type { GeneratorApi } from './useGenerator'
import { MAX_FILE_BYTES } from './useGenerator'

// Brand-neutral background presets offered in the colour popover.
const PRESETS = [
  '#ffffff', '#000000', '#2563eb', '#7c3aed', '#db2777', '#dc2626',
  '#ea580c', '#f59e0b', '#16a34a', '#0d9488', '#0891b2', '#64748b',
]

function isLight(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!m) return true
  const n = parseInt(m[1], 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

/** Big two-option format switch (PNG / WebP) used on mobile surfaces. */
export function FormatSwitch({ api, label }: { api: GeneratorApi; label?: string }) {
  const { state, actions } = api
  const opts = [
    { v: 'png', t: 'PNG', s: 'Lossless quality' },
    { v: 'webp', t: 'WebP', s: 'Smaller files' },
  ] as const
  return (
    <div>
      {label && <p className="text-[15px] font-semibold text-slate-700 dark:text-slate-200">{label}</p>}
      <div className="mt-2.5 flex rounded-2xl bg-slate-100 dark:bg-white/10 p-1.5">
        {opts.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => actions.setAndroidFormat(o.v)}
            className={`flex-1 rounded-xl px-3 py-3 text-center transition ${
              state.androidFormat === o.v ? 'bg-white shadow dark:bg-night-600' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className={`block text-[15px] font-bold ${state.androidFormat === o.v ? 'text-ink dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{o.t}</span>
            <span className="mt-0.5 block text-xs text-slate-400 dark:text-slate-500">{o.s}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * The customize controls. `card` = desktop sidebar card ("Upload & Customize");
 * `sheet` = mobile bottom-sheet body (plain fields, sheet-style labels, format switch).
 */
export default function Panel({ api, variant = 'card' }: { api: GeneratorApi; variant?: 'card' | 'sheet' }) {
  const { state, actions } = api
  const sheet = variant === 'sheet'
  const [advOpen, setAdvOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const dz = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_BYTES,
    accept: { 'image/png': [], 'image/jpeg': [], 'image/svg+xml': [], 'image/webp': [] },
    onDropAccepted: (files) => files[0] && actions.handleForeground(files[0]),
    onDropRejected: () => actions.setError('Please choose a PNG, JPG, SVG or WebP file under 10 MB.'),
  })
  const monoDz = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_BYTES,
    accept: { 'image/png': [], 'image/jpeg': [], 'image/svg+xml': [], 'image/webp': [] },
    onDropAccepted: (files) => files[0] && actions.handleMono(files[0]),
    onDropRejected: () => actions.setError('That monochrome file could not be used.'),
  })

  const bg = state.backgroundColor
  const bgIsTransparent = bg === 'transparent'
  const bgTextLight = bgIsTransparent ? false : !isLight(bg)
  const labelCls = sheet ? 'text-[15px] font-semibold text-slate-700 dark:text-slate-200' : 'text-[13px] font-semibold text-slate-700 dark:text-slate-200'

  const body = (
    <>
      {!sheet && (
        <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink dark:text-white">
          <Upload className="h-[18px] w-[18px] text-slate-500 dark:text-slate-400" />
          Upload &amp; Customize
        </h2>
      )}

      {/* Foreground image */}
      <p className={`${sheet ? '' : 'mt-5'} ${labelCls}`}>Foreground Image{sheet ? '' : ':'}</p>
      <div
        {...dz.getRootProps()}
        className={`mt-2 cursor-pointer rounded-lg border-2 border-dashed text-center transition ${
          sheet ? 'px-4 py-5' : 'px-4 py-3.5'
        } ${
          state.foregroundUrl
            ? 'border-green-400 bg-green-50/70 hover:bg-green-50'
            : dz.isDragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
              : 'border-primary-300 bg-primary-50 dark:bg-primary-500/10/50 dark:bg-primary-50 dark:bg-primary-500/100/5 hover:bg-primary-50 dark:bg-primary-500/10'
        }`}
      >
        <input {...dz.getInputProps()} />
        {state.foregroundUrl ? (
          <span className="flex items-center justify-center gap-3">
            <img
              src={state.foregroundUrl}
              alt="Foreground"
              className={`${sheet ? 'h-14 w-14' : 'h-10 w-10'} rounded-lg object-contain shadow-sm`}
            />
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <Check className="h-4 w-4" /> {sheet ? 'Tap to change' : 'Click to change'}
            </span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-500/15 text-primary-600">
              <UploadCloud className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-semibold text-slate-800 dark:text-slate-100">Drop image here or click to upload</span>
              <span className="block text-xs font-medium text-primary-600">PNG, JPG, SVG up to 10MB</span>
            </span>
          </span>
        )}
      </div>

      {/* Size */}
      {sheet ? (
        <p className={`mt-6 ${labelCls}`}>
          Size: <span className="font-normal text-slate-500 dark:text-slate-400">{state.sizePercent}% zoom</span>
        </p>
      ) : (
        <div className="mt-5 flex items-baseline justify-between">
          <p className={labelCls}>Size:</p>
          <p className="text-[13px] text-slate-500 dark:text-slate-400">{state.sizePercent}% zoom</p>
        </div>
      )}
      <input
        type="range"
        min={-50}
        max={50}
        step={1}
        value={state.sizePercent}
        onChange={(e) => actions.setSizePercent(Number(e.target.value))}
        className="drapp-range mt-2.5 w-full"
        aria-label="Icon size"
      />
      <div className="mt-1 flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Zoom</span>
        <span>Normal</span>
        <span>Padding</span>
      </div>

      {/* Background colour */}
      <p className={`mt-5 ${labelCls}`}>Background Color{sheet ? '' : ':'}</p>
      <div className="relative" ref={pickerRef}>
        <button
          type="button"
          onClick={() => setPickerOpen((o) => !o)}
          className={`mt-2 flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
            bgIsTransparent ? 'checkerboard text-slate-700 dark:text-slate-200' : ''
          }`}
          style={
            bgIsTransparent
              ? undefined
              : { backgroundColor: bg, color: bgTextLight ? '#fff' : '#0f172a', borderColor: 'rgb(15 23 42 / 0.12)' }
          }
        >
          <span className="mx-auto flex items-center gap-2 tracking-wide">
            {bgIsTransparent ? 'Transparent' : bg.toUpperCase()}
          </span>
          <Pipette className="h-4 w-4 shrink-0 opacity-80" />
        </button>
        {pickerOpen && (
          <div className="animate-pop-in absolute left-0 right-0 top-full z-30 mt-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white p-3.5 shadow-pop dark:border-white/10 dark:bg-night-800">
            <div className="grid grid-cols-6 gap-2">
              {PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  onClick={() => actions.setBackgroundColor(c)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900/10 transition hover:scale-110"
                  style={{ backgroundColor: c }}
                >
                  {bg === c && <Check className={`h-4 w-4 ${isLight(c) ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`} />}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200 dark:border-white/10" title="Custom colour">
                <span className="absolute inset-0 bg-[conic-gradient(#ef4444,#f59e0b,#84cc16,#06b6d4,#8b5cf6,#ef4444)]" />
                <input
                  type="color"
                  value={bgIsTransparent ? '#ffffff' : bg}
                  onChange={(e) => actions.setBackgroundColor(e.target.value)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
              <input
                value={bgIsTransparent ? '' : bg}
                placeholder="#RRGGBB"
                onChange={(e) => {
                  const v = e.target.value.trim()
                  if (/^#[0-9a-fA-F]{6}$/.test(v)) actions.setBackgroundColor(v.toLowerCase())
                }}
                className="h-9 w-full rounded-lg border border-slate-200 dark:border-white/10 px-2.5 text-[13px] font-medium uppercase outline-none focus:border-primary-400"
              />
              <button
                type="button"
                onClick={() => actions.setBackgroundColor('transparent')}
                className={`flex h-9 shrink-0 items-center gap-1 rounded-lg border px-2.5 text-xs font-semibold ${
                  bgIsTransparent ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5'
                }`}
              >
                <CircleDashed className="h-3.5 w-3.5" /> None
              </button>
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-slate-400 dark:text-slate-500">
              iOS icons are always exported on a solid colour; transparency applies to Android only.
            </p>
          </div>
        )}
      </div>

      {/* Android file name */}
      <p className={`mt-5 ${labelCls}`}>Android File Name{sheet ? '' : ':'}</p>
      <input
        value={state.fileName}
        onChange={(e) => actions.setFileName(e.target.value.replace(/[^\w-]/g, '') || 'ic_launcher')}
        className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-primary-500/25"
        placeholder="ic_launcher"
      />

      {/* Mobile sheet: output format lives here too */}
      {sheet && (
        <div className="mt-6">
          <FormatSwitch api={api} label="Android Output Format" />
        </div>
      )}

      {/* Advanced */}
      <div className="mt-5 border-t border-slate-100 dark:border-white/5 pt-4">
        <button type="button" onClick={() => setAdvOpen((o) => !o)} className="flex w-full items-center justify-between">
          <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">Advanced Customization</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition ${advOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className="mt-2.5 flex gap-2">
          <span className="rounded-full bg-primary-100 dark:bg-primary-500/15 px-2.5 py-1 text-[11px] font-semibold text-primary-700">Badge</span>
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">Monochrome</span>
        </div>
        {advOpen && (
          <div className="animate-fade-in mt-4 space-y-5">
            <div>
              <label className="flex cursor-pointer items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                  <BadgeCheck className="h-4 w-4 text-primary-600" /> Badge text
                </span>
                <input
                  type="checkbox"
                  checked={state.badge.enabled}
                  onChange={(e) => actions.setBadge({ ...state.badge, enabled: e.target.checked })}
                  className="h-[18px] w-[18px] accent-primary-600"
                />
              </label>
              {state.badge.enabled && (
                <div className="mt-3 space-y-2.5">
                  <input
                    value={state.badge.text}
                    maxLength={10}
                    onChange={(e) => actions.setBadge({ ...state.badge, text: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-slate-200 dark:border-white/10 px-3 py-2 text-sm font-semibold uppercase outline-none focus:border-primary-400"
                    placeholder="NEW"
                  />
                  <div className="flex gap-2">
                    <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <input type="color" value={state.badge.background} onChange={(e) => actions.setBadge({ ...state.badge, background: e.target.value })} className="h-6 w-8 cursor-pointer bg-transparent" />
                      Badge
                    </label>
                    <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <input type="color" value={state.badge.color} onChange={(e) => actions.setBadge({ ...state.badge, color: e.target.value })} className="h-6 w-8 cursor-pointer bg-transparent" />
                      Text
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                <Contrast className="h-4 w-4 text-primary-600" /> Monochrome layer
                <span className="font-normal text-slate-400 dark:text-slate-500">(Android 13+ themed icons)</span>
              </p>
              {state.monoUrl ? (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 px-3 py-2">
                  <img src={state.monoUrl} alt="Monochrome" className="h-9 w-9 rounded-md object-contain" />
                  <span className="flex-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">Themed layer added</span>
                  <button type="button" onClick={actions.clearMono} className="rounded-md p-1 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 dark:bg-white/10 hover:text-slate-600 dark:text-slate-300" aria-label="Remove monochrome layer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div {...monoDz.getRootProps()} className="mt-2 cursor-pointer rounded-xl border-2 border-dashed border-slate-200 dark:border-white/10 px-3 py-3 text-center text-[13px] font-medium text-slate-500 dark:text-slate-400 transition hover:border-primary-300 hover:text-primary-600">
                  <input {...monoDz.getInputProps()} />
                  Upload a single-colour version (optional)
                </div>
              )}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">Include in ZIP</p>
              <div className="mt-2 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="checkbox" checked={state.includeAndroid} onChange={(e) => actions.setIncludeAndroid(e.target.checked)} className="h-[18px] w-[18px] accent-primary-600" />
                  Android
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="checkbox" checked={state.includeIos} onChange={(e) => actions.setIncludeIos(e.target.checked)} className="h-[18px] w-[18px] accent-primary-600" />
                  iOS
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discover more (desktop card only) */}
      {!sheet && (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10/80 dark:border-white/10">
          <p className="bg-primary-50 dark:bg-primary-500/10 px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100">Discover more</p>
          {[
            { label: 'App Icon Generator', to: '#editor' },
            { label: 'Icon setup guides', to: '#instructions' },
            { label: 'Support DrAppIcon', to: '/support-us' },
          ].map((l) =>
            l.to.startsWith('#') ? (
              <a key={l.label} href={l.to} className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 px-4 py-3 text-[15px] text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5">
                {l.label}
                <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </a>
            ) : (
              <Link key={l.label} to={l.to} className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 px-4 py-3 text-[15px] text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5">
                {l.label}
                <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </Link>
            ),
          )}
        </div>
      )}
    </>
  )

  if (sheet) return <div>{body}</div>
  return <div className="rounded-xl border border-slate-200 dark:border-white/10/80 dark:border-white/10 bg-white p-5 shadow-card dark:border-white/10 dark:bg-night-800">{body}</div>
}
