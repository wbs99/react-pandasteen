import { useEffect, FormEventHandler } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Input } from "../../components/Input"
import { validate, hasError } from "../../lib/validate"
import { useCreateStore } from "../../stores/useCreateTagStore"

type Props = {
  type: 'create' | 'edit'
}
export const TagForm = (props: Props) => {
  const { type } = props
  const params = useParams()
  const [searchParams] = useSearchParams()
  const { data, setData, error, setError } = useCreateStore()
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
  useEffect(() => {
    if (type !== 'edit') { return }
    const id = params.id
    if (!id) { throw new Error('id 必填') }

  }, [])

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    console.log(data)
    setError(newError)
    if (!hasError(newError)) {
      // 请求
    }
  }

  return (
    <form onSubmit={onSubmit} p-16px p-t-32px flex flex-col gap-y-8px>
      <Input label="标签名" placeholder="请输入标签名" errorMessage={error.name?.[0]} value={data.name} onChange={name => setData({ name })} />
      <Input type='emoji' errorMessage={error.sign?.[0]} value={data.sign} onChange={sign => setData({ sign })}
        label={<span>图标 <span text-20px>{data.sign}</span> </span>} />
      <p text-center p-b-24px>记账时长按标签，即可进行编辑</p>
      <div>
        <button p-btn>确定</button>
      </div>
    </form>
  )
}