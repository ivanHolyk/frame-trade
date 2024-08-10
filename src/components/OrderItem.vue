<template>
    <div class="order-card" v-if="order" :class="order.visible ? '' : 'opacity-75'">
        <div class="row d-inline-flex justify-content-center">


            <div class=" me-3 mb-3 col-xl-3 col-4 ">

                <img v-if="order.item" :src="getThumbnail(order.item.sub_icon ? order.item.sub_icon : order.item.thumb)"
                    alt="Item Thumbnail" class=" img-thumbnail">
            </div>



            <div class="order-details mb-3 col">
                <div v-if="order.item" class="order-header">
                    <h4 class="align-self-center p-0 m-0">
                        <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}/orders`" :id="order.item.id"
                            :urlName="order.item.url_name">
                            {{ order.item.en.item_name }}
                        </RouterLink>
                    </h4>

                    <div class="action-buttons">
                        <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}`" :id="order.item.id"
                            :urlName="order.item.url_name" class="icon-link me-1 ">
                            <h4 class="align-self-center p-0 m-0"><i class="bi bi-info-circle"></i></h4>
                        </RouterLink>

                        <button class="btn btn-outline-secondary me-1">-1</button>
                        <button class="btn btn-outline-secondary me-1" @click="isEditOrder = !isEditOrder"><i
                                class="bi bi-pencil-square"></i></button>
                        <button @click="orderStore.setOrderVisibility(!order.visible, order.id)"
                            class="btn btn-outline-secondary me-1"><i class="bi"
                                :class="order.visible ? 'bi-eye-slash' : 'bi-eye'"></i></button> <button
                            class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
                <h5 v-if="order.subtype">{{ order.subtype }}</h5>
                <div class="order-details-body">
                    <p>Order ID: {{ order.id }}</p>
                    <p><i class="bi" :class="order.visible ? 'bi-eye' : 'bi-eye-slash'"></i> </p>
                    <p>{{ order.quantity }} <i class="bi bi-boxes"></i></p>
                    <p>Platinum: {{ order.platinum }}
                        <PlatIcon />
                    </p>
                    <p v-if="order.item && order.item.ducats">Ducats: {{ order.item.ducats }}</p>
                    <p v-if="order.mod_rank >= 0">Rank: {{ order.mod_rank }}</p>
                    <p>Last Update: {{ useTimeAgo(order.last_update) }}</p>
                    <p v-if="order.creation_date">Create: {{ useTimeAgo(order.creation_date) }} </p>
                    <p>Platform: <i class="bi" :class="getClassByPlatform(order.platform)"></i> {{
                        order.platform }}</p>
                    <p>Region: {{ order.region }}</p>
                </div>
                <p v-if="order.item && order.item.tags" class="order-tags">
                    <span v-for="tag in order.item.tags" :key="tag" class="badge bg-secondary">{{ tag
                        }}</span>
                </p>
            </div>
        </div>
    </div>
    <EditOrder v-if="isEditOrder" :isEditOrder :order></EditOrder>
</template>
<script setup>
import { toRef, toRefs, useTimeAgo } from '@vueuse/core';
import { useOrdersStore } from '@/stores/orders';
import PlatIcon from '@/assets/PlatIcon.vue';
import EditOrder from '@/components/EditOrder.vue'
import { ref } from 'vue';
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
            break;
        case 'pc':
            cssClass = 'bi-display'
            break;
        case 'ps4':
            cssClass = 'bi-playstation'
            break;
        case 'switch':
            cssClass = 'bi-nintendo-switch'
            break;
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