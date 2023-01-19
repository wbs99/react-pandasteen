import { Tabs } from './Tabs'
export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}

export const TimeRangePicker: React.FC<Props> = ({ selected, onSelect }) => {
  const timeRanges: { key: TimeRange; text: string }[] = [
    { key: 'thisMonth', text: '本月' },
    { key: 'lastMonth', text: '上月' },
    { key: 'thisYear', text: '今年' },
    { key: 'custom', text: '自定义时间' }
  ]
  return (
    <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
  )
}