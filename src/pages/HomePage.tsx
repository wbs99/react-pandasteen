import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Icon } from '../components/Icon'
import { getItemsApi, getMeApi } from '../apis'

type Props = {
  title: string
}

export const HomePage = (props: Props) => {
  const { title } = props
  useTitle(title)

  const { data: meData, error: meError } = useSWR('/api/v1/me', async () => {
    const response = await getMeApi()
    return response.data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async () => {
    const response = await getItemsApi()
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
          <button p-btn>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </div>
  )
}