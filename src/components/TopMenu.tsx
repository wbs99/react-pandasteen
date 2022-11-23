import styled from "styled-components"
import { Icon } from "./Icon"
import { CurrentUser } from "./TopMenu/CurrentUser"
import { Menu } from "./TopMenu/Menu"

interface Props {
  className?: string
}

const MyIcon = styled(Icon)`
  width:32px;
  height:32px;
  margin-right:16px;
`

export const TopMenu: React.FC<Props> = ({ className }) => {
  return (
    <div fixed top-0 left-0 w='70vw' max-w-20em h-screen flex flex-col b-3px b-red>
      <CurrentUser className="grow-0 shrink-0" />
      <Menu className="grow-1 shrink-1" />
    </div>
  )
}