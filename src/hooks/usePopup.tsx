import { useState } from "react"
import { Popup } from "../components/Popup"

export const usePopup = () => {
  const [visible, setVisible] = useState(false)
  const popup = <Popup visible={visible} onClickMask={() => setVisible(false)} />
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const toggle = () => setVisible(!visible)

  return { popup, show, hide, toggle }
}