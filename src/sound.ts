// Sound design. Synthesized with WebAudio so no asset files are needed.
export type SoundName = 'type' | 'key' | 'book' | 'write' | 'select' | 'door' | 'slide' | 'unlock' | 'wrong' | 'choice' | 'narrator' | 'ending'

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx ??= new AC()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

// "Creamy" keypress, modeled on a gasket-mounted, foam-filled board with lubed linears:
//  - bottom-out "thock": deep, rounded, quickly damped (foam + PC plate)
//  - a little mid body resonance, so it sounds full and clear instead of hollow
//  - a very soft, filtered tap on top for definition (no spring ping, no click)
//  - a faint, quieter key-up "tick" a moment later
function key() {
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const v = 0.94 + Math.random() * 0.12 // tiny per-key pitch variation

  const out = c.createGain()
  out.gain.value = 0.8
  // gentle roll-off of the highs, like foam absorbing them
  const damp = c.createBiquadFilter()
  damp.type = 'lowpass'
  damp.frequency.value = 5500
  out.connect(damp).connect(c.destination)

  const tone = (type: OscillatorType, f0: number, f1: number, peak: number, attack: number, decay: number, at = 0) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.setValueAtTime(f0 * v, t + at)
    o.frequency.exponentialRampToValueAtTime(f1 * v, t + at + decay)
    g.gain.setValueAtTime(0.0001, t + at)
    g.gain.linearRampToValueAtTime(peak, t + at + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + at + decay)
    o.connect(g).connect(out)
    o.start(t + at)
    o.stop(t + at + decay + 0.02)
  }

  const burst = (freq: number, q: number, peak: number, dur: number, at = 0) => {
    const len = Math.floor(c.sampleRate * dur)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2)
    const n = c.createBufferSource()
    n.buffer = buf
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq * v
    bp.Q.value = q
    const g = c.createGain()
    g.gain.setValueAtTime(0.0001, t + at)
    g.gain.linearRampToValueAtTime(peak, t + at + 0.003)
    g.gain.exponentialRampToValueAtTime(0.0001, t + at + dur)
    n.connect(bp).connect(g).connect(out)
    n.start(t + at)
  }

  // bottom-out
  tone('sine', 175, 82, 0.8, 0.004, 0.15) // deep, full thock
  tone('sine', 95, 60, 0.35, 0.005, 0.12) // low body for depth
  tone('triangle', 400, 230, 0.17, 0.003, 0.08) // smooth mid body
  burst(3000, 0.7, 0.1, 0.05) // soft high sheen, rounded not sharp
  burst(1400, 0.8, 0.16, 0.035)
  // key-up
  tone('sine', 250, 160, 0.12, 0.003, 0.05, 0.075)
  burst(2200, 0.8, 0.06, 0.02, 0.075)
}

// Recorded sound files (public/sfx)
const FILES: Partial<Record<SoundName, { src: string; volume: number }>> = {
  wrong: { src: import.meta.env.BASE_URL + 'sfx/wrong-answer.mp3', volume: 0.8 },
  book: { src: import.meta.env.BASE_URL + 'sfx/book-open.mp3', volume: 0.9 },
  choice: { src: import.meta.env.BASE_URL + 'sfx/select.m4a', volume: 1 },
  select: { src: import.meta.env.BASE_URL + 'sfx/select.m4a', volume: 1 },
  door: { src: import.meta.env.BASE_URL + 'sfx/door.mp3', volume: 0.8 },
  slide: { src: import.meta.env.BASE_URL + 'sfx/paper-slide.mp3', volume: 0.8 },
  write: { src: import.meta.env.BASE_URL + 'sfx/writing-journal.mp3', volume: 0.6 },
}
const playing: Partial<Record<SoundName, HTMLAudioElement>> = {}

// Fade out and stop a looping/long sound (e.g. the writing sound when the text finishes)
export function stop(name: SoundName) {
  const a = playing[name]
  if (!a) return
  delete playing[name]
  const fade = setInterval(() => {
    a.volume = Math.max(0, a.volume - 0.1)
    if (a.volume <= 0) {
      clearInterval(fade)
      a.pause()
    }
  }, 40)
}

export function play(name: SoundName) {
  if (name === 'key') return key()
  const f = FILES[name]
  if (f) {
    playing[name]?.pause()
    const a = new Audio(f.src)
    a.volume = f.volume
    playing[name] = a
    a.play().catch(() => {})
    return
  }
  // TODO(SOUND): remaining sounds
}

