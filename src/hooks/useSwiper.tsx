import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

type Point = { x: number; y: number }

export const useSwiper = (elementRef: RefObject<HTMLElement>) => {
  const startPoint = useRef<Point>({ x: -1, y: -1 })
  const [direction, setDirection] = useState<
    '' | 'left' | 'right' | 'up' | 'down'
  >('')

  const onTouchStart = (e: TouchEvent) => {
    // 如果想阻止滚动，可取消下一行注释
    // if (e.cancelable) e.preventDefault()
    startPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const onMoving = (e: TouchEvent) => {
    // if (e.cancelable) e.preventDefault()
    const { clientX, clientY } = e.touches[0]
    const dx = clientX - startPoint.current.x
    const dy = clientY - startPoint.current.y

    if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
      setDirection('')
    } else if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 'right' : 'left')
    } else {
      setDirection(dy > 0 ? 'down' : 'up')
    }
  }

  const onTouchEnd = (e: TouchEvent) => {
    /* 只在可取消时调用，避免控制台报错 */
    if (e.cancelable) e.preventDefault()
    setDirection('')
  }

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onMoving, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onMoving)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [elementRef])

  return { direction }
}
