import { useEffect, useRef, useState } from "react"
import { time } from "../lib/time"

type Props = {
  start?: Date
  end?: Date
  currentDate?: Date
  onCancel?: () => void
  onConfirm?: (value: Date) => void
}

export const DatePicker = (props: Props) => {
  const { start, end, currentDate, onCancel, onConfirm } = props
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'years')
  const selectedTime = useRef(currentDate ? time(currentDate) : time())
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((item, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((item, index) => index + 1)
  const dayList = Array.from({ length: selectedTime.current.lastDayOfMonth.day }).map((item, index) => index + 1)

  return (
    <>
      <div flex justify-between p-8px border-b-1 b="#f3f3f3" children-p-8px>
        <span onClick={onCancel}>取消</span>
        <span>时间选择</span>
        <span onClick={() => onConfirm?.(selectedTime.current.date)}>确定</span>
      </div>
      <div flex >
        <Column className="grow-1" dateList={yearList} value={selectedTime.current.year}
          onChange={year => { selectedTime.current.year = year }} />
        <Column className="grow-1" dateList={monthList} value={selectedTime.current.month}
          onChange={month => { selectedTime.current.month = month }} />
        <Column className="grow-1" dateList={dayList} value={selectedTime.current.day}
          onChange={day => { selectedTime.current.day = day }} />
      </div>
    </>
  )
}


type ColumnProps = {
  className?: string
  itemHeight?: number
  dateList: number[]
  value: number
  onChange: (value: number) => void
}
export const Column = (props: ColumnProps) => {
  const { dateList, itemHeight = 36, className, value, onChange } = props
  // value 改变时改变 translateY
  useEffect(() => {
    const index = dateList.indexOf(value)
    setTranslateY(index * -itemHeight)
  }, [value])
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  // 选中默认的时间
  const index = dateList.indexOf(value)
  const [translateY, _setTranslateY] = useState(index * -itemHeight)
  // 限制时间上下滑动时，不能超过最大值和最小值
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (dateList.length - 1) * -itemHeight)
    _setTranslateY(y)
  }

  return (
    <div className={className} h="50vh" overflow-hidden relative
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const y = e.touches[0].clientY
          const dy = y - lastY
          setTranslateY(translateY + dy)
          setLastY(y)
        }
      }}
      // onTouchEnd={() => {
      //   const yushu = translateY % itemHeight
      //   if (yushu > 0) {
      //     if (yushu < itemHeight/2) {
      //       setTranslateY(translateY - yushu)
      //     } else {
      //       setTranslateY(translateY + (itemHeight - yushu))
      //     }
      //   } else {
      //     if (yushu < -itemHeight/2) {
      //       setTranslateY(translateY - (itemHeight + yushu))
      //     } else {
      //       setTranslateY(translateY - yushu)
      //     }
      //   }
      //   setIsTouching(false)
      // }}

      // 根据滑动距离判断选中上一个还是下一个日期
      // 等价于上面的写法
      onTouchEnd={() => {
        const yushu = translateY % itemHeight
        let y = translateY - yushu
        if (Math.abs(yushu) > itemHeight / 2) {
          y += itemHeight * (yushu > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(dateList[Math.abs(y / itemHeight)])
      }}
    >
      <div b-1 b-red absolute top="50%" w-full
        style={{ height: itemHeight, transform: `transLateY(${itemHeight / 2}px)` }} />
      <div absolute top="50%" w-full style={{ transform: `transLateY(${itemHeight / 2}px)` }}>
        <ol children-flex children-justify-center children-items-center text-center
          style={{ transform: `translateY(${translateY}px)` }} >
          {dateList.map(date => <li key={date} style={{ height: itemHeight }} >{date}</li>)}
        </ol>
      </div>
    </div>
  )
}