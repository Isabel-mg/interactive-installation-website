import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ENDINGS, SECRET_ENABLED, SECRET_ENDING, type EndingKey } from '../content/endings'
import { JournalProvider, useJournal, useT } from '../state/journal'
import { play, setAmbience, type AmbienceName } from '../sound'
import Typewriter from '../components/Typewriter'
import type { L } from '../i18n'
import Window from './Window'
import { ComputerIcon, FolderIcon, GlobeIcon, HelpIcon, JournalIcon, PlayerIcon, TrashIcon } from './icons'

// ============================================================================
// THE DESK COMPUTER (/mac)
// Flow: visitor opens the Journal -> types the word from folder 7 on their phone -> the ending
// log types out (they have to read it) -> the Video Player (locked until then) plays the animation. One shared machine: it resets itself for the next visitor.
// ============================================================================

const IDLE_RESET_MS = 90_000

type WinId = 'player' | 'journal' | 'help' | 'computer' | 'downloads' | 'internet' | 'trash'
type Ending = EndingKey | 'secret'

const WIN_W: Record<WinId, number> = { player: 400, journal: 480, help: 420, computer: 340, downloads: 320, internet: 340, trash: 340 }

// All desktop wording (en / ko)
const X = {
  menu: { en: ['Journal', 'File', 'View', 'Help'], ko: ['일기', '파일', '보기', '도움말'] },
  player: { en: 'Video Player', ko: '비디오 플레이어' } as L,
  journal: { en: 'Journal', ko: '일기' } as L,
  help: { en: 'Help', ko: '도움말' } as L,
  computer: { en: 'My Computer', ko: '내 컴퓨터' } as L,
  downloads: { en: 'Downloads', ko: '다운로드' } as L,
  internet: { en: 'Internet', ko: '인터넷' } as L,
  trash: { en: 'My Life', ko: '내 삶' } as L,
  passPrompt: { en: 'Enter the word from folder 7 on your phone to open your journal.', ko: '휴대폰의 폴더 7에 적힌 단어를 입력해 일기를 여세요.' } as L,
  passPlaceholder: { en: 'passcode', ko: '단어 입력' } as L,
  unlock: { en: 'Unlock', ko: '열기' } as L,
  wrong: { en: 'That is not the word.', ko: '그 단어가 아닙니다.' } as L,
  accepted: { en: 'Word accepted.', ko: '단어가 확인되었습니다.' } as L,
  readFirst: {
    en: 'The journal has to be read before the animation can play.',
    ko: '애니메이션을 재생하려면 먼저 일기를 읽어야 합니다.',
  } as L,
  openJournal: { en: 'Show journal', ko: '일기 보기' } as L,
  playAnim: { en: 'Play animation', ko: '애니메이션 재생' } as L,
  read: { en: 'You have read it. The animation is ready.', ko: '다 읽었습니다. 애니메이션이 준비되었습니다.' } as L,
  eject: { en: 'Finish and reset for the next visitor', ko: '마치고 다음 방문자를 위해 초기화' } as L,
  playerLockedTitle: { en: 'This player is locked.', ko: '잠긴 플레이어입니다.' } as L,
  playerLockedBody: {
    en: 'Open the Journal first. Enter the word from folder 7 on your phone, then read what is written.',
    ko: '먼저 일기를 여세요. 휴대폰 폴더 7의 단어를 입력하고, 적힌 글을 읽으세요.',
  } as L,
  openJournalBtn: { en: 'Go to the Journal', ko: '일기로 가기' } as L,
  nextStep: { en: 'Note: now open the Video Player on the desktop.', ko: '참고: 이제 바탕화면의 비디오 플레이어를 여세요.' } as L,
  helpLines: {
    en: [
      '1. Open the Journal.',
      '2. Type the word you were given in folder 7 on your phone.',
      '3. Read your journal. It types itself out.',
      '4. When you have read it, open the Video Player and watch the animation.',
      'When you are done, press the reset button so the next visitor can begin.',
    ],
    ko: [
      '1. 일기를 여세요.',
      '2. 휴대폰 폴더 7에서 받은 단어를 입력하세요.',
      '3. 일기를 읽으세요. 글자가 한 자씩 나타납니다.',
      '4. 다 읽으면 비디오 플레이어를 열어 애니메이션을 보세요.',
      '끝나면 초기화 버튼을 눌러 다음 방문자가 시작할 수 있게 해 주세요.',
    ],
  },
  computerBody: { en: 'System status: fine.\nEverything is fine.', ko: '시스템 상태: 정상.\n모든 게 괜찮습니다.' } as L,
  downloadsBody: { en: '(empty)\n\nNothing was ever saved.', ko: '(비어 있음)\n\n저장된 것은 없습니다.' } as L,
  internetBody: { en: 'No connection.\nNobody is coming.', ko: '연결 없음.\n아무도 오지 않습니다.' } as L,
  trashBody: { en: '1 item.\n\n"it was just a little thing"', ko: '항목 1개.\n\n"별일 아니었어"' } as L,
}

