import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { useAjax } from '../lib/ajax'
import { Icon } from '../components/Icon'

interface Props {
  title: string
}

export const HomePage = (props: Props) => {
  useTitle(props.title)
  const { get } = useAjax({ showLoading: true, handleError: true })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async (path) => {
    const response = await get<Resource<User>>(path)
    return response.data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async (path) => {
    const response = await get<Resources<Item>>(path)
    return response.data
  })
  const isLoadingMe = !meData && !meError
  const isLoadingItem = !isLoadingMe && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItem) {
    return <div text-center p-16px>加载中……</div>
  }
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }


  return (
    <div>
      <div flex justify-center items-center>
        <Icon className="mt-20vh mb-20vh w-128px h-128px" name="panda" />
      </div>
      <div px-16px>
        <Link to="/items/new">
          <button j-btn>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </div>
  )
}