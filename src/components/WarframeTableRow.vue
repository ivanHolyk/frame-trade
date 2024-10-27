<template>
  <v-card>
    <v-card-title>
      #{{ index }}
      {{ warframe.item_name }}
    </v-card-title>

    <v-card-actions>
      <v-btn color="primary" :loading="!isLoadComplete" @click="getSaleInfo" primary>
        <template v-slot:default> Load sale info </template>
      </v-btn>

      <p :class="{ 'text-red': !margin.isWorthIt }">Margin: {{ margin.margin }}</p>
      <small v-if="lastUpdate" class="text-body-secondary">
        Last update: {{ useTimeAgo(lastUpdate).value }}
      </small>
    </v-card-actions>

    <v-card-item>
      <v-row>
        <v-col class="v-col-12 v-col-sm-6 v-col-md-4" v-for="(item, index) in warframe.itemsInSet" :key="index">
          <v-card>
            <v-card-title>{{ item.item_name }} </v-card-title>
            <v-card-item elevation="2">
              <WarframeItemOrder :item="item" :warframe-id="warframe.id"></WarframeItemOrder>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useWarframeStore } from '@/stores/warframe'

import WarframeItemOrder from './WarframeItemOrder.vue'
import { useTimeAgo } from '@vueuse/core'

const warframeStore = useWarframeStore()

const props = defineProps(['warframe', 'index'])
const warframe = props.warframe
const index = props.index
const margin = computed(() => getMargin(warframe.itemsInSet))

const isLoadComplete = ref(true)
const lastUpdate = ref(null)

function getCheapestSellFromOrders(orders) {
  return orders
    .filter((o) => o.order_type === 'sell' && o.user.status === 'ingame')
    .sort((a, b) => a.platinum - b.platinum)[0]
}
function getExpencyBuyFromOrders(orders) {
  return orders
    .filter((o) => o.order_type === 'buy' && o.user.status === 'ingame')
    .sort((a, b) => b.platinum - a.platinum)[0]
}

async function getSaleInfo() {
  isLoadComplete.value = false
  await warframeStore.getSaleInfo(warframe)
  isLoadComplete.value = true

  lastUpdate.value = new Date()
}

function isSet(item) {
  return item.tags.includes('set')
}
function getMargin(items) {
  let margin = 0
  items.forEach((item) => {
    let orders = item.orders
    if (!orders) {
      return
    }
    if (isSet(item)) {
      margin += getExpencyBuyFromOrders(orders).platinum
    } else {
      margin -= getCheapestSellFromOrders(orders).platinum
    }
  })
  return { margin: margin, isWorthIt: margin > 0 }
}
</script>
