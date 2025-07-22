import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}

export const Popup = (props: Props) => {
  const {
    visible,
    onClickMask,
    children,
    position = 'bottom',
    zIndex = 'var(--z-popup)',
  } = props

  const [maskVisible, setMaskVisible] = useState(visible)

  return (
    <AnimatePresence>
      {visible && (
        <>
          {maskVisible && (
            <motion.div
              className='fixed top-0 left-0 bg-black/50 size-full touch-none'
              style={{ zIndex: `calc(${zIndex} - 1)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => setMaskVisible(true)}
              onAnimationComplete={() => {
                if (!visible) setMaskVisible(false)
              }}
              onClick={onClickMask}
            />
          )}

          {position === 'bottom'
            ? (
                <motion.div
                  className='fixed bottom-0 left-0 w-full min-h-[100px] rounded-t-lg overflow-hidden bg-white'
                  style={{ zIndex }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {children}
                </motion.div>
              )
            : (
                <motion.div
                  className='fixed overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2'
                  style={{ zIndex }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {children}
                </motion.div>
              )}
        </>
      )}
    </AnimatePresence>
  )
}
