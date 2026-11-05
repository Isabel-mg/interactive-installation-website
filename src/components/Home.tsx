import { useState } from 'react'
import { FINAL_STATION, STATIONS } from '../content/stations'
import { LINES } from '../content/narrator'
import { SECRET_ENABLED, SECRET_TAPS } from '../content/endings'
import { useJournal, useT } from '../state/journal'
import { useNarrator } from '../state/narrator'
import { play } from '../sound'
import type { View } from '../view'
import Folder, { type FolderState } from './Folder'

const OPEN_MS = 480

// Shuffled once per page load; the final folder (7) always stays last
const ORDER = STATIONS.map((s) => s.id)
for (let i = ORDER.length - 1; i > 0; i--) {
  const k = Math.floor(Math.random() * (i + 1))
  ;[ORDER[i], ORDER[k]] = [ORDER[k], ORDER[i]]
}

export default function Home({ go }: { go: (v: View) => void }) {
  const j = useJournal()
  const { t, tx, lang } = useT()
  const { say } = useNarrator()
  const [opening, setOpening] = useState<number | null>(null)
  const [taps, setTaps] = useState(0)
  const finalReady = j.allUnlocked && j.allAnswered

  function openFolder(id: number, to: View) {
    if (opening) return
    play('slide')
    setOpening(id)
    setTimeout(() => go(to), OPEN_MS)
  }

  function finalFolder() {
    if (finalReady) return openFolder(7, { kind: 'ending' })
    say(LINES.sealedFinal)
    setOpening(null)
  }

  function secretTap() {
    if (j.secretFound) return go({ kind: 'secret' })
    const n = taps + 1
    setTaps(n)
    if (n >= SECRET_TAPS) {
      j.findSecret()
      say(LINES.secretFound)
      go({ kind: 'secret' })
    }
  }

  return (
    <div className="rise">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2">
        <span className="label">{t.indexLabel}</span>
        <span className="label opacity-60">
          {j.unlocked.length}/{STATIONS.length} {t.keysFound}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-4 pb-4 pt-5">
        {ORDER.map((id) => STATIONS.find((s) => s.id === id)!).map((s) => {
          const open = j.unlocked.includes(s.id)
          const state: FolderState = j.choices[s.id] ? 'read' : open ? 'open' : 'locked'
          return (
            <Folder
              key={s.id}
              num={s.id}
              title={tx(s.title)}
              preview={s.log[lang][0].replace(/\{name\}/g, j.name || (lang === 'ko' ? '낯선 이' : 'stranger'))}
              state={state}
              opening={opening === s.id}
              onClick={() => openFolder(s.id, { kind: 'station', id: s.id })}
            />
          )
        })}
        {/* odd one out: centred on its own row */}
        <div className="col-span-2 mx-auto w-[calc(50%-0.5rem)]">
        <Folder
          num={7}
          final
          title={tx(FINAL_STATION.title)}
          preview={finalReady ? tx(FINAL_STATION.subtitle) : ''}
          state={finalReady ? 'open' : 'sealed'}
          opening={opening === 7}
          onClick={finalFolder}
        />
        </div>
      </div>

      {SECRET_ENABLED && (
        <div className="flex items-center justify-end gap-3 border-t border-rule px-4 py-5">
          <span className="label opacity-50">{t.mystery}</span>
          <button
            onClick={secretTap}
            aria-label={t.mystery}
            className={`flex h-9 w-9 rotate-3 items-center justify-center border border-dashed border-rule font-display text-[22px] leading-none opacity-60 transition-opacity hover:opacity-100 ${
              j.secretFound ? '!opacity-100 text-stamp' : ''
            }`}
          >
            ?
          </button>
        </div>
      )}
    </div>
  )
}
