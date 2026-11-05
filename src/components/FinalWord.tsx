import { useEffect } from 'react'
import { ENDINGS, type EndingKey } from '../content/endings'
import { useJournal, useT } from '../state/journal'
import { play } from '../sound'
import type { View } from '../view'
import Typewriter from './Typewriter'
import type { L } from '../i18n'

// ============================================================================
// FOLDER 7 on the phone: no journal, only the passcode word for the visitor's ending.
// The word is typed into the journal on the desk computer (/mac).
// ============================================================================
const LINES: { en: string[]; ko: string[] } = {
  en: [
    'There is nothing left to read here.',
    'Take this word to the computer on the desk. Open the journal and type it in.',
  ],
  ko: ['여기에는 더 읽을 것이 없습니다.', '이 단어를 책상 위 컴퓨터로 가져가세요. 일기를 열고 입력하세요.'],
}
const WORD_LABEL: L = { en: 'your word', ko: '당신의 단어' }

export default function FinalWord({ forceKey, go }: { forceKey?: EndingKey; go: (v: View) => void }) {
  const j = useJournal()
  const { t, tx, lang } = useT()
  const key = forceKey ?? j.endingKey
  const word = ENDINGS[key].passcode[lang]

  useEffect(() => play('ending'), [])

  return (
    <div className="rise">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2">
        <button onClick={() => go({ kind: 'home' })} className="label underline underline-offset-2 hover:text-stamp">
          {t.back}
        </button>
        <span className="label">{`${t.folder} 07`}</span>
      </div>

      <div className="px-4 py-8">
        <Typewriter key={lang} paragraphs={LINES[lang]} />

        <div className="mt-10 border-2 border-rule px-4 py-8 text-center">
          <p className="label opacity-60">{tx(WORD_LABEL)}</p>
          <p className="ghost word-en mt-3 break-words font-display text-[52px] leading-none">{word}</p>
        </div>

        <div className="h-16" />
      </div>
    </div>
  )
}
