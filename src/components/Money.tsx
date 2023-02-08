type Props = {
  value?: number
}
export const Money = (props: Props) => {
  const { value = 0 } = props
  return (
    <span>￥{value / 100}</span>
  )
}