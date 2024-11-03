<template>
    <div>
        <div v-if="props.isUserOrders" class="d-inline-flex">
            <v-row>
                <v-col>
                    <h2>{{ userStore.username }}'s orders</h2>
                </v-col>
                <v-col class="d-inline-flex">
                    <v-btn class="me-2" icon @click="isCreateOrder = !isCreateOrder">
                        <v-icon>mdi-cart-plus</v-icon>
                    </v-btn>
                    <CreateOrder v-if="isCreateOrder" :isCreateOrder="isCreateOrder" />
                    <v-btn class="me-2" icon @click="ordersStore.fetchUserOrders">
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <!-- Orders List -->
        <v-row v-if="orders">
            <!-- Sell Orders -->
            <v-col cols="6">
                <h3 class="mb-3">Sell Orders</h3>
                <template v-if="orders.sell_orders?.length > 0">
                    <OrderItem v-for="order in orders.sell_orders" :key="order.id" :order="order"
                        :isUserOrder="props.isUserOrders" class="mb-3" />
                </template>
                <div v-else>
                    <p>No sell orders available.</p>
                </div>
            </v-col>

            <!-- Buy Orders -->
            <v-col cols="6">
                <h3 class="mb-3">Buy Orders</h3>
                <template v-if="orders?.buy_orders?.length > 0">
                    <OrderItem v-for="order in orders.buy_orders" :key="order.id" :order="order"
                        :isUserOrder="props.isUserOrders" class="mb-3" />
                </template>
                <div v-else>
                    <p>No buy orders available.</p>
                </div>
            </v-col>
        </v-row>
        <v-row v-else>
            <p> There is no orders. yet.</p>
        </v-row>
    </div>
</template>
<script setup>
import { useOrdersStore } from '@/stores/orders'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import OrderItem from '@/components/OrderItem.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import CreateOrder from '@/components/CreateOrder.vue'

const ordersStore = useOrdersStore()
const userStore = useUserStore()
const props = defineProps({
  isUserOrders: {
    type: Boolean,
    required: true,
    default: false
  },
  id: { required: false },
  urlName: { required: false }
})

const { userOrders, ordersByItem } = storeToRefs(ordersStore)
const orders = ref(
  computed(() => {
    if (props.isUserOrders) {
      return userOrders.value
    } else {
      return ordersByItem.value
    }
  })
)

console.log(props)

if (props.isUserOrders) {
  console.log('fetch user orders')
  console.log(ordersStore.fetchUserOrders())
  console.log(ordersStore.userOrders)

  orders.value = ordersStore.userOrders
  console.log(userOrders)
  console.log(userOrders.value)
  orders.value = userOrders.value
}
if (props.id && props.urlName) {
  console.log('fetch orders by item')
  ordersStore.fetchOrdersByItem(props.urlName)
  console.log(ordersByItem)
  console.log(ordersByItem.value)
  orders.value = ordersByItem.value
}

const isCreateOrder = ref(false)
</script>
<style></style>