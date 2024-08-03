import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useWarframeStore } from './warframe'

const baseUrl = '/api/v1'

export const useTradeableItemStore = defineStore('items', () => {
  const itemStore = useWarframeStore()
  const items = ref([])
  const sets = computed(() => items.value.filter((item) => item.item_name.includes('Prime Set')))
  const warframes = itemStore.warframes
  const urlNames = computed(() => getUrlName(items))
  const setsUrlNames = computed(() => getUrlName(sets))

  async function getItems() {
    try {
      let response = await axios.get(baseUrl + '/items')
      items.value = response.data.payload.items
      itemStore.sets = sets.value
      itemStore.getSetsInfo()
    } catch (error) {
      console.error(error)
    }
  }

  return { items, sets, getItems, urlNames, setsUrlNames, warframes, itemStore }
})

function getUrlName(arr) {
  return arr.value.map((i) => i.url_name)
}
