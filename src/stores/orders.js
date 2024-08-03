// https://api.warframe.market/v1/profile/voge_doge/orders?include=profile
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import { useAuthStore } from './auth'

const baseUrl = '/api/v1'

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

  function fetchOrders({ isUserOrders, urlName }) {
    if (isUserOrders) {
      return userOrders.value
    } else {
      return ordersByItem.value
    }
  }

  return { userOrders, ordersByItem, fetchUserOrders, fetchOrdersByItem }
})
const condition = (order) => {
  return order.order_type === 'sell'
}
