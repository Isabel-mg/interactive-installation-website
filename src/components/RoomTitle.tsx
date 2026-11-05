import { useT } from '../state/journal'

// "Ana's room" / "Ana의 방"; with no name, the blank is one unbroken short line instead of "___"
export default function RoomTitle({ name: override }: { name?: string }) {
  const { lang, name } = useT()
  const n = (override ?? name).trim()
  return (
    <>
      {n || <span aria-hidden className="inline-block h-[0.06em] w-[1.5em] translate-y-[0.02em] bg-current align-baseline" />}
      {lang === 'ko' ? '의 방' : "'s room"}
    </>
  )
}
