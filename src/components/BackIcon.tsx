import { useNavigate } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'

export const BackIcon = () => {
  const nav = useNavigate()
  const onBack = () => {
    nav(-1)
  }

  return (
    <SvgIcon name='back' onClick={onBack}/>
  )
}
