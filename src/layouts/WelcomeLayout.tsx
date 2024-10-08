import type { ReactNode } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { useSwiper } from '../hooks/useSwiper'
import { useLocalStore } from '../stores/useLocalStore'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home'
}

export const WelcomeLayout = () => {
  const animating = useRef(false)
  const nav = useNavigate()
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const outlet = useOutlet()
  const location = useLocation()
  const map = useRef<Record<string, ReactNode>>({})
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

  // 滑动切换
  const mainRef = useRef<HTMLElement>(null)
  const { direction } = useSwiper(mainRef)
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) {
        return
      }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])

  // 跳过广告
  const { setHadReadWelcome } = useLocalStore()
  const onSkip = () => {
    setHadReadWelcome(true)
    nav('/home')
  }

  return (
    <div className='flex flex-col items-stretch h-screen pb-4 bg-primary'>
      <span className='fixed text-3xl text-white top-4 right-4' onClick={onSkip}>跳过</span>
      <header className='pt-16 text-center shrink-0'>
        <h1 className='text-3xl text-[#D4D4EE]'>熊猫</h1>
      </header>
      <main className='relative shrink grow' ref={mainRef}>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} className='flex p-4 size-full'>
            <div className='flex items-center justify-center bg-white rounded-lg grow'>
              {map.current[pathname]}
            </div>
          </animated.div>)}
      </main>
    </div>
  )
}
