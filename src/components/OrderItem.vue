<template>
  <v-card v-if="order" :class="{ 'opacity-75': !order.visible }">
    <v-row>
      <v-col v-if="order.item">
        <v-img :src="getThumbnail(order.item.sub_icon || order.item.thumb)" alt="Item Thumbnail"
          class="rounded"></v-img>
      </v-col>

      <v-col class="order-details">
        <v-row class="order-header">
          <v-col>
            <h4>
              <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}/orders`" :id="order.item.id"
                :urlName="order.item.url_name">
                {{ order.item.en.item_name }}
              </RouterLink>
            </h4>
          </v-col>
          <v-col>
            <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}`" :id="order.item.id"
              :urlName="order.item.url_name">
              <v-icon>mdi-information</v-icon>
            </RouterLink>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="order.subtype">
            <h5>{{ order.subtype }}</h5>
          </v-col>
        </v-row>

        <v-row class="order-details-body">
          <v-col>Order ID: {{ order.id }}</v-col>
          <v-col><v-icon :icon="order.visible ? 'mdi-eye' : 'mdi-eye-off'"></v-icon></v-col>
          <v-col>{{ order.quantity }} <v-icon>mdi-box-multiple</v-icon></v-col>
          <v-col>Platinum: {{ order.platinum }}
            <PlatIcon />
          </v-col>
          <v-col v-if="order.item && order.item.ducats">Ducats: {{ order.item.ducats }}</v-col>
          <v-col v-if="order.mod_rank >= 0">Rank: {{ order.mod_rank }}</v-col>
          <v-col>Last Update: {{ useTimeAgo(order.last_update) }}</v-col>
          <v-col v-if="order.creation_date">Create: {{ useTimeAgo(order.creation_date) }}</v-col>
          <v-col>
            Platform: <v-icon :icon="getClassByPlatform(order.platform)"></v-icon> {{ order.platform }}
          </v-col>
          <v-col>Region: {{ order.region }}</v-col>
        </v-row>

        <v-row v-if="order.item && order.item.tags" class="order-tags">
          <v-chip v-for="tag in order.item.tags" :key="tag" color="secondary">{{ tag }}</v-chip>
        </v-row>
      </v-col>

      <v-col v-if="order.item" class="action-buttons">
        <v-btn icon @click="decreaseQuantity"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn icon @click="toggleEditOrder"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="toggleOrderVisibility"><v-icon
            :icon="order.visible ? 'mdi-eye-off' : 'mdi-eye'"></v-icon></v-btn>
        <v-btn icon color="red"><v-icon>mdi-trash-can</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-card>
  <EditOrder v-if="isEditOrder" :order="order" @editOrderClose="isEditOrder = false"></EditOrder>
</template>
<script setup>
import { toRef, toRefs, useTimeAgo } from '@vueuse/core'
import { useOrdersStore } from '@/stores/orders'
import PlatIcon from '@/assets/PlatIcon.vue'
import EditOrder from '@/components/EditOrder.vue'
import { ref } from 'vue'
const props = defineProps(['order', 'isUserOrder'])

const { order } = toRefs(props)
const isUserOrder = props.isUserOrder
const isEditOrder = ref(false)

const orderStore = useOrdersStore()
function getThumbnail(url) {
  //items/images/en/thumbs/limbo_prime_systems.7bfbc70bd8438594d45a47fba260b174.128x128.png
  return `/static/assets/${url}`
}
function getClassByPlatform(platform) {
  let cssClass = ''
  switch (platform) {
    case 'xbox':
      cssClass = 'bi-xbox'
      break
    case 'pc':
      cssClass = 'bi-display'
      break
    case 'ps4':
      cssClass = 'bi-playstation'
      break
    case 'switch':
      cssClass = 'bi-nintendo-switch'
      break
    default:
  }
  return cssClass
}
</script>
<style>
.w-fit {
  width: fit-content !important;
}

.action-buttons {
  display: inline-flex;
  justify-content: end;
  flex-wrap: wrap;
}

.order-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.order-header {
  display: inline-flex;
  justify-content: space-between;
  align-items: start;
}

.order-thumb {
  width: 64px;
  height: 64px;
  margin-right: 1rem;
}

.order-details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.order-details-body {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.order-details-body>p {
  margin-right: 1rem !important;
  margin: 0;
  padding: 0;
  align-content: space-evenly;
}

.order-tags .badge {
  margin-right: 0.5rem;
}
</style>
