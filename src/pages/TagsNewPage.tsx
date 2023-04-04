import { BackIcon } from "../components/BackIcon"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { TagForm } from "./TagsNewPage/TagForm"

type Props = {

}
export const TagsNewPage = (props: Props) => {
  return (
    <>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="新建标签" icon={<BackIcon />} />
      </Gradient>
      <TagForm type="create" />
    </>
  )
}