import { animated, useSpring } from "@react-spring/web"
import { ReactNode, useState } from "react"

type Props = {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
}

export const Popup = (props: Props) => {
  const { visible, onClickMask, children, position = 'bottom' } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const markStyle = useSpring({
    visibility: maskVisible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const wrapperStyles = useSpring({
    visibility: maskVisible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    transform: position === 'bottom'
      ? (visible ? 'translateY(0%)' : 'translateY(100%)')
      : '',
  })


  return (
    <div touch-none>
      <animated.div style={markStyle} fixed top-0 left-0 h-full w-full className="bg-black:75" z="[calc(var(--z-popup)-1)]" onClick={onClickMask}>
      </animated.div>
      {position === 'bottom'
        ? (
          <animated.div fixed bottom-0 left-0 w-full min-h-100px bg-white
            z="[calc(var(--z-popup))]"
            style={wrapperStyles} rounded-t-8px overflow-hidden>
            {children}
          </animated.div>
        )
        : (
          <animated.div fixed bg-white left="[50%]" top="[50%]"
            translate-x="-50%" translate-y="-50%"
            z="[calc(var(--z-popup))]"
            style={wrapperStyles} rounded-8px overflow-hidden>
            {children}
          </animated.div>
        )
      }
    </div>
  )
}