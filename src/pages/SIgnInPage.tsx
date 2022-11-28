import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"

interface Props {

}
export const SignInPage: React.FC<Props> = () => {
  return (
    <div>
      <Gradient>
        <TopNav
          title="登录"
          icon={<Icon name='back' className="w-24px h-24px" />}
        />
      </Gradient>
    </div>
  )
}