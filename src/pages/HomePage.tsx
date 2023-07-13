import { Link, Navigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Icon } from '../components/Icon'
import { getItemsApi, getMeApi } from '../api'
import { Loading } from '../components/Loading'
import { CenterDiv } from '../components/CenterDiv'

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
    <div>
      <div className='flex justify-center items-center'>
        <Icon className="mt-20vh mb-20vh w-128px h-128px" name="panda" />
      </div>
      <div className='px-16px'>
        <Link to="/items/new">
          <button className='p-btn'>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </div>
  )
}