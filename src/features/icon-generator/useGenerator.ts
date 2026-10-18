import { useCallback, useMemo, useRef, useState } from 'react'
import {
  downloadIconSet,
  getDominantColor,
  loadImageFromFile,
  type BadgeOptions,
} from '../../lib/engine'

export interface Progress {
  done: number
  total: number
  label: string
}

const ACCEPTED = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
export const MAX_FILE_BYTES = 10 * 1024 * 1024

export function useGenerator() {
  const [foreground, setForeground] = useState<HTMLImageElement | null>(null)
  const [foregroundUrl, setForegroundUrl] = useState<string | null>(null)
  const [mono, setMono] = useState<HTMLImageElement | null>(null)
  const [monoUrl, setMonoUrl] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [sizePercent, setSizePercent] = useState(0) // -50 = padded .. 0 = normal .. +50 = zoomed
  const [fileName, setFileName] = useState('ic_launcher')
  const [androidFormat, setAndroidFormat] = useState<'png' | 'webp'>('png')
  const [badge, setBadge] = useState<BadgeOptions>({
    enabled: false,
    text: 'NEW',
    background: '#ef4444',
    color: '#ffffff',
  })
  const [includeAndroid, setIncludeAndroid] = useState(true)
  const [includeIos, setIncludeIos] = useState(true)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)
  const urls = useRef<string[]>([])

  const track = (u: string) => {
    urls.current.push(u)
    return u
  }

  const validate = (file: File): string | null => {
    if (!ACCEPTED.includes(file.type) && !/\.(png|jpe?g|svg|webp)$/i.test(file.name))
      return 'Please choose a PNG, JPG, SVG or WebP image.'
    if (file.size > MAX_FILE_BYTES) return 'That file is over 10 MB. Please pick a smaller image.'
    return null
  }

  const handleForeground = useCallback(async (file: File) => {
    const problem = validate(file)
    if (problem) {
      setError(problem)
      return
    }
    setError(null)
    try {
      const img = await loadImageFromFile(file)
      setForeground(img)
      setForegroundUrl(track(URL.createObjectURL(file)))
      setBackgroundColor(getDominantColor(img))
    } catch {
      setError('That image could not be read. Try a different file.')
    }
  }, [])

  const handleMono = useCallback(async (file: File) => {
    const problem = validate(file)
    if (problem) {
      setError(problem)
      return
    }
    setError(null)
    try {
      const img = await loadImageFromFile(file)
      setMono(img)
      setMonoUrl(track(URL.createObjectURL(file)))
    } catch {
      setError('That monochrome image could not be read.')
    }
  }, [])

  const clearMono = useCallback(() => {
    setMono(null)
    setMonoUrl(null)
  }, [])

  const generate = useCallback(async () => {
    if (!foreground || generating) return
    if (!includeAndroid && !includeIos) {
      setError('Select at least one platform — Android or iOS.')
      return
    }
    setError(null)
    setGenerating(true)
    setProgress({ done: 0, total: 1, label: 'Preparing…' })
    try {
      await downloadIconSet(
        {
          foreground,
          monochrome: mono,
          backgroundColor,
          padding: sizePercent < 0 ? Math.min(45, -sizePercent) : 0,
          zoom: sizePercent > 0 ? 1 + sizePercent / 100 : 1,
          fileName,
          androidFormat,
          badge,
          includeAndroid,
          includeIos,
        },
        (done, total, label) => setProgress({ done, total, label }),
      )
      setShowThankYou(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while generating.')
    } finally {
      setGenerating(false)
      setProgress(null)
    }
  }, [
    foreground,
    mono,
    backgroundColor,
    sizePercent,
    fileName,
    androidFormat,
    badge,
    includeAndroid,
    includeIos,
    generating,
  ])

  const reset = useCallback(() => {
    setForeground(null)
    setForegroundUrl(null)
    setMono(null)
    setMonoUrl(null)
    setBackgroundColor('#ffffff')
    setSizePercent(0)
    setFileName('ic_launcher')
    setBadge({ enabled: false, text: 'NEW', background: '#ef4444', color: '#ffffff' })
    setError(null)
    setShowThankYou(false)
    urls.current.forEach((u) => URL.revokeObjectURL(u))
    urls.current = []
  }, [])

  const state = useMemo(
    () => ({
      foreground,
      foregroundUrl,
      mono,
      monoUrl,
      backgroundColor,
      sizePercent,
      fileName,
      androidFormat,
      badge,
      includeAndroid,
      includeIos,
      progress,
      generating,
      error,
      showThankYou,
    }),
    [
      foreground,
      foregroundUrl,
      mono,
      monoUrl,
      backgroundColor,
      sizePercent,
      fileName,
      androidFormat,
      badge,
      includeAndroid,
      includeIos,
      progress,
      generating,
      error,
      showThankYou,
    ],
  )

  return {
    state,
    actions: {
      handleForeground,
      handleMono,
      clearMono,
      generate,
      reset,
      setBackgroundColor,
      setSizePercent,
      setFileName,
      setAndroidFormat,
      setBadge,
      setIncludeAndroid,
      setIncludeIos,
      setShowThankYou,
      setError,
    },
  }
}

export type GeneratorApi = ReturnType<typeof useGenerator>
