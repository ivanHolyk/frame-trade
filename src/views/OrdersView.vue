<template>
    <div>
        <h2 v-if="props.isUserOrders">{{ userStore.username }}'s orders
            <button @click="ordersStore.fetchUserOrders()" class="btn btn-outline-secondary"><i
                    class="bi bi-arrow-clockwise"></i></button>
        </h2>
        <!-- {{ orders }}
        {{ props }}
        {{ ordersStore.orders }} -->
        <div v-if="orders" class="row">
            <div class="col-lg">
                <h3>Sell Orders</h3>
                <div v-if="orders.sell_orders?.length > 0">
                    <OrderItem v-for="order in orders.sell_orders" :key="order.id" :order="order"
                        :isUserOrdrer="$props.isUserOrders">
                    </OrderItem>
                </div>
                <div v-else>
                    <p>No sell orders available.</p>
                </div>
            </div>

            <div class="col-lg">
                <h3>Buy Orders</h3>
                <div v-if="orders?.buy_orders?.length > 0">
                    <OrderItem v-for="order in orders.buy_orders" :key="order.id" :order="order"
                        :isUserOrdrer="$props.isUserOrders">
                    </OrderItem>
                </div>
                <div v-else>
                    <p>No buy orders available.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useOrdersStore } from '@/stores/orders';
import { computed, onBeforeMount, ref } from 'vue';
import OrderItem from '@/components/OrderItem.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const ordersStore = useOrdersStore()
const userStore = useUserStore()
const props = defineProps({
    isUserOrders: {
        type: Boolean,
        required: true,
        default: false
    },
    id: { required: false, }, urlName: { required: false, }
})
const { userOrders, ordersByItem } = storeToRefs(ordersStore)
const orders = ref(computed(() => {
    if (props.isUserOrders) {
        return userOrders.value
    } else {
        return ordersByItem.value
    }
}))
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



</script>
<style></style>