function matchCode(raw: string, lang: 'en' | 'ko'): Ending | null {
  // ignore case and extra spaces
  const norm = (v: string) => v.trim().replace(/\s+/g, ' ').toUpperCase()
  const guess = norm(raw)
  if (!guess) return null
  const hit = (l: L) => [l.en, l.ko].some((w) => norm(w) === guess)
  for (const k of Object.keys(ENDINGS) as EndingKey[]) if (hit(ENDINGS[k].passcode)) return k
  if (SECRET_ENABLED && hit(SECRET_ENDING.passcode)) return 'secret'
  void lang
  return null
}

// A video stored in public/videos plays in the browser with no sound of its own
// (the ending song keeps looping underneath). Anything else is a YouTube video id.
function isLocalVideo(video?: string) {
  return !!video && /\.(mp4|mov|webm)$/i.test(video)
}

function MusicFor(e: Ending | null, playing: boolean, video?: string): AmbienceName | null {
  if (!e) return null
  if (playing && !isLocalVideo(video)) return null // a YouTube video brings its own sound
  return e === 'deny' ? 'endingSink' : e === 'mixed' ? 'endingCheck' : e === 'accept' ? 'endingLeap' : null
}

function Desktop() {
  const j = useJournal()
  const { tx, txs, lang } = useT()

  const [open, setOpen] = useState<WinId[]>([]) // order = stacking, last on top
  const [ending, setEnding] = useState<Ending | null>(null)
  const [logDone, setLogDone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [now, setNow] = useState(() => new Date())

  // the desk computer has no vignette / edge blur (see index.css)
  useEffect(() => {
    document.documentElement.classList.add('mac')
    return () => document.documentElement.classList.remove('mac')
  }, [])

  // light theme by default, to match the pastel desktop
  useEffect(() => j.setTheme('light'), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  const focus = useCallback((id: WinId) => setOpen((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id])), [])
  const openWin = useCallback((id: WinId) => setOpen((o) => [...o.filter((x) => x !== id), id]), [])
  const close = useCallback((id: WinId) => setOpen((o) => o.filter((x) => x !== id)), [])

  const reset = useCallback(() => {
    setEnding(null)
    setLogDone(false)
    setPlaying(false)
    setOpen([])
    setAmbience(null)
  }, [])

  // shared machine: go back to a clean desktop after a quiet minute and a half
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => {
    const arm = () => {
      clearTimeout(idle.current)
      idle.current = setTimeout(reset, IDLE_RESET_MS)
    }
    arm()
    const evs = ['pointerdown', 'keydown'] as const
    evs.forEach((e) => window.addEventListener(e, arm))
    return () => {
      clearTimeout(idle.current)
      evs.forEach((e) => window.removeEventListener(e, arm))
    }
  }, [reset])

  const data = ending ? (ending === 'secret' ? SECRET_ENDING : ENDINGS[ending]) : null

  // ending music while the log is on screen, and on a loop under a silent local video
  useEffect(() => {
    setAmbience(MusicFor(ending, playing, data?.video))
  }, [ending, playing, data?.video])
  const topWin = open[open.length - 1]
  const clock = now.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  function unlock(code: Ending) {
    play('book')
    setEnding(code)
    setLogDone(false)
    setPlaying(false)
    setOpen((o) => [...o.filter((x) => x !== 'journal' && x !== 'player'), 'journal'])
  }

  const bar = (label: string, pct: number) => (
    <div className="flex items-center gap-2">
      <span className="label w-8 text-[11px]">{label}</span>
      <div className="h-3 flex-1 rounded-full border-[3px] border-ink bg-paper">
        <div className="h-full rounded-full bg-ok transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )

  const icon = (id: WinId, label: L, glyph: ReactNode, hero = false) => (
    <button
      key={id}
      onClick={() => {
        play('select')
        openWin(id)
      }}
      className="group flex w-24 flex-col items-center gap-1.5 text-center"
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl p-1 transition-transform group-hover:-translate-y-0.5 group-active:translate-y-px ${
          hero ? 'mac-pulse' : ''
        }`}
      >
        {glyph}
      </span>
      <span className="label rounded bg-paper/80 px-1 text-[11px] leading-tight" style={{ textTransform: 'none' }}>
        {tx(label)}
      </span>
    </button>
  )

  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-paper">
      {/* soft wave background, same palette as the phone */}
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 18 C 20 6, 38 34, 58 22 S 90 0, 100 10 L100 0 L0 0Z" fill="var(--wash)" opacity="0.5" />
        <path d="M0 70 C 22 52, 44 90, 70 66 S 96 50, 100 58 L100 100 L0 100Z" fill="var(--ok)" opacity="0.35" />
        <path d="M0 40 C 25 30, 30 60, 55 48 S 85 38, 100 44 L100 52 C 85 46, 60 58, 40 60 S 10 46, 0 50Z" fill="var(--wash)" opacity="0.35" />
      </svg>

      {/* menu bar */}
      <header className="absolute inset-x-3 top-3 z-[60] flex items-center justify-between gap-3 rounded-xl border-[3px] border-ink bg-paper px-3 py-1.5">
        <nav className="flex items-center gap-4">
          <span className="h-5 w-5 rounded-md border-[3px] border-ink bg-folder" />
          {X.menu[lang].map((m) => (
            <button
              key={m}
              onClick={() => m === X.menu[lang][3] && openWin('help')}
              className="label text-[12px]"
              style={{ textTransform: 'none' }}
            >
              {m}
            </button>
          ))}
        </nav>
        <span className="label hidden truncate text-[12px] sm:block" style={{ textTransform: 'none' }}>
          {topWin ? tx(X[topWin]) : "___'s room"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => j.setLang(j.lang === 'en' ? 'ko' : 'en')}
            className="label rounded border-2 border-ink px-1.5 text-[11px] hover:bg-btn hover:text-btn-ink"
          >
            {lang === 'en' ? 'EN' : '한'}
          </button>
          <button
            onClick={() => j.setTheme(j.theme === 'dark' ? 'light' : 'dark')}
            className="label rounded border-2 border-ink px-1.5 text-[11px] hover:bg-btn hover:text-btn-ink"
            aria-label="Theme"
          >
            {j.theme === 'dark' ? '☀' : '☾'}
          </button>
          <span className="label text-[12px]" style={{ textTransform: 'none' }}>
            {clock}
          </span>
        </div>
      </header>

      {/* status widget */}
      <aside className="absolute left-3 top-[70px] z-10 hidden w-52 space-y-2.5 rounded-2xl border-[3px] border-ink bg-paper p-3 md:block">
        <div className="mx-auto h-12 w-12 text-ink">
          <ComputerIcon />
        </div>
        <p className="text-center font-display text-[26px] leading-none">
          {now.toLocaleTimeString(lang === 'ko' ? 'ko-KR' : 'en-US', { hour: 'numeric', minute: '2-digit' })}
        </p>
        {bar('vol', 60)}
        {bar('cpu', ending ? 85 : 25)}
        {bar('ram', ending ? (logDone ? 95 : 70) : 40)}
      </aside>

      {/* desktop icons */}
      <div className="absolute inset-x-0 top-[38%] z-10 flex justify-center gap-10 text-ink">
        {icon('journal', X.journal, <JournalIcon />, !ending)}
        {icon('player', X.player, <PlayerIcon />, logDone && !playing)}
      </div>
      <div className="absolute right-4 top-[72px] z-10 text-ink">{icon('help', X.help, <HelpIcon />)}</div>
      <div className="absolute bottom-4 left-4 z-10 flex gap-4 text-ink md:bottom-auto md:top-[330px] md:flex-col">
        {icon('computer', X.computer, <ComputerIcon />)}
        {icon('downloads', X.downloads, <FolderIcon />)}
        {icon('internet', X.internet, <GlobeIcon />)}
      </div>
      <div className="absolute bottom-4 right-4 z-10 text-ink">{icon('trash', X.trash, <TrashIcon />)}</div>

      {/* windows */}
      {open.map((id, i) => {
        const title =
          id === 'player' && playing && data ? tx(data.title) : tx(X[id])
        const width = id === 'player' && playing ? 640 : WIN_W[id]
        return (
          <Window key={id} title={title} width={width} cascade={i} z={20 + i} onFocus={() => focus(id)} onClose={() => close(id)}>
            {id === 'player' && (
              <Player
                ending={ending}
                logDone={logDone}
                playing={playing}
                video={data?.video}
                onGoJournal={() => openWin('journal')}
                onPlay={() => setPlaying(true)}
                onReset={reset}
              />
            )}
            {id === 'journal' && (
              <div className="px-4 py-4">
                {data ? (
                  <>
                    <h2 className="mb-4 font-display text-[30px] leading-none">{tx(data.title)}</h2>
                    <Typewriter
                      key={`${lang}-${ending}`}
                      paragraphs={txs(data.log)}
                      instant={logDone}
                      onDone={() => setLogDone(true)}
                    />
                    {logDone && <p className="prose-body rise mt-6 border-t border-dotted border-ink pt-3 italic opacity-75">{tx(X.nextStep)}</p>}
                  </>
                ) : (
                  <PasscodeForm onUnlock={unlock} />
                )}
              </div>
            )}
            {id === 'help' && (
              <div className="space-y-2 px-4 py-4">
                {X.helpLines[lang].map((l, k) => (
                  <p key={k} className="prose-body">
                    {l}
                  </p>
                ))}
              </div>
            )}
            {(id === 'computer' || id === 'downloads' || id === 'internet' || id === 'trash') && (
              <p className="prose-body whitespace-pre-line px-4 py-6 text-center opacity-80">{tx(X[`${id}Body` as 'computerBody'])}</p>
            )}
          </Window>
        )
      })}
    </div>
  )
}

function PasscodeForm({ onUnlock }: { onUnlock: (e: Ending) => void }) {
  const { tx, lang } = useT()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const hit = matchCode(value, lang)
    if (hit) {
      setValue('')
      onUnlock(hit)
    } else {
      play('wrong')
      setError(true)
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 py-2 text-center">
      <div className="mx-auto h-16 w-16">
        <JournalIcon />
      </div>
      <p className="prose-body opacity-85">{tx(X.passPrompt)}</p>
      <input
        value={value}
        onChange={(e) => {
          if (e.target.value !== value) play('key')
          setValue(e.target.value)
        }}
        autoFocus
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder={tx(X.passPlaceholder)}
        className={`prose-body w-full rounded-lg border-[3px] border-ink bg-paper px-3 py-2.5 text-center uppercase tracking-[0.2em] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:opacity-40 focus:bg-wash/60 ${
          error ? 'shake' : ''
        }`}
      />
      {error && <p className="label text-stamp">{tx(X.wrong)}</p>}
      <button type="submit" className="label w-full rounded-lg border-[3px] border-ink bg-btn px-3 py-3 text-btn-ink active:translate-y-px">
        {tx(X.unlock)}
      </button>
    </form>
  )
}

function Player({
  ending,
  logDone,
  playing,
  video,
  onGoJournal,
  onPlay,
  onReset,
}: {
  ending: Ending | null
  logDone: boolean
  playing: boolean
  video?: string
  onGoJournal: () => void
  onPlay: () => void
  onReset: () => void
}) {
  const { tx } = useT()
  const btn = 'label w-full rounded-lg border-[3px] border-ink bg-btn px-3 py-3 text-btn-ink active:translate-y-px'

  if (playing && video) {
    return (
      <div className="space-y-3 p-3">
        <div className="aspect-video w-full overflow-hidden rounded-lg border-[3px] border-ink bg-black">
          {isLocalVideo(video) ? (
            <video
              className="h-full w-full object-contain"
              src={import.meta.env.BASE_URL + video}
              autoPlay
              muted
              playsInline
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
            />
          ) : (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0&modestbranding=1`}
            title="Ending animation"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
          )}
        </div>
        <button onClick={onReset} className={btn}>
          {tx(X.eject)}
        </button>
      </div>
    )
  }

  // unlocked only once the journal has been entered and fully read
  if (ending && logDone) {
    return (
      <div className="space-y-4 px-4 py-5 text-center">
        <div className="mx-auto h-16 w-16">
          <PlayerIcon />
        </div>
        <p className="prose-body opacity-80">{tx(X.read)}</p>
        <button onClick={onPlay} className={`${btn} rise`}>
          ▶ {tx(X.playAnim)}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 py-5 text-center">
      <div className="mx-auto h-16 w-16">
        <PlayerIcon />
      </div>
      <p className="label">{tx(X.playerLockedTitle)}</p>
      <p className="prose-body opacity-80">{tx(ending ? X.readFirst : X.playerLockedBody)}</p>
      <button onClick={onGoJournal} className={btn}>
        {tx(X.openJournalBtn)}
      </button>
    </div>
  )
}

export default function MacApp() {
  return (
    <JournalProvider>
      <Desktop />
    </JournalProvider>
  )
}
