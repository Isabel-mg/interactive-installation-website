import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { fill, type L } from '../i18n'
import { useJournal } from './journal'
import { play } from '../sound'

interface Whisper {
  id: number
  text: string
}

interface NarratorApi {
  whisper: Whisper | null
  say: (line: L, o?: { name?: string }) => void
  dismiss: () => void
}

// Keep one context object across hot reloads so an already-mounted provider and
// freshly re-evaluated consumers (e.g. Whisper) always share the same context.
const hot = import.meta.hot
const Ctx: React.Context<NarratorApi | null> = (hot?.data.ctx as React.Context<NarratorApi | null>) ?? createContext<NarratorApi | null>(null)
if (hot) hot.data.ctx = Ctx
const VISIBLE_MS = 9000
let uid = 0

// One line at a time. A new line replaces the old one. Never a popup.
export function NarratorProvider({ children }: { children: ReactNode }) {
  const { name, lang, whispers } = useJournal()
  const live = useRef({ name, lang, whispers })
  live.current = { name, lang, whispers }

  const [whisper, setWhisper] = useState<Whisper | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  function dismiss() {
    clearTimeout(timer.current)
    setWhisper(null)
  }

  function say(line: L, o: { name?: string } = {}) {
    const { name: n, lang: lg, whispers: on } = live.current
    if (!on) return
    clearTimeout(timer.current)
    setWhisper({ id: ++uid, text: fill(line[lg], o.name ?? n, lg) })
    play('narrator')
    timer.current = setTimeout(() => setWhisper(null), VISIBLE_MS)
  }

  useEffect(() => {
    if (!whispers) dismiss()
  }, [whispers])

  useEffect(() => () => clearTimeout(timer.current), [])

  return <Ctx.Provider value={{ whisper, say, dismiss }}>{children}</Ctx.Provider>
}

export function useNarrator() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useNarrator outside provider')
  return v
}

// Runs fn once after ms (safe under StrictMode double-mount)
export function useDelayed(fn: () => void, ms: number, deps: unknown[] = []) {
  useEffect(() => {
    const t = setTimeout(fn, ms)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
