<template>
    <div class="accordion-item">
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
                <div>
                    <UserInfo v-if="priciestBuyOrder" :user="priciestBuyOrder.user">wtb</UserInfo>
                    <TradeMessage v-if="priciestBuyOrder" :order="priciestBuyOrder" :item="item" :operation="'sell'">
                    </TradeMessage>

                </div>
                <br>
                <div class="border-top">
                    <UserInfo v-if="cheapestSellOrder" :user="cheapestSellOrder.user">wts</UserInfo>
                    <TradeMessage v-if="cheapestSellOrder" :order="cheapestSellOrder" :item="item" :operation="'buy'">
                    </TradeMessage>
                </div>
            </div>
        </div>
    </div>



</template>
<script setup>
import PlatIcon from '@/assets/PlatIcon.vue';
import DucatIcon from '@/assets/DucatIcon.vue';
import { computed } from 'vue';

import TradeMessage from '@/components/TradeMessage.vue'
import UserInfo from './UserInfo.vue';

const props = defineProps(['item', 'warframeId'])

const item = props.item
const orders = computed(() => item.orders)

const cheapestSellOrder = computed(() =>
    orders.value?.filter(o => o.order_type === 'sell' && o.user.status === 'ingame').sort((a, b) => a.platinum - b.platinum)[0]
);
const priciestBuyOrder = computed(() =>
    orders.value?.filter(o => o.order_type === 'buy' && o.user.status === 'ingame').sort((a, b) => b.platinum - a.platinum)[0]
)

</script>