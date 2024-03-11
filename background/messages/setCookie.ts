import type { PlasmoMessaging } from "@plasmohq/messaging"

import { setRemoteCookie } from "~util"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("request:", req)
  const result = await chrome.cookies.get({
    url: "https://channels.weixin.qq.com/",
    name: "sessionid"
  })
  // check cookie
  const cookieString = `sessionid=${result?.value}`
  const remoteResp = await setRemoteCookie(cookieString)
  res.send({
    enable: remoteResp?.invalid === undefined
  })
}

export default handler
