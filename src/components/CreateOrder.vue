<template>
    <div id="create-order" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalCenterTitle">Place order</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="search" class="form-control mb-2" placeholder="Search..." v-model="search">

                    <!-- <ul class="overflow-auto vh-max-10 list-group list-group-flush mb-2">
                        <li v-for="item in searchResult" :key="item">
                            {{ item.item_name }}
                        </li>
                    </ul> -->
                    <div class="list-group overflow-auto vh-max-25 mb-2">

                        <div v-for="item in searchResult" :key="item">

                            <input type="radio" v-model="itemId" :value="item.id" :id="item.id" class="d-none">
                            <label class="list-group-item list-group-item-action"
                                :class="itemId && itemId === item.id ? 'active' : ''" :for="item.id"> {{
                                    item.item_name
                                }}</label>
                        </div>


                        <!-- <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
                            The current button
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">A second button
                            item</button>
                        <button type="button" class="list-group-item list-group-item-action">A third button
                            item</button>
                        <button type="button" class="list-group-item list-group-item-action">A fourth button
                            item</button>
                        <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button
                            item</button> -->
                    </div>


                    <!-- <select class="form-select" aria-label="Multiple select example" v-model="item_id" size="10">
                        <option v-for="item in searchResult" :value="item.id"> {{ item.item_name }} </option>
                    </select> -->

                    <div class="form-check">

                        <input type="radio" class="form-check-input" name="type" value="sell" id="sell" v-model="type">
                        <label class="form-check-label" for="sell">
                            Sell </label>
                    </div>

                    <div class="form-check">

                        <input type="radio" class="form-check-input" name="type" value="buy" id="buy" v-model="type">
                        <label class="form-check-label" for="buy">
                            Buy </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="visible" checked v-model="visible">
                        <label class="form-check-label" for="visible">
                            Visible?
                        </label>
                    </div>

                    <input type="text" id="item-name" class="form-control" placeholder="Item name" v-model="name">
                    <input type="number" id="order-price" class="form-control" placeholder="Price" min="1"
                        v-model="price">
                    <input type="number" id="quantity" class="form-control" placeholder="Quantity" max="999" min="1"
                        v-model="quantity">


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="postOrder" class="btn btn-primary" :disabled="isAwait">
                        <span v-if="isAwait" class="spinner-border spinner-border-sm" aria-hidden="true"></span>

                        Post order</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useOrdersStore } from '@/stores/orders';
import { ref, onMounted, watch, toRef, computed } from 'vue';
import { useItemsStore } from '@/stores/item';

import Modal from 'bootstrap/js/dist/modal';
const props = defineProps(['isCreateOrder'])

const ordersStore = useOrdersStore()
const itemStore = useItemsStore()
const name = ref()
const price = ref()
const quantity = ref()
const type = ref()
const visible = ref()
const itemId = ref()
const isCreateOrder = toRef(props.isCreateOrder)
itemStore.fetchItems()


const search = ref()


const searchResult = computed(() => itemStore.findBy(search.value))
let modal
onMounted(() => {

    modal = new Modal('#create-order')
    modal.show()
})

watch(isCreateOrder, (n) => {
    if (n) {
        modal.show()
        isCreateOrder.value = false
    } else {
        modal.hide()
    }
})
const isAwait = ref(false);

async function postOrder() {
    isAwait.value = true

    await ordersStore.postOrder({ item_id: itemId.value, platinum: price.value, quantity: quantity.value, order_type: type.value, visible: visible.value })
    isAwait.value = false
}

</script>
<style>
.vh-max-25 {
    max-height: 25vh
}
</style>