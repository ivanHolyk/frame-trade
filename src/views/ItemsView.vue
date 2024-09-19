<template>

    <v-autocomplete v-model="selectedItemUrl" :label="'Items'" :placeholder="'Type to search...'" name="itemSearch"
        append-icon="mdi-magnify" type="search" :items="itemOptions" :item-title="'text'" :item-value="'value'"
        autocomplete></v-autocomplete>
    <RouterView></RouterView>


</template>

<script setup>
import { useItemsStore } from '@/stores/item';
import { ref, watch, computed } from 'vue';
import { RouterView } from 'vue-router';
import { watchDebounced } from '@vueuse/core';
import router from '@/router';

const itemStore = useItemsStore()
const selectedItemUrl = ref('')
const selectedItem = ref()

// Prepare item options for the autocomplete
const itemOptions = computed(() => {
    return itemStore.items.map(item => ({
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
    { debounce: 1000, maxWait: 2000 },
)
</script>