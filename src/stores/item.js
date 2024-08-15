import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems, fetchItem } from '@/api/itemApi'
import axios from 'axios'

// const apiv2 = '/api/v2'
//https://drops.warframestat.us/data/all.slim.json?1722791610857
//data from syndicates
export const useItemsStore = defineStore('items', () => {
  const items = ref([])

  const droptable = ref([])

  async function initDroptable() {
    droptable.value = localStorage.getItem('droptable')
    if (!droptable.value) {
      let response = await axios.get('https://drops.warframestat.us/data/all.json')
      droptable.value = await response.data
      try {
        localStorage.setItem('droptable', JSON.stringify(droptable.value))
      } catch (error) {
        console.error(error)
      }
    }
  }
  initDroptable()
  getItems()
  function getItems() {
    fetchItems().then((i) => (items.value = i))
  }

  async function getItem(urlName, force) {
    // let item = findItem(urlName)
    // if (!item || force) {
    //   item = await fetchItem(urlName)
    //   items.value.push(item)
    // }
    let item = await fetchItem(urlName)
    items.value.push(item)
    console.log(item)
    return item
  }

  function findBy(by) {
    if (!by) {
      return []
    }
    return items.value.filter((i) => {
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

  return { items, droptable, getItem, getItems, findBy, findById }
})
