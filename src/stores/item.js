import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems, fetchItem } from '@/api/itemApi'

// const apiv2 = '/api/v2'
//https://drops.warframestat.us/data/all.slim.json?1722791610857
//data from syndicates
export const useItemsStore = defineStore('items', () => {
  const items = ref([])

  function getItems() {
    fetchItems().then((i) => (items.value = i))
  }
  async function getItem(urlName) {
    let item = findItem(urlName)
    if (!item) {
      item = await fetchItem(urlName)
      items.value.push(item)
    }
    console.log(item)
    return item
  }

  function findBy(by) {
    if (!by) {
      return []
    }
    return items.value.filter((i) => {
      // console.log('===============================================')
      // console.log(i)
      return i.item_name.includes(by) || i.url_name.includes(by) || i.id.includes(by)
    })
  }
  async function findById(id) {
    let item = items.value.find((i) => i.id == id)
    console.log(item)
    if (item && !item.tags) {
      item = await fetchItem(item.url_name)

      console.log(item)
      item = item.items_in_set.find((i) => i.id == id)
      item.en ? (item = { ...item, ...item['en'] }) : item
      const index = items.value.findIndex((i) => i.id == id)
      console.log(item)
      items.value[index] = item
    }
    return item
  }
  function findItem(urlName) {
    return items.value.find(
      (i) =>
        i.url_name === urlName ||
        (i.items_in_set && i.items_in_set.find((iis) => iis.url_name === urlName))
    )
  }

  return { items, getItem, getItems, findBy, findById }
})
