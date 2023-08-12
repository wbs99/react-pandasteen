import type { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}
const CenterDivWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const CenterDiv = (props: Props) => {
  const { children } = props

  return (
    <CenterDivWrapper>{children} </CenterDivWrapper>
  )
}
