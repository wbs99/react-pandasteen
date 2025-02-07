import { useState } from 'react'
import useSWR from 'swr'
import type { Item } from '../apis/itemApi'
import type { Tag } from '../apis/tagApi'
import type { TimeRange } from '../components/TimeRangePicker'
import type { Time } from '../utils/time'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../utils/ajax'
import { time } from '../utils/time'

type Groups = {
  happen_at: string
  amount: number
}[]
type Groups2 = {
  tag_id: number
  tag: Tag
  amount: number
}[]
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}
const format = 'yyyy-MM-dd'

const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format('yyyy-MM-dd')}&happened_before=${end.format('yyyy-MM-dd')}&kind=${kind}&group_by=${group_by}`
}

export const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [kind, setKind] = useState<Item['kind']>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateDefaultItems = () => {
    return Array.from({ length: start.dayCountOfMonth }).map((_, i) => {
      const x = start.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRange
  const defaultItems = generateDefaultItems()
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) => {
      const response = await get<{ groups: Groups, total: number }>(path)
      return response.data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
    }
  )
  const normalizedItems = defaultItems?.map(defaultItem =>
    items?.find(item => item.x === defaultItem.x) || defaultItem
  )

  const { data: items2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) => {
      const response = await get<{ groups: Groups2, total: number }>(path)
      return response.data.groups
        .map(({ tag, amount }) =>
          ({ name: tag.name, value: (amount / 100).toFixed(2), sign: tag.sign }))
    }
  )

  return (
    <div>
      <Gradient>
        <TopNav title='统计图表' icon={<BackIcon/>}/>
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange}
        timeRanges={[
          {
            text: '本月',
            key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '上月',
            key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '两个月前',
            key: { name: 'twoMonthsAgo', start: time().add(-2, 'month').firstDayOfMonth, end: time().add(-2, 'month').lastDayOfMonth.add(1, 'day') },
          },
          {
            text: '三个月前',
            key: { name: 'threeMonthsAgo', start: time().add(-3, 'month').firstDayOfMonth, end: time().add(-3, 'month').lastDayOfMonth.add(1, 'day') },
          },
        ]} />
      <div className='flex items-center p-4 gap-x-4'>
        <span className='grow-0 shrink-0'>类型</span>
        <div className='grow shrink'>
          <Input type='select' options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} onChange={value => setKind(value)} disableError/>
        </div>
      </div>
      <LineChart className='h-32' dataSource={normalizedItems}/>
      <PieChart className='h-64 mt-4' dataSource={items2}/>
      <RankChart className='mt-2' dataSource={items2}/>
    </div>
  )
}
