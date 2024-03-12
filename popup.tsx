import { useEffect, useState } from "react";



import { sendToBackground } from "@plasmohq/messaging";






import "style.css";



import CheckBox from "~component/CheckBox";
import Loading from "~component/Loading";





function IndexPopup() {
  const [loading, setLoading] = useState(true)
  const [isEnable, setIsEnable] = useState(false)

  useEffect(() => {
    sendToBackground({ name: "setCookie" })
      .then((res) => {
        console.log("res:", res)
        setIsEnable(res?.enable === true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          "linear-gradient(90deg, rgb(213 250 144) 0%, rgb(200 255 199) 100%);",
        padding: "24px 0"
      }}>
      <CheckBox
        setLoading={setLoading}
        isEnable={isEnable}
        setIsEnable={setIsEnable}
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999
          }}>
          <Loading />
        </div>
      )}
    </div>
  )
}

export default IndexPopup