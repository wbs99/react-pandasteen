import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginApi, sendSmsCodeApi } from '../api'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useButtonLoadingStore } from '../stores/useButtonLoadingStore'
import { useLoginStore } from '../stores/useLoginStore'

export const LoginPage = () => {
  const { buttonLoading } = useButtonLoadingStore()
  const { data, setData, error, setError } = useLoginStore()
  const nav = useNavigate()
  const [search] = useSearchParams()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/, message: '邮箱地址不合法' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6位数字' }
    ])
    setError(newError)
    if (!hasError(newError)) {
      const response = await loginApi(data).catch(onSubmitError)
      const jwt = response.data.jwt
      localStorage.setItem('jwt', jwt)
      const return_to = search.get('return_to') || '/items'
      nav(return_to)
    }
  }

  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    setError(err.response?.data?.errors ?? {})
    throw error
  }

  const sendSmsCode = async () => {
    const newError = validate({ email: data.email }, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/, message: '邮箱地址不合法' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      const response = await sendSmsCodeApi({ email: data.email })
      return response
    }
  }

  return (
    <div>
      <Gradient>
        <TopNav title="登录" icon={<BackIcon />} />
      </Gradient>
      <div className="pt-40px pb-16px flex flex-col items-center">
        <Icon name="panda" className='w-64px h-68px' />
        <h1 className="text-32px text-#7878FF font-bold">熊猫记账</h1>
      </div>
      <form className="p-form" onSubmit={onSubmit}>
        <Input type='text' label="邮箱地址" placeholder="请输入" value={data.email}
          onChange={email => setData({ email })} errorMessage={error.email?.[0]} />
        <Input type='sms_code' label="验证码" placeholder="六位数字" value={data.code}
          onChange={code => setData({ code })} errorMessage={error.code?.[0]} request={sendSmsCode} />
        <div className="mt-100px">
          <button disabled={buttonLoading} className='p-btn' type="submit">
            {buttonLoading && <Icon name='loading' className='animate-spin animate-1s mr-12px' />}
            登录
          </button>
        </div>
      </form>
    </div>
  )
}
