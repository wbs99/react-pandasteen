type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onClick: () => void
}

export const SmsCodeInput = (props: Props) => {
  const { value, placeholder, onChange, onClick } = props
  return (
    <div flex gap-x-16px>
      <input max-w='[calc(40%-8px)]' p-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type='button' max-w='[calc(60%-8px)]' p-btn onClick={onClick}>发送验证码</button>
    </div>
  )
}