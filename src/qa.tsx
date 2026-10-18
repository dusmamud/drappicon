// QA harness (not part of the product build): drives the real generator UI
// with a synthetic upload, then downloads, and reports results into #qa-status.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import IconGeneratorWrapper from './features/icon-generator/IconGeneratorWrapper'
import { generateIconSet, loadImageFromFile } from './lib/engine'

const status = (msg: string) => {
  const el = document.getElementById('qa-status')
  if (el) el.textContent = `QA: ${msg}`
  document.title = `QA: ${msg}`
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <IconGeneratorWrapper />
    </BrowserRouter>
  </StrictMode>,
)

async function run() {
  try {
    // 1) Engine-level check: build a full icon set from a canvas-drawn image.
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 1024
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#2563eb'
    ctx.fillRect(0, 0, 1024, 1024)
    ctx.fillStyle = '#f59e0b'
    ctx.beginPath()
    ctx.arc(512, 512, 200, 0, Math.PI * 2)
    ctx.fill()
    const blob = await new Promise<Blob>((r) => c.toBlob((b) => r(b!), 'image/png'))
    const file = new File([blob], 'test-icon.png', { type: 'image/png' })
    const img = await loadImageFromFile(file)
    const files = await generateIconSet({
      foreground: img,
      monochrome: null,
      backgroundColor: '#2563eb',
      padding: 0,
      fileName: 'ic_launcher',
      androidFormat: 'png',
      badge: { enabled: true, text: 'NEW', background: '#ef4444', color: '#ffffff' },
      includeAndroid: true,
      includeIos: true,
    })
    const names = files.map(([p]) => p)
    const totalBytes = files.reduce((s, [, b]) => s + b.size, 0)
    status(`engine ok — ${files.length} files, ${totalBytes} bytes`)
    const pre = document.createElement('pre')
    pre.id = 'qa-files'
    pre.textContent = names.join('\n')
    document.body.appendChild(pre)

    // 2) UI-level check: feed the file into the first dropzone input.
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')
    if (!input) {
      status('engine ok but NO file input found')
      return
    }
    const dt = new DataTransfer()
    dt.items.add(file)
    input.files = dt.files
    input.dispatchEvent(new Event('change', { bubbles: true }))
    setTimeout(() => {
      const hasPreview = !!document.querySelector('img[alt="Icon preview"]')
      status(
        `engine ${files.length} files; ui upload ${hasPreview ? 'preview visible' : 'NO PREVIEW'}`,
      )
    }, 2500)
  } catch (e) {
    status(`FAILED — ${e instanceof Error ? e.message : String(e)}`)
  }
}

setTimeout(run, 600)
