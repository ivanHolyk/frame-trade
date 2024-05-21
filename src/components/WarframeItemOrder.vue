<template>
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#' + item.url_name" aria-expanded="false" :aria-controls="item.url_name">
            {{ item.url_name }},
            {{ item.ducats }}
            <DucatIcon /> <span v-if="item.orders">,
                wts:
                {{ cheapestSellOrder?.platinum }}
                <PlatIcon />,
                wtb: {{ priciestBuyOrder?.platinum }}
                <PlatIcon />
            </span>
        </button>
    </h2>
    <div :id="item.url_name" class="accordion-collapse collapse" :data-bs-parent="'#' + warframeId">
        <div class="accordion-body">

            <h1>wts</h1>
            <TradeInfo class="list-group" v-for="(order, index) in cheapestSellOrders" :key="index" :order="order"
                :item="item" :index="index" :operation="'buy'">


            </TradeInfo>
            <br>
            <hr>
            <h1>wtb</h1>
            <TradeInfo class="list-group" v-for="(order, index) in priciestBuyOrders" :key="index" :order="order"
                :item="item" :index="index" :operation="'sell'">
            </TradeInfo>

        </div>
    </div>
</template>
<script setup>
import PlatIcon from '@/assets/PlatIcon.vue';
import DucatIcon from '@/assets/DucatIcon.vue';
import { computed } from 'vue';

import TradeInfo from './TradeInfo.vue';


const props = defineProps(['item', 'warframeId'])

const item = props.item
const orders = computed(() => item.orders)

const cheapestSellOrder = computed(() =>
    orders.value?.filter(o => o.order_type === 'sell' && o.user.status === 'ingame').sort((a, b) => a.platinum - b.platinum)[0]
);
const priciestBuyOrder = computed(() =>
    orders.value?.filter(o => o.order_type === 'buy' && o.user.status === 'ingame')
        .sort((a, b) => b.platinum - a.platinum)[0]
)
const cheapestSellOrders = computed(() => {



    if (orders.value) {
        const arr = orders.value?.filter(o => o.order_type === 'sell' && o.user.status === 'ingame')
            .sort((a, b) => a.platinum - b.platinum)
        const platinum = arr[0].platinum;
        return arr.filter(o => o.platinum === platinum)
            .sort((a, b) => b.user.reputation - a.user.reputation)
    } else {
        return orders
    }

}
)
const priciestBuyOrders = computed(() => {
    if (orders.value) {
        const arr = orders.value?.filter(o => o.order_type === 'buy' && o.user.status === 'ingame')
            .sort((a, b) => b.platinum - a.platinum)
        const platinum = arr[0].platinum;
        return arr.filter(o => o.platinum === platinum)
            .sort((a, b) => b.user.reputation - a.user.reputation)
    } else {
        return orders
    }
})

</script>