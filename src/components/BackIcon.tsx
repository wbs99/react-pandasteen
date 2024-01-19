import { useNavigate } from 'react-router-dom'
import { MyIcon } from './MyIcon'

export const BackIcon = () => {
  const nav = useNavigate()
  const onBack = () => {
    nav(-1)
  }

  return (
    <MyIcon name='back' onClick={onBack}/>
  )
}
