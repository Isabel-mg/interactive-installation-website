import { lazy, Suspense } from 'react'
import PhoneApp from './App'

// The same project serves two pages:
//   /        -> the visitor's phone (journal folders)
//   /mac     -> the desk computer (passcode -> ending log + animation); also reachable at /#/mac
// The Mac page is code-split so phones never download it.
const MacApp = lazy(() => import('./mac/MacApp'))

export function isMacRoute() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path.endsWith('/mac') || window.location.hash.startsWith('#/mac')
}

export default function Root() {
  if (!isMacRoute()) return <PhoneApp />
  return (
    <Suspense fallback={null}>
      <MacApp />
    </Suspense>
  )
}
