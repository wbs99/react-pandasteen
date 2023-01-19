import { useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Tabs } from "../components/Tabs"
import { TopNav } from "../components/TopNav"
import s from './ItemsNewPage.module.scss'
import { Tags } from "./ItemsNewPage/Tags"


type Props = {

}
export const ItemsNewPage: React.FC<Props> = () => {
  const tabItems: { key: Item['kind']; text: string; element: React.ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind="expenses" /> },
    { key: 'income', text: '收入', element: <Tags kind="income" /> }
  ]
  const [tabItem, setTabItem] = useState<Item['kind']>('expenses')
  return (
    <div className={s.wrapper}>
      <Gradient>
        <TopNav title="记一笔" icon={<Icon name='back' className="w-24px h-24px" />} />
      </Gradient>
      <Tabs tabItems={tabItems} value={tabItem} onChange={(item) => { setTabItem(item) }} className='text-center' classPrefix="items-new-page" />
    </div>
  )
}