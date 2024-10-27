<template>
  <div v-if="order && order.user">
    <!-- Button to expand/collapse -->
    <v-list-item @click="toggleCollapse(id)">
      <span class="h3 me-3"> <v-icon left>mdi-package-variant</v-icon> {{ order.quantity }} </span>
      <WFMUserInfo v-if="order.user" :user="order.user"> </WFMUserInfo>
    </v-list-item>

    <!-- Collapsible content -->
    <v-expand-transition>
      <div v-show="isExpanded(id)" class="pa-4">
        <TradeMessage v-if="order" :order="order" :item="item" :operation="operation"></TradeMessage>
      </div>
    </v-expand-transition>
  </div>
  <v-divider class="border-opacity-25"></v-divider>
</template>
<script setup>
import TradeMessage from '@/components/TradeMessage.vue'
import WFMUserInfo from './WFMUserInfo.vue'

const props = defineProps(['order', 'item', 'index', 'operation'])
const order = props.order
const item = props.item
const index = props.index
const operation = props.operation
const id = item.url_name + '_' + operation + '_' + index

import { ref } from 'vue'

// Maintain a list of collapsed/expanded state for items
const expandedItems = ref({})

const toggleCollapse = (id) => {
  expandedItems.value[id] = !expandedItems.value[id]
}

const isExpanded = (id) => {
  return expandedItems.value[id]
}
</script>
