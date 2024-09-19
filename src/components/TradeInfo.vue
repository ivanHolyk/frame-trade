<template>
    <div v-if="order && order.user">
        <button class="list-group-item list-group-item-action" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#' + id" aria-expanded="false" :aria-controls="id">
            <UserInfo v-if="order.user" :user="order.user">
                <span class="h3 me-3">
                    <i class="bi bi-boxes"></i> {{ order.quantity }}
                </span>
            </UserInfo>
        </button>
        <div class="collapse list-group-item" :id="id">
            <TradeMessage v-if="order" :order="order" :item="item" :operation="operation">
            </TradeMessage>
        </div>
    </div>
</template>
<script setup>
import TradeMessage from '@/components/TradeMessage.vue'
import UserInfo from './WFMUserInfo.vue';

const props = defineProps(['order', 'item', 'index', 'operation'])
const order = props.order;
const item = props.item
const index = props.index
const operation = props.operation
const id = item.url_name + '_' + operation + '_' + index
</script>