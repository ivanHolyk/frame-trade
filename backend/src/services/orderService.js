import { getAuthAxios } from '../api/auth.js'
import { getWfmAxios, setWfmAuthCookie } from '../api/wfm.js'
import { getCookieString } from '../WFMTokenCookieUtils.js'

const fetchOrders = async () => {
  try {
    const authAxios = getAuthAxios()

    const [wfmUsername, token] = await Promise.all([
      getWfmUsername(authAxios),
      getWfmToken(authAxios)
    ])
    const url = `https://api.warframe.market/v1/profile/${wfmUsername}/orders?include=profile`
    /**
   * {
  "payload": {
    "sell_orders": [],
    "buy_orders": []
  },
  "include": {
    "profile": {
      "locale": "en",
      "status": "offline",
      "banned": false,
      "own_profile": false,
      "id": "663151d8c405f609e5f6e1d4",
      "avatar": null,
      "region": "en",
      "last_seen": "2024-10-07T14:30:07+00:00",
      "platform": "pc",
      "achievements": [],
      "about_raw": "",
      "background": null,
      "ingame_name": "voge_doge",
      "about": "",
      "reputation": 1
    }
  }
}
   */
    console.log(token)
    console.log(wfmUsername)

    setWfmAuthCookie(getCookieString(token))

    const WfmAxios = getWfmAxios()

    const response = await WfmAxios.get(url)
    console.log(response)
    const data = await response.data
    const orders = JSON.parse(data).payload
    /**
     * {buy_orders:[],sell_orders:[]}
     */

    console.log(orders)
    return orders
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    throw error // Propagate the error for further handling if needed
  }
}
/**
 * Fetches the in-game name associated with the WFM account.
 * @param {import('axios').Axios} axiosAuthInstance - Axios instance for authentication.
 * @returns {Promise<string>} - The in-game username.
 */
async function getWfmUsername(axiosAuthInstance) {
  const response = await axiosAuthInstance.get(`/v1/user/wfmAccount?fetch=true`)
  const data = await response.data
  const wfmAccount = JSON.parse(data)

  return wfmAccount.wfmUser.ingame_name
}

/**
 * Fetches the WFM token for authentication.
 * @param {import('axios').Axios} axiosAuthInstance - Axios instance for authentication.
 * @returns {Promise<string>} - WFM authentication token.
 */
async function getWfmToken(axiosAuthInstance) {
  const response = await axiosAuthInstance.get('/v1/user/wfmAccount/token')

  const data = await response.data
  const token = JSON.parse(data).token
  return token
}
const addTradeable = async (data) => {}
export { fetchOrders, addTradeable }
