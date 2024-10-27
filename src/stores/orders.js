// https://api.warframe.market/v1/profile/voge_doge/orders?include=profile
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'
import { useAuthStore } from './auth'
import { backendApi } from '@/api/axios'

const baseUrl = 'http://localhost:8080/v1'
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
    let response = await backendApi.get(`${baseUrl}/user/order`)
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
    let request = { order_id: orderId, visible }
    await updateOrder(request)
  }

  function findOrderById(orderId) {
    return Object.entries(userOrders.value).map((orders) => orders.find((o) => o.id == orderId))
  }

  async function postOrder(order) {
    let response = await axios.post(`${baseUrl}/profile/orders`, order, authStore.header)
    order = await response.data.payload.order
    switch (order.order_type) {
      case 'buy':
        userOrders.value.buy_orders.push(order)
        break
      case 'sell':
        userOrders.value.sell_orders.push(order)
        break
    }
    //api/v1/profile/orders
    /**
   * item_id:"5758af5142ba8659dde2f573"
   * 
   * 56dac56a5cc639de0a45c51b
order_type:"sell"
platinum:999
quantity:1
rank:1
visible:true
   */
  }

  async function updateOrder(request) {
    /**order_id: 
"66abecb7b12b7426a117bc18"
quantity: 
200 */
    //PUT https://api.warframe.market/v1/profile/orders/66abecb7b12b7426a117bc18
    let response = await axios.put(
      `${baseUrl}/profile/orders/${request.order_id}`,
      request,
      authStore.header
    )
    let data = await response.data
    let newOrder = data.payload.order

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

  async function suggestPrice(urlName) {
    //https://api.warframe.market/v1/items/nyx_prime_set/statistics?order_type=sell
    let response = await axios.get(`${baseUrl}/items/${urlName}/statistics?order_type=sell`)
    let stat = await response.data.payload.statistics_closed

    let price = stat['48hours'][stat['48hours'].length - 1].moving_avg
    const previousPrice = stat['48hours'][stat['48hours'].length - 2].moving_avg

    if (previousPrice < price) {
      price = Math.ceil(price)
    } else {
      price = Math.floor(price)
    }

    return price
  }
  return {
    userOrders,
    ordersByItem,
    fetchUserOrders,
    fetchOrdersByItem,
    setOrderVisibility,
    postOrder,
    suggestPrice,
    updateOrder
  }
})
const condition = (order) => {
  return order.order_type === 'sell'
}
