import { AnimatePresence, motion } from 'motion/react'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

type Props = {
  onClickMask?: () => void
  visible?: boolean
}

export const LeftMenu = ({ onClickMask, visible }: Props) => (
  <AnimatePresence>
    {visible && (
      <>
        <motion.div
          key='mask'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClickMask}
          className='fixed inset-0 z-[calc(var(--z-menu)-1)] bg-black/75'
        />
        <motion.div
          key='drawer'
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='fixed top-0 left-0 w-[70vw] max-w-[20em] h-screen flex flex-col z-[var(--z-menu)]'
        >
          <CurrentUser className='grow-0 shrink-0' />
          <Menu className='grow shrink' />
        </motion.div>
      </>
    )}
  </AnimatePresence>
)
