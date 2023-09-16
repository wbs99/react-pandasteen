import styled from 'styled-components'
import type { Time } from '../lib/time'
import { time } from '../lib/time'
import { getItemListApi } from '../api'
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

  if (!data) {
    return <div>
      {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
      {isLoading && <CenterDiv><Loading /></CenterDiv>}
    </div>
  } else {
    return <>
      <ol>
        {data.map(({ resources }) => resources.map(item => <li key={item.id}
          className='grid grid-cols-[auto_1fr_auto] grid-rows-2 px-16px py-8px gap-x-12px border-b-1'>
          <div className='row-start-1 col-start-1 row-end-3 col-end-2 text-24px w-48px h-48px
            bg-#D8D8D8 rounded-50% flex justify-center items-center'>
            😘
          </div>
          <div className='row-start-1 col-start-2 row-end-2 col-end-3'>
            {item.tags?.[0].name}
          </div>
          <div className='row-start-2 col-start-2 row-end-3 col-end-4 text-#999999'>
            {time(item.happen_at).format('yyyy-MM-dd HH:mm')}
          </div>
          <div className='row-start-1 col-start-3 row-end-2 col-end-4 text-#53A867'>
            <span>￥{item.kind === 'expenses' ? '-' : ''} {item.amount / 100}</span>
          </div>
        </li>)
        )}
      </ol>
      {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
      {!hasMore
        ? <CenterDiv>没有更多数据了</CenterDiv>
        : isLoadingMore
          ? <CenterDiv><LoadMoreLoading /></CenterDiv>
          : <CenterDiv><button className='p-btn' onClick={onLoadMore}>加载更多</button></CenterDiv>
      }
    </>
  }
}
