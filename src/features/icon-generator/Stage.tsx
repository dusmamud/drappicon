import { useCallback, useEffect, useRef, type CSSProperties } from 'react'
import {
  Download,
  Loader2,
  Mail,
  MessageCircle,
  Smartphone,
  SquareTerminal,
} from 'lucide-react'
import type { GeneratorApi } from './useGenerator'
import logo from '../../assets/logo.svg'
import wallpaperIos from '../../assets/wallpaper-ios.jpg'
import wallpaperAndroid from '../../assets/wallpaper-android.jpg'
import frameIphone from '../../assets/frame-iphone.png'
import frameAndroid from '../../assets/frame-android.webp'
import { AndroidBrand, AppleBrand } from './PreviewBits'
import { FormatSwitch } from './Panel'


/** Preview sizing for the Size slider value (-100..100), cross-verified against
 *  the reference's behaviour (REA analysis, 2026-10-20): positive = padding —
 *  the artwork shrinks via the img's own CSS padding (half the total per side);
 *  negative = zoom — a compositor-only transform scale. The img box itself never
 *  changes geometry, so drags stay smooth. Effective padding caps at 95 so the
 *  artwork never fully vanishes (and the ZIP engine uses the same total). */
function sizePreviewStyle(v: number): CSSProperties {
  const padSide = v > 0 ? Math.min(95, v) / 2 : 0
  const zoom = v < 0 ? 1 + -v / 100 : 1
  return {
    padding: padSide ? `${padSide}%` : undefined,
    transform: zoom !== 1 ? `scale(${zoom})` : undefined,
    boxSizing: 'border-box',
  }
}

