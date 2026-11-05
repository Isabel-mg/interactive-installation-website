// ============================================================================
// AMBIENCE TENSION  —  how dark the background loop gets as the visitor progresses.
//   +0.5 for every log opened
//   +1   for a Deny answer (0-point option), +0.5 for Mixed (1-point), +0 for Accept (2-point)
//   Once the last (6th) log is read, answered and CLOSED, tension jumps to the maximum whatever was chosen
//   (unless the points already reached the top level earlier).
// Level 0..3 maps to the ambience-general-0..3 audio files.
// ============================================================================

import type { Choice } from './stations'

export const TENSION_PER_LOG = 0.5
export const TENSION_PER_CHOICE: Record<Choice, number> = { deny: 1, mixed: 0.5, accept: 0 }

// tension points needed to reach level 1, 2, 3
export const TENSION_STEPS = [2, 4.5, 7]

export function tensionPoints(logsOpened: number, choices: Partial<Record<number, Choice>>): number {
  return (
    logsOpened * TENSION_PER_LOG +
    Object.values(choices).reduce((sum, c) => sum + (c ? TENSION_PER_CHOICE[c] : 0), 0)
  )
}

// `finished` = all 6 logs read and answered. It forces the maximum level, but the caller
// should only pass it once the visitor has closed the last log (see App.tsx).
export function tensionLevel(
  logsOpened: number,
  choices: Partial<Record<number, Choice>>,
  finished = false,
): 0 | 1 | 2 | 3 {
  if (finished) return 3
  const points = tensionPoints(logsOpened, choices)
  return TENSION_STEPS.filter((t) => points >= t).length as 0 | 1 | 2 | 3
}
