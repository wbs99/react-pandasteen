type Props = {
  className?: string
  dataSource?: { name: string; value: number | string; sign: string }[]
}
const colors = ['#5470c6', '#ffbab0', '#ffa750', '#8748d3', '#53a867', '#eba953', '#91cc75', '#fac858', '#ee6666', '#73c0de']

export const RankChart = (props: Props) => {
  const { className, dataSource } = props
  const total = dataSource?.reduce((result, item) => result + Number.parseFloat(item.value.toString()), 0) ?? 0
  const max = dataSource?.reduce((prev, item) => Math.max(prev, Number.parseFloat(item.value.toString())), 0) ?? 0

  const renderItems = () => {
    return (
      dataSource?.map((item, index) =>
        <div key={item.name} className='grid grid-cols-[48px_1fr_1fr] grid-rows-2 text-xs items-center gap-y-1.5 gap-x-2 px-4 my-2'>
          <div className='row-start-1 col-start-1 row-end-3 col-end-2 flex justify-center items-center w-12 h-12 rounded-3xl text-2xl bg-[#EFEFEF]'>{item.sign}</div>
          <div className='row-start-1 col-start-2 row-end-2 col-end-3 self-end'>
            {item.name} - {`${(parseFloat(item.value.toString()) / total * 100).toFixed(0)}%`}
          </div>
          <div className='row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end'>
            {item.value} 元
          </div>
          <div className='row-start-2 col-start-2 row-end-3 col-end-4 h-2 self-start rounded overflow-hidden relative bg-[#cccccc]'>
            <div className='absolute h-full rounded'
              style={{ background: colors[index], width: `${Number.parseFloat(item.value.toString()) / max * 100}%` }}/>
          </div>
        </div>)
    )
  }

  return (
    <div className={className}>{
      dataSource?.[0]
        ? renderItems()
        : <div className='text-center'>暂无数据</div>
    }</div>
  )
}
