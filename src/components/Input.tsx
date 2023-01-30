import { ReactNode } from "react"
import { EmojiInput } from "./Input/EmojiInput"

type Props = {
  label: string | ReactNode
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
  value?: string
  onChange?: (value: string) => void
  errorMessage?: string
}
export const Input = (props: Props) => {
  const { label, placeholder, type = 'text', value, onChange, errorMessage } = props
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <input p-input-text type={type} placeholder={placeholder}
          value={value} onChange={(e) => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return <div flex gap-x-16px>
          <input max-w='[calc(40%-8px)]' p-input-text type="text" placeholder='六位数字'
            value={value} onChange={e => onChange?.(e.target.value)} />
          <button max-w='[calc(60%-8px)]' p-btn >发送验证码</button>
        </div>
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      <span text-18px>{label}</span>
      {renderInput()}
      <span text-red text-12px>{errorMessage || '　'}</span>
    </div>
  )
}