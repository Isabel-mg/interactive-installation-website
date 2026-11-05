import { useEffect, useState } from 'react'
import { JournalProvider, useJournal, useT } from './state/journal'
import { NarratorProvider } from './state/narrator'
import type { View } from './view'
import Whisper from './components/Whisper'
import Controls from './components/Controls'
import RoomTitle from './components/RoomTitle'
import Landing from './components/Landing'
import Home from './components/Home'
import StationView from './components/StationView'
import Ending from './components/Ending'
import FinalWord from './components/FinalWord'
import { setAmbience, type AmbienceName } from './sound'
import { tensionLevel } from './content/tension'
import DevPanel from './components/DevPanel'

function Shell() {
  const j = useJournal()
  const { t, room } = useT()
  const [view, setView] = useState<View>(j.entered ? { kind: 'home' } : { kind: 'landing' })
  // the forced maximum only lands once the last log has been closed (the 6th folder is now open)
  const tension = tensionLevel(j.unlocked.length, j.choices, j.allAnswered && view.kind !== 'station')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  // intro + room naming: "beginning" loop; folders and logs: "general" loop; endings: silence (own sounds later)
  useEffect(() => {
    const general = `general${tension}` as AmbienceName
    // endings now play on the desk computer (/mac); folder 7 on the phone keeps the tense loop
    setAmbience(
      view.kind === 'landing'
        ? 'beginning'
        : view.kind === 'home' || view.kind === 'station' || view.kind === 'ending'
          ? general
          : null,
    )
  }, [view.kind, tension])

  return (
    <div
      className="relative z-10 mx-auto min-h-dvh max-w-[440px] border-x border-rule bg-paper/90 backdrop-blur-[3px]"
      style={{ paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
    >
      {/* paddingTop keeps the title and controls clear of the phone camera / notch (at least 2.25rem even without a safe-area value) */}
      <div className="sticky top-0 z-40 bg-paper" style={{ paddingTop: 'max(2.6rem, calc(env(safe-area-inset-top) + 0.75rem))' }}>
        <header className="flex items-center justify-between gap-2 border-b border-rule px-4 py-2">
          <button
            onClick={() => j.entered && setView({ kind: 'home' })}
            className="min-w-0 text-left"
            aria-label={room()}
          >
            {/* Project name: "___'s room" until a name is saved, then "Ana's room" */}
            <span className="block truncate font-display text-[26px] leading-[1.1]"><RoomTitle /></span>
          </button>
          <Controls />
        </header>
        <Whisper />
      </div>

      <main>
        {view.kind === 'landing' && <Landing onEnter={() => setView({ kind: 'home' })} />}
        {view.kind === 'home' && <Home go={setView} />}
        {view.kind === 'station' && <StationView key={view.id} id={view.id} go={setView} />}
        {view.kind === 'ending' && <FinalWord forceKey={view.key} go={setView} />}
        {view.kind === 'secret' && <Ending secret go={setView} />}
      </main>

      <footer
        className="label border-t border-rule px-4 pt-3 text-center opacity-50"
        style={{ textTransform: 'none', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >{t.footer}</footer>
      {/* TEMPORARY: remove before launch */}
      <DevPanel go={setView} />
    </div>
  )
}

export default function PhoneApp() {
  return (
    <JournalProvider>
      <NarratorProvider>
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="dream-blob -left-1/4 -top-1/4" style={{ background: 'var(--blob-a)' }} />
          <div className="dream-blob -bottom-1/4 -right-1/4" style={{ background: 'var(--blob-b)', animationDirection: 'alternate-reverse' }} />
        </div>
        {/* worn-ink filter used on Korean headings (see index.css) */}
        <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="worn" x="-2%" y="-8%" width="104%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="wob" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="8" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -20 14" result="holes" />
            <feComposite in="wob" in2="holes" operator="in" />
          </filter>
        </svg>
        {/* palette tritone (warm black > pink > blush) used on log pictures */}
        <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="plate" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.137 0.91 1" />
              <feFuncG type="table" tableValues="0.086 0.714 0.922" />
              <feFuncB type="table" tableValues="0.055 0.725 0.929" />
            </feComponentTransfer>
          </filter>
        </svg>
        <Shell />
      </NarratorProvider>
    </JournalProvider>
  )
}
