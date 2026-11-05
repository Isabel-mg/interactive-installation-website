// ============================================================================
// THE NARRATOR ("the room")  —  speaks rarely, one short line at a time.
// It appears as a quiet typed line under the header, never as a popup, and
// fades after a few seconds. Visitors can turn it off with the ◉ button.
// Use {name} for the visitor's name. Keep lines SHORT.
// ============================================================================

import type { L } from '../i18n'
import type { Choice } from './stations'

export const CHOICE_LABELS: Record<Choice, L> = {
  // TODO(CONTENT): rename the 3 answer options
  deny: { en: '1. Deny', ko: '1. 부정' },
  mixed: { en: '2. Mixed reaction', ko: '2. 엇갈린 반응' },
  accept: { en: '3. Accept', ko: '3. 수용' },
}

export const LINES = {
  welcome: { en: "I kept the light on. I wasn't sure you would come back.", ko: '불을 켜 두었어요. 당신이 돌아올지 확신이 없었어요.' } as L,
  nameSaved: { en: '{name}, welcome back. Everything is exactly as you left it. This is your room now.', ko: '{name}, 돌아왔군요. 모든 게 당신이 떠난 그대로예요. 이제 여기는 당신의 방입니다.' } as L,
  sealedFinal: { en: "You can't start thinking about the future without knowing your past. Read all six logs first.", ko: '과거를 알지 못한 채 미래를 생각할 수는 없어요. 먼저 여섯 개의 기록을 모두 읽으세요.' } as L,
  wrongPasskey: { en: "Keep looking for the word, {name}. It's here somewhere.", ko: '단어를 계속 찾아보세요, {name}. 이 어딘가에 있어요.' } as L, // spoken on the 3rd wrong attempt only
  choiceMade: {
    deny: { en: 'PLACEHOLDER — You turn away. Noted.', ko: '임시 문구 — 외면하는군요. 기록했습니다.' },
    mixed: { en: 'PLACEHOLDER — Torn. Noted.', ko: '임시 문구 — 흔들리는군요. 기록했습니다.' },
    accept: { en: 'PLACEHOLDER — You let it in. Noted.', ko: '임시 문구 — 받아들이는군요. 기록했습니다.' },
  } as Record<Choice, L>,
  allDone: { en: '{name}, you know what happened now. What you decide to do with it is the only part left. The last folder is open.', ko: '{name}, 이제 무슨 일이 있었는지 알았어요. 그것으로 무엇을 할지 정하는 일만 남았어요. 마지막 폴더가 열렸어요.' } as L,
  secretFound: { en: 'PLACEHOLDER — ...How did you find that?', ko: '임시 문구 — ...이걸 어떻게 찾았죠?' } as L,
}
