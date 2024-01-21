import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  dataSource?: { x: number | string; y: number | string }[]
}

export const LineChart = (props: Props) => {
  const { className, dataSource } = props
  const div = useRef<HTMLDivElement>(null)
  const xItems = dataSource?.map(item => item.x)
  const yItems = dataSource?.map(item => item.y)
  const initialized = useRef(false)
  const myChart = useRef<echarts.ECharts>()
  useEffect(() => {
    if (!div.current) {
      return
    }
    if (initialized.current) {
      return
    }
    myChart.current = echarts.init(div.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `${label}<br/><div style="text-align: right;">${value}</div>`
        }
      },
      grid: {
        left: 16,
        top: 8,
        bottom: 24,
        right: 16
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (label: string) => label.slice(label.indexOf('-') + 1)
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          data: yItems,
          type: 'line',
          itemStyle: {
          },
          emphasis: {
            itemStyle: {
              color: 'green'
            }
          }
        }
      ]
    }
    myChart.current.setOption(option)
  }, [])
  useEffect(() => {
    const option: echarts.EChartsOption = {
      xAxis: { data: xItems, },
      series: [{ data: yItems, }]
    }
    myChart.current?.setOption(option)
  }, [dataSource])

  return (
    <div ref={div} className={className}></div>
  )
}
