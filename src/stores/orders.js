// https://api.warframe.market/v1/profile/voge_doge/orders?include=profile
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import { useAuthStore } from './auth'

const baseUrl = '/api/v1'
//PUT /v1/profile/orders/close/66ab625f5ca322214f18012b
//sell 1 piece
//PUT https://api.warframe.market/v1/profile/orders/close/66abecb7b12b7426a117bc18
//buy 1 piece

export const useOrdersStore = defineStore('orders', () => {
  const userOrders = ref()
  const ordersByItem = ref()

  const userStore = useUserStore()
  const authStore = useAuthStore()

  async function fetchUserOrders() {
    let response = await axios.get(`${baseUrl}/profile/${userStore.username}/orders`, {
      headers: { Authorization: authStore.token }
    })
    const data = await response.data
    userOrders.value = await data.payload
    return await data.payload
  }

  async function fetchOrdersByItem(urlName) {
    let response = await axios.get(`${baseUrl}/items/${urlName}/orders`, {
      headers: { Authorization: authStore.token }
    })
    console.log('payload')
    let payload = await response.data.payload
    console.log(payload)
    const [sell_orders, buy_orders] = payload.orders.reduce(
      ([pass, fail], element) => {
        return condition(element) ? [[...pass, element], fail] : [pass, [...fail, element]]
      },
      [[], []]
    )
    console.log(sell_orders, buy_orders)
    ordersByItem.value = { sell_orders, buy_orders }
    return { sell_orders, buy_orders }
  }

  async function setOrderVisibility(visible, orderId) {
    /**order_id: 
"66abecb7b12b7426a117bc18"
quantity: 
200 */
    //PUT https://api.warframe.market/v1/profile/orders/66abecb7b12b7426a117bc18
    // let order = findOrderById(orderId)
    let request = { order_id: orderId, visible }
    let response = await axios.put(
      `${baseUrl}/profile/orders/${orderId}`,
      request,
      authStore.header
    )
    let data = await response.data
    let newOrder = data.payload.order
    updateOrder(newOrder)
  }

  function findOrderById(orderId) {
    return Object.entries(userOrders.value).map((orders) => orders.find((o) => o.id == orderId))
  }
  function updateOrder(newOrder) {
    const type = newOrder.order_type
    switch (type) {
      case 'sell':
        {
          const i = userOrders.value.sell_orders.findIndex((o) => o.id == newOrder.id)
          userOrders.value.sell_orders[i] = newOrder
        }

        break
      case 'buy':
        {
          const i = userOrders.value.buy_orders.findIndex((o) => o.id == newOrder.id)
          userOrders.value.buy_orders[i] = newOrder
        }

        break
      default:
        throw 'No order type!'
    }
  }
  function fetchOrders({ isUserOrders, urlName }) {
    if (isUserOrders) {
      return userOrders.value
    } else {
      return ordersByItem.value
    }
  }

  return { userOrders, ordersByItem, fetchUserOrders, fetchOrdersByItem, setOrderVisibility }
})
const condition = (order) => {
  return order.order_type === 'sell'
}
