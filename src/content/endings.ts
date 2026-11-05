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

// Ending videos: a file in public/videos (e.g. 'videos/ending-1.mp4', plays muted with the ending song)
// or a YouTube video id. PLACEHOLDER_VIDEO is used until an animation is ready.
export const PLACEHOLDER_VIDEO = 'dQw4w9WgXcQ'

// Each ending has a passcode word. Phone folder 7 shows the word; the visitor types it on the
// desk computer (/mac) to read the ending log and watch the animation. Either language works.
export const ENDINGS: Record<EndingKey, { title: L; passcode: L; video: string; log: LS }> = {
  // score 0-4
  deny: {
    title: { en: 'Ending 1 — Blind Ignorance', ko: '결말 1 — 맹목적 무지' },
    passcode: { en: 'ERASED', ko: 'ERASED' }, // TODO(CONTENT): final passcode
    video: 'videos/ending-1-ignorance.mp4', // plays muted; the ending song loops underneath
    log: {
      en: [
        `There are those who fight through the dark just to glimpse the brilliance of the sun. But I think fighting what has already happened is a waste of time. I shouldn't take it so seriously, right? Everybody told me to chill out and stop thinking about it so hard. Maybe they're right. Maybe fighting back will only hurt more.`,
        `Besides, it was just a little thing… He never said sorry, but at least he doesn't bother me as much anymore. I'm fine. I'm still alive, still here. I should just stop being dramatic. I'm always dramatic.`,
      ],
      ko: [
        `어둠을 헤치며 싸우는 사람들이 있다. 눈부신 햇빛을 한 번이라도 보기 위해서. 하지만 나는 이미 일어난 일과 싸우는 건 시간 낭비라고 생각한다. 이렇게까지 심각하게 받아들일 필요는 없잖아, 그렇지? 다들 나한테 진정 좀 하라고, 그만 좀 생각하라고 했다. 그 사람들 말이 맞을지도 모른다. 맞서 싸우면 더 아프기만 할지도 모른다.`,
        `게다가, 그냥 별일 아니었잖아… 그는 끝내 사과하지 않았지만, 적어도 이제는 예전만큼 나를 괴롭히지 않는다. 나는 괜찮다. 아직 살아 있고, 아직 여기 있다. 이제 그만 유난 떨어야지. 나는 늘 유난스러우니까.`,
      ],
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
      ko: [
        `이게 정상이 아니라는 걸 왜 이렇게 늦게 깨달았는지 모르겠다. 가장 친한 친구는 계속 그냥 잊으라고 했지만, 나는 이게 옳지 않다는 걸 알고 있었다. 누구도 이런 일을 당해서는 안 된다. 그래서 부모님께 말씀드렸다… 시간이 좀 걸렸지만, 부모님이 상담을 받게 해 주신 뒤로, 이 일이 나에게 얼마나 깊은 상처를 남겼는지 조금씩 알게 되었다.`,
        `어쩌면 내가 더 했어야 했는지도 모른다. 그는 아직 아무 일 없다는 듯 살고 있고, 이제는 대학생이 되었다. 지금 이 순간에도 다른 누군가가 그에게 괴롭힘을 당하고 있을지도 모른다. 죄책감을 느낄 필요가 없다는 건 알지만, 나는 너무 늦게 깨달았다.`,
        `내 경험을 통해 더 많은 사람이 이 문제를 알게 되었으면 좋겠다. 그동안 그룹 상담 모임에 몇 번 나갔다. 그곳에서 나와 같은 일을 겪은 사람들에게, 부끄러워할 필요도 없고 침묵 속에 살아야 한다는 압박에 갇힐 필요도 없다고 이야기한다. 이렇게라도 작은 변화를 만들 수 있을지도 모른다… 그리고 언젠가 그도 자기가 한 일의 대가를 치르기를 바란다.`,
      ],
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
      ko: [
        `다들 나한테 그냥 넘어가라고 했다. 대부분은 아무것도 하지 않고 한 발짝 떨어져서 지켜보기만 했다. 아무것도 하지 않는 건 정말 쉽다. 받아들이는 것도, 못 본 척하는 것도. 하지만 벌받아야 할 사람이 벌받지 않는다면, 어떻게 세상이 나아질 수 있을까?`,
        `나는 받아들이지 않겠다. 나에게 일어난 일을, 그게 무엇이든 받아들이지 않겠다. 내가 아무것도 하지 않아서 다른 누군가가 같은 일을 겪는다면? 그러면 나도 그와 다를 게 없다. 모두를 위해, 무엇보다 나 자신을 위해, 그가 죗값을 치르게 해야 한다. 그러다 모두가 내 적이 된다 해도 상관없다. 그들은 자기가 편하자고, 다른 사람들이 편하자고, 그게 더 쉽다는 이유만으로 눈을 감았다. 하지만 나는 그렇게 하지 않을 거다. 이제는 아니다.`,
        `나는 가장 친한 친구와 연을 끊었고, 학교가 바라는 것과 반대로 움직였다. 언론이 내 이야기를 보도했고, 지금은 뉴스와 SNS 곳곳에 퍼져 있다. 그의 가족은 몹시 화가 나서 나를 고소하려 하지만, 나는 물러서지 않을 거다. 보호해 주겠다는 약속을 받았지만, 돌아온 건 따가운 시선과 손가락질이었다. 그래도 한편으로는 많은 사람이 나를 지지해 주었고, 시위도 열렸다.`,
        `그런데도 마음 한구석이 텅 빈 것 같다. 여전히 아프다. 그 고통은 아직 그대로 남아 있다. 느껴진다. 그래도 적어도, 나는 무언가를 했다고 말할 수 있다.`,
      ],
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
