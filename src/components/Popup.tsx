import { animated, useSpring } from "@react-spring/web"
import { useState } from "react"

type Props = {
  visible: boolean
  onClickMask?: () => void
}

export const Popup = (props: Props) => {
  const { visible, onClickMask } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const markStyle = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  })
  const markStyles = {
    ...markStyle,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  }

  return (
    <>
      <animated.div style={markStyles} fixed top-0 left-0 h-full w-full className="bg-black:75" z="[calc(var(--z-popup)-1)]" onClick={onClickMask}>遮罩
      </animated.div>
      <animated.div style={menuStyles} fixed bottom-0 left-0 w-full min-h-100px bg-white z="[calc(var(--z-popup))]">面板</animated.div>
    </>
  )
}