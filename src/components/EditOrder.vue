<template>
  <div
    id="edit-order"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalCenterTitle">Edit order</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ order }}
          <div class="form-check mb-2 form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="visible"
              checked
              v-model="visible"
            />
            <label class="form-check-label" for="visible"> Visible? </label>
          </div>
          <div class="input-group mb-2">
            <input
              type="number"
              id="order-price"
              class="form-control"
              placeholder="Price"
              min="1"
              v-model="price"
            /><button class="btn btn-outline-secondary" @click="suggestPrice" :disabled="!order">
              <span
                v-if="isPriceAwait"
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              Suggest price
            </button>
          </div>
          <input
            type="number"
            id="quantity"
            class="form-control"
            placeholder="Quantity"
            max="999"
            min="1"
            v-model="quantity"
          />

          <select class="form-select" v-if="isMod" v-model="modRank">
            <!-- <option value="" selected disabled> Mod rank</option> -->
            <option value="0" :selected="rank === modRank">0</option>
            <option
              v-for="rank in order.item.mod_max_rank"
              :value="rank"
              :selected="rank === modRank"
            >
              {{ rank }}
            </option>
          </select>

          <select class="form-select" v-if="isRelic" v-model="relicRank">
            <option
              v-for="rank in order.item.subtypes"
              :value="rank"
              :selected="rank === relicRank"
            >
              {{ rank }}
            </option>
          </select>

          <select class="form-select" v-if="isArcane" v-model="arcaneRank">
            <!-- <option value="" selected disabled> Arcane rank</option> -->

            <option value="0" :selected="rank === arcaneRank">0</option>
            <option
              v-for="rank in order.item.mod_max_rank"
              :value="rank"
              :selected="rank === arcaneRank"
            >
              {{ rank }}
            </option>
          </select>
          <select class="form-select" v-if="isFish" v-model="fishRank">
            <!-- <option value="" selected disabled> Fish rank</option> -->

            <option v-for="rank in order.item.subtypes" :value="rank" :selected="rank === fishRank">
              {{ rank }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="updateOrder" class="btn btn-primary" :disabled="isAwait">
            <span v-if="isAwait" class="spinner-border spinner-border-sm" aria-hidden="true"></span>

            Edit order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useOrdersStore } from '@/stores/orders'
import { ref, onMounted, watch, toRef, computed } from 'vue'
import { useItemsStore } from '@/stores/item'

import Modal from 'bootstrap/js/dist/modal'
const props = defineProps(['isEditOrder', 'order'])
const order = props.order
const emit = defineEmits(['editOrderClose'])

const ordersStore = useOrdersStore()

const isEditOrder = toRef(props.isEditOrder)

const price = ref(order.platinum)
const quantity = ref(order.quantity)
const type = ref(order.order_type)
const visible = ref(order.visible)
const itemId = ref(order.item_id)
const modRank = ref(order.mod_rank)
const relicRank = ref(order.subtype)
const arcaneRank = ref(order.mod_rank)
const fishRank = ref(order.subtype)

const rankToSet = computed(() =>
  [modRank.value, relicRank.value, arcaneRank.value, fishRank.value].find(
    (rank) => rank != undefined
  )
)

const isMod = computed(() => order.item.tags?.includes('mod'))
const isRelic = computed(() => order.item.tags?.includes('relic'))
const isWarframe = computed(() => order.item.tags?.includes('warframe'))
const isFish = computed(() => order.item.tags?.includes('fish'))
const isArcane = computed(() => order.item.tags?.includes('arcane_enhancement'))

const isPriceAwait = ref(false)
async function suggestPrice() {
  isPriceAwait.value = true
  price.value = await ordersStore.suggestPrice(order.item.url_name)
  isPriceAwait.value = false
}

let modal
onMounted(() => {
  modal = new Modal('#edit-order')
  modal.show()
})

watch(isEditOrder, (n) => {
  if (n) {
    modal.show()
    isEditOrder.value = false
  } else {
    modal.hide()
    emit('editOrderClose')
  }
})
const isAwait = ref(false)

async function updateOrder() {
  isAwait.value = true

  await ordersStore.updateOrder({
    order_id: order.id,
    item_id: itemId.value,
    platinum: price.value,
    quantity: quantity.value,
    order_type: type.value,
    visible: visible.value,
    rank: rankToSet.value
  })
  modRank.value = undefined
  relicRank.value = undefined
  arcaneRank.value = undefined
  fishRank.value = undefined

  isAwait.value = false
}
</script>
<style>
.vh-max-25 {
  max-height: 25vh;
}
</style>
