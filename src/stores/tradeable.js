import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useWarframeStore } from './warframe'

const baseUrl = '/api'

export const useTradeableItemStore = defineStore('items', () => {
  const waframeStore = useWarframeStore()
  const items = ref([])
  const sets = computed(() => {
    return items.value.filter((item) => item.item_name.includes('Prime Set'))
  })
  const warframes = waframeStore.warframes
  const urlNames = computed(() => getUrlName(items))
  const setsUrlNames = computed(() => getUrlName(sets))

  async function getItems() {
    try {
      let response = await axios.get(baseUrl + '/items')
      items.value = response.data.payload.items
      waframeStore.sets = sets.value
      waframeStore.getSetsInfo()
    } catch (error) {
      console.error(error)
    }
  }

  return { items, sets, getItems, urlNames, setsUrlNames, warframes, waframeStore }
})

function getUrlName(arr) {
  return arr.value.map((i) => i.url_name)
}
