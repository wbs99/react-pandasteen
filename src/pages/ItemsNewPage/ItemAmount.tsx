import { ReactNode, useState } from 'react'

type Props = {
  className?: string
  itemDate: ReactNode
  value?: number
  onChange?: (amount: number) => void
  onSubmit?: () => void
}
export const ItemAmount = (props: Props) => {
  const { className, itemDate, value, onChange, onSubmit } = props
  const [output, _setOutput] = useState(() => value ? (value / 100).toString() : '0')
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
    onChange?.(parseFloat(str) * 100)
  }
  const append = (char: string) => {
    switch (char) {
      case '0':
        if (output !== '0') { setOutput(output + char) }
        break
      case '.':
        if (!output.includes('.')) { setOutput(output + char) }
        break
      default:
        if (output === '0') { setOutput(char) }
        else { setOutput(output + char) }
        break
    }
  }
  const clear = () => {
    setOutput('0')
  }

  return (
    <div className={className}>
      <div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
        {itemDate}
        <code grow-1 shrink-1 text-right color="#53A867">{output}</code>
      </div>
      <div grid grid-cols='[repeat(4,1fr)]' grid-rows='[repeat(4,48px)]'
        children-b-none children-bg-white bg='#ddd' gap-1px p-1px>
        <button type='button' row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')}>1</button>
        <button type='button' row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')}>2</button>
        <button type='button' row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')}>3</button>
        <button type='button' row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')}>4</button>
        <button type='button' row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')}>5</button>
        <button type='button' row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')}>6</button>
        <button type='button' row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')}>7</button>
        <button type='button' row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')}>8</button>
        <button type='button' row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')}>9</button>
        <button type='button' row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')}>0</button>
        <button type='button' row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')}>.</button>
        <button type='button' row-start-1 col-start-4 row-end-3 col-end-5 onClick={clear}>清空</button>
        <button onClick={onSubmit} type="submit" bg="#5C33BE" text-white row-start-3 col-start-4 row-end-5 col-end-5  >确定</button>
      </div>
    </div>
  )
}