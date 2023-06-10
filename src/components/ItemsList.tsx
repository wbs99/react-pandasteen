import styled from "styled-components"
import { Time, time } from "../lib/time"
import { getItemListApi } from "../api"
import { Loading } from "./Loading"
import { LoadMoreLoading } from "./LoadMoreLoading"


interface Props {
  start: Time
  end: Time
}

const CenterDiv = styled.div`
  padding:16px;
  text-align:center;
`

export const ItemsList = (props: Props) => {
  const { start, end } = props
  // data: [{ resources: {}, pager: {} }, { resources: {}, pager: {} }, { resources: {}, pager: {} }]
  const { data, error, size, setSize } = getItemListApi(start, end)
  const onLoadMore = () => {
    setSize(size + 1)
  }
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore

  if (!data) {
    return <div>
      {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
      {isLoading && <CenterDiv><Loading /></CenterDiv>}
    </div>
  } else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count

    return <>
      <ol>
        {data.map(({ resources }) => resources.map(item => <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px
          border-b-1 b="#EEE">
          <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px w-48px h-48px
            bg="#D8D8D8" rounded="50%" flex justify-center items-center>
            😘
          </div>
          <div row-start-1 col-start-2 row-end-2 col-end-3>
            {item.tags?.[0].name}
          </div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">
            {time(item.happen_at).format('yyyy-MM-DD HH:mm')}
          </div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">
            <span>￥{item.kind === 'expenses' ? '-' : ''} {item.amount / 100}</span>
          </div>
        </li>)
        )}
      </ol>
      {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
      {!hasMore
        ? <CenterDiv>没有更多数据了</CenterDiv>
        : isLoading
          ? <CenterDiv><LoadMoreLoading /></CenterDiv>
          : <CenterDiv><button p-btn onClick={onLoadMore}>加载更多</button></CenterDiv>
      }
    </>
  }
}