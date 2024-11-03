<template>
  <div
    id="create-order"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalCenterTitle">Place order</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input type="search" class="form-control mb-2" placeholder="Search..." v-model="search" />

          <div class="list-group overflow-auto vh-max-25 mb-2">
            <div v-for="item in searchResult" :key="item">
              <input type="radio" v-model="itemId" :value="item.id" :id="item.id" class="d-none" />
              <label
                class="list-group-item list-group-item-action d-inline-flex justify-content-between"
                :class="itemId && itemId === item.id ? 'active' : ''"
                :for="item.id"
              >
                <div>
                  {{ item.item_name }}
                </div>
                <div class="d-flex flex-wrap flex-row-reverse">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="badge bg-secondary me-1 fit-max-content"
                  >
                    {{ tag }}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              name="type"
              value="sell"
              id="sell"
              v-model="type"
              checked
            />
            <label class="form-check-label" for="sell"> Sell </label>
          </div>

          <div class="form-check mb-2">
            <input
              type="radio"
              class="form-check-input"
              name="type"
              value="buy"
              id="buy"
              v-model="type"
            />
            <label class="form-check-label" for="buy"> Buy </label>
          </div>

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
            /><button
              class="btn btn-outline-secondary"
              @click="suggestPrice"
              :disabled="!selectedItem"
            >
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
            <option value="" selected disabled>Mod rank</option>
            <option value="0">0</option>
            <option v-for="rank in selectedItem.mod_max_rank" :value="rank">
              {{ rank }}
            </option>
          </select>

          <select class="form-select" v-if="isRelic" v-model="relicRank">
            <option value="" selected disabled>Relic rank</option>

            <option v-for="rank in selectedItem.subtypes" :value="rank">
              {{ rank }}
            </option>
          </select>

          <select class="form-select" v-if="isArcane" v-model="arcaneRank">
            <option value="" selected disabled>Arcane rank</option>

            <option value="0">0</option>
            <option v-for="rank in selectedItem.mod_max_rank" :value="rank">
              {{ rank }}
            </option>
          </select>
          <select class="form-select" v-if="isFish" v-model="fishRank">
            <option value="" selected disabled>Fish rank</option>

            <option v-for="rank in selectedItem.subtypes" :value="rank">
              {{ rank }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="postOrder" class="btn btn-primary" :disabled="isAwait">
            <span v-if="isAwait" class="spinner-border spinner-border-sm" aria-hidden="true"></span>

            Post order
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
const props = defineProps(['isCreateOrder'])

const ordersStore = useOrdersStore()
const itemStore = useItemsStore()
itemStore.getItems()

const isCreateOrder = toRef(props.isCreateOrder)

const price = ref()
const quantity = ref(1)
const type = ref()
const visible = ref()
const itemId = ref()
const modRank = ref()
const relicRank = ref()
const arcaneRank = ref()
const fishRank = ref()

const rankToSet = computed(() =>
  [modRank.value, relicRank.value, arcaneRank.value, fishRank.value].find(
    (rank) => rank != undefined
  )
)
const search = ref()
const searchResult = computed(() => itemStore.findBy(search.value))

const selectedItem = ref()
watch(itemId, async (n) => {
  let result = await itemStore.findById(itemId.value)
  selectedItem.value = result
})

const isMod = computed(() => selectedItem.value?.tags?.includes('mod'))
const isRelic = computed(() => selectedItem.value?.tags?.includes('relic'))
const isWarframe = computed(() => selectedItem.value?.tags?.includes('warframe'))
const isFish = computed(() => selectedItem.value?.tags?.includes('fish'))
const isArcane = computed(() => selectedItem.value?.tags?.includes('arcane_enhancement'))

const isPriceAwait = ref(false)
async function suggestPrice() {
  isPriceAwait.value = true
  price.value = await ordersStore.suggestPrice(selectedItem.value.url_name)
  isPriceAwait.value = false
}

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
const isAwait = ref(false)

async function postOrder() {
  isAwait.value = true

  await ordersStore.postOrder({
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
