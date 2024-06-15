import { useNavigate, useParams } from 'react-router-dom'
import { deleteTagApi } from '../apis/tagApi'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { comfirmable } from '../utils/comfirmable'
import { TagForm } from './TagsNewPage/TagForm'

export const TagDetailPage = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const onDelete = comfirmable('确定要删除吗', async () => {
    if (!id) { throw new Error('id 不能为空') }
    await deleteTagApi(id).catch(onDeleteError)
    console.log('删除成功')
    nav('/items/new')
  })
  const onDeleteError = (error: any) => {
    console.log('删除失败')
    throw error
  }

  return (
    <>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title='查看标签' icon={<BackIcon />}/>
      </Gradient>
      <TagForm type='edit'/>
      <div className='px-4 pb-8'>
        <button className='w-btn bg-[#E10505]' onClick={onDelete}>删除</button>
      </div>
    </>
  )
}
