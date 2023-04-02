import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Tabs } from "../components/Tabs"
import { TopNav } from "../components/TopNav"
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from "./ItemsNewPage/ItemAmount"
import { Tags } from "./ItemsNewPage/Tags"
import { useCreateItemStore } from "../stores/useCreateItemStore"
import { ItemDate } from "./ItemsNewPage/ItemDate"
import { ReactNode } from "react"
import { hasError, validate } from "../lib/validate"
import { useAjax } from "../lib/ajax"


type Props = {

}
export const ItemsNewPage: React.FC<Props> = () => {
  const { data, setData, error, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    { // JetBrains Mono
      key: 'expenses', text: '支出', element:
        <Tags kind="expenses" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    },
    {
      key: 'income', text: '收入', element:
        <Tags kind="income" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    }
  ]
  const { post } = useAjax({ showLoading: true, handleError: true })

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
      const response = await post<Resource<Item>>('/api/v1/items', data)
      console.log(response.data.resource)
    }
  }
  // flex 布局之后
  // 高度固定的区域可以写  grow-0 shrink-0
  // 高度不固定的区域可以写  grow-1 shrink-1 配合 overflow
  return (
    <div className={s.wrapper} h-screen flex flex-col onSubmit={onSubmit}>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="记一笔" icon={<Icon name='back' className="w-24px h-24px" />} />
      </Gradient>
      <Tabs value={data.kind!} onChange={tabItem => setData({ kind: tabItem })} tabItems={tabItems} className='text-center grow-1 shrink-1 overflow-hidden' classPrefix="items-new-page" />
      <span text-28px>{JSON.stringify(data)}</span>
      <ItemAmount className="grow-0 shrink-0" itemDate={
        <ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />
      } value={data.amount} onChange={amount => setData({ amount })} onSubmit={onSubmit} />
    </div>
  )
}