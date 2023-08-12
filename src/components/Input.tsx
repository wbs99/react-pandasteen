import type { ChangeEvent, ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'
import { DateInput } from './Input/DateInput'

type Props<T> = {
  label?: string | ReactNode
  placeholder?: string
  value?: T
  onChange?: (value: T) => void
  errorMessage?: string
  disableError?: boolean // 是否需要显示 error
  className?: string
} & (
    | { type?: 'text' }
    | { type: 'emoji' }
    | { type: 'date' }
    | { type: 'sms_code'; request: () => Promise<unknown> }
    | { type: 'select'; options: { value: string; text: string }[] }
  )
export const Input = <T extends string>(props: Props<T>) => {
  const { label, placeholder, value, onChange: _onChange, errorMessage, disableError, className } = props
  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = typeof e === 'string' ? e : e.target.value
    _onChange?.(value as T)
  }
  const common = { value, onChange, placeholder }

  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input p-input-text type='text' {...common} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'select':
        return <select className='h-36px' {...common}>
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select>
      case 'sms_code':
        return <SmsCodeInput request={props.request} {...common} />
      case 'date':
        return <DateInput {...common} />
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px className={className}>
      {label ? <span text-18px>{label}</span> : null}
      {renderInput()}
      {disableError ? null : <span text-red text-12px>{errorMessage || '　'}</span>}
    </div>
  )
}
