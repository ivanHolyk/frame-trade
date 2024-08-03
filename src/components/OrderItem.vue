<template>
    <div class="order-card">

        <div class="order-header">

            <img v-if="order.item" :src="getThumbnail(order.item.sub_icon ? order.item.sub_icon : order.item.thumb)"
                alt="Item Thumbnail" class=" img-thumbnail me-3 col-3">
            <div class="order-details">
                <div v-if="order.item" class="d-inline-flex justify-content-between">

                    <h4 class="w-fit">
                        <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}/orders`" :id="order.item.id"
                            :urlName="order.item.url_name">

                            {{ order.item.en.item_name }}

                        </RouterLink>
                    </h4>
                    <h4>

                        <RouterLink :to="`/item/${order.item.id}/${order.item.url_name}`" :id="order.item.id"
                            :urlName="order.item.url_name" class="icon-link">
                            <i class="bi bi-info-circle"></i>

                        </RouterLink>

                    </h4>
                </div>
                <h5 v-if="order.subtype">{{ order.subtype }}</h5>
                <div class="order-details-body">
                    <p>Order ID: {{ order.id }}</p>
                    <p><i class="bi" :class="order.visible ? 'bi-eye' : 'bi-eye-slash'"></i> </p>
                    <p>{{ order.quantity }} <i class="bi bi-boxes"></i></p>
                    <p>Platinum: {{ order.platinum }}</p>
                    <p v-if="order.item && order.item.ducats">Ducats: {{ order.item.ducats }}</p>
                    <p v-if="order.mod_rank >= 0">Rank: {{ order.mod_rank }}</p>
                    <p>Last Update: {{ useTimeAgo(order.last_update) }}</p>
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
</template>
<script setup>
import { useTimeAgo } from '@vueuse/core';
const props = defineProps(['order'])
const order = props.order

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
</style>