import { useEffect, useRef, useState } from 'react'
import { play } from '../sound'

// Reveals paragraphs letter by letter. Tap the text to skip to the end.
export default function Typewriter({
  paragraphs,
  instant = false,
  onDone,
}: {
  paragraphs: string[]
  instant?: boolean
  onDone?: () => void
}) {
  const total = paragraphs.reduce((n, p) => n + p.length, 0)
  const [count, setCount] = useState(instant ? total : 0)
  const doneRef = useRef(false)
  const cb = useRef(onDone)
  cb.current = onDone

  useEffect(() => {
    if (count >= total) return
    const id = setInterval(() => {
      setCount((c) => Math.min(total, c + 2))
      play('type')
    }, 16)
    return () => clearInterval(id)
  }, [count >= total, total])

  useEffect(() => {
    if (count >= total && !doneRef.current) {
      doneRef.current = true
      cb.current?.()
    }
  }, [count, total])

  let left = count
  const finished = count >= total
  return (
    <div onClick={() => setCount(total)} className="prose-body space-y-4">
      {paragraphs.map((p, i) => {
        const shown = Math.max(0, Math.min(p.length, left))
        left -= p.length
        const active = !finished && shown > 0 && shown < p.length
        if (shown === 0) return <p key={i} className="invisible whitespace-pre-line" aria-hidden="true">* {p}</p>
        return (
          <p key={i} className={`whitespace-pre-line ${active ? "caret" : ""}`}>
            *{' '}
            {p.slice(0, shown)}
          </p>
        )
      })}
    </div>
  )
}
