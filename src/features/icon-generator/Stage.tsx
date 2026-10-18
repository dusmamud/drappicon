import { useCallback, useEffect, useRef } from 'react'
import {
  Apple,
  Coffee,
  Download,
  Loader2,
  Mail,
  MessageCircle,
  Smartphone,
  SquareTerminal,
} from 'lucide-react'
import type { GeneratorApi } from './useGenerator'
import logo from '../../assets/logo.svg'
import { AndroidBot } from './PreviewBits'
import { FormatSwitch } from './Panel'

/** The stage column: brand hero + empty state / live preview. */
export default function Stage({ api, mobile = false }: { api: GeneratorApi; mobile?: boolean }) {
  const { state } = api
  const uploaded = !!state.foregroundUrl
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (uploaded) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [uploaded])

  const pickFile = useCallback(() => {
    if (mobile) {
      document.querySelector<HTMLInputElement>('[data-mobile-root] input[data-mobile-upload]')?.click()
    } else {
      document.querySelector<HTMLInputElement>('[data-panel-root] input[type="file"]')?.click()
    }
  }, [mobile])

  return (
    <div>
      {/* Brand hero */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <img src={logo} alt="DrAppIcon logo" className={uploaded ? 'h-12 w-12' : 'h-20 w-20'} />
          <span className={`font-hand font-bold text-ink ${uploaded ? 'text-4xl' : 'text-5xl'}`}>DrAppIcon</span>
        </div>
        {!uploaded && (
          <>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-[44px]">
              Generate your app icon easily.
            </h1>
            <p className="mt-3 text-lg text-slate-500">iOS + Adaptive Android Icon</p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <a
                href="https://www.buymeacoffee.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#ffdd00] px-4 py-2.5 text-[15px] font-bold text-slate-900 shadow-sm transition hover:brightness-95"
              >
                <Coffee className="h-[18px] w-[18px]" /> Buy me a coffee
              </a>
              <a href="#api" title="DrAppIcon API" className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm transition hover:bg-slate-800">
                <SquareTerminal className="h-5 w-5" />
              </a>
              <a href="mailto:support@drappicon.dusrel.com" title="Email us" className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50">
                <Mail className="h-5 w-5" />
              </a>
              <a href="mailto:support@drappicon.dusrel.com?subject=DrAppIcon%20feedback" title="Chat with us" className="hidden h-[42px] w-[42px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 min-[420px]:flex">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </>
        )}
      </div>

      {/* Stage card */}
      <div ref={cardRef} className="mt-8 scroll-mt-6">
        {!uploaded ? (
          <button
            type="button"
            onClick={pickFile}
            className="block w-full rounded-xl border-2 border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center transition hover:border-primary-300 hover:bg-white sm:py-20"
          >
            <span className="flex items-center justify-center gap-5 text-slate-300">
              <Apple className="h-12 w-12" />
              <AndroidBot className="h-11 w-11" />
            </span>
            <span className="mt-5 block text-xl font-semibold text-slate-800">Ready to Create?</span>
            <span className="mx-auto mt-2 block max-w-sm text-[15px] leading-relaxed text-slate-500">
              Upload an image to see live previews for iOS and Android
            </span>
            <span className="mt-3 block text-sm text-slate-400">Or drag &amp; drop your image anywhere here</span>
          </button>
        ) : (
          <LivePreview api={api} mobile={mobile} />
        )}
      </div>
    </div>
  )
}

