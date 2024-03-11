import { checkPageAndCookie } from "~util"

interface Props {
  setLoading: (loading: boolean) => void
  isEnable: boolean
  setIsEnable: (isEnable: boolean) => void
}
export default function ({ setLoading, isEnable, setIsEnable }: Props) {
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
          onChange={() => checkPageAndCookie({ setLoading, setIsEnable })}
        />
        <div className="button">
          <span className="button-toggle"></span>
          <span className="button-indicator"></span>
        </div>
      </div>
    </label>
  )
}
