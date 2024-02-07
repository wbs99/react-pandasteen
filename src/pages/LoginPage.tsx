import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginApi, sendSmsCodeApi } from '../apis/loginApi'
import { Input } from '../components/Input'
import { MyIcon } from '../components/MyIcon'
import { useLoginStore } from '../stores/loginStore'
import { useButtonLoadingStore } from '../stores/useButtonLoadingStore'
import { setJwt, setRefreshJwt } from '../utils/storage'
import type { FormError } from '../utils/validate'
import { hasError, validate } from '../utils/validate'

export const LoginPage = () => {
  const { buttonLoading } = useButtonLoadingStore()
  const { loginForm, setLoginForm, loginError, setLoginError } = useLoginStore()
  const nav = useNavigate()
  const [search] = useSearchParams()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(loginForm, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/, message: '邮箱地址不合法' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6位数字' }
    ])
    setLoginError(newError)
    if (!hasError(newError)) {
      const response = await loginApi(loginForm).catch(onSubmitError)
      setJwt(response.data.jwt)
      setRefreshJwt(response.data.refresh_jwt)
      const return_to = search.get('return_to') || '/items'
      nav(return_to)
    }
  }

  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof loginForm> }>) => {
    setLoginError(err.response?.data?.errors ?? {})
    throw loginError
  }

  const sendSmsCode = async () => {
    const newError = validate({ email: loginForm.email }, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/, message: '邮箱地址不合法' },
    ])
    setLoginError(newError)
    if (!hasError(newError)) {
      const response = await sendSmsCodeApi({ email: loginForm.email })
      return response
    }
  }

  return (
    <>
      <div className='flex items-center p-4'>
        <MyIcon name='panda' className='w-[36px] h-[36px] mr-2'/>
        <span className='text-primary font-bold'>Panda</span>
      </div>
      <div className='p-8 mt-12'>
        <div className='font-bold text-2xl text-primary'>
          <h3>探索侠</h3>
          <h3>欢迎回来👋</h3>
        </div>
        <form className='mt-16' onSubmit={onSubmit}>
          <Input className='flex flex-col' type='text' label='邮箱' placeholder='请输入' value={loginForm.email}
            onChange={email => setLoginForm({ email })} errorMessage={loginError.email?.[0]} />
          <Input className='flex flex-col' type='sms_code' label='验证码' placeholder='六位数字' value={loginForm.code}
            onChange={code => setLoginForm({ code })} errorMessage={loginError.code?.[0]} request={sendSmsCode} />
          <div className='mt-8'>
            <button disabled={buttonLoading} className='w-btn' type='submit'>
              {buttonLoading && <MyIcon name='loading' className='animate-spin mr-3' />}
              登录
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
