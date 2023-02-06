import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { TagForm } from "./TagsNewPage/TagForm"

type Props = {

}
export const TagEditPage = (props: Props) => {
  return (
    <>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="查看标签" icon={<Icon name="back" />} />
      </Gradient>
      <TagForm type="edit" />
      <div px-16px p-b-32px>
        <button p-btn bg='#E10505'>删除</button>
      </div>
    </>
  )
}