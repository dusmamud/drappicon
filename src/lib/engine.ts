// DrAppIcon — client-side icon generation engine.
// Everything renders on <canvas> in the browser; no image ever leaves the device.

export interface BadgeOptions {
  enabled: boolean
  text: string
  background: string
  color: string
}

export interface IconSetOptions {
  foreground: HTMLImageElement
  monochrome: HTMLImageElement | null
  backgroundColor: string // '#rrggbb' or 'transparent'
  padding: number // 0..45 (percent of the canvas kept as margin around the artwork)
  fileName: string // e.g. 'ic_launcher'
  androidFormat: 'png' | 'webp'
  badge: BadgeOptions
  includeAndroid: boolean
  includeIos: boolean
}

export type ProgressFn = (done: number, total: number, label: string) => void

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image file.'))
    }
    img.src = url
  })
}

/** Most frequent colour in the centre of the image, quantized — used to auto-pick the background. */
export function getDominantColor(img: HTMLImageElement): string {
  const S = 64
  const c = document.createElement('canvas')
  c.width = S
  c.height = S
  const ctx = c.getContext('2d')!
  ctx.drawImage(img, 0, 0, S, S)
  let data: Uint8ClampedArray
  try {
    data = ctx.getImageData(0, 0, S, S).data
  } catch {
    return '#8b5cf6'
  }
  const bins = new Map<number, { count: number; r: number; g: number; b: number }>()
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]
    if (a < 200) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const k = ((r >> 5) << 6) + ((g >> 5) << 3) + (b >> 5)
    const bin = bins.get(k) ?? { count: 0, r: 0, g: 0, b: 0 }
    bin.count++
    bin.r += r
    bin.g += g
    bin.b += b
    bins.set(k, bin)
  }
  let best: { count: number; r: number; g: number; b: number } | null = null
  for (const bin of bins.values()) if (!best || bin.count > best.count) best = bin
  if (!best) return '#8b5cf6'
  const hex = (v: number) => Math.round(v / best!.count).toString(16).padStart(2, '0')
  return `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`
}

function drawContained(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  box: number,
) {
  const scale = Math.min(box / img.naturalWidth, box / img.naturalHeight)
  const w = img.naturalWidth * scale
  const h = img.naturalHeight * scale
  ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h)
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawBadge(ctx: CanvasRenderingContext2D, size: number, badge: BadgeOptions) {
  if (!badge.enabled || !badge.text.trim()) return
  const text = badge.text.trim()
  const fontPx = Math.max(10, Math.round(size * 0.11))
  ctx.save()
  ctx.font = `700 ${fontPx}px Inter, system-ui, sans-serif`
  const tw = ctx.measureText(text).width
  const padX = fontPx * 0.55
  const h = fontPx * 1.55
  const w = tw + padX * 2
  const margin = size * 0.045
  const x = size - w - margin
  const y = size - h - margin
  roundRectPath(ctx, x, y, w, h, h / 2)
  ctx.fillStyle = badge.background
  ctx.fill()
  ctx.fillStyle = badge.color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, x + w / 2, y + h / 2 + 1)
  ctx.restore()
}

export interface RenderSpec {
  size: number
  image: HTMLImageElement
  background: string // '#rrggbb' | 'transparent'
  padding: number // 0..45 percent margin
  clip?: 'none' | 'circle' | 'squircle'
  badge?: BadgeOptions | null
  /** adaptive-icon foregrounds live in a smaller safe zone */
  safeZone?: boolean
}

export function renderIconCanvas(spec: RenderSpec): HTMLCanvasElement {
  const { size, image, background, padding, clip = 'none', safeZone = false } = spec
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  if (clip === 'circle') {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()
  } else if (clip === 'squircle') {
    roundRectPath(ctx, 0, 0, size, size, size * 0.28)
    ctx.clip()
  }

  if (background !== 'transparent') {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, size, size)
  }

  const zone = safeZone ? 0.66 : 1
  const box = size * zone * (1 - padding / 100)
  drawContained(ctx, image, size / 2, size / 2, box)

  if (spec.badge) drawBadge(ctx, size, spec.badge)
  return canvas
}

