import type { ReactNode } from 'react'
import { useState } from 'react'

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
      <div className='flex items-center p-4 gap-x-2 border-t border-solid border-t-[#ddd]'>
        {itemDate}
        <code className='grow shrink text-right text-[#53A867]'>{output}</code>
      </div>
      <div className='grid grid-cols-4 grid-rows-[repeat(4,48px)] gap-[1px] p-[1px] child:border-none child:bg-white bg-[#ddd]'>
        <button type='button' className='col-start-1 col-end-2 row-start-1 row-end-2' onClick={() => append('1')}>1</button>
        <button type='button' className='col-start-2 col-end-3 row-start-1 row-end-2' onClick={() => append('2')}>2</button>
        <button type='button' className='col-start-3 col-end-4 row-start-1 row-end-2' onClick={() => append('3')}>3</button>
        <button type='button' className='col-start-1 col-end-2 row-start-2 row-end-3' onClick={() => append('4')}>4</button>
        <button type='button' className='col-start-2 col-end-3 row-start-2 row-end-3' onClick={() => append('5')}>5</button>
        <button type='button' className='col-start-3 col-end-4 row-start-2 row-end-3' onClick={() => append('6')}>6</button>
        <button type='button' className='col-start-1 col-end-2 row-start-3 row-end-4' onClick={() => append('7')}>7</button>
        <button type='button' className='col-start-2 col-end-3 row-start-3 row-end-4' onClick={() => append('8')}>8</button>
        <button type='button' className='col-start-3 col-end-4 row-start-3 row-end-4' onClick={() => append('9')}>9</button>
        <button type='button' className='col-start-1 col-end-3 row-start-4 row-end-5' onClick={() => append('0')}>0</button>
        <button type='button' className='col-start-3 col-end-4 row-start-4 row-end-5' onClick={() => append('.')}>.</button>
        <button type='button' className='col-start-4 col-end-5 row-start-1 row-end-3' onClick={clear}>清空</button>
        <button onClick={onSubmit} type='submit' className='col-start-4 col-end-5 row-start-3 row-end-5 bg-primary text-primary'>确定</button>
      </div>
    </div>
  )
}
