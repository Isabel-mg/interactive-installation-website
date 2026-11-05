import { useEffect, useState } from 'react'
import { useNarrator } from '../state/narrator'
import { useT } from '../state/journal'

// The narrator: a single typed line under the header. Tap to dismiss.
export default function Whisper() {
  const { whisper, dismiss } = useNarrator()
  const { t } = useT()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    setShown(0)
    if (!whisper) return
    const id = setInterval(() => setShown((n) => (n >= whisper.text.length ? n : n + 1)), 28)
    return () => clearInterval(id)
  }, [whisper])

  if (!whisper) return null
  const typing = shown < whisper.text.length

  return (
    <button
      key={whisper.id}
      onClick={dismiss}
      aria-live="polite"
      className="rise flex w-full items-start gap-2 border-b border-rule bg-wash/60 px-4 py-1.5 text-left"
    >
      <span className="label shrink-0 text-stamp">▸ {t.whisperLabel}</span>
      <span className={`prose-body min-w-0 flex-1 !leading-snug ${typing ? 'caret' : ''}`}>
        {whisper.text.slice(0, shown)}
      </span>
    </button>
  )
}
