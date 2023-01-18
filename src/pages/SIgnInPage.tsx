import { FormEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { fetchSessionApi } from "../apis"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { hasError, validate } from "../lib/validate"
import { useSignInStore } from "../stores/useSIgnInStore"

export const SignInPage = () => {
  const { data, setData, error, setError } = useSignInStore()
  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: "email", type: "required", message: "请输入邮箱地址" },
      { key: "email", type: 'pattern', regex: /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/, message: '邮箱地址不合法' },
      { key: "code", type: "required", message: "请输入验证码" },
      { key: "code", type: 'length', min: 6, max: 6, message: "验证码必须是6位数字" }
    ])
    setError(error)
    if (!hasError(error)) {
      const response = await fetchSessionApi(data)
      nav('/home')
    }
  }
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
      <form p-form onSubmit={onSubmit}>
        <div>
          <span p-form-label>邮箱地址</span>
          <input p-input-text type="text" placeholder='请输入邮箱，然后点击发送验证码'
            value={data.email} onChange={e => setData({ email: e.target.value })} />
          <div pt-6px>
            {error.email ? <span text-red>{error.email}</span> : <span>&nbsp;</span>}
          </div>
        </div>
        <div>
          <span p-form-label>验证码</span>
          <div flex gap-x-16px>
            <input max-w='[calc(40%-8px)]' p-input-text type="text" placeholder='六位数字'
              value={data.code} onChange={e => setData({ code: e.target.value })} />
            <button max-w='[calc(60%-8px)]' p-btn >发送验证码</button>
          </div>
          <div pt-6px>
            {error.code ? <span text-red>{error.code}</span> : <span>&nbsp;</span>}
          </div>
        </div>
        <div mt-100px>
          <button p-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}