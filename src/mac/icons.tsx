// Chunky outline icons for the retro desktop (thick ink line, flat paper/pink fills)
const base = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}
const paper = 'var(--paper)'
const pink = 'var(--folder)'
const teal = 'var(--ok)'

export const PlayerIcon = () => (
  <svg {...base}>
    <rect x="6" y="10" width="52" height="38" rx="5" fill={paper} />
    <rect x="12" y="16" width="40" height="26" rx="2" fill={teal} />
    <path d="M28 22v14l12-7z" fill={paper} />
    <path d="M22 54h20M32 48v6" />
  </svg>
)
export const JournalIcon = () => (
  <svg {...base}>
    <path d="M14 8h26l10 10v38H14z" fill={paper} />
    <path d="M40 8v10h10" />
    <path d="M21 28h22M21 36h22M21 44h14" />
  </svg>
)
export const ComputerIcon = () => (
  <svg {...base}>
    <rect x="12" y="6" width="40" height="34" rx="4" fill={paper} />
    <rect x="17" y="11" width="30" height="22" rx="2" fill={pink} />
    <path d="M6 40h52l-4 14H10z" fill={paper} />
    <path d="M22 47h20" />
  </svg>
)
export const FolderIcon = () => (
  <svg {...base}>
    <path d="M6 18a4 4 0 014-4h14l6 6h24a4 4 0 014 4v26a4 4 0 01-4 4H10a4 4 0 01-4-4z" fill={pink} />
    <path d="M6 26h52" />
  </svg>
)
export const GlobeIcon = () => (
  <svg {...base}>
    <circle cx="32" cy="32" r="24" fill={teal} />
    <ellipse cx="32" cy="32" rx="10" ry="24" fill={paper} />
    <path d="M8 32h48M12 20h40M12 44h40" />
  </svg>
)
export const TrashIcon = () => (
  <svg {...base}>
    <path d="M14 18h36l-3 38H17z" fill={paper} />
    <path d="M10 18h44M25 18v-6h14v6" />
    <path d="M25 26l2 22M39 26l-2 22M32 26v22" />
  </svg>
)
export const HelpIcon = () => (
  <svg {...base}>
    <circle cx="32" cy="32" r="24" fill={pink} />
    <path d="M24 25a8 8 0 1116 0c0 6-8 6-8 12" />
    <path d="M32 46v.5" />
  </svg>
)
