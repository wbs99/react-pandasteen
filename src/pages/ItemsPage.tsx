import React, { useState } from "react"
import { AddItemFloatButton } from "../components/AddItemFloatButton"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { ItemsList } from "../components/ItemsList"
import { ItemsSummary } from "../components/ItemsSummary"
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker"
import { TopMenu } from "../components/TopMenu"
import { TopNav } from "../components/TopNav"
import { useMenuStore } from "../stores/useMenuStore"
import { timeRangeToStartAndEnd } from "../lib/timeRangeToStartAndEnd"
import { time } from "../lib/time"

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
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
      <div>
        {start.isoString} | {end.isoString}
      </div>
      <ItemsSummary />
      <ItemsList start={start} end={end} />
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
    </div>
  )
}