// ---------------------------------------------------------------------------
// Background ambience: one looping track at a time, crossfaded on change.
// `null` fades everything out (used for the endings, which get their own sound).
// ---------------------------------------------------------------------------
// general0..general3 = the same bed at rising tension (more distortion); loops are kept in sync when switching
export type AmbienceName = 'beginning' | 'general0' | 'general1' | 'general2' | 'general3' | 'endingSink' | 'endingCheck' | 'endingLeap'

const AMBIENCE: Record<AmbienceName, { src: string; volume: number }> = {
  beginning: { src: import.meta.env.BASE_URL + 'sfx/ambience-beginning.m4a', volume: 0.22 },
  endingSink: { src: import.meta.env.BASE_URL + 'sfx/ending-sink.wav', volume: 0.35 }, // ending 1, Blind Ignorance
  endingCheck: { src: import.meta.env.BASE_URL + 'sfx/ending-check.wav', volume: 0.35 }, // ending 2, Acceptance
  endingLeap: { src: import.meta.env.BASE_URL + 'sfx/ending-leap.wav', volume: 0.35 }, // ending 3, Whistleblower
  general0: { src: import.meta.env.BASE_URL + 'sfx/ambience-general-0.m4a', volume: 0.18 },
  general1: { src: import.meta.env.BASE_URL + 'sfx/ambience-general-1.m4a', volume: 0.18 },
  general2: { src: import.meta.env.BASE_URL + 'sfx/ambience-general-2.m4a', volume: 0.18 },
  general3: { src: import.meta.env.BASE_URL + 'sfx/ambience-general-3.m4a', volume: 0.18 },
}
const FADE_MS = 1200
const tracks: Partial<Record<AmbienceName, HTMLAudioElement>> = {}
let wanted: AmbienceName | null = null
let unlockHooked = false

// Each element has at most one active fade; a new fade cancels the old one so they never fight.
const fades = new WeakMap<HTMLAudioElement, number>()

function fadeTo(a: HTMLAudioElement, target: number, then?: () => void) {
  const from = a.volume
  const start = performance.now()
  const id = (fades.get(a) ?? 0) + 1
  fades.set(a, id)
  const step = () => {
    if (fades.get(a) !== id) return
    const k = Math.min(1, (performance.now() - start) / FADE_MS)
    a.volume = Math.max(0, Math.min(1, from + (target - from) * k))
    if (k < 1) requestAnimationFrame(step)
    else then?.()
  }
  requestAnimationFrame(step)
}

function startTrack(name: AmbienceName, syncFrom?: HTMLAudioElement) {
  let a = tracks[name]
  if (!a) {
    a = new Audio(AMBIENCE[name].src)
    a.loop = true
    a.volume = 0
    tracks[name] = a
  }
  const el = a
  // keep tension layers aligned so the switch sounds like the same piece getting darker
  if (syncFrom && el.paused) {
    try {
      el.currentTime = syncFrom.currentTime
    } catch {
      /* not loaded yet; starts from 0 */
    }
  }
  el.play().then(
    () => {
      // only fade in if this track is still the wanted one (e.g. not already replaced by an ending)
      if (wanted === name) fadeTo(el, AMBIENCE[name].volume)
      else el.pause()
    },
    () => {
      // Browsers block audio until the first tap/keypress; retry then.
      if (unlockHooked) return
      unlockHooked = true
      const retry = () => {
        unlockHooked = false
        window.removeEventListener('pointerdown', retry)
        window.removeEventListener('keydown', retry)
        if (wanted === name) startTrack(name)
      }
      window.addEventListener('pointerdown', retry)
      window.addEventListener('keydown', retry)
    },
  )
}

export function setAmbience(name: AmbienceName | null) {
  if (wanted === name) return
  const prev = (Object.keys(tracks) as AmbienceName[]).map((k) => tracks[k]!).find((a) => !a.paused && a.volume > 0)
  const prevName = (Object.keys(tracks) as AmbienceName[]).find((k) => tracks[k] === prev)
  wanted = name
  ;(Object.keys(tracks) as AmbienceName[]).forEach((k) => {
    const a = tracks[k]!
    if (k !== name && !a.paused) fadeTo(a, 0, () => wanted !== k && a.pause())
  })
  const bothGeneral = name?.startsWith('general') && prevName?.startsWith('general')
  if (name) startTrack(name, bothGeneral ? prev : undefined)
}
