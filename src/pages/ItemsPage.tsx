import styled from "styled-components"
import { AddItemFloatButton } from "../components/AddItemFloatButton"
import { ItemsList } from "../components/ItemsList"
import { ItemsSummary } from "../components/ItemsSummary"
import { TimeRangePicker } from "../components/TimeRangePicker"
import { TpoNav } from "../components/TopNav"

const Div = styled.div`
  background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: React.FC = () => {
  return (
    <div>
      <Div>
        <TpoNav />
      </Div>
      <TimeRangePicker />
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
    </div>
  )
}