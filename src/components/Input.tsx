import type { ChangeEvent, ReactNode } from 'react'
import c from 'classnames'
import { DateInput } from './Input/DateInput'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'

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
        return <input type='text' className='w-input-text' {...common}/>
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)}/>
      case 'select':
        return <select className='h-8' {...common}>
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select>
      case 'sms_code':
        return <SmsCodeInput request={props.request} {...common}/>
      case 'date':
        return <DateInput {...common}/>
      default:
        return null
    }
  }

  return (
    <div className={c(className, 'flex flex-col gap-y-2')}>
      {label ? <span className='text-lg font-bold text-primary'>{label}</span> : null}
      {renderInput()}
      {disableError ? null : <span className='text-sm text-red-400'>{errorMessage || '　'}</span>}
    </div>
  )
}
