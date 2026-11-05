import { useEffect, useState } from 'react'
import { useT } from '../state/journal'

// The narrator's quiet typed line, set into the page between the log and the choices.
export default function InlineNarrator({ text }: { text: string }) {
  const { t } = useT()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    setShown(0)
    const id = setInterval(() => setShown((n) => (n >= text.length ? n : n + 1)), 28)
    return () => clearInterval(id)
  }, [text])

  const typing = shown < text.length
  return (
    <p className="rise mb-4 border-l-2 border-stamp pl-3" aria-live="polite">
      <span className="label block text-stamp">▸ {t.whisperLabel}</span>
      <span className={`prose-body block min-h-[1.6em] italic ${typing ? 'caret' : ''}`}>{text.slice(0, shown)}</span>
    </p>
  )
}
