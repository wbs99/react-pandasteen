import pig from '../assets/icons/welcome1.svg'
import add from '../assets/icons/add.svg'
import useSWR from 'swr'
import axios from 'axios'

export const HomePage: React.FC = () => {
  const { data: meData, error: meError } = useSWR('/api/v1/me', (path) => {
    return axios.get(path)
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, (path) => {
    return axios.get(path)
  })
  console.log(meData, meError, itemsData, itemsError)
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