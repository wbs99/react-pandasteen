import type { Time } from '../utils/time'
import styled from 'styled-components'
import { getItemListApi } from '../apis/itemApi'
import { time } from '../utils/time'
import { Loading } from './Loading'
import { LoadMoreLoading } from './LoadMoreLoading'

type Props = {
  start: Time
  end: Time
}

const CenterDiv = styled.div`
  padding:16px;
  text-align:center;
`

export const ItemsList = (props: Props) => {
  const { start, end } = props
  // data: [{ resources: [], pager: {} }, { resources: [], pager: {} }, { resources: [], pager: {} }]
  const { data, error, isLoading, onLoadMore, isLoadingMore, hasMore } = getItemListApi(start, end)

  if (error) return <CenterDiv>数据加载失败，请刷新页面</CenterDiv>
  if (isLoading) return <CenterDiv><Loading /></CenterDiv>
  return <>
    <ol>
      {data?.map(({ resources }) => resources.map(item => <li key={item.id}
        className='grid grid-cols-[auto_1fr_auto] grid-rows-2 px-4 py-2 gap-x-3 border-b'>
        <div className='row-start-1 col-start-1 row-end-3 col-end-2 flex justify-center items-center text-2xl size-12 rounded-full bg-[#D8D8D8]'>
          😘
        </div>
        <div className='col-start-2 col-end-3 row-start-1 row-end-2'>
          {item.tags?.[0].name}
        </div>
        <div className='row-start-2 col-start-2 row-end-3 col-end-4 text-[#999999]'>
          {time(item.happen_at).format('yyyy-MM-dd HH:mm')}
        </div>
        <div className='row-start-1 col-start-3 row-end-2 col-end-4 text-[#53A867]'>
          <span>￥{item.kind === 'expenses' ? '-' : ''} {item.amount / 100}</span>
        </div>
      </li>)
      )}
    </ol>
    {!hasMore
      ? <CenterDiv>没有更多数据了</CenterDiv>
      : isLoadingMore
        ? <CenterDiv><LoadMoreLoading /></CenterDiv>
        : <CenterDiv><button className='w-btn' onClick={onLoadMore}>加载更多</button></CenterDiv>
    }
  </>
}
