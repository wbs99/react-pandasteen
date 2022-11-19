import pig from '../assets/icons/welcome1.svg'
import useSWR from 'swr'
import { ajax } from '../lib/ajax'
import { Navigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title: string
}

export const HomePage: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async (path) => {
    const response = await ajax.get<Resource<User>>(path)
    return response.data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async (path) => {
    const response = await ajax.get<Resources<Item>>(path)
    return response.data
  })
  const isLoadingMe = !meData && !meError
  const isLoadingItem = !isLoadingMe && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItem) {
    return <Loading />
  }
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }


  return (
    <div>
      <div flex justify-center items-center>
        <img mt-20vh mb-20vh width="128" height="130" src={pig} />
      </div>
      <div px-16px>
        <button h-48px w="100%" bg="#5C33BE" b-none text-white rounded-8px>
          开始记账
        </button>
      </div>
      <AddItemFloatButton />
    </div>
  )
}