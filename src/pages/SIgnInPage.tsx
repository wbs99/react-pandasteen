import { FormEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { fetchSessionApi } from "../apis"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"
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
        <Input label="邮箱地址" placeholder="六位数字" value={data.email}
          onChange={(value) => setData({ email: value })} errorMessage={error.email?.[0]} />
        <Input type='sms_code' label="验证码" value={data.code}
          onChange={value => setData({ code: value })} errorMessage={error.code?.[0]} />
        <div mt-100px>
          <button p-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}