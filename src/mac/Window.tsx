import { useEffect, useRef, useState, type ReactNode } from 'react'

// A draggable retro window: thick outline, hard offset shadow, round buttons at the top left.
export default function Window({
  title,
  width,
  cascade,
  z,
  onFocus,
  onClose,
  children,
}: {
  title: string
  width: number
  cascade: number
  z: number
  onFocus: () => void
  onClose: () => void
  children: ReactNode
}) {
  const w = Math.min(width, window.innerWidth - 16)
  const place = () => ({
    x: Math.max(8, (window.innerWidth - w) / 2 + cascade * 30),
    y: 96 + cascade * 30,
  })
  const [pos, setPos] = useState(place)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

  // re-centre when the window grows (e.g. the video player)
  useEffect(() => setPos(place()), [w]) // eslint-disable-line react-hooks/exhaustive-deps

  function down(e: React.PointerEvent) {
    onFocus()
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  function move(e: React.PointerEvent) {
    if (!drag.current) return
    setPos({
      x: Math.min(window.innerWidth - 80, Math.max(-w + 80, e.clientX - drag.current.dx)),
      y: Math.min(window.innerHeight - 40, Math.max(56, e.clientY - drag.current.dy)),
    })
  }

  return (
    <section
      onPointerDown={onFocus}
      style={{ left: pos.x, top: pos.y, width: w, zIndex: z }}
      className="mac-win rise absolute flex max-h-[calc(100dvh-110px)] flex-col overflow-hidden rounded-2xl border-[3px] border-ink bg-paper"
      aria-label={title}
    >
      <div
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        className="relative flex shrink-0 cursor-grab touch-none items-center justify-center border-b-[3px] border-ink px-3 py-2 active:cursor-grabbing"
      >
        <div className="absolute left-3 flex gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={onClose} aria-label="Close" className="h-4 w-4 rounded-full border-[3px] border-ink bg-paper hover:bg-folder" />
          <span className="h-4 w-4 rounded-full border-[3px] border-ink bg-paper" />
        </div>
        <span className="label truncate px-14 text-[13px]" style={{ textTransform: 'none' }}>
          {title}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  )
}
