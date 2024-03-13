import { sendToBackground } from "@plasmohq/messaging";





export interface ICookie {
  nickname: string
  cookie: string
  uniqId: string
  origin: "wechat" | "douyin"
}

export async function setRemoteCookie(cookie: string) {
  const ip = "104.168.83.218"
  const resp = await fetch(`http://${ip}:4321/api/cookie`, {
    method: "POST",
    body: JSON.stringify({ cookie })
  })
  return resp.json()
}

export async function removeRemoteCookie(cookie: string) {
  const ip = "104.168.83.218"
  const resp = await fetch(`http://${ip}:4321/api/cookie`, {
    method: "DELETE",
    body: JSON.stringify({ cookie })
  })
  return resp.json()
}

export async function checkPageAndCookie({
  setLoading,
  setIsEnable
}: {
  setLoading: (loading: boolean) => void
  setIsEnable: (isEnable: boolean) => void
}) {
  const currentTab = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })

  if (currentTab?.[0]?.url.includes("channels.weixin.qq.com")) {
    setLoading(true)
    const [res] = await Promise.all([
      sendToBackground({
        name: "setCookie"
      }),
      new Promise((resolve) => setTimeout(() => resolve(1), 2 * 1000))
    ])
    setIsEnable(res?.enable)
    setLoading(false)
  } else {
    window.open("https://channels.weixin.qq.com/", "_blank")
  }
}

export async function removeCurrentCookie({
  setLoading,
  setIsEnable
}: {
  setLoading: (loading: boolean) => void
  setIsEnable: (isEnable: boolean) => void
}) {
  setLoading(true)
  await sendToBackground({ name: "removeCookie" })
  setIsEnable(false)
  setLoading(false)
}