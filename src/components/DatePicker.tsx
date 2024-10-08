import c from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { time } from '../utils/time'

type Props = {
  start?: Date
  end?: Date
  currentDate?: Date
  onCancel?: () => void
  onConfirm?: (value: Date) => void
  value?: Date
}

const getNow = () => time().set({ hours: 0, minutes: 0, seconds: 0, ms: 0 })

export const DatePicker = (props: Props) => {
  const { start, end, onCancel, onConfirm, value } = props
  const [, update] = useState({}) // 配合 useRef 实现强制更新
  const startTime = start ? time(start) : getNow().add(-10, 'years')
  const endTime = end ? time(end) : getNow().add(10, 'year')
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const valueTime = useRef(value ? time(value).set({ hours: 0, minutes: 0, seconds: 0, ms: 0 }) : getNow())

  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)
  const hoursList = Array.from({ length: 24 }).map((_, index) => index)
  const minutesList = Array.from({ length: 60 }).map((_, index) => index)

  return (
    <>
      <div className='flex justify-between p-2 border-b border-b-solid border-[#f3f3f3] child:p-2'>
        <span onClick={onCancel}>取消</span>
        <span>时间选择</span>
        <span onClick={() => onConfirm?.(valueTime.current.date)}>确定</span>
      </div>
      <div className='flex text-center child:grow child:p-4'>
        <span>年</span>
        <span>月</span>
        <span>日</span>
        <span>时</span>
        <span>分</span>
      </div>
      <div className='flex'>
        <Column dateList={yearList} value={valueTime.current.year}
          onChange={(v) => {
            valueTime.current.year = v
            update({})
          }}
          className='grow' />
        <Column dateList={monthList} value={valueTime.current.month}
          onChange={(v) => {
            valueTime.current.month = v
            update({})
          }}
          className='grow' />
        <Column dateList={dayList} value={valueTime.current.day}
          onChange={(v) => {
            valueTime.current.day = v
            update({})
          }}
          className='grow' />
        <Column dateList={hoursList} value={valueTime.current.hours}
          onChange={(v) => {
            valueTime.current.hours = v
            update({})
          }}
          className='grow' />
        <Column dateList={minutesList} value={valueTime.current.minutes}
          onChange={(v) => {
            valueTime.current.minutes = v
            update({})
          }}
          className='grow' />
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
    <div className={c(className, 'h-[50vh] overflow-hidden relative')}
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
      onTouchEnd={() => {
        // 根据余数判断滑动结束时是定位到上一个时间还是下一个时间
        const yushu = translateY % itemHeight
        let y = translateY - yushu
        if (Math.abs(yushu) > itemHeight / 2) {
          y += itemHeight * (yushu > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(dateList[Math.abs(y / itemHeight)])
      }}
    // onTouchEnd={() => {
    // 等价于上面的写法
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
    >
      <div className='absolute w-full border-red-300 top-1/2 border-y'
        style={{ height: itemHeight, transform: `transLateY(${itemHeight / 2}px)` }} />
      <div className='absolute w-full top-1/2' style={{ transform: `transLateY(${itemHeight / 2}px)` }}>
        <ol className='text-center child:flex child:justify-center child:items-center'
          style={{ transform: `translateY(${translateY}px)` }} >
          {dateList.map(date => <li key={date} style={{ height: itemHeight }} >{date}</li>)}
        </ol>
      </div>
    </div>
  )
}
