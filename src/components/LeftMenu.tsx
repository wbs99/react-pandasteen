import { animated, useSpring } from "@react-spring/web"
import { useState } from "react"
import { CurrentUser } from "./TopMenu/CurrentUser"
import { Menu } from "./TopMenu/Menu"

interface Props {
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
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const menuStyle = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)'
  })

  return (
    <>
      <animated.div fixed top-0 left-0 w="100%" h="100%" className="bg-black:75"
        z="[calc(var(--z-menu)-1)]" onClick={onClickMask} style={markStyle}
      />
      <animated.div fixed top-0 left-0 w='70vw' max-w-20em h-screen flex flex-col z="[var(--z-menu)]" style={menuStyle}>
        <CurrentUser className="grow-0 shrink-0" />
        <Menu className="grow-1 shrink-1" />
      </animated.div>
    </>
  )
}