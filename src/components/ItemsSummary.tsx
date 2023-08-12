import type { Time } from '../lib/time'
import { getItemsBalanceApi } from '../api'
import { Money } from './Money'

type Props = {
  start: Time
  end: Time
}

export const ItemsSummary = (props: Props) => {
  const { start, end } = props
  const { data } = getItemsBalanceApi(start, end)
  const { balance, expenses, income } = data ?? { balance: 0, expenses: 0, income: 0 }

  return (
    <ol bg="#252A43" flex justify-between items-center m-16px rounded-8px py-12px px-24px
      children-px-4px text-center>
      <li text="#FE7275">
        <div>收入</div>
        <div><Money value={income} /></div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div><Money value={expenses} /></div>
      </li>
      <li text-white>
        <div>净收入</div>
        <div><Money value={balance} /></div>
      </li>
    </ol>
  )
}
