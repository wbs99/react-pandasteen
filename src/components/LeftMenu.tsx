import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

type Props = {
  onClickMask?: () => void
  visible?: boolean
}

export const LeftMenu = (props: Props) => {
  const { onClickMask, visible } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  // 打开动画 0 => 1
  // 关闭动画 1 => 0
  const markStyle = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
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
  const menuStyle = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)'
  })

  return (
    <>
      <animated.div onClick={onClickMask} style={markStyle} className='fixed top-0 left-0 w-full h-screen z-[calc(var(--z-menu)-1)] bg-black bg-opacity-75'/>
      <animated.div style={menuStyle} className='fixed top-0 left-0 w-[70vw] max-w-[20em] h-screen flex flex-col z-[var(--z-menu)]'>
        <CurrentUser className='grow-0 shrink-0' />
        <Menu className='grow shrink' />
      </animated.div>
    </>
  )
}
