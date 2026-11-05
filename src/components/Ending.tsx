import { useEffect } from 'react'
import { ENDINGS, SECRET_ENDING, type EndingKey } from '../content/endings'
import { useJournal, useT } from '../state/journal'
import { play } from '../sound'
import type { View } from '../view'
import Typewriter from './Typewriter'

// Folder 7 (score-based ending) and the hidden "?" ending share this view
export default function Ending({ secret = false, forceKey, go }: { secret?: boolean; forceKey?: EndingKey; go: (v: View) => void }) {
  const j = useJournal()
  const { t, tx, txs, lang } = useT()
  const data = secret ? SECRET_ENDING : ENDINGS[forceKey ?? j.endingKey]

  useEffect(() => play('ending'), [])

  return (
    <div className="rise">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2">
        <button onClick={() => go({ kind: 'home' })} className="label underline underline-offset-2 hover:text-stamp">
          {t.back}
        </button>
        <span className="label">{secret ? t.unlisted : `${t.folder} 07`}</span>
      </div>

      <div className="relative overflow-hidden border-b border-rule bg-wash/60">
        <div className="dots-ink banner-fade absolute inset-0 opacity-20" />
        <div className="relative px-4 pb-7 pt-8 text-center">
          <h2 className="ghost font-display text-[40px] leading-[1]">{tx(data.title)}</h2>
        </div>
      </div>

      <div className="px-4 py-6">
        <Typewriter key={lang} paragraphs={txs(data.log)} />
        <div className="mt-10 border-t border-dotted border-rule pt-3">
          <p className="label opacity-60">{t.endFile}</p>
        </div>
        <div className="h-16" />
      </div>
    </div>
  )
}
