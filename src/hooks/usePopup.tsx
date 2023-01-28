import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import { Popup } from "../components/Popup"

export const usePopup = (initVisible = false, children: ReactNode) => {
  const [visible, setVisible] = useState(initVisible)
  const popup = <Popup visible={visible} onClickMask={() => setVisible(false)} >{children}</Popup>
  // const popup = createPortal(<Popup visible={visible} onClickMask={() => setVisible(false)} >{children}</Popup>, document.body)
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const toggle = () => setVisible(!visible)

  return { popup, show, hide, toggle }
}