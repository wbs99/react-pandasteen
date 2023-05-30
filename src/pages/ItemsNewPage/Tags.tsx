import { Link, useNavigate } from "react-router-dom"
import { Icon } from "../../components/Icon"
import styled from "styled-components"
import { LongPressable } from "../../components/LongPressable"
import { getTagsApi } from "../../api"

type Props = {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}

export const Tags = (props: Props) => {
  const { kind } = props
  const nav = useNavigate()
  const { data, error, size, setSize } = getTagsApi(kind)
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  const onLoadMore = () => {
    setSize(size + 1)
  }
  if (!data) {
    return <div>空</div>
  } else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count
    return (
      <div>
        <ol className="grid grid-cols-[repeat(auto-fit,48px)] justify-center gap-x-32px
          gap-y-16px py-16px px-8px">
          <li>
            <Link to={`/tags/new?kind=${kind}`}>
              <span className="block w-48px h-48px rounded-24px bg-#EFEFEF
                flex justify-center items-center text-24px text-#8F4CD7">
                <Icon name="add" />
              </span>
            </Link>
          </li>
          {data.map(({ resources }) => {
            return resources.map((tag, index) =>
              <li key={index}
                onClick={() => { props.onChange?.([tag.id]) }}>
                <LongPressable onEnd={() => { nav(`/tags/${tag.id}`) }} className="w-48px flex justify-center items-center flex-col gap-y-8px">
                  {props.value?.includes(tag.id)
                    ? <span className="block w-48px h-48px rounded-24px bg-#EFEFEF
                      flex justify-center items-center text-24px b-1 b-solid b-#8F4CD7">{tag.sign}</span>
                    : <span className="block w-48px h-48px rounded-24px bg-#EFEFEF
                      flex justify-center items-center text-24px b-1 b-solid b-transparent">{tag.sign}</span>
                  }
                  <span className="text-12px text-#666">{tag.name}</span>
                </LongPressable>
              </li>
            )
          })}
        </ol>
        {error && <Div>数据加载失败，请刷新页面</Div>}
        {!hasMore
          ? page === 1 && last.resources.length === 0 ? <Div>点击加号，创建新标签</Div> : <Div>没有更多数据了</Div>
          : isLoading
            ? <Div>数据加载中...</Div>
            : <Div><button className="p-btn" onClick={onLoadMore}>加载更多</button></Div>}
      </div>
    )
  }
}

const Div = styled.div`
  padding: 16px;
  text-align: center;
`