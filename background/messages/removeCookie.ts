import type { PlasmoMessaging } from "@plasmohq/messaging"

import { removeRemoteCookie } from "~util"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = await chrome.cookies.get({
    url: "https://channels.weixin.qq.com/",
    name: "sessionid"
  })
  // check cookie
  const cookieString = `sessionid=${result?.value}`
  const { success } = await removeRemoteCookie(cookieString)
  res.send({
    success
  })
}

export default handler
