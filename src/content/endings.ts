// ============================================================================
// ENDINGS + SCORING  —  edit text (en + ko) and thresholds here.
// Each answer is worth points (POINTS). Total over all stations = 0..MAX_SCORE.
// ============================================================================

import type { L, LS } from '../i18n'
import { STATIONS, type Choice } from './stations'

export const POINTS: Record<Choice, number> = { deny: 0, mixed: 1, accept: 2 }

// 6 stations x 2 points = 0..12
// 0-4 -> ending 1, 5-8 -> ending 2, 9-12 -> ending 3 (hardest)
export const SCORING = { DENY_MAX: 4, MIXED_MAX: 8 }
export const MAX_SCORE = STATIONS.length * 2

export type EndingKey = 'deny' | 'mixed' | 'accept'

// Placeholder video for every ending until the animations are done (YouTube video id)
export const PLACEHOLDER_VIDEO = 'dQw4w9WgXcQ'

// Each ending has a passcode word. Phone folder 7 shows the word; the visitor types it on the
// desk computer (/mac) to read the ending log and watch the animation. Either language works.
export const ENDINGS: Record<EndingKey, { title: L; passcode: L; video: string; log: LS }> = {
  // score 0-4
  deny: {
    title: { en: 'Ending 1 — Blind Ignorance', ko: '결말 1 — 맹목적 무지' },
    passcode: { en: 'ERASED', ko: 'ERASED' }, // TODO(CONTENT): final passcode
    video: PLACEHOLDER_VIDEO, // TODO(CONTENT): ending animation
    log: {
      en: [
        `There are those who fight through the dark just to glimpse the brilliance of the sun. But I think fighting what has already happened is a waste of time. I shouldn't take it so seriously, right? Everybody told me to chill out and stop thinking about it so hard. Maybe they're right. Maybe fighting back will only hurt more.`,
        `Besides, it was just a little thing… He never said sorry, but at least he doesn't bother me as much anymore. I'm fine. I'm still alive, still here. I should just stop being dramatic. I'm always dramatic.`,
      ],
      ko: ['임시 문구 — 맹목적 무지의 결말. // TODO(CONTENT): Korean', '{name}, 당신은 모든 문을 닫았습니다.'],
    },
  },
  // score 5-8
  mixed: {
    title: { en: 'Ending 2 — Acceptance', ko: '결말 2 — 수용' },
    passcode: { en: 'RESIGN', ko: 'RESIGN' }, // TODO(CONTENT): final passcode
    video: PLACEHOLDER_VIDEO, // TODO(CONTENT): ending animation
    log: {
      en: [
        `I don't know why it took me so long to realize this wasn't normal. My best friend kept telling me to drop it, but I knew it wasn't right. Nobody should be treated like this. So I told my parents… It took a while, but after they put me in therapy, I slowly began to understand how deeply this had affected me.`,
        `Maybe I should have done more. He's still out there, now in university. Maybe some other girl is being harassed by him right now. I know I shouldn't feel guilty, but I realized too late.`,
        `I hope I can spread awareness through my experience. I've been to a couple of group sessions where I help others who went through the same thing realize that they shouldn't be ashamed, or pressured into believing they have to live in silence. Maybe this way, I can make a small difference… And I hope karma comes for him someday.`,
      ],
      ko: ['임시 문구 — 수용의 결말. // TODO(CONTENT): Korean', '{name}, 당신은 내내 문턱에 서 있었습니다.'],
    },
  },
  // score 9-12 (hardest to reach)
  accept: {
    title: { en: 'Ending 3 — Whistleblower', ko: '결말 3 — 내부 고발자' },
    passcode: { en: 'LEAP OF FAITH', ko: 'LEAP OF FAITH' }, // TODO(CONTENT): final passcode
    video: PLACEHOLDER_VIDEO, // TODO(CONTENT): ending animation
    log: {
      en: [
        `They told me to let it go. Most people did nothing and stood on the sidelines. It's so easy to do nothing, to accept it, or even to ignore it. But how can things get better if justice isn't served to those who deserve it?`,
        `I refuse to accept it. I refuse to accept whatever happened to me. What if some other girl had to go through this because I didn't do anything? I'd be just as guilty as him. I owe it to everybody, and especially to myself, to bring him to justice. If that means making everyone my enemy, so be it. They turned a blind eye for their own comfort, and for the comfort of others, just because it was easier. But that's not going to be me. Not anymore.`,
        `I broke off my friendship with my best friend, and I went against the school's wishes. The media recorded my story, and now it's on the news and all over social media. His family is livid and is trying to sue me, but I won't back down. I was promised protection, yet I've been scrutinized and shamed. At the same time, many people have risen to support me, and there have been demonstrations.`,
        `But I can't help feeling empty. It still hurts. The pain is still there. I can feel it. At least I can say I've done something.`,
      ],
      ko: ['임시 문구 — 내부 고발자의 결말. // TODO(CONTENT): Korean', '{name}, 당신은 모든 문을 열었습니다.'],
    },
  },
}

export const SECRET_ENDING = {
  passcode: { en: 'UNLISTED', ko: 'UNLISTED' } as L, // TODO(CONTENT): typed on the desk computer
  video: PLACEHOLDER_VIDEO,
  title: { en: '? — The Unlisted Page', ko: '? — 비공개 페이지' } as L,
  // TODO(CONTENT): hidden ending. Placeholder trigger: tap the "?" note 5 times.
  log: {
    en: ['PLACEHOLDER — HIDDEN ENDING. Nobody was meant to read this.', '{name}, you looked where nobody looks.'],
    ko: ['임시 문구 — 숨겨진 결말. 아무도 읽어선 안 되는 글입니다.', '{name}, 아무도 보지 않는 곳을 보았군요.'],
  } as LS,
}

// The hidden "?" note and the secret code are switched off until the secret ending is finished.
export const SECRET_ENABLED = false

export const SECRET_TAPS = 5
