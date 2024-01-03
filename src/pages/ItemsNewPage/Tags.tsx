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
        <ol className='grid grid-cols-[repeat(auto-fit,48px)] justify-center gap-x-8 gap-y-4 py-4 px-2'>
          <li>
            <Link to={`/tags/new?kind=${kind}`}>
              <span className='w-12 h-12 rounded-3xl flex justify-center items-center text-2xl text-[#8F4CD7] bg-[#EFEFEF]'>
                <Icon name='add' />
              </span>
            </Link>
          </li>
          {data.map(({ resources }) => {
            return resources.map((tag, index) =>
              <li key={index}
                onClick={() => { props.onChange?.([tag.id]) }}>
                <LongPressable onEnd={() => { nav(`/tags/${tag.id}`) }} className='w-12 flex flex-col justify-center items-center gap-y-2'>
                  {props.value?.includes(tag.id)
                    ? <span className='w-12 h-12 rounded-3xl flex justify-center items-center text-2xl border border-solid border-[#8F4CD7] bg-[#EFEFEF]'>{tag.sign}</span>
                    : <span className='w-12 h-12 rounded-3xl flex justify-center items-center text-2xl border border-solid border-transparent bg-[#EFEFEF]'>{tag.sign}</span>
                  }
                  <span className='text-xs text-[#666666]'>{tag.name}</span>
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
            : <CenterDiv><button className='w-btn' onClick={onLoadMore}>加载更多</button></CenterDiv>}
      </div>
    )
  }
}

const CenterDiv = styled.div`
  padding: 16px;
  text-align: center;
`
