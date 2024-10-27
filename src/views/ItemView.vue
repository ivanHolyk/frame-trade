<template>
  <div>
    <div v-if="item">
      <v-row>
        <!-- Item Image -->
        <v-col class="d-flex justify-center">
          <v-img :src="getIcon(item.icon)" alt="Item Icon" max-width="150"></v-img>
        </v-col>

        <!-- Item Details -->
        <v-col>
          <v-card elevation="1">
            <v-card-title>
              <h3>{{ getItemName(item, currentLocale) }}</h3>
            </v-card-title>

            <v-card-subtitle>
              <v-icon left>mdi-information</v-icon> {{ getItemDescription(item, currentLocale) }}
            </v-card-subtitle>

            <v-card-text>
              <v-row>
                <v-col>
                  <p><v-icon left>mdi-card-text-outline</v-icon> Item ID: {{ item.id }}</p>
                  <p v-if="item.rarity"><v-icon left>mdi-star</v-icon> Rarity: {{ item.rarity }}</p>
                  <p v-if="item.ducats">
                    <DucatIcon /> {{ item.ducats }}
                  </p>
                  <p><v-icon left>mdi-currency-usd</v-icon> Trading Tax: {{ item.trading_tax }}</p>
                  <p v-if="item.mod_max_rank >= 0">
                    <v-icon left>mdi-arrow-up-bold</v-icon> Mod Max Rank: {{ item.mod_max_rank }}
                  </p>
                  <p v-if="item.mastery_level">
                    <v-icon left>mdi-award</v-icon> Mastery Level: {{ item.mastery_level }}
                  </p>
                  <p v-if="item.set_root">
                    <v-icon left>mdi-box</v-icon> Set Root: {{ item.set_root }}
                  </p>
                  <p v-if="item.quantity_for_set">
                    <v-icon left>mdi-numeric</v-icon> Quantity for Set: {{ item.quantity_for_set }}
                  </p>
                  <p><v-icon left>mdi-image-outline</v-icon> Icon Format: {{ item.icon_format }}</p>

                  <!-- Tags -->
                  <p><v-icon left>mdi-tag-outline</v-icon> Tags:</p>
                  <v-chip-group>
                    <v-chip v-for="tag in item.tags" :key="tag" color="secondary" outlined>{{
                      tag
                    }}</v-chip>
                  </v-chip-group>

                  <!-- Subtypes -->
                  <p v-if="item.subtypes"><v-icon left>mdi-tag-multiple</v-icon> Subtypes:</p>
                  <v-chip-group v-if="item.subtypes">
                    <v-chip v-for="subtype in item.subtypes" :key="subtype" color="secondary" outlined>{{ subtype
                      }}</v-chip>
                  </v-chip-group>

                  <!-- Wiki Link -->
                  <p>
                    <v-icon left>mdi-link</v-icon> Wiki Link:
                    <a :href="getWikiLink(item, currentLocale)" target="_blank">
                      {{ getWikiLink(item, currentLocale) }}
                    </a>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <RouterLink :to="{ name: 'itemOrders' }">
                <v-btn text>Orders</v-btn>
              </RouterLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Loading State -->
    <div v-else>
      <v-progress-circular indeterminate></v-progress-circular>
      <p>Loading item data...</p>
    </div>

    <RouterView></RouterView>
  </div>
</template>
<script setup>
import { useItemsStore } from '@/stores/item'
import { ref, watch } from 'vue'

import DucatIcon from '@/assets/DucatIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
const props = defineProps(['id', 'urlName'])

const itemStore = useItemsStore()
const item = ref()
const getRequestedItem = async () => {
  let fetchedItem = await itemStore.getItem(props.urlName)
  if (fetchedItem.items_in_set) {
    item.value = fetchedItem.items_in_set.find((i) => i.url_name === props.urlName)
  } else {
    item.value = fetchedItem
  }
}
getRequestedItem()
watch(props, (newUrl) => {
  getRequestedItem()
})
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