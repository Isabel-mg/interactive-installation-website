// "№" in the earlier light-mode style: Special Elite with Nanum Gothic Coding supplying the glyph.
export default function No({ n, plain = false, className = '' }: { n: number | string; plain?: boolean; className?: string }) {
  return (
    <span className={`font-no ${plain ? '' : 'text-stamp'} ${className}`} aria-label={`No. ${n}`}>
      №{n}
    </span>
  )
}