function LivePreview({ api, mobile }: { api: GeneratorApi; mobile: boolean }) {
  const { state, actions } = api

  if (mobile) {
    return (
      <div className="animate-fade-in rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
        <h3 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Smartphone className="h-5 w-5 text-slate-500" /> Live Preview
        </h3>
        <div className="mt-5">
          <FormatSwitch api={api} label="Android Output Format" />
        </div>
        <button
          type="button"
          onClick={actions.generate}
          disabled={state.generating}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-base font-bold text-white shadow-md transition active:scale-[0.99] disabled:opacity-60"
        >
          {state.generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          {state.generating ? 'Generating…' : 'Download Icons'}
        </button>
        <ProgressBar api={api} />
        <ShapeRow api={api} small />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <PhoneMock kind="ios" api={api} captionBelow />
          <PhoneMock kind="android" api={api} captionBelow />
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in rounded-xl border border-slate-200/80 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Smartphone className="h-5 w-5 text-slate-500" /> Live Preview
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Format:</span>
          <div className="flex rounded-lg bg-slate-100 p-1">
            {(['png', 'webp'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => actions.setAndroidFormat(f)}
                className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold uppercase transition ${
                  state.androidFormat === f ? 'bg-white text-ink shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={actions.generate}
            disabled={state.generating}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-60"
          >
            {state.generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {state.generating ? 'Generating…' : 'Download'}
          </button>
        </div>
      </div>
      <ProgressBar api={api} />
      <ShapeRow api={api} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <PhoneMock kind="ios" api={api} />
        <PhoneMock kind="android" api={api} />
      </div>
    </div>
  )
}

function ProgressBar({ api }: { api: GeneratorApi }) {
  const { state } = api
  if (!state.progress) return null
  return (
    <div className="mt-4">
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary-600 transition-all"
          style={{ width: `${Math.round((state.progress.done / Math.max(1, state.progress.total)) * 100)}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-400">
        {state.progress.label} · {state.progress.done}/{state.progress.total}
      </p>
    </div>
  )
}

function ShapeRow({ api, small = false }: { api: GeneratorApi; small?: boolean }) {
  const { state } = api
  const bg = state.backgroundColor === 'transparent' ? 'transparent' : state.backgroundColor
  const padding = state.sizePercent < 0 ? Math.min(45, -state.sizePercent) : 0
  const zoom = state.sizePercent > 0 ? 1 + state.sizePercent / 100 : 1
  return (
    <div className={`${small ? 'mt-6' : 'mt-8'} grid grid-cols-3 gap-4`}>
      {[
        { label: 'Round Icon', cls: 'rounded-full' },
        { label: 'Squircle', cls: 'rounded-[28%]' },
        { label: 'Legacy Icon', cls: 'rounded-[18%]' },
      ].map((s) => (
        <figure key={s.label} className="text-center">
          <div
            className={`relative mx-auto aspect-square w-full ${small ? 'max-w-[104px]' : 'max-w-[132px]'} overflow-hidden shadow-md ${s.cls} ${bg === 'transparent' ? 'checkerboard' : ''}`}
            style={bg === 'transparent' ? undefined : { backgroundColor: bg }}
          >
            <img
              src={state.foregroundUrl!}
              alt={s.label}
              className="absolute object-contain"
              style={{
                inset: `${padding}%`,
                width: `${100 - padding * 2}%`,
                height: `${100 - padding * 2}%`,
                transform: `scale(${zoom})`,
              }}
            />
            {state.badge.enabled && (
              <span
                className="absolute inset-x-0 top-[9%] py-[3%] text-center font-extrabold uppercase leading-none"
                style={{
                  backgroundColor: state.badge.background,
                  color: state.badge.color,
                  fontSize: 'clamp(8px, 1.4vw, 13px)',
                }}
              >
                {state.badge.text || 'NEW'}
              </span>
            )}
          </div>
          <figcaption className="mt-2.5 text-sm text-slate-500">{s.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/** CSS-built phone mockups (original artwork — generic device frames). */
function PhoneMock({ kind, api, captionBelow = false }: { kind: 'ios' | 'android'; api: GeneratorApi; captionBelow?: boolean }) {
  const { state } = api
  const bg = state.backgroundColor === 'transparent' ? '#f1f5f9' : state.backgroundColor
  const padding = state.sizePercent < 0 ? Math.min(45, -state.sizePercent) : 0
  const zoom = state.sizePercent > 0 ? 1 + state.sizePercent / 100 : 1
  return (
    <figure>
      <div
        className={`relative mx-auto aspect-[9/19] w-full overflow-hidden rounded-[2rem] border-[5px] border-slate-900 bg-slate-900 shadow-lg ${captionBelow ? '' : 'max-w-[320px]'}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              kind === 'ios'
                ? 'linear-gradient(165deg,#93c5fd 0%,#1e40af 48%,#7c2d12 82%,#f97316 115%)'
                : 'linear-gradient(160deg,#ccfbf1 0%,#5eead4 45%,#0ea5e9 130%)',
          }}
        />
        {kind === 'ios' ? (
          <span className="absolute left-1/2 top-2.5 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
        ) : (
          <span className="absolute left-1/2 top-3 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-black ring-2 ring-black/20" />
        )}
        <div className="absolute left-[12%] top-[13%] w-[24%] text-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-[24%] shadow-md" style={{ backgroundColor: bg }}>
            <img
              src={state.foregroundUrl!}
              alt="App icon on device"
              className="absolute object-contain"
              style={{
                inset: `${padding}%`,
                width: `${100 - padding * 2}%`,
                height: `${100 - padding * 2}%`,
                transform: `scale(${zoom})`,
              }}
            />
          </div>
          <span className="mx-auto mt-1.5 block w-max text-[10px] font-medium text-white drop-shadow">[App name]</span>
        </div>
        {!captionBelow && (
          <span className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow">
            {kind === 'ios' ? <Apple className="h-3.5 w-3.5" /> : <AndroidBot className="h-3.5 w-3.5" />}
            {kind === 'ios' ? 'iPhone Preview' : 'Android Preview'}
          </span>
        )}
      </div>
      {captionBelow && (
        <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600">
          {kind === 'ios' ? <Apple className="h-4 w-4" /> : <AndroidBot className="h-4 w-4" />}
          {kind === 'ios' ? 'iPhone' : 'Android'}
        </figcaption>
      )}
    </figure>
  )
}
