import { useState } from 'react'
import { emojis } from '../../utils/emojis'
import { cn } from '../../utils/cn'
import s from './EmojiInput.module.scss'

type Props = {
  value?: string
  onChange?: (value: string) => void
}
export const EmojiInput = (props: Props) => {
  const { value, onChange } = props
  const [emojiKind, setEmojiKind] = useState('表情')

  return (
    <div className={cn(s.wrapper, 'rounded-lg border border-primary')}>
      <div className='flex p-2 gap-x-4 overflow-auto text-[#999999]'>
        {emojis.map(emoji =>
          <span key={emoji.name}
            className={cn(emoji.name === emojiKind ? s.selectedTab : '', 'whitespace-nowrap')}
            onClick={() => setEmojiKind(emoji.name)}>{emoji.name}
          </span>)}
      </div>
      <div className='text-2xl pt-2 pb-4 h-[300px] overflow-auto text-center'>
        {emojis.map(emoji =>
          <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}
            className='grid grid-cols-[repeat(auto-fit,34px)] grid-rows-[repeat(auto-fit,34px)] justify-center'>
            {emoji.chars.map(char => <span key={char}
              className={cn(char === value ? s.selected : '', 'border border-transparent rounded')}
              onClick={() => value !== char && onChange?.(char)}>{char}
            </span>)}
          </div>)}
      </div>
    </div>
  )
}
