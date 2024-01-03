import { Link, Navigate } from 'react-router-dom'
import { getItemsApi, getMeApi } from '../api'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { CenterDiv } from '../components/CenterDiv'
import { Icon } from '../components/Icon'
import { Loading } from '../components/Loading'
import { useTitle } from '../hooks/useTitle'

type Props = {
  title: string
}

export const HomePage = (props: Props) => {
  const { title } = props
  useTitle(title)

  const { data: meData, isLoading: isLoadingMe } = getMeApi()
  const { data: itemsData, isLoading: isLoadingItems } = getItemsApi(meData)
  if (isLoadingMe || isLoadingItems) {
    return <CenterDiv><Loading /></CenterDiv>
  }
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        <Icon className='my-[20vh] w-32 h-32' name='panda' />
      </div>
      <div className='px-4'>
        <Link to='/items/new'>
          <button className='w-btn'>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </>
  )
}
