import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = '/api'

export const useWarframeStore = defineStore('warframes', () => {
  const warframes = ref([])
  const sets = ref([])

  async function getSaleInfo(warframe) {
    console.log()
    var items = warframe.itemsInSet
    for (let index = 0; index < items.length; index++) {
      var item = items[index]

      const response = await axios.get(`${baseUrl}/items/${item.url_name}/orders`)
      console.log(response)

      item.orders = response.data.payload.orders
      items[index] = item
      console.log(item)
    }
    warframe.itemsInSet = items
  }

  async function getSetsInfo() {
    for (let index = 0; index < sets.value.length; index++) {
      const set = sets.value[index]
      let info = await getInfoAboutItem(set.url_name)
      await sleep(500)
      sets.value[index].itemsInSet = info.items_in_set

      if (sets.value[index].itemsInSet[0]?.tags.includes('warframe')) {
        warframes.value.push(sets.value[index])
      }
    }
  }

  return { sets, getSetsInfo, warframes, getSaleInfo }
})
async function getInfoAboutItem(urlName) {
  try {
    let response = await axios.get(`${baseUrl}/items/${urlName}`)
    return response.data.payload.item
  } catch (error) {
    console.error(error)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
