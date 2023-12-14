import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsNewPage = () => {
  return (
    <>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title='新建标签' icon={<BackIcon />} />
      </Gradient>
      <TagForm type='create' />
    </>
  )
}
