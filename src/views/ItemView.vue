<template>
    <div>
        <button @click="getRequestedItem()" class="btn btn-outline-secondary"><i
                class="bi bi-arrow-clockwise"></i></button>
        <!-- {{ $route.params.id }} -->
        <!-- {{ item }} -->
        <!-- {{ props }}
        {{ $route.params }} -->
        <div>
            <div v-if="item" class="row">
                <div class="col d-flex justify-content-center">
                    <div>

                        <img :src="getIcon(item.icon)" alt="Item Icon" class="img-thumbnail">
                    </div>
                </div>
                <div class="col-md">
                    <h3>{{ getItemName(item, currentLocale) }}</h3>
                    <p><i class="bi bi-info-circle"></i> {{ getItemDescription(item, currentLocale) }}</p>
                    <p><i class="bi bi-card-text"></i> Item id: {{ item.id }}</p>
                    <p v-if="item.rarity"><i class="bi bi-star"></i> Rarity: {{ item.rarity }}</p>
                    <p v-if="item.ducats">
                        <DucatIcon /> {{ item.ducats }}

                    </p>
                    <p><i class="bi bi-currency-exchange"></i> Trading Tax: {{ item.trading_tax }}</p>
                    <p v-if="item.mod_max_rank >= 0"><i class="bi bi-arrow-bar-up"></i> Mod Max Rank: {{
                        item.mod_max_rank
                        }}
                    </p>
                    <p v-if="item.mastery_level"><i class="bi bi-award"></i> Mastery level: {{ item.mastery_level }}</p>
                    <p v-if="item.set_root"><i class="bi bi-box"></i> Set root: {{ item.set_root }}</p>
                    <p v-if="item.quantity_for_set"><i class="bi bi-123"></i> Quantity for set: {{ item.quantity_for_set
                        }}</p>
                    <p><i class="bi bi-image"></i> Icon format: {{ item.icon_format }}</p>
                    <p><i class="bi bi-tags"></i> Tags:
                        <span v-for="tag in item.tags" :key="tag" class="badge bg-secondary  me-1">
                            {{ tag }}
                        </span>
                    </p>
                    <p v-if="item.subtypes"><i class="bi bi-tag-fill"></i> Subtypes:
                        <span v-for="tag in item.subtypes" :key="tag" class="badge bg-secondary me-1">
                            {{ tag }}
                        </span>
                    </p>
                    <p>
                        <i class="bi bi-link-45deg"></i> Wiki Link:
                        <a :href="getWikiLink(item, currentLocale)" target="_blank">
                            {{ getWikiLink(item, currentLocale) }}
                        </a>
                    </p>
                </div>
            </div>
            <div v-else>
                <p>Loading item data...</p>
            </div>
        </div>
        <RouterView></RouterView>
    </div>
</template>
<script setup>
import { useItemsStore } from '@/stores/item';
import { ref } from 'vue';

import DucatIcon from '@/assets/DucatIcon.vue';
import { RouterView } from 'vue-router';
const props = defineProps(['id', 'urlName'])

const itemStore = useItemsStore()
const item = ref()
const getRequestedItem = (async () => {
    let fetchedItem = await itemStore.fetchItem(props.urlName)
    if (fetchedItem.items_in_set) {
        item.value = fetchedItem.items_in_set.find(i => i.url_name === props.urlName)
    } else {
        item.value = fetchedItem
    }
})
getRequestedItem()
console.log(item.value)

function getItemName(item, locale) {
    return item[locale]?.item_name || item.en.item_name // Fallback to English if locale not found
}

function getItemDescription(item, locale) {
    return item[locale]?.description || item.en.description // Fallback to English if locale not found
}

function getWikiLink(item, locale) {
    return item[locale]?.wiki_link || item.en.wiki_link // Fallback to English if locale not found
}
function getIcon(url) {
    //items/images/en/thumbs/limbo_prime_systems.7bfbc70bd8438594d45a47fba260b174.128x128.png
    return `/static/assets/${url}`
}
</script>
<style>
@media (min-width: 768px) {

    .vh-25-md {

        /* height: 25vh; */
    }
}
</style>