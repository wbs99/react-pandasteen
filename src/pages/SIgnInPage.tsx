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
      <div text-center pt-40px pb-16px>
        <Icon name="panda" className='w-64px h-68px' />
        <h1 text-32px text="#7878FF" font-bold>熊猫记账</h1>
      </div>
      <form p-form>
        <div>
          <span p-form-label>邮箱地址</span>
          <input p-input-text type="text" placeholder='请输入邮箱，然后点击发送验证码' />
        </div>
        <div>
          <span p-form-label>验证码</span>
          <div flex gap-x-16px>
            <input p-input-text type="text" placeholder='六位数字' />
            <button p-btn >发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button p-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}