/** The stage column: brand hero + empty state / live preview. */
export default function Stage({ api, mobile = false }: { api: GeneratorApi; mobile?: boolean }) {
  const { state } = api
  const uploaded = !!state.foregroundUrl
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (uploaded) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [uploaded])

  // Preload the phone frames + wallpapers as soon as the page is visited, so
  // the moment a logo is uploaded the phones render fully — never black.
  useEffect(() => {
    for (const src of [frameIphone, frameAndroid, wallpaperIos, wallpaperAndroid]) {
      const img = new Image()
      img.src = src
      img.decode?.().catch(() => {})
    }
  }, [])

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
          <span className={`font-hand font-bold text-ink dark:text-white ${uploaded ? 'text-4xl' : 'text-5xl'}`}>DrAppIcon</span>
        </div>
        {!uploaded && (
          <>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-[44px]">
              Generate your app icon easily.
            </h1>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">iOS + Adaptive Android Icon</p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <a href="#api" title="DrAppIcon API" className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15">
                <SquareTerminal className="h-5 w-5" />
              </a>
              <a href="mailto:support@drappicon.dusrel.com" title="Email us" className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white text-slate-500 dark:text-slate-400 shadow-sm transition hover:bg-slate-50 dark:bg-night-800 dark:hover:bg-night-700">
                <Mail className="h-5 w-5" />
              </a>
              <a href="mailto:support@drappicon.dusrel.com?subject=DrAppIcon%20feedback" title="Chat with us" className="hidden h-[42px] w-[42px] items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white text-slate-500 dark:text-slate-400 shadow-sm transition hover:bg-slate-50 dark:bg-night-800 dark:hover:bg-night-700 min-[420px]:flex">
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
            className="block w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white/70 px-6 py-16 text-center transition hover:border-primary-300 hover:bg-white dark:bg-white/[0.03] dark:hover:bg-white/5 sm:py-20"
          >
            <span className="flex items-center justify-center gap-5 text-slate-300">
              <AppleBrand className="h-12 w-12" />
              <AndroidBrand className="h-11 w-11" />
            </span>
            <span className="mt-5 block text-xl font-semibold text-slate-800 dark:text-slate-100">Ready to Create?</span>
            <span className="mx-auto mt-2 block max-w-sm text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              Upload an image to see live previews for iOS and Android
            </span>
            <span className="mt-3 block text-sm text-slate-400 dark:text-slate-500">Or drag &amp; drop your image anywhere here</span>
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
      <div className="animate-fade-in rounded-xl border border-slate-200 dark:border-white/10/80 dark:border-white/10 bg-white p-5 shadow-card dark:bg-night-800">
        <h3 className="flex items-center gap-2 text-xl font-bold text-ink dark:text-white">
          <Smartphone className="h-5 w-5 text-slate-500 dark:text-slate-400" /> Live Preview
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
        <div className="mt-6 flex items-start justify-center gap-6">
          <PhoneMock kind="ios" api={api} captionBelow />
          <PhoneMock kind="android" api={api} captionBelow />
        </div>
        <ThemedIconsSection api={api} />
      </div>
    )
  }

  return (
    <div className="animate-fade-in rounded-xl border border-slate-200 dark:border-white/10/80 dark:border-white/10 bg-white p-6 shadow-card dark:bg-night-800">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
          <Smartphone className="h-5 w-5 text-slate-500 dark:text-slate-400" /> Live Preview
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Format:</span>
          <div className="flex rounded-lg bg-slate-100 dark:bg-white/10 p-1">
            {(['png', 'webp'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => actions.setAndroidFormat(f)}
                className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold uppercase transition ${
                  state.androidFormat === f ? 'bg-white text-ink shadow-sm dark:bg-night-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
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
      <div className="mt-10 flex items-start justify-center gap-6 lg:gap-12">
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
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-primary-600 transition-all"
          style={{ width: `${Math.round((state.progress.done / Math.max(1, state.progress.total)) * 100)}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
        {state.progress.label} · {state.progress.done}/{state.progress.total}
      </p>
    </div>
  )
}

function ShapeRow({ api, small = false }: { api: GeneratorApi; small?: boolean }) {
  const { state } = api
  const bg = state.backgroundColor === 'transparent' ? 'transparent' : state.backgroundColor
  return (
    <div className={`${small ? 'mt-6' : 'mt-8'} grid grid-cols-3 gap-4`}>
      {[
        { label: 'Round Icon', cls: 'rounded-full' },
        { label: 'Squircle', cls: 'rounded-[28%]' },
        { label: 'Legacy Icon', cls: 'rounded-[18%]' },
      ].map((s) => (
        <figure key={s.label} className="text-center">
          <div
            className={`relative mx-auto aspect-square w-full ${small ? 'max-w-[104px]' : 'max-w-[132px]'} overflow-hidden app-icon-shadow ${s.cls} ${bg === 'transparent' ? 'checkerboard' : ''}`}
            style={bg === 'transparent' ? undefined : { backgroundColor: bg }}
          >
            <img
              src={state.foregroundUrl!}
              alt={s.label}
              className="absolute inset-0 h-full w-full object-contain"
              style={sizePreviewStyle(state.sizePercent)}
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
          <figcaption className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">{s.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

type DeviceSpec = {
  frame: string
  ratio: string
  frameW: number
  frameH: number
  /** Screen cutout as % of the frame image: [left, top, width, height]. */
  screen: [number, number, number, number]
  /** Screen corner radius: [x% of screen width, y% of screen height]. */
  radius: string
}

/**
 * Straight front-facing device frames from Enzurien's own Creestion Studio
 * project (geometry measured in its src/cli/frame.ts; artwork credits in
 * CREDITS.md). Each frame has a transparent screen cutout; the live screen
 * (wallpaper + the user's icon) sits underneath it.
 *
 * Presentation follows the reference behaviour measured live via REA/CDP on
 * 2026-10-19: no status bar or home indicator on the screens; desktop shows
 * the top ~54% of each phone with a floating white caption pill over the
 * crop; mobile shows the full phones with a small caption below.
 */
const DEVICES: Record<'ios' | 'android', DeviceSpec> = {
  ios: {
    frame: frameIphone,
    ratio: '606 / 1252',
    frameW: 606,
    frameH: 1252,
    screen: [(24 / 606) * 100, (21 / 1252) * 100, (557 / 606) * 100, (1210 / 1252) * 100],
    radius: `${(82 / 557) * 100}% / ${(82 / 1210) * 100}%`,
  },
  android: {
    frame: frameAndroid,
    ratio: '1410 / 2968',
    frameW: 1410,
    frameH: 2968,
    screen: [(59 / 1410) * 100, (60 / 2968) * 100, (1280 / 1410) * 100, (2856 / 2968) * 100],
    radius: `${(178 / 1280) * 100}% / ${(178 / 2856) * 100}%`,
  },
}

const THEMED_VARIANTS = [
  { label: 'Blue', bg: '#3b82f6', filter: 'brightness(0) invert(1)' },
  { label: 'Green', bg: '#22c55e', filter: 'brightness(0) invert(1)' },
  { label: 'Dark', bg: '#1f2937', filter: 'brightness(0) invert(1)' },
  { label: 'Light', bg: '#f3f4f6', filter: 'brightness(0)' },
] as const

/**
 * Platform status bars drawn for the phone screens — iOS and Android get
 * deliberately different designs (Enzurien's ask, 2026-10-19): iOS = white
 * semibold time + bar signal + fan wifi + pill battery; Android = dark
 * medium time with a notification dot + filled-fan wifi + stair signal +
 * squarer battery. Sizes shrink on the mobile preview phones.
 */
function StatusBar({ kind, mobile }: { kind: 'ios' | 'android'; mobile: boolean }) {
  const ios = kind === 'ios'
  const c = '#1e293b' // both platforms dark (Enzurien: iPhone status bar bhi Android jaise dark)
  const timeSize = mobile ? 7 : 12
  const gh = mobile ? 7 : 11 // glyph height px
  return (
    <div
      className="absolute inset-x-0 top-0 flex items-center justify-between"
      style={{ height: '5.6%', paddingLeft: ios ? '9%' : '7%', paddingRight: ios ? '7.5%' : '7%' }}
    >
      <span className="flex items-center" style={{ gap: mobile ? 2 : 4 }}>
        <span
          className={ios ? 'font-semibold tracking-wide' : 'font-medium'}
          style={{ fontSize: timeSize, color: c, lineHeight: 1 }}
        >
          9:41
        </span>
        {!ios && <span className="rounded-full" style={{ width: mobile ? 2.5 : 4, height: mobile ? 2.5 : 4, backgroundColor: c, opacity: 0.75 }} />}
      </span>
      <span className="flex items-center" style={{ gap: mobile ? 2.5 : 5 }}>
        {ios ? (
          <>
            {/* iOS signal: four rounded bars */}
            <svg height={gh} viewBox="0 0 18 11" fill={c} aria-hidden>
              <rect x="0" y="7" width="3" height="4" rx="0.9" />
              <rect x="4.8" y="5" width="3" height="6" rx="0.9" />
              <rect x="9.6" y="2.5" width="3" height="8.5" rx="0.9" />
              <rect x="14.4" y="0" width="3" height="11" rx="0.9" />
            </svg>
            {/* iOS wifi: stroked fan arcs */}
            <svg height={gh} viewBox="0 0 16 11" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" aria-hidden>
              <path d="M1.6 3.4a10.5 10.5 0 0 1 12.8 0" />
              <path d="M4.2 6.1a6.8 6.8 0 0 1 7.6 0" />
              <circle cx="8" cy="9.2" r="1.05" fill={c} stroke="none" />
            </svg>
            {/* iOS battery: soft pill outline + fill + nub */}
            <svg height={gh} viewBox="0 0 27 12" aria-hidden>
              <rect x="0.6" y="0.6" width="21.8" height="10.8" rx="3.4" fill="none" stroke={c} strokeOpacity="0.45" strokeWidth="1.1" />
              <rect x="2.2" y="2.2" width="15.5" height="7.6" rx="2" fill={c} />
              <path d="M24.6 4v4a2.4 2.4 0 0 0 0-4Z" fill={c} fillOpacity="0.5" />
            </svg>
          </>
        ) : (
          <>
            {/* Android wifi: filled fan */}
            <svg height={gh} viewBox="0 0 16 11" fill={c} aria-hidden>
              <path d="M8 10.6 1.2 3.9a11.5 11.5 0 0 1 13.6 0L8 10.6Z" opacity="0.95" />
              <path d="M8 10.6 4.1 6.7a6.4 6.4 0 0 1 7.8 0L8 10.6Z" />
            </svg>
            {/* Android signal: stair/triangle bars */}
            <svg height={gh} viewBox="0 0 16 11" fill={c} aria-hidden>
              <rect x="0" y="8" width="2.8" height="3" rx="0.6" />
              <rect x="4.2" y="5.8" width="2.8" height="5.2" rx="0.6" />
              <rect x="8.4" y="3.4" width="2.8" height="7.6" rx="0.6" />
              <rect x="12.6" y="0.8" width="2.8" height="10.2" rx="0.6" />
            </svg>
            {/* Android battery: squarer outline + fill + nub */}
            <svg height={gh} viewBox="0 0 25 12" aria-hidden>
              <rect x="0.6" y="0.6" width="20.5" height="10.8" rx="2" fill="none" stroke={c} strokeOpacity="0.55" strokeWidth="1.1" />
              <rect x="2.2" y="2.2" width="13.5" height="7.6" rx="1" fill={c} />
              <path d="M23.2 3.8v4.4a2.2 2.2 0 0 0 0-4.4Z" fill={c} fillOpacity="0.6" />
            </svg>
          </>
        )}
      </span>
    </div>
  )
}

function PhoneMock({ kind, api, captionBelow = false }: { kind: 'ios' | 'android'; api: GeneratorApi; captionBelow?: boolean }) {
  const { state } = api
  const spec = DEVICES[kind]
  const mobile = captionBelow
  const bg = state.backgroundColor === 'transparent' ? '#f1f5f9' : state.backgroundColor
  const wallpaper = kind === 'ios' ? wallpaperIos : wallpaperAndroid
  const [sx, sy, sw, sh] = spec.screen
  const iconW = mobile ? '25%' : '14%'
  const iconRadius = kind === 'ios' ? '22%' : '16%'

  const phone = (
    <div className="relative w-full" style={{ aspectRatio: spec.ratio }}>
      {/* Live screen inside the frame's transparent cutout */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${sx}%`,
          top: `${sy}%`,
          width: `${sw}%`,
          height: `${sh}%`,
          borderRadius: spec.radius,
          backgroundColor: kind === 'ios' ? '#3b1560' : '#a9d7f5',
        }}
      >
        <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <StatusBar kind={kind} mobile={mobile} />
        {/* App icon + name, as on a home screen */}
        <div className="absolute flex flex-col items-center" style={{ left: '9%', top: '10.5%', width: iconW }}>
          <div
            className="relative aspect-square w-full overflow-hidden shadow-lg"
            style={{ backgroundColor: bg, borderRadius: iconRadius }}
          >
            <img
              src={state.foregroundUrl!}
              alt="App icon on device"
              className="absolute inset-0 h-full w-full object-contain"
              style={sizePreviewStyle(state.sizePercent)}
            />
            {state.badge.enabled && (
              <span
                className="absolute inset-x-0 bottom-0 py-px text-center font-semibold leading-none"
                style={{ backgroundColor: state.badge.background, color: state.badge.color, fontSize: mobile ? 4 : 6 }}
              >
                {state.badge.text || 'NEW'}
              </span>
            )}
          </div>
          <span
            className="mt-1 whitespace-nowrap font-medium text-white"
            style={{ fontSize: mobile ? 6 : 9, textShadow: '0 1px 3px rgb(0 0 0 / 0.4)' }}
          >
            {mobile ? 'App name' : '[App name]'}
          </span>
        </div>
        {/* Themed-icons demo on the Android phone (desktop only) */}
        {kind === 'android' && state.monoUrl && !mobile && (
          <div className="absolute" style={{ left: '9%', top: '30%', width: '82%' }}>
            <div className="mb-2 flex w-max items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-[10px] font-medium text-white">Themed Icons Demo</span>
            </div>
            <div className="flex gap-3">
              {THEMED_VARIANTS.slice(0, 3).map((v) => (
                <div key={v.label} className="text-center" style={{ width: '18.5%' }}>
                  <div className="relative aspect-square w-full overflow-hidden shadow-lg" style={{ backgroundColor: v.bg, borderRadius: '16%' }}>
                    <img
                      src={state.monoUrl ?? undefined}
                      alt={`${v.label} themed icon`}
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{ ...sizePreviewStyle(state.sizePercent), filter: v.filter }}
                    />
                  </div>
                  <span className="mt-1 block text-[8px] font-medium text-white" style={{ textShadow: '0 1px 3px rgb(0 0 0 / 0.4)' }}>
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Bezel art on top: body, buttons, Dynamic Island / punch-hole camera */}
      <img src={spec.frame} alt={kind === 'ios' ? 'iPhone' : 'Android phone'} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  )

  if (mobile) {
    return (
      <figure className="w-[150px] max-w-[46vw]">
        <div className="drop-shadow-[0_16px_22px_rgb(15_23_42/0.22)]">{phone}</div>
        <figcaption className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 dark:text-slate-300">
          {kind === 'ios' ? <AppleBrand className="h-3 w-3" /> : <AndroidBrand className="h-3 w-3" />}
          {kind === 'ios' ? 'iPhone' : 'Android'}
        </figcaption>
      </figure>
    )
  }

  // Desktop: only the top ~54% of the phone is visible; a white caption pill
  // floats over the lower part of the crop (reference behaviour).
  const cropRatio = `${spec.frameW} / ${Math.round(spec.frameH * 0.54)}`
  return (
    <figure className="w-[330px] max-w-[44vw]">
      <div className="relative overflow-hidden drop-shadow-[0_16px_22px_rgb(15_23_42/0.22)]" style={{ aspectRatio: cropRatio }}>
        <div className="absolute inset-x-0 top-0">{phone}</div>
        <span className="absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm">
          {kind === 'ios' ? <AppleBrand className="h-4 w-4 text-gray-900" /> : <AndroidBrand className="h-4 w-4" />}
          <span className="text-sm font-medium text-gray-900">{kind === 'ios' ? 'iPhone Preview' : 'Android Preview'}</span>
        </span>
      </div>
    </figure>
  )
}

/** Mobile-only themed icons section under the phones (reference behaviour). */
function ThemedIconsSection({ api }: { api: GeneratorApi }) {
  const { state } = api
  if (!state.monoUrl) return null
  const monoUrl = state.monoUrl
  return (
    <div className="mt-6 rounded-lg bg-gray-50 dark:bg-white/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-slate-200">Android Themed Icons Preview</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {THEMED_VARIANTS.map((v) => (
          <div key={v.label} className="text-center">
            <div className="relative mx-auto aspect-square w-10 overflow-hidden rounded-lg shadow-lg" style={{ backgroundColor: v.bg }}>
              <img
                src={monoUrl}
                alt={`${v.label} themed icon`}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ ...sizePreviewStyle(state.sizePercent), filter: v.filter }}
              />
              {state.badge.enabled && (
                <span
                  className="absolute inset-x-0 bottom-0 py-px text-center font-semibold leading-none"
                  style={{ backgroundColor: state.badge.background, color: state.badge.color, fontSize: 4 }}
                >
                  {state.badge.text || 'NEW'}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">{v.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
