import { animated, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}
export const Popup = (props: Props) => {
  const { visible, onClickMask, children, position = 'bottom', zIndex = 'var(--z-popup)' } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    visibility: maskVisible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false)
      }
    }
  })
  const wrapperStyles = useSpring({
    visibility: visible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    transform: position === 'bottom'
      ? (visible ? 'translateY(0%)' : 'translateY(100%)')
      : '',
  })
  return (
    <div className='touch-none'>
      <animated.div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-50'
        onClick={() => onClickMask?.()}
        style={{ ...maskStyles, zIndex: `calc(${zIndex} - 1)` }} />
      {position === 'bottom'
        ? (
          <animated.div className='fixed bottom-0 left-0 w-full min-h-[100px] rounded-t-lg overflow-hidden bg-white'
            style={{ ...wrapperStyles, zIndex }} >
            {children}
          </animated.div>
          )
        : (
          <animated.div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden bg-white'
            style={{ ...wrapperStyles, zIndex }} >
            {children}
          </animated.div>
          )
      }
    </div>
  )
}
