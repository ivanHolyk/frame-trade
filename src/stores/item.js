import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = '/api/v1'
// const apiv2 = '/api/v2'
//https://drops.warframestat.us/data/all.slim.json?1722791610857
//data from syndicates
export const useItemsStore = defineStore('items', () => {
  const items = ref([])

  async function fetchItems() {
    let response = await axios.get(`${baseUrl}/items`)
    items.value = await response.data.payload.items
  }

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

  function findBy(by) {
    if (!by) {
      return []
    }
    console.log(by)
    console.log(
      items.value.filter(
        (i) => i.item_name.includes(by) || i.url_name.includes(by) || i.id.includes(by)
      )
    )
    return items.value.filter(
      (i) => i.item_name.includes(by) || i.url_name.includes(by) || i.id.includes(by)
    )
  }
  function findItem(urlName) {
    return items.value.find(
      (i) =>
        i.url_name === urlName ||
        (i.items_in_set && i.items_in_set.find((iis) => iis.url_name === urlName))
    )
  }
  return { items, fetchItem, fetchItems, findBy }
})
