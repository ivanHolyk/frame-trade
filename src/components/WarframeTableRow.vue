<template>
    <th>{{ index }}</th>
    <td>
        {{ warframe.item_name }}
    </td>
    <td><button class="btn btn-primary" v-on:click="warframeStore.getSaleInfo(warframe)">Load sale info</button>

        <p :class="{ 'text-danger': !margin.isWorthIt }">Margin: {{ margin.margin }} </p>

    </td>
    <td>
        <div class="accordion" :id=warframe.id v-for="(item, index) in warframe.itemsInSet" :key="index">
            <WarframeItemOrder :item="item" :warframe-id="warframe.id"></WarframeItemOrder>
        </div>

    </td>
</template>

<script setup>
import { computed } from 'vue';
import { useWarframeStore } from '@/stores/warframe';

import WarframeItemOrder from './WarframeItemOrder.vue';


const warframeStore = useWarframeStore()

const props = defineProps(['warframe', 'index'])
const warframe = props.warframe;
const index = props.index
const margin = computed(() => getMargin(warframe.itemsInSet))


function getCheapestSellFromOrders(orders) {
    return orders.filter(o => o.order_type === 'sell' && o.user.status === 'ingame').sort((a, b) => a.platinum - b.platinum)[0]
}
function getExpencyBuyFromOrders(orders) {
    return orders.filter(o => o.order_type === 'buy' && o.user.status === 'ingame').sort((a, b) => b.platinum - a.platinum)[0]
}



function isSet(item) {
    return item.tags.includes('set')
}
function getMargin(items) {
    let margin = 0;
    items.forEach(item => {
        let orders = item.orders;
        if (!orders) {
            return
        }
        if (isSet(item)) {
            margin += getExpencyBuyFromOrders(orders).platinum

        } else {
            margin -= getCheapestSellFromOrders(orders).platinum
        }
    });
    return { margin: margin, isWorthIt: margin > 0 }
}
</script>