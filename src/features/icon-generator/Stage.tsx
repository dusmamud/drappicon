import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import wallpaperIos from '../../assets/wallpaper-ios.svg'
import wallpaperAndroid from '../../assets/wallpaper-android.svg'
import deviceIphoneFrame from '../../assets/device-iphone-frame.webp'
import deviceAndroidFrame from '../../assets/device-android-frame.webp'
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
        <div className="mt-6 flex items-end justify-center gap-2">
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
      <div className="mt-8 flex items-end justify-center gap-3 min-[420px]:gap-6">
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

/** Small status-bar glyphs drawn as inline SVG (signal / wifi / battery). */
function StatusGlyphs({ dark = false }: { dark?: boolean }) {
  const c = dark ? '#0f172a' : '#ffffff'
  return (
    <span className="flex items-center gap-[5px]" style={{ color: c }}>
      <svg width="15" height="10" viewBox="0 0 16 11" fill={c} aria-hidden="true">
        <rect x="0" y="7" width="3" height="4" rx="0.8" />
        <rect x="4.3" y="5" width="3" height="6" rx="0.8" />
        <rect x="8.6" y="2.6" width="3" height="8.4" rx="0.8" />
        <rect x="12.9" y="0" width="3" height="11" rx="0.8" opacity="0.4" />
      </svg>
      <svg width="14" height="10" viewBox="0 0 16 12" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <path d="M1.5 4.2a10 10 0 0 1 13 0" />
        <path d="M4 6.9a6.4 6.4 0 0 1 8 0" />
        <circle cx="8" cy="10" r="1.15" fill={c} stroke="none" />
      </svg>
      <svg width="22" height="10" viewBox="0 0 25 12" fill="none" aria-hidden="true">
        <rect x="0.6" y="0.6" width="20" height="10.8" rx="3" stroke={c} opacity="0.5" strokeWidth="1" />
        <rect x="2.2" y="2.2" width="14.5" height="7.6" rx="1.8" fill={c} />
        <path d="M23.2 4v4a2.2 2.2 0 0 0 0-4Z" fill={c} opacity="0.6" />
      </svg>
    </span>
  )
}

/** Solve the 3x3 homography mapping src points onto dst points (both [x,y]). */
function homography(src: number[][], dst: number[][]): number[] {
  // Gaussian elimination on the 8x8 DLT system (h33 = 1).
  const A: number[][] = []
  const b: number[] = []
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i]
    const [u, v] = dst[i]
    A.push([-x, -y, -1, 0, 0, 0, u * x, u * y]); b.push(-u)
    A.push([0, 0, 0, -x, -y, -1, v * x, v * y]); b.push(-v)
  }
  const n = 8
  for (let col = 0, row = 0; col < n && row < n; col++, row++) {
    let piv = row
    for (let r = row + 1; r < n; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r
    ;[A[row], A[piv]] = [A[piv], A[row]]
    ;[b[row], b[piv]] = [b[piv], b[row]]
    const d = A[row][col]
    for (let r = 0; r < n; r++) {
      if (r === row) continue
      const f = A[r][col] / d
      for (let c = col; c < n; c++) A[r][c] -= f * A[row][c]
      b[r] -= f * b[row]
    }
  }
  const h = A.map((rowArr, i) => b[i] / rowArr[i])
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1]
}

type DeviceSpec = {
  frame: string
  ratio: string
  quad: [number, number][] // screen corners in image fractions: TL TR BR BL
}

const DEVICES: Record<'ios' | 'android', DeviceSpec> = {
  ios: {
    frame: deviceIphoneFrame,
    ratio: '1561 / 1178',
    quad: [
      [0.490, 0.038],
      [0.900, 0.122],
      [0.430, 0.898],
      [0.080, 0.700],
    ],
  },
  android: {
    frame: deviceAndroidFrame,
    ratio: '981 / 1858',
    quad: [
      [0.150, 0.030],
      [0.918, 0.045],
      [0.828, 0.938],
      [0.058, 0.918],
    ],
  },
}

/**
 * Device renders from Enzurien's own Creestion Studio project (MIT-licensed,
 * see CREDITS.md) with the baked sample UI punched out of the screen area.
 * The live screen (wallpaper + the user's icon) is perspective-warped onto
 * the render's screen plane with a homography, and the frame layer — bezel,
 * Dynamic Island / punch-hole camera, status glyphs — sits on top.
 */
function PhoneMock({ kind, api, captionBelow = false }: { kind: 'ios' | 'android'; api: GeneratorApi; captionBelow?: boolean }) {
  const { state } = api
  const spec = DEVICES[kind]
  const bg = state.backgroundColor === 'transparent' ? '#f1f5f9' : state.backgroundColor
  const padding = state.sizePercent < 0 ? Math.min(45, -state.sizePercent) : 0
  const zoom = state.sizePercent > 0 ? 1 + state.sizePercent / 100 : 1
  const wallpaper = kind === 'ios' ? wallpaperIos : wallpaperAndroid

  const wrapRef = useRef<HTMLDivElement>(null)
  const [matrix, setMatrix] = useState<string | null>(null)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const dst = spec.quad.map(([fx, fy]) => [fx * w, fy * h])
      const [a, b, c, d, e, f, g, i] = homography(
        [
          [0, 0],
          [w, 0],
          [w, h],
          [0, h],
        ],
        dst,
      )
      // CSS matrix3d (column-major) form of the homography.
      setMatrix(`matrix3d(${a}, ${d}, 0, ${g}, ${b}, ${e}, 0, ${i}, 0, 0, 1, 0, ${c}, ${f}, 0, 1)`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [spec])

  return (
    <figure>
      <div ref={wrapRef} className="relative mx-auto h-[148px] min-[420px]:h-[215px] sm:h-[250px] lg:h-[330px]" style={{ aspectRatio: spec.ratio }}>
        {/* Live screen, warped onto the render's screen plane */}
        <div
          className="absolute inset-0"
          style={{ transform: matrix ?? undefined, transformOrigin: '0 0', visibility: matrix ? 'visible' : 'hidden' }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[7%] bg-black">
            <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
            {kind === 'android' && (
              <>
                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[8%] pt-[3.2%]">
                  <span className="text-[11px] font-semibold tracking-wide text-slate-800">9:41</span>
                  <StatusGlyphs dark />
                </div>
                <span className="absolute bottom-[1.6%] left-1/2 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-slate-800/40" />
              </>
            )}
            {/* The user's app icon on the home screen */}
            <div className="absolute left-[10%] top-[13%] w-[23%] text-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-[24%] shadow-[0_4px_10px_rgb(0_0_0/0.3)]" style={{ backgroundColor: bg }}>
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
              <span className="mx-auto mt-[7%] block w-max text-[10px] font-medium text-white" style={{ textShadow: '0 1px 4px rgb(0 0 0 / 0.55)' }}>
                [App name]
              </span>
            </div>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent" />
          </div>
        </div>
        {/* Frame render on top: bezel, camera hardware, baked status glyphs */}
        <img src={spec.frame} alt={kind === 'ios' ? 'iPhone' : 'Android phone'} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600">
        {kind === 'ios' ? <Apple className="h-4 w-4" /> : <AndroidBot className="h-4 w-4" />}
        {kind === 'ios' ? (captionBelow ? 'iPhone' : 'iPhone Preview') : captionBelow ? 'Android' : 'Android Preview'}
      </figcaption>
    </figure>
  )
}
