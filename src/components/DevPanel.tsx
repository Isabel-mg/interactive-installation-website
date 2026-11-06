import { useState } from 'react'
import { createPortal } from 'react-dom'
import { STATIONS } from '../content/stations'
import { MAX_SCORE } from '../content/endings'
import type { View } from '../view'
import { tensionLevel, tensionPoints } from '../content/tension'
import { useJournal, useT } from '../state/journal'

// TEMPORARY — REMOVE BEFORE LAUNCH (delete this file and its mount in App.tsx)
export default function DevPanel(props: { go: (v: View) => void }) {
  return createPortal(<Panel {...props} />, document.body)
}

function Panel({ go }: { go: (v: View) => void }) {
  const j = useJournal()
  const { t } = useT()
  const tp = tensionPoints(j.unlocked.length, j.choices)
  const tl = tensionLevel(j.unlocked.length, j.choices, j.allAnswered)
  const [open, setOpen] = useState(false)
  const edge = {
    left: 'max(0.75rem, calc(50vw - 220px + 0.75rem), env(safe-area-inset-left))',
    bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={edge}
        className="label fixed z-50 border border-rule bg-paper px-2 py-1.5"
      >
        {t.dev}
      </button>
    )
  }

  return (
    <div style={edge} className="fixed z-50 w-[min(260px,75vw)] border border-rule bg-paper">
      <div className="flex items-center justify-between border-b border-rule bg-btn px-2 py-1 text-btn-ink">
        <span className="label">{t.devTitle}</span>
        <button onClick={() => setOpen(false)} className="label">
          {t.close}
        </button>
      </div>
      <ul className="divide-y divide-rule/20 px-2 py-1 text-[14px]">
        {STATIONS.map((s) => (
          <li key={s.id} className="flex justify-between gap-2 py-1">
            <span>№{s.id}</span>
            <span className={j.unlocked.includes(s.id) ? 'text-ok' : ''}>
              {s.passkey.en} / {s.passkey.ko}
            </span>
          </li>
        ))}
        <li className="flex justify-between py-1 opacity-60">
          <span>№7</span>
          <span>{t.auto}</span>
        </li>
        <li className="flex justify-between py-1 opacity-60">
          <span>{t.score}</span>
          <span>
            {j.score}/{MAX_SCORE} · {j.endingKey}
          </span>
        </li>
        <li className="flex justify-between py-1 opacity-60">
          <span>tension</span>
          <span>
            {tp} pts · level {tl}/3
          </span>
        </li>
      </ul>
      <a href={import.meta.env.BASE_URL + "#/mac"} target="_blank" rel="noreferrer" className="label block border-t border-rule px-2 py-1.5 text-center underline">
        open desk computer /mac
      </a>
      <div className="flex gap-1 border-t border-rule px-2 py-1.5">
        {(['deny', 'mixed', 'accept'] as const).map((k) => (
          <button key={k} onClick={() => go({ kind: 'ending', key: k })} className="label flex-1 border border-rule py-1">
            {k}
          </button>
        ))}
        <button onClick={() => go({ kind: 'secret' })} className="label border border-rule px-2 py-1">
          ?
        </button>
      </div>
      <button onClick={j.reset} className="label w-full border-t border-rule bg-btn px-2 py-2 text-btn-ink">
        {t.reset}
      </button>
    </div>
  )
}
