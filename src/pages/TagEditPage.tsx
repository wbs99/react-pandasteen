import { useNavigate, useParams } from "react-router-dom"
import { Gradient } from "../components/Gradient"
import { TopNav } from "../components/TopNav"
import { TagForm } from "./TagsNewPage/TagForm"
import { BackIcon } from "../components/BackIcon"
import { comfirmable } from "../lib/comfirmable"
import { deleteTagApi } from "../api"


export const TagEditPage = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const onDelete = comfirmable('确定要删除吗', async () => {
    if (!id) { throw new Error('id 不能为空') }
    await deleteTagApi(id).catch(onDeleteError)
    window.alert('删除成功')
    nav('/items/new')
  })
  const onDeleteError = (error: any) => {
    window.alert('删除失败')
    throw error
  }

  return (
    <>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="查看标签" icon={<BackIcon />} />
      </Gradient>
      <TagForm type="edit" />
      <div className="px-16px p-b-32px">
        <button className="p-btn bg-#E10505" onClick={onDelete}>删除</button>
      </div>
    </>
  )
}