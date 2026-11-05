import { useState } from 'react'
import { play } from '../sound'
import { LINES } from '../content/narrator'
import { useJournal, useT } from '../state/journal'
import RoomTitle from './RoomTitle'
import { useDelayed, useNarrator } from '../state/narrator'

export default function Landing({ onEnter }: { onEnter: () => void }) {
  const { name, setName, enter } = useJournal()
  const { t } = useT()
  const { say } = useNarrator()
  const [value, setValue] = useState(name)
  const [saved, setSaved] = useState(false)

  // One quiet line, a beat after the page settles
  useDelayed(() => say(LINES.welcome), 1800)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const n = value.trim()
    if (!n) return // a name is required to move on
    setName(n)
    setSaved(true)
    play('select')
    say(LINES.nameSaved, { name: n })
  }

  return (
    <div className="rise">
      <div className="relative flex min-h-[62dvh] flex-col justify-center overflow-hidden border-b border-rule bg-wash/50">
        <div className="dots-ink banner-fade absolute inset-0 opacity-20" />
        <div className="relative px-4 py-16 text-center">
          <p className="label mb-5 text-[13px] text-stamp">{t.heroKicker}</p>
          {/* Title becomes "<name>'s room" live as the visitor types */}
          <h1 className="ghost break-words font-display text-[56px] leading-[1]"><RoomTitle name={value} /></h1>
          <p className="prose-body mt-6 italic opacity-75">{t.heroSub}</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-2 border-t border-rule px-4 py-5">
        <label htmlFor="visitor" className="label block">
          {t.nameLabel}
        </label>
        <div className="flex gap-2">
          <input
            id="visitor"
            value={value}
            onChange={(e) => {
              if (e.target.value !== value) play('key')
              setValue(e.target.value)
            }}
            maxLength={20}
            autoComplete="off"
            placeholder={t.namePlaceholder}
            className="prose-body min-w-0 flex-1 border border-rule bg-paper px-3 py-2.5 outline-none placeholder:opacity-40 focus:bg-wash/60 focus:ring-2 focus:ring-stamp"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="label border border-rule bg-btn px-4 text-btn-ink transition-opacity active:translate-y-px disabled:opacity-40"
          >
            {t.save}
          </button>
        </div>
        {!saved && (
          <p className="label pt-1 text-center text-[11px] leading-relaxed opacity-60" style={{ textTransform: 'none' }}>
            {t.privacyNote}
          </p>
        )}
      </form>

      {saved && (
        <div className="rise px-4 pb-8">
          <button
            onClick={() => {
              play('door')
              enter()
              onEnter()
            }}
            className="label w-full border border-rule bg-btn px-4 py-4 text-[12px] text-btn-ink transition-opacity hover:opacity-90 active:translate-y-px"
          >
            {t.enter}
          </button>
          <p className="label mt-3 text-center text-[11px] leading-relaxed opacity-60" style={{ textTransform: 'none' }}>
            {t.privacyNote}
          </p>
        </div>
      )}
    </div>
  )
}
