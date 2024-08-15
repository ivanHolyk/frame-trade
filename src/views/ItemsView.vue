<template>
    <div class="mb-2">
        <label for="exampleDataList" class="form-label">Items</label>
        <input type="search" class="form-control" list="itemsDatalist" id="exampleDataList"
            placeholder="Type to search..." v-model="selectedItemUrl" name="itemSearch">
        <datalist id="itemsDatalist">
            <option v-for="item in itemStore.items" :value="item.url_name">
                {{ item.item_name }}
            </option>
        </datalist>
    </div>
    <RouterView></RouterView>
</template>
<script setup>
import { useItemsStore } from '@/stores/item';
import ItemView from './ItemView.vue';
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { watchDebounced } from '@vueuse/core';
import router from '@/router';
const itemStore = useItemsStore()
const selectedItemUrl = ref()

const selectedItem = ref()


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