import { useEffect, useState } from "react"

import "./base.css"

export default function () {
  const [ip, setIp] = useState("")
  useEffect(() => {
    chrome.storage.sync.get(["backendIp"], function (result) {
      setIp(result.backendIp)
    })
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value)
    chrome.storage.sync.set({ backendIp: e.target.value })
  }
  return (
    <div
      style={{
        margin: "24px"
      }}>
      <div className="flex flex-col gap-2">
        <label htmlFor={"ip"}>后台服务器地址：</label>
        <input
          className="w-[150px] border p-3 py-1 focus-visible:outline-none outline-none"
          value={ip}
          id="ip"
          onChange={onChange}
          placeholder="请输入后台服务器地址"
        />
      </div>
      <h3 className="my-4">删除账号:</h3>
      <div>....</div>
    </div>
  )
}
