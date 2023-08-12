import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { DatePicker } from '../DatePicker'

type Props = {
  value?: string
  onChange?: (v: string) => void
  className?: string
  placeholder?: string
}

export const DateInput = (props: Props) => {
  const { value, onChange, className, placeholder } = props
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={d => {
        onChange?.(time(d).isoString)
        hide()
      }}
      onCancel={() => hide()} />
  })

  return (
    <>
      {popup}
      <input className={className} p-input-text type='text' readOnly placeholder={placeholder}
        value={time(value).format()} onChange={(e) => onChange?.(e.target.value)} onClick={toggle} />
    </>
  )
}
