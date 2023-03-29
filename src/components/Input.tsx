import { ReactNode } from "react"
import { EmojiInput } from "./Input/EmojiInput"

type Props = {
  label?: string | ReactNode
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  errorMessage?: string
  disableError?: boolean // 是否需要显示 error
} & (
    | { type: 'text' }
    | { type: 'emoji' }
    | { type: 'sms_code', onClick: () => void }
    | { type: 'select'; options: { value: string; text: string }[] }
  )
export const Input = (props: Props) => {
  const { label, placeholder, type, value, onChange, errorMessage, disableError } = props
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input p-input-text type={type} placeholder={placeholder}
          value={value} onChange={(e) => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'select':
        return <select value={value} onChange={e => onChange?.(e.target.value)}
          className="h-36px">
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select>
      case 'sms_code':
        return <div flex gap-x-16px>
          <input max-w='[calc(40%-8px)]' p-input-text type="text" placeholder='六位数字'
            value={value} onChange={e => onChange?.(e.target.value)} />
          <button type='button' max-w='[calc(60%-8px)]' p-btn onClick={props.onClick}>发送验证码</button>
        </div>
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      {label ? <span text-18px>{label}</span> : null}
      {renderInput()}
      {disableError ? null : <span text-red text-12px>{errorMessage || '　'}</span>}
    </div>
  )
}