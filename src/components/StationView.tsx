import { useEffect, useRef, useState } from 'react'
import { STATIONS, type Choice } from '../content/stations'
import { CHOICE_LABELS, LINES } from '../content/narrator'
import { useJournal, useT } from '../state/journal'
import { useNarrator } from '../state/narrator'
import { play, stop } from '../sound'
import type { View } from '../view'
import Typewriter from './Typewriter'
import No from './No'
import InlineNarrator from './InlineNarrator'
import LogImage from './LogImage'

export default function StationView({ id, go }: { id: number; go: (v: View) => void }) {
  const station = STATIONS.find((s) => s.id === id)!
  const j = useJournal()
  const { t, tx, txs, lang } = useT()
  const { say } = useNarrator()
  const num = String(id).padStart(2, '0')

  const alreadyOpen = j.unlocked.includes(id)
  const [stage, setStage] = useState<'gate' | 'opening' | 'log'>(alreadyOpen ? 'log' : 'gate')

  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // one underscore per letter, with a wider gap between words (matches the passkey length)
  const blanks = station.passkey.en
    .trim()
    .split(/\s+/)
    .map((w) => Array.from(w, () => '_').join(' '))
    .join('\u00A0\u00A0\u00A0')

  const choice = j.choices[id]
  const [typed, setTyped] = useState(!!choice)
  const formRef = useRef<HTMLDivElement>(null)

  // closing an open log (any way of leaving the page) plays the book sound again
  const stageRef = useRef(stage)
  stageRef.current = stage
  useEffect(() => () => {
    if (stageRef.current === 'log') play('book')
  }, [])

  // writing sound while the log types itself out
  useEffect(() => {
    if (stage !== 'log' || choice || typed) return
    play('write')
    return () => stop('write')
  }, [stage])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // ignore case and extra spaces, so "chill  out" still matches
    const norm = (v: string) => v.trim().replace(/\s+/g, ' ').toUpperCase()
    const guess = norm(input)
    const ok = [station.passkey.en, station.passkey.ko].some((k) => norm(k) === guess)
    if (ok) {
      play('book')
      j.unlock(id)
      setStage('opening')
      setTimeout(() => setStage('log'), 1100)
    } else {
      play('wrong')
      const n = attempts + 1
      setAttempts(n)
      setError(true)
      setTimeout(() => setError(false), 600)
      if (n === 3) say(LINES.wrongPasskey)
    }
  }

  function answer(c: Choice) {
    play('choice')
    j.choose(id, c)
    const othersDone = STATIONS.every((s) => s.id === id || j.choices[s.id])
    if (othersDone) say(LINES.allDone)
  }

  return (
    <div className="rise">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2">
        <button onClick={() => go({ kind: 'home' })} className="label underline underline-offset-2 hover:text-stamp">
          {t.back}
        </button>
        <span className="label">
          {t.folder} {num}
        </span>
      </div>

      {stage === 'gate' && (
        <div className="px-4 py-6">
          <h2 className="font-display text-[38px] leading-[1]">
            {t.logLabel} <No n={num} />
          </h2>
          <p className="label mt-2 opacity-70">{station.passkey.en.trim().split(/\s+/).length > 1 ? t.sealedTwo : t.sealedLine}</p>
          <p className="prose-body mt-5">* {tx(station.desc)}</p>

          <form onSubmit={submit} className={`mt-5 ${error ? 'shake' : ''}`}>
            <label htmlFor="passkey" className="label mb-1.5 block">
              {t.passkey}
            </label>
            <div className="flex gap-2">
              <input
                id="passkey"
                value={input}
                onChange={(e) => {
                  if (e.target.value !== input) play('key')
                  setInput(e.target.value)
                }}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder={blanks}
                className={`prose-body min-w-0 flex-1 border bg-paper px-3 py-2.5 uppercase tracking-[0.2em] outline-none placeholder:opacity-30 focus:ring-2 focus:ring-stamp ${
                  error ? 'border-stamp' : 'border-rule'
                }`}
              />
              <button type="submit" className="label border border-rule bg-btn px-4 text-btn-ink active:translate-y-px">
                {t.unlock}
              </button>
            </div>
          </form>

          <p className={`label mt-3 h-4 text-stamp transition-opacity duration-1300 ${error ? 'opacity-100' : 'opacity-0'}`}>
            {t.denied}
          </p>

          <div className="mt-6 border-t border-dotted border-rule pt-4">
            {!showHint ? (
              <button onClick={() => setShowHint(true)} className="label underline underline-offset-2 hover:text-stamp">
                {t.hintBtn}
              </button>
            ) : (
              <div className="rise border border-rule bg-wash/60 p-3">
                <p className="label mb-1 text-stamp">{t.hintLabel}</p>
                <p className="prose-body">{tx(station.hint)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {stage === 'opening' && (
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <p className="label text-center text-[26px]! leading-[1.15]! opacity-80">
            {t.opening}
            <span className="load-dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span>
          </p>
        </div>
      )}

      {stage === 'log' && (
        <article className="px-4 py-6">
          <p className="label opacity-70">
            {t.logLabel} {num} · {tx(station.logDate)}
          </p>
          <h2 className="mb-5 mt-1 font-display text-[38px] leading-[1]">{tx(station.title)}</h2>
          <div className="dots-ink mb-5 h-2 opacity-40" />
          {station.image && <LogImage src={station.image.src} alt={tx(station.image.alt)} caption={tx(station.image.caption)} />}

          {/* key on lang so the log re-renders cleanly when the language is switched */}
          <Typewriter key={lang} paragraphs={txs(station.log)} instant={!!choice || typed} onDone={() => {
            stop('write')
            setTyped(true)
          }} />

          <div ref={formRef} className="mt-8 border-t border-dotted border-rule pt-4">
            {!typed && <span className="label opacity-0">.</span>}

            {typed && (
              <div className="rise">
                {/* narrator line sits between the log and the choices; it changes once an answer is given */}
                <InlineNarrator text={choice ? tx(LINES.choiceMade[choice]) : tx(station.prompt)} />

                <div className="border-2 border-rule p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="label text-stamp">▌ {choice ? t.recorded : t.responseRequired}</span>
                    <span className="label opacity-60">No. {num}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {(station.options ?? (Object.keys(CHOICE_LABELS) as Choice[]).map((c) => ({ choice: c, text: CHOICE_LABELS[c] }))).map(({ choice: c, text }) => {
                      const picked = choice === c
                      return (
                        <button
                          key={c}
                          onClick={() => answer(c)}
                          disabled={!!choice}
                          aria-pressed={picked}
                          className={`prose-body border border-rule px-3 py-3 text-left transition-colors ${
                            picked
                              ? 'bg-btn text-btn-ink'
                              : choice
                                ? 'opacity-40'
                                : 'hover:bg-btn hover:text-btn-ink focus-visible:bg-btn focus-visible:text-btn-ink'
                          }`}
                        >
                          {picked ? '▸ ' : ''}
                          {tx(text)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {choice && (
                  <button
                    onClick={() => go({ kind: 'home' })}
                    className="label mt-3 w-full border border-rule bg-btn px-4 py-3 text-btn-ink active:translate-y-px"
                  >
                    {t.backToFiles}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="h-16" />
        </article>
      )}
    </div>
  )
}
