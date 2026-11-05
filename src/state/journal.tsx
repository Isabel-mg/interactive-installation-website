import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { STATIONS, type Choice } from '../content/stations'
import { POINTS, SCORING, type EndingKey } from '../content/endings'
import { UI, fill, roomTitle, type L, type LS, type Lang } from '../i18n'

const KEY = 'installation-journal-v2'

type Theme = 'light' | 'dark'

interface Saved {
  name: string
  entered: boolean
  unlocked: number[]
  choices: Partial<Record<number, Choice>>
  secretFound: boolean
  lang: Lang
  theme: Theme
  whispers: boolean
}

function defaults(): Saved {
  const ko = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ko')
  return {
    name: '',
    entered: false,
    unlocked: [],
    choices: {},
    secretFound: false,
    lang: ko ? 'ko' : 'en',
    theme: 'dark',
    whispers: true,
  }
}

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaults(), ...JSON.parse(raw) } : defaults()
  } catch {
    return defaults()
  }
}

interface JournalApi extends Saved {
  setName: (n: string) => void
  enter: () => void
  unlock: (id: number) => void
  choose: (id: number, c: Choice) => void
  findSecret: () => void
  setLang: (l: Lang) => void
  setTheme: (t: Theme) => void
  setWhispers: (w: boolean) => void
  reset: () => void
  allUnlocked: boolean
  allAnswered: boolean
  score: number
  endingKey: EndingKey
}

const Ctx = createContext<JournalApi | null>(null)

export function JournalProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Saved>(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(s))
  }, [s])

  useEffect(() => {
    document.documentElement.dataset.theme = s.theme
    document.documentElement.lang = s.lang
  }, [s.theme, s.lang])

  const setName = useCallback((name: string) => setS((p) => ({ ...p, name: name.trim() })), [])
  const enter = useCallback(() => setS((p) => ({ ...p, entered: true })), [])
  const unlock = useCallback(
    (id: number) => setS((p) => (p.unlocked.includes(id) ? p : { ...p, unlocked: [...p.unlocked, id] })),
    [],
  )
  const choose = useCallback(
    (id: number, c: Choice) => setS((p) => (p.choices[id] ? p : { ...p, choices: { ...p.choices, [id]: c } })),
    [],
  )
  const findSecret = useCallback(() => setS((p) => ({ ...p, secretFound: true })), [])
  const setLang = useCallback((lang: Lang) => setS((p) => ({ ...p, lang })), [])
  const setTheme = useCallback((theme: Theme) => setS((p) => ({ ...p, theme })), [])
  const setWhispers = useCallback((whispers: boolean) => setS((p) => ({ ...p, whispers })), [])
  const reset = useCallback(() => {
    // Progress is wiped; language / theme / whisper preferences are kept
    localStorage.setItem(KEY, JSON.stringify({ ...defaults(), lang: s.lang, theme: s.theme, whispers: s.whispers }))
    window.location.reload()
  }, [s.lang, s.theme, s.whispers])

  const api = useMemo<JournalApi>(() => {
    const allUnlocked = STATIONS.every((st) => s.unlocked.includes(st.id))
    const allAnswered = STATIONS.every((st) => s.choices[st.id])
    const score = STATIONS.reduce((sum, st) => sum + (s.choices[st.id] ? POINTS[s.choices[st.id]!] : 0), 0)
    const endingKey: EndingKey = score <= SCORING.DENY_MAX ? 'deny' : score <= SCORING.MIXED_MAX ? 'mixed' : 'accept'
    return {
      ...s,
      setName,
      enter,
      unlock,
      choose,
      findSecret,
      setLang,
      setTheme,
      setWhispers,
      reset,
      allUnlocked,
      allAnswered,
      score,
      endingKey,
    }
  }, [s, setName, enter, unlock, choose, findSecret, setLang, setTheme, setWhispers, reset])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useJournal() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useJournal outside provider')
  return v
}

// Translation helpers bound to the current language + visitor name
export function useT() {
  const { lang, name } = useJournal()
  return {
    lang,
    name,
    t: UI[lang],
    tx: (l: L) => fill(l[lang], name, lang),
    txs: (l: LS) => l[lang].map((p) => fill(p, name, lang)),
    room: (n = name) => roomTitle(n, lang),
  }
}
