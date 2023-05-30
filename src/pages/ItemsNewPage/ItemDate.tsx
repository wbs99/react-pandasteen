import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { DatePicker } from '../../components/DatePicker'

type Props = {
  value?: string | Date
  onChange?: (date: string) => void
}

export const ItemDate = (props: Props) => {
  const { value, onChange } = props
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={d => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <span className='flex items-center gap-x-8px' onClick={toggle}>
        <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
        <span className='grow-0 shrink-0 color-#999'>{time(value).format('YYYY-MM-DD HH:mm')}</span>
      </span>
    </>
  )
}