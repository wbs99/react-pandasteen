import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { useSwiper } from '../../hooks/useSwiper'
import { useLocalStore } from '../../stores/useLocalStore'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home'
}

export const WelcomeLayout = () => {
  const animating = useRef(false)
  const nav = useNavigate()
  const outlet = useOutlet()
  const location = useLocation()

  /* 缓存节点 */
  const pageCache = useRef<Record<string, ReactNode>>({})
  pageCache.current[location.pathname] = outlet

  /* 手势 */
  const mainRef = useRef<HTMLDivElement>(null)
  const { direction } = useSwiper(mainRef)

  /* 方向 & 是否首次渲染 */
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [isFirst, setIsFirst] = useState(location.pathname === '/welcome/1')

  useEffect(() => {
    if (direction === 'left' && !animating.current) {
      animating.current = true
      nav(linkMap[location.pathname])
      setIsFirst(false) // 离开第一屏后，后续全部启用动画
    }
  }, [direction, location.pathname])

  useEffect(() => {
    setSlideDir(direction === 'right' ? 'right' : 'left')
  }, [location.pathname])

  /* 动画变量 */
  const variants = {
    left: {
      initial: { x: '100%' },
      exit: { x: '-100%' }
    },
    right: {
      initial: { x: '-100%' },
      exit: { x: '100%' }
    }
  }
  const v = variants[slideDir]

  /* 跳过广告 */
  const { setHadReadWelcome } = useLocalStore()
  const onSkip = () => {
    setHadReadWelcome(true)
    nav('/home')
  }

  return (
    <div className='flex flex-col items-stretch h-screen pb-4 bg-primary'>
      <span
        className='fixed text-3xl text-white cursor-pointer top-4 right-4'
        onClick={onSkip}
      >
        跳过
      </span>

      <header className='pt-16 text-center shrink-0'>
        <h1 className='text-3xl text-[#D4D4EE]'>熊猫</h1>
      </header>

      <main ref={mainRef} className='relative shrink grow'>
        <AnimatePresence
          mode='wait'
          initial={false} // 防止首次整体动画
          onExitComplete={() => (animating.current = false)}
        >
          <motion.div
            key={location.pathname}
            /* 第一屏无进入动画 */
            initial={isFirst ? false : v.initial}
            animate={{ x: 0 }}
            exit={v.exit}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'absolute', inset: 0 }}
            className='flex p-4 size-full'
          >
            <div className='flex items-center justify-center bg-white rounded-lg grow'>
              {pageCache.current[location.pathname]}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
