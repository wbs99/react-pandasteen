import { RefObject, useEffect, useRef, useState } from "react";

interface Point {
  x: number
  y: number
}

export const useSwiper = (elementRef: RefObject<HTMLElement>) => {
  const point = useRef<Point>({ x: -1, y: - 1 })
  const [direction, setDirection] = useState<'' | 'left' | 'right' | 'up' | 'down'>('')

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault()
    point.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onMoving = (e: TouchEvent) => {
    e.preventDefault()
    const newPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    const d = { x: newPoint.x - point.current.x, y: newPoint.y - point.current.y }
    const { x, y } = d
    if (Math.abs(x) < 3 || Math.abs(y) < 3) { setDirection('') }
    else if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? setDirection("right") : setDirection("left")
    } else {
      return y > 0 ? setDirection("down") : setDirection("up")
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    e.preventDefault()
    setDirection('')
  }

  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener("touchstart", onTouchStart)
    elementRef.current.addEventListener("touchmove", onMoving)
    elementRef.current.addEventListener("touchend", onTouchEnd)
    return () => {
      if (!elementRef.current) { return }
      elementRef.current.removeEventListener("touchstart", onTouchStart)
      elementRef.current.removeEventListener("touchmove", onMoving)
      elementRef.current.removeEventListener("touchend", onTouchEnd)
    }
  }, [])
  return { direction }
}