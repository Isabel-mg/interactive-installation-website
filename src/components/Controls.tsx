import Help from './Help'
import { useJournal, useT } from '../state/journal'

const btn =
  'label flex h-6 min-w-6 items-center justify-center border border-rule px-1.5 leading-none transition-colors hover:bg-btn hover:text-btn-ink'

// Language, theme and whisper toggles
export default function Controls() {
  const j = useJournal()
  const { t } = useT()
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button onClick={() => j.setLang(j.lang === 'en' ? 'ko' : 'en')} className={btn} aria-label="Language: English / 한국어">
        {j.lang === 'en' ? 'EN' : '한'}
      </button>
      <button
        onClick={() => j.setTheme(j.theme === 'dark' ? 'light' : 'dark')}
        className={btn}
        aria-label={j.theme === 'dark' ? t.themeToLight : t.themeToDark}
      >
        {j.theme === 'dark' ? '☀' : '☾'}
      </button>
      <Help buttonClass={btn} />
    </div>
  )
}
