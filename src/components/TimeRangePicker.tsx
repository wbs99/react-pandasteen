import { useState } from 'react'
import { usePopup } from '../hooks/usePopup'
import type { Time } from '../utils/time'
import { time } from '../utils/time'
import { Input } from './Input'
import { Tabs } from './Tabs'

export type TimeRange = {
  start: Time
  end: Time
  name:
    | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
    | 'twoMonthsAgo' | 'threeMonthsAgo'
}

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  {
    text: '本月',
    key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '上月',
    key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '今年',
    key: { name: 'thisYear', start: time().set({ month: 1 }).firstDayOfMonth, end: time().set({ month: 12 }).lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '自定义时间',
    key: { name: 'custom', start: time(), end: time() },
  },
]

export const TimeRangePicker = (props: Props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: time(start),
      end: time(end).add(1, 'day')
    })
    hide()
  }
  const { popup, show, hide } = usePopup({
    zIndex: 'var(--dialog)',
    children: <div>
      <header className='bg-[var(--color-purple)] text-white text-lg py-3 pl-4'>请选择时间</header>
      <main className='p-4'>
        <Input type='date' disableError label='开始时间' value={start} onChange={d => setStart(d)} />
        <Input type='date' disableError label='结束时间' value={end} onChange={d => setEnd(d)} className='mt-2'/>
      </main>
      <footer className='text-right'>
        <button className='border-none bg-transparent px-4 py-2' onClick={() => hide()}>取消</button>
        <button className='border-none bg-transparent px-4 py-2' onClick={onConfirm}>确认</button>
      </footer>
    </div>,
    position: 'center'
  })
  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'custom') {
      // 弹框
      show()
    }
    else {
      _onSelect(timeRange)
    }
  }

  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect}/>
    </>)
}
