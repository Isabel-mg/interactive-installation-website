import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useJournal } from '../state/journal'
import type { L } from '../i18n'

// ============================================================================
// HELP — the "?" button in the header and its pop-up. Edit the wording here.
// ============================================================================
const TITLE: L = { en: 'How this room works', ko: '이 방 사용법' }
const CLOSE: L = { en: 'Close', ko: '닫기' }
const OPEN: L = { en: 'Help: how this works', ko: '도움말' }

const STEPS: { head: L; body: L }[] = [
  {
    head: { en: 'Enter your name', ko: '이름을 적으세요' },
    body: {
      en: 'Type a name on the first page and save it. The room becomes yours.',
      ko: '첫 페이지에 이름을 적고 저장하세요. 방이 당신의 것이 됩니다.',
    },
  },
  {
    head: { en: 'Open the folders', ko: '폴더를 여세요' },
    body: {
      en: 'There are six folders, and you can open them in any order. Each one is locked with a secret word. Tap a folder and type the word.',
      ko: '폴더는 여섯 개이며 어떤 순서로든 열 수 있습니다. 각 폴더는 비밀 단어로 잠겨 있습니다. 폴더를 누르고 단어를 입력하세요.',
    },
  },
  {
    head: { en: 'Find the word', ko: '단어를 찾으세요' },
    body: {
      en: 'The word is hidden on an object in the exhibition, near each station. Look closely around you. Stuck? Tap "feeling lost?" on the folder for a hint.',
      ko: '단어는 각 스테이션 근처, 전시 속 물건에 숨겨져 있습니다. 주변을 자세히 살펴보세요. 막혔다면 폴더의 힌트 버튼을 누르세요.',
    },
  },
  {
    head: { en: 'Read, then answer', ko: '읽고, 답하세요' },
    body: {
      en: 'The journal types itself out. Read it slowly. At the end, choose how you would respond. Your answer is final and cannot be changed.',
      ko: '일기가 한 글자씩 나타납니다. 천천히 읽으세요. 마지막에 어떻게 반응할지 선택하세요. 선택은 바꿀 수 없습니다.',
    },
  },
  {
    head: { en: 'The last folder', ko: '마지막 폴더' },
    body: {
      en: 'Once all six are read and answered, a seventh folder opens. What you see there depends on the choices you made.',
      ko: '여섯 개를 모두 읽고 답하면 일곱 번째 폴더가 열립니다. 그곳에서 보게 되는 것은 당신의 선택에 달려 있습니다.',
    },
  },
]

const TIPS: L = {
  en: 'EN / 한 switches the language. The sun / moon switches light and dark. Sound makes it better, so turn your volume up.',
  ko: 'EN / 한 으로 언어를, 해 / 달로 밝기를 바꿉니다. 소리와 함께하면 더 좋으니 볼륨을 켜 주세요.',
}

export default function Help({ buttonClass }: { buttonClass: string }) {
  const [open, setOpen] = useState(false)
  const { lang } = useJournal()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClass} aria-label={OPEN[lang]} aria-haspopup="dialog">
        ?
      </button>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={TITLE[lang]}
              onClick={(e) => e.stopPropagation()}
              className="rise flex max-h-[85dvh] w-full max-w-[400px] flex-col border-2 border-rule bg-paper text-ink"
            >
              <div className="flex items-center justify-between border-b border-rule px-4 py-3">
                <h2 className="font-display text-[26px] leading-none">{TITLE[lang]}</h2>
                <button onClick={() => setOpen(false)} className={buttonClass} aria-label={CLOSE[lang]}>
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto px-4 py-4">
                <ol className="space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="label mt-0.5 w-5 shrink-0 text-stamp">{i + 1}.</span>
                      <div>
                        <p className="label">{s.head[lang]}</p>
                        <p className="prose-body mt-1 opacity-85">{s.body[lang]}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="prose-body mt-5 border-t border-dotted border-rule pt-3 italic opacity-70">{TIPS[lang]}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="label border-t border-rule bg-btn px-4 py-3 text-btn-ink active:translate-y-px"
              >
                {CLOSE[lang]}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
