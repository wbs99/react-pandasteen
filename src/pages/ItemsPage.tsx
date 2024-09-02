import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Gradient } from '../components/Gradient'
import { ItemsList } from '../components/ItemsList'
import { ItemsSummary } from '../components/ItemsSummary'
import { LeftMenu } from '../components/LeftMenu'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { SvgIcon } from '../components/SvgIcon'
import { useMenuStore } from '../stores/menuStore'
import { Time, time } from '../utils/time'

export const ItemsPage = () => {
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [outOfRange, setOutOfRange] = useState(false)
  const setTimeRange = (t: TimeRange) => {
    if (t.start.timestamp > t.end.timestamp) {
      [t.start, t.end] = [t.end, t.start]
    }
    if (t.end.timestamp - t.start.timestamp > Time.DAY * 365) {
      setOutOfRange(true)
    }
    else {
      setOutOfRange(false)
    }
    _setTimeRange(t)
  }
  const { visible, setVisible } = useMenuStore()
  const onClick = () => {
    setVisible(!visible)
  }

  const { start, end } = timeRange

  return (
    <div>
      <Gradient>
        <TopNav
          title='账目列表'
          icon={<SvgIcon name='menu' onClick={onClick} className='size-6'/>}
        />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange}/>
      {outOfRange
        ? <div className='p-8 text-center'>
          自定义时间跨度不能超过 365 天
          </div>
        : <>
            <ItemsSummary start={start} end={end}/>
            <ItemsList start={start} end={end}/>
          </>
      }
      <AddItemFloatButton/>
      <LeftMenu visible={visible} onClickMask={() => setVisible(false)}/>
    </div>
  )
}
