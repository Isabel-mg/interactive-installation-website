import { useT } from '../state/journal'
import No from './No'

export type FolderState = 'locked' | 'open' | 'read' | 'sealed'

// Closed manila folder: a sheet peeks out showing a preview (blurred while closed).
// Tapping lifts the sheet and swings the front flap open.
export default function Folder({
  num,
  title,
  preview,
  state,
  final = false,
  opening,
  onClick,
}: {
  num: number
  title: string
  preview: string
  state: FolderState
  final?: boolean
  opening: boolean
  onClick: () => void
}) {
  const { t } = useT()
  const locked = state === 'locked' || state === 'sealed'
  const chip = { locked: t.stLocked, sealed: t.stSealed, open: t.stOpen, read: t.stRead }[state]

  return (
    <button onClick={onClick} data-open={opening} data-final={final} className="folder text-left" aria-label={`${t.folder} ${num}: ${locked ? t.redactedTitle : title}, ${chip}`}>
      <span className="folder-tab" />
      <span className="folder-back" />

      <span className="folder-paper">
        <span className="label mb-0.5 block text-[9px] opacity-60" style={{ fontSize: 9 }}>
          {t.folder} {String(num).padStart(2, '0')} · {title}
        </span>
        <span className={`line-clamp-3 block text-[13px] leading-[1.25] ${locked ? 'veil' : ''}`}>
          {locked ? 'the pages are stuck together and the ink has run into the paper' : preview}
        </span>
      </span>

      <span className="folder-front p-2.5" style={{ color: final ? 'var(--final-ink)' : 'var(--ink)' }}>
        <span className="flex items-start justify-between">
          <No n={num} plain={final} className="text-[34px] leading-none" />
        </span>
        <span className="mt-1 block font-display text-[16px] leading-[1.1]">
          {locked ? <span className="veil inline-block">{'· · · · · ·'}</span> : title}
        </span>
        <span className="label absolute bottom-2 left-2.5 border border-current px-1 py-0.5" style={{ fontSize: 9 }}>
          {chip}
        </span>
      </span>
    </button>
  )
}
