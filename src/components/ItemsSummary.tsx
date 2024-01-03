import { getItemsBalanceApi } from '../api'
import type { Time } from '../utils/time'
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
    <ol className='flex justify-between items-center m-4 rounded-lg py-3 px-6 bg-[#252A43] child:px-2 text-center'>
      <li className='text-[#FE7275]'>
        <div>收入</div>
        <div><Money value={income} /></div>
      </li>
      <li className='text-[#53A867]'>
        <div>支出</div>
        <div><Money value={expenses} /></div>
      </li>
      <li className='text-white'>
        <div>净收入</div>
        <div><Money value={balance} /></div>
      </li>
    </ol>
  )
}
