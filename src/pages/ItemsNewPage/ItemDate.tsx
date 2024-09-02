import { DatePicker } from '../../components/DatePicker'
import { MyIcon } from '../../components/MyIcon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../utils/time'

type Props = {
  value?: string | Date
  onChange?: (date: string) => void
}

export const ItemDate = (props: Props) => {
  const { value, onChange } = props
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={(d) => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <span className='flex items-center gap-x-2' onClick={toggle}>
        <MyIcon name='calendar' className='grow-0 shrink-0 size-6'/>
        <span className='grow-0 shrink-0 text-[#999999]'>{time(value).format('yyyy-MM-dd HH:mm')}</span>
      </span>
    </>
  )
}
