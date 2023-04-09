import { useState } from "react"
import { AddItemFloatButton } from "../components/AddItemFloatButton"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { ItemsList } from "../components/ItemsList"
import { ItemsSummary } from "../components/ItemsSummary"
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker"
import { TopMenu } from "../components/TopMenu"
import { TopNav } from "../components/TopNav"
import { useMenuStore } from "../stores/useMenuStore"
import { Time, time } from "../lib/time"

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
    } else {
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
          title="账目列表"
          icon={<Icon name='menu' className="w-24px h-24px" onClick={onClick} />}
        />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      {outOfRange
        ? <div text-center p-32px>
          自定义时间跨度不能超过 365 天
        </div>
        : <>
          <ItemsSummary start={start} end={end} />
          <ItemsList start={start} end={end} />
        </>
      }
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
    </div>
  )
}