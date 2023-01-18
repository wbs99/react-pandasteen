import { animated, useTransition } from '@react-spring/web'
import { ReactNode, useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link, Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/icons/panda.svg'
import { useSwiper } from '../hooks/useSwiper'
import { useLocalStore } from '../stores/useLocalStore'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/xxx'
}

export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)
  const nav = useNavigate()
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({ position: 'relative' })
    }
  })
  const mainRef = useRef<HTMLElement>(null)
  const { direction } = useSwiper(mainRef)
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  const { setHadReadWelcome } = useLocalStore()
  const onSkip = () => {
    setHadReadWelcome(true)
  }

  return (
    <div className="bg-#5f34bf" h-screen flex flex-col items-stretch pb-16px>
      <Link fixed text-white top-16px right-16px text-32px to="/welcome/xxx">跳过</Link>
      <header shrink-0 text-center pt-64px>
        <img src={logo} w-64px />
        <h1 text="#D4D4EE" text-32px>熊猫记账</h1>
      </header>
      <main shrink-1 grow-1 relative ref={mainRef}>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px flex>
            <div grow-1 bg-white flex justify-center items-center rounded-8px>
              {map.current[pathname]}
            </div>
          </animated.div>
        )}
      </main>
    </div>

  )
}
