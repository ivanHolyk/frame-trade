<template>
  <p>
    {{ item.en.item_name }},
    {{ item.ducats }}
    <DucatIcon />
  </p>
  <p v-if="item.orders" class="pb-1">
    <span>
      wts: {{ cheapestSellOrder?.platinum }}
      <PlatIcon />
    </span>,
    <span>
      wtb: {{ priciestBuyOrder?.platinum }}
      <PlatIcon />
    </span>
  </p>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <h5>WTS (Sell Orders)</h5>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="pa-0">
        <TradeInfo v-for="(order, index) in cheapestSellOrders" :key="index" :order="order" :item="item" :index="index"
          :operation="'buy'"></TradeInfo>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-divider class="border-opacity-25"></v-divider>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <h5>WTB (Buy Orders)</h5>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <TradeInfo v-for="(order, index) in priciestBuyOrders" :key="index" :order="order" :item="item" :index="index"
          :operation="'sell'"></TradeInfo>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import PlatIcon from '@/assets/PlatIcon.vue'
import DucatIcon from '@/assets/DucatIcon.vue'
import { computed } from 'vue'

import TradeInfo from './TradeInfo.vue'

const props = defineProps(['item', 'warframeId'])

const item = props.item
const orders = computed(() => item.orders)

const cheapestSellOrder = computed(
  () =>
    orders.value
      ?.filter((o) => o.order_type === 'sell' && o.user.status === 'ingame')
      .sort((a, b) => a.platinum - b.platinum)[0]
)
const priciestBuyOrder = computed(
  () =>
    orders.value
      ?.filter((o) => o.order_type === 'buy' && o.user.status === 'ingame')
      .sort((a, b) => b.platinum - a.platinum)[0]
)
const cheapestSellOrders = computed(() => {
  if (orders.value) {
    const arr = orders.value
      ?.filter((o) => o.order_type === 'sell' && o.user.status === 'ingame')
      .sort((a, b) => a.platinum - b.platinum)
    const platinum = arr[0].platinum
    return arr
      .filter((o) => o.platinum === platinum)
      .sort((a, b) => b.user.reputation - a.user.reputation)
  } else {
    return orders
  }
})
const priciestBuyOrders = computed(() => {
  if (orders.value) {
    const arr = orders.value
      ?.filter((o) => o.order_type === 'buy' && o.user.status === 'ingame')
      .sort((a, b) => b.platinum - a.platinum)
    //point of failure
    const platinum = arr[0].platinum
    return arr
      .filter((o) => o.platinum === platinum)
      .sort((a, b) => b.user.reputation - a.user.reputation)
  } else {
    return orders
  }
})
</script>
