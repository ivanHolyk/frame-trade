import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = '/api/v1'
// const apiv2 = '/api/v2'

export const useItemsStore = defineStore('items', () => {
  const items = ref([])

  async function fetchItem(urlName) {
    let item = findItem(urlName)
    if (!item) {
      let response = await axios.get(`${baseUrl}/items/${urlName}`)
      item = await response.data.payload.item
      items.value.push(item)
    }
    console.log(item)
    return item
  }
  function findItem(urlName) {
    return items.value.find(
      (i) =>
        i.url_name === urlName ||
        (i.items_in_set && i.items_in_set.find((iis) => iis.url_name === urlName))
    )
  }
  return { items, fetchItem }
})
