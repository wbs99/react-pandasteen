import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getTagsApi } from '../../api'
import { Icon } from '../../components/Icon'
import { LoadMoreLoading } from '../../components/LoadMoreLoading'
import { Loading } from '../../components/Loading'
import { LongPressable } from '../../components/LongPressable'

type Props = {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}

export const Tags = (props: Props) => {
  const { kind } = props
  const nav = useNavigate()
  const { data, error, isLoading, onLoadMore, isLoadingMore, hasMore, last } = getTagsApi(kind)

  if (!data) {
    return <div>
      {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
      {isLoading && <CenterDiv><Loading /></CenterDiv>}
    </div>
  }
  else {
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
        {error && <CenterDiv>数据加载失败，请刷新页面</CenterDiv>}
        {!hasMore
          ? last.pager.page === 1 && last.resources.length === 0 ? <CenterDiv>点击加号，创建新标签</CenterDiv> : <CenterDiv>没有更多数据了</CenterDiv>
          : isLoadingMore
            ? <CenterDiv><LoadMoreLoading /></CenterDiv>
            : <CenterDiv><button className="p-btn" onClick={onLoadMore}>加载更多</button></CenterDiv>}
      </div>
    )
  }
}

const CenterDiv = styled.div`
  padding: 16px;
  text-align: center;
`