function canvasBlob(canvas: HTMLCanvasElement, format: 'png' | 'webp'): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas export failed'))),
      format === 'webp' ? 'image/webp' : 'image/png',
      0.95,
    ),
  )
}

// ---------------------------------------------------------------- Android ---
export const ANDROID_BUCKETS: Array<{ name: string; size: number }> = [
  { name: 'ldpi', size: 36 },
  { name: 'mdpi', size: 48 },
  { name: 'hdpi', size: 72 },
  { name: 'xhdpi', size: 96 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xxxhdpi', size: 192 },
]
export const ANDROID_FG_SIZES: Array<{ name: string; size: number }> = [
  { name: 'mdpi', size: 108 },
  { name: 'hdpi', size: 162 },
  { name: 'xhdpi', size: 216 },
  { name: 'xxhdpi', size: 324 },
  { name: 'xxxhdpi', size: 432 },
]

function adaptiveXml(fileName: string, mono: boolean): string {
  const fg = mono
    ? `<foreground android:drawable="@drawable/${fileName}_foreground"/>
    <monochrome android:drawable="@drawable/${fileName}_foreground"/>`
    : `<foreground android:drawable="@drawable/${fileName}_foreground"/>`
  return `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    ${fg}
</adaptive-icon>
`
}

// -------------------------------------------------------------------- iOS ---
interface IosEntry {
  idiom: 'iphone' | 'ipad' | 'ios-marketing'
  pt: number
  scale: 1 | 2 | 3
}
export const IOS_ENTRIES: IosEntry[] = [
  { idiom: 'iphone', pt: 20, scale: 2 },
  { idiom: 'iphone', pt: 20, scale: 3 },
  { idiom: 'iphone', pt: 29, scale: 2 },
  { idiom: 'iphone', pt: 29, scale: 3 },
  { idiom: 'iphone', pt: 40, scale: 2 },
  { idiom: 'iphone', pt: 40, scale: 3 },
  { idiom: 'iphone', pt: 60, scale: 2 },
  { idiom: 'iphone', pt: 60, scale: 3 },
  { idiom: 'ipad', pt: 20, scale: 1 },
  { idiom: 'ipad', pt: 20, scale: 2 },
  { idiom: 'ipad', pt: 29, scale: 1 },
  { idiom: 'ipad', pt: 29, scale: 2 },
  { idiom: 'ipad', pt: 40, scale: 1 },
  { idiom: 'ipad', pt: 40, scale: 2 },
  { idiom: 'ipad', pt: 76, scale: 1 },
  { idiom: 'ipad', pt: 76, scale: 2 },
  { idiom: 'ipad', pt: 83.5, scale: 2 },
  { idiom: 'ios-marketing', pt: 1024, scale: 1 },
]

function iosFileName(e: IosEntry): string {
  return `icon-${e.pt}@${e.scale}x.png`
}

/** Generates the full file set. Returns ordered [path, blob] pairs ready for JSZip. */
export async function generateIconSet(
  opts: IconSetOptions,
  onProgress?: ProgressFn,
): Promise<Array<[string, Blob]>> {
  const files: Array<[string, Blob]> = []
  const name = (opts.fileName || 'ic_launcher').trim() || 'ic_launcher'
  const ext = opts.androidFormat

  let total = 0
  if (opts.includeAndroid) total += ANDROID_BUCKETS.length * 2 + ANDROID_FG_SIZES.length + 2
  if (opts.includeIos) total += IOS_ENTRIES.length
  let done = 0
  const tick = (label: string) => onProgress?.(++done, total, label)

  if (opts.includeAndroid) {
    for (const b of ANDROID_BUCKETS) {
      const legacy = renderIconCanvas({
        size: b.size,
        image: opts.foreground,
        background: opts.backgroundColor,
        padding: opts.padding,
        badge: opts.badge,
      })
      files.push([`android/mipmap-${b.name}/${name}.${ext}`, await canvasBlob(legacy, ext)])
      tick(`Android ${b.name}`)

      const round = renderIconCanvas({
        size: b.size,
        image: opts.foreground,
        background: opts.backgroundColor,
        padding: opts.padding,
        clip: 'circle',
        badge: opts.badge,
      })
      files.push([
        `android/mipmap-${b.name}/${name}_round.${ext}`,
        await canvasBlob(round, ext),
      ])
      tick(`Android ${b.name} round`)
    }
    for (const b of ANDROID_FG_SIZES) {
      const fg = renderIconCanvas({
        size: b.size,
        image: opts.monochrome ?? opts.foreground,
        background: 'transparent',
        padding: opts.padding,
        safeZone: true,
      })
      files.push([
        `android/mipmap-${b.name}/${name}_foreground.${ext}`,
        await canvasBlob(fg, ext),
      ])
      tick(`Android ${b.name} foreground`)
    }
    files.push([
      'android/mipmap-anydpi-v26/ic_launcher.xml',
      new Blob([adaptiveXml(name, !!opts.monochrome)], { type: 'text/xml' }),
    ])
    files.push([
      'android/mipmap-anydpi-v26/ic_launcher_round.xml',
      new Blob([adaptiveXml(name, !!opts.monochrome)], { type: 'text/xml' }),
    ])
    const bgValue =
      opts.backgroundColor === 'transparent' ? '@android:color/transparent' : opts.backgroundColor
    files.push([
      'android/values/ic_launcher_background.xml',
      new Blob(
        [
          `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${bgValue}</color>\n</resources>\n`,
        ],
        { type: 'text/xml' },
      ),
    ])
    const store = renderIconCanvas({
      size: 512,
      image: opts.foreground,
      background: opts.backgroundColor,
      padding: opts.padding,
      badge: opts.badge,
    })
    files.push(['android/playstore-icon.png', await canvasBlob(store, 'png')])
    tick('Play Store icon')
    files.push([`android/${name}-web.png`, await canvasBlob(store, 'png')])
    tick('Web icon')
  }

  if (opts.includeIos) {
    const images: Array<Record<string, string>> = []
    for (const e of IOS_ENTRIES) {
      const px = Math.round(e.pt * e.scale)
      const canvas = renderIconCanvas({
        size: px,
        image: opts.foreground,
        background: opts.backgroundColor === 'transparent' ? '#ffffff' : opts.backgroundColor,
        padding: opts.padding,
        badge: e.pt >= 40 ? opts.badge : null,
      })
      files.push([`ios/AppIcon.appiconset/${iosFileName(e)}`, await canvasBlob(canvas, 'png')])
      images.push({
        idiom: e.idiom,
        size: `${e.pt}x${e.pt}`,
        scale: `${e.scale}x`,
        filename: iosFileName(e),
      })
      tick(`iOS ${e.pt}@${e.scale}x`)
    }
    const contents = {
      images,
      info: { version: 1, author: 'drappicon' },
    }
    files.push([
      'ios/AppIcon.appiconset/Contents.json',
      new Blob([JSON.stringify(contents, null, 2)], { type: 'application/json' }),
    ])
  }

  return files
}

/** Lazy ZIP download, mirroring the reference architecture (separate chunks on demand). */
export async function downloadIconSet(
  opts: IconSetOptions,
  onProgress?: ProgressFn,
): Promise<number> {
  const files = await generateIconSet(opts, onProgress)
  const [{ default: JSZip }, { saveAs }] = await Promise.all([
    import('jszip'),
    import('file-saver'),
  ])
  const zip = new JSZip()
  for (const [path, blob] of files) zip.file(path, blob)
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'drappicon-icons.zip')
  return files.length
}
