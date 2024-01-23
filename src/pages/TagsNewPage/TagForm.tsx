import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { createTagApi, getTagApi, updateTagApi } from '../../apis/tagApi'
import { Input } from '../../components/Input'
import { useCreateTagStore } from '../../stores/createTagStore'
import type { FormError } from '../../utils/validate'
import { hasError, validate } from '../../utils/validate'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm = (props: Props) => {
  const { type } = props
  const params = useParams()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const kind = searchParams.get('kind') ?? ''
  const { data, setData, error, setError } = useCreateTagStore()

  useEffect(() => {
    if (type !== 'create') { return }
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind 必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expense 或 income')
    }
    setData({ kind })
  }, [searchParams])

  const [tagId, setTagId] = useState('')
  const { data: tag } = getTagApi(tagId)
  useEffect(() => {
    params.id && setTagId(params.id)
    if (tag) {
      setData(tag)
    }
  }, [tag])

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      const promise = type === 'create'
        ? createTagApi(data)
        : updateTagApi(tagId, data)
      await promise.catch(onSubmitError)
      setData({
        kind: 'expenses',
        sign: '',
        name: ''
      })
      nav(`/items/new?kind=${encodeURIComponent(kind)}`)
    }
  }
  const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
    if (error.response) {
      const { status } = error.response
      if (status === 422) {
        const { errors } = error.response.data
        setError(errors)
      }
    }
    throw error
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col p-4 pt-8 gap-y-2'>
      <Input
        type='text'
        label='标签名'
        placeholder='请输入标签名'
        errorMessage={error.name?.[0]}
        value={data.name}
        onChange={name => setData({ name })}
        />
      <Input
        type='emoji'
        errorMessage={error.sign?.[0]}
        value={data.sign}
        onChange={sign => setData({ sign })}
        label={<span>图标 <span className='text-xl'>{data.sign}</span> </span>}
        />
      <p className='text-center pb-6'>记账时长按标签，即可进行编辑</p>
      <div>
        <button className='w-btn'>确定</button>
      </div>
    </form>
  )
}
