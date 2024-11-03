<template>
  <v-autocomplete
    elevation="1"
    v-model="selectedItemUrl"
    placeholder="Type to search..."
    label="Item"
    prepend-inner-icon="mdi-magnify"
    :items="itemOptions"
    :item-title="'text'"
    :item-value="'value'"
  ></v-autocomplete>
  <RouterView></RouterView>
</template>

<script setup>
import { useItemsStore } from '@/stores/item'
import { ref, watch, computed } from 'vue'
import { RouterView } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import router from '@/router'

const itemStore = useItemsStore()
const selectedItemUrl = ref()
const selectedItem = ref()

// Prepare item options for the autocomplete
const itemOptions = computed(() => {
  return itemStore.items.map((item) => ({
    text: item.item_name,
    value: item.url_name
  }))
})

watchDebounced(
  selectedItemUrl,
  async (newUrl) => {
    if (newUrl) {
      selectedItem.value = await itemStore.getItem(newUrl, true)
      router.push(`/item/${selectedItem.value.id}/${selectedItemUrl.value}`)
    }
  },
  { debounce: 1000, maxWait: 2000 }
)
</script>
