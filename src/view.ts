export type View =
  | { kind: 'landing' }
  | { kind: 'home' }
  | { kind: 'station'; id: number }
  | { kind: 'ending'; key?: 'deny' | 'mixed' | 'accept' }
  | { kind: 'secret' }
