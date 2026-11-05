// ============================================================================
// LANGUAGE HELPERS + INTERFACE STRINGS (English / Korean)
// Story content lives in src/content/*. Generic UI labels live here.
// {name} is replaced with the visitor's name.
// ============================================================================

export type Lang = 'en' | 'ko'
export type L = { en: string; ko: string }
export type LS = { en: string[]; ko: string[] }

export function fill(text: string, name: string, lang: Lang) {
  return text.replace(/\{name\}/g, name || (lang === 'ko' ? '낯선 이' : 'stranger'))
}

// Project name: "___'s room" -> "Ana's room" / "___의 방" -> "Ana의 방"
export function roomTitle(name: string, lang: Lang) {
  const n = name || '___'
  return lang === 'ko' ? `${n}의 방` : `${n}'s room`
}

const en = {
  siteTag: 'lost files',
  progress: 'Folders unlocked',
  themeToLight: 'Switch to light mode',
  themeToDark: 'Switch to dark mode',
  whispersOn: 'Whispers on',
  whispersOff: 'Whispers off',
  whisperLabel: 'the room',

  // landing
  introLabel: 'file 000 / intro',
  heroKicker: 'Welcome to',
  heroSub: 'Everything is fine. Please, come in. Make yourself at home.',
  // TODO(CONTENT): landing intro text
  intro1: 'PLACEHOLDER — This room keeps files that someone left behind. Each station holds one folder, closed behind a word hidden nearby.',
  intro2: 'PLACEHOLDER — Read slowly. Some things here do not want to be found.',
  nameLabel: 'This room belongs to...',
  namePlaceholder: 'write your name here',
  save: 'save',
  enter: 'Enter your room →',
  privacyNote: 'Your name and your answers are not saved anywhere else. They only live on this phone.',

  // index
  indexLabel: 'Room Guide',
  keysFound: 'journal entries found',
  folder: 'entry',
  stLocked: 'closed',
  stOpen: 'open',
  stRead: 'read ✓',
  stSealed: 'closed',
  redactedTitle: 'unknown',
  finalReady: 'open now',
  mystery: 'a loose note',

  // station
  back: '← Index', //check
  logLabel: 'Journal Entry',
  sealedLine: '▒ closed — a word will open it',
  sealedTwo: '▒ closed — two words will open it',
  passkey: 'passkey',
  unlock: 'unlock',
  denied: 'that is not the word',
  hintBtn: "feeling lost?",
  hintLabel: 'hint',
  unlocked: 'opening',
  opening: 'opening journal log',
  endEntry: '— end of entry —',
  responseRequired: 'your answer',
  recorded: 'answer recorded',
  backToFiles: 'return to index →',

  // ending
  unlisted: 'unlisted',
  endFile: '— end of file —',

  footer: '2026 ATC TAco TEAM',

  dev: 'dev',
  devTitle: 'dev · passkeys',
  close: 'close',
  reset: 'reset everything',
  auto: 'auto',
  score: 'score',
}

const ko: typeof en = {
  siteTag: '잃어버린 파일',
  progress: '열린 폴더',
  themeToLight: '라이트 모드로 전환',
  themeToDark: '다크 모드로 전환',
  whispersOn: '속삭임 켜짐',
  whispersOff: '속삭임 꺼짐',
  whisperLabel: '방',

  introLabel: '파일 000 / 서문',
  heroKicker: '어서 오세요,',
  heroSub: '모든 게 괜찮아요. 어서 들어와요. 편히 있어요.',
  intro1: '임시 문구 — 이 방에는 누군가 두고 간 파일들이 있습니다. 각 스테이션에는 폴더가 하나씩 있고, 근처에 숨겨진 단어로 닫혀 있습니다.',
  intro2: '임시 문구 — 천천히 읽으세요. 어떤 것은 발견되고 싶어 하지 않습니다.',
  nameLabel: '이 방의 주인은...',
  namePlaceholder: '여기에 이름을 적어주세요',
  save: '저장',
  enter: '방으로 들어가기 →',
  privacyNote: '이름과 답변은 다른 어디에도 저장되지 않습니다. 이 휴대폰에만 남습니다.',

  indexLabel: '방 안내',
  keysFound: '찾은 일기',
  folder: '기록',
  stLocked: '닫힘',
  stOpen: '열림',
  stRead: '읽음 ✓',
  stSealed: '닫힘',
  redactedTitle: '알 수 없음',
  finalReady: '지금 열기',
  mystery: '떨어진 쪽지',

  back: '← 파일',
  logLabel: '기록 보관소',
  sealedLine: '▒ 닫혀 있음 — 단어 하나면 열립니다',
  sealedTwo: '▒ 닫혀 있음 — 단어 두 개면 열립니다',
  passkey: '암호',
  unlock: '열기',
  denied: '그 단어가 아닙니다',
  hintBtn: '단어를 찾을 수 없나요?',
  hintLabel: '힌트',
  unlocked: '열림',
  opening: '파일 여는 중',
  endEntry: '— 기록 끝 —',
  responseRequired: '당신의 응답',
  recorded: '응답이 기록되었습니다',
  backToFiles: '파일로 돌아가기 →',

  unlisted: '비공개',
  endFile: '— 파일 끝 —',

  footer: '2026 ATC TAco TEAM',

  dev: '개발',
  devTitle: '개발 · 암호',
  close: '닫기',
  reset: '전체 초기화',
  auto: '자동',
  score: '점수',
}

export const UI = { en, ko }
