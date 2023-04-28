import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  dataSource?: { name: number | string; value: number | string }[]
}
export const PieChart = (props: Props) => {
  const { className, dataSource = [] } = props
  const div = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const myChart = useRef<echarts.ECharts>()

  useEffect(() => {
    if (!div.current) { return }
    if (initialized.current) { return }
    myChart.current = echarts.init(div.current)
    initialized.current = true
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: ({ data: { name, value, sign } }: any) => {
          return `${sign} ${name}: ${value}元`
        }
      },
      grid: { top: 0, left: 0, bottom: 0, right: 0 },
      series: [{
        type: 'pie',
        radius: '90%',
        data: dataSource.map((item, index) => ({ ...item, value: parseFloat(item.value.toString()) }))
      }]
    }
    myChart.current.setOption(option)
  }, [])
  useEffect(() => {
    const option: EChartsOption = {
      series: [{
        data: dataSource
      }]
    }
    myChart.current?.setOption(option)
  }, [dataSource])

  return (
    <>
      <div ref={div} className={className}></div>
    </>
  )
}