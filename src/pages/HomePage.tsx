import pig from '../assets/icons/welcome1.svg'
import add from '../assets/icons/add.svg'
import useSWR from 'swr'
import { ajax } from '../lib/ajax'
import { Navigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
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
    return <div>加载中.....</div>
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
      <button p-4px w-56px h-56px bg="#5C33BE" rounded="50%" b-none text-white
        text-6xl fixed bottom-16px right-16px>
        <img src={add} max-w="100%" max-h="100%" />
      </button>
    </div>
  )
}