import type { ReactNode } from 'react'
import c from 'classnames'
import { useNavigate } from 'react-router-dom'
import type { Item } from '../apis/itemApi'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/createItemStore'
import { useAjax } from '../utils/ajax'
import { time } from '../utils/time'
import { hasError, validate } from '../utils/validate'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'
import { Tags } from './ItemsNewPage/Tags'

export const ItemsNewPage = () => {
  const { data, setData, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'expenses',
      text: '支出',
      element: <Tags kind='expenses' value={data.tag_ids} onChange={ids => setData({ tag_ids: ids })}/>
    },
    {
      key: 'income',
      text: '收入',
      element: <Tags kind='income' value={data.tag_ids} onChange={ids => setData({ tag_ids: ids })}/>
    }
  ]
  const { post } = useAjax({ showLoading: true, handleError: true })
  const nav = useNavigate()
  const onSubmit = async () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])
    setError(error)
    if (hasError(error)) {
      const message = Object.values(error).flat().join('\n')
      window.alert(message)
    } else {
      await post<Resource<Item>>('/api/v1/items', data)
      setData({ amount: 0, happen_at: time().isoString })
      nav('/items')
    }
  }
  // flex 布局之后
  // 高度固定的区域可以写  grow-0 shrink-0
  // 高度不固定的区域可以写  grow shrink 配合 overflow
  return (
    <div className={c(s.wrapper, 'h-screen flex flex-col')} onSubmit={onSubmit}>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title='记一笔' icon={<BackIcon/>}/>
      </Gradient>
      <Tabs value={data.kind!} onChange={tabItem => setData({ kind: tabItem })} tabItems={tabItems} className='overflow-hidden text-center grow shrink' classPrefix='items-new-page'/>
      <ItemAmount className='grow-0 shrink-0'
        itemDate={<ItemDate value={data.happen_at} onChange={happen_at => setData({ happen_at })}/>}
        value={data.amount} onChange={amount => setData({ amount })} onSubmit={onSubmit}/>
    </div>
  )
}
