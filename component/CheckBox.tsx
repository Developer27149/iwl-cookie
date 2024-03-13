import { checkPageAndCookie, removeCurrentCookie } from "~util"

interface Props {
  setLoading: (loading: boolean) => void
  loading: boolean
  isEnable: boolean
  setIsEnable: (isEnable: boolean) => void
}
export default function ({
  setLoading,
  isEnable,
  setIsEnable,
  loading
}: Props) {
  const onChange = (checked: boolean) => {
    if (loading) return
    if (checked) {
      checkPageAndCookie({ setLoading, setIsEnable })
    } else {
      // send to background to disable current cookie
      removeCurrentCookie({ setLoading, setIsEnable })
    }
  }
  return (
    <label
      className="switch-button"
      htmlFor="switch"
      style={{
        scale: "0.5"
      }}>
      <div className="switch-outer">
        <input
          id="switch"
          type="checkbox"
          checked={isEnable}
          onChange={(e) => {
            onChange(e.target.checked)
          }}
        />
        <div className="button">
          <span className="button-toggle"></span>
          <span className="button-indicator"></span>
        </div>
      </div>
    </label>
  )
}
