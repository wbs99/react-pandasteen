import { EmojiInput } from "./Input/EmojiInput"

type Props = {
  label: string
  placeholder?: string
  type?: 'text' | 'emoji'
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
        return <EmojiInput />
      default:
        return null
    }
  }

  return (
    <div flex flex-col gap-y-8px>
      <span text-18px>{label}</span>
      {renderInput()}
      <span text-red text-12px>{errorMessage || '\u00A0'}</span>
    </div>
  )
}