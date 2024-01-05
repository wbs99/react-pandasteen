import styled from 'styled-components'
import { CenterDiv } from './CenterDiv'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 56px;
    height: 56px;
    display: grid;
    border: 4.5px solid #0000;
    border-radius: 50%;
    border-color: #dbdcef #0000;
    animation: spinner-e04l1k 1s infinite linear;
  }
  .spinner::before,
  .spinner::after {
    content: "";
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
  }
  .spinner::before {
    border-color: #474bff #0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }
  .spinner::after {
    margin: 8.9px;
  }
  @keyframes spinner-e04l1k {
    100% {
      transform: rotate(1turn);
    }
  }
`
type Props = {
  className?: string
  message?: string
}

export const Loading = (props: Props) => {
  const { message } = props

  return (
    <CenterDiv>
      <Div>
        <div className='spinner'></div>
        <p className='pt-4 text-lg whitespace-nowrap'>{message || '加载中……'}</p>
      </Div>
    </CenterDiv>
  )
}
