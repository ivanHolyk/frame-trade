<template>
  <WFMUserActions v-if="hasWfmAccount"></WFMUserActions>
  <WFMAddUserAccount v-else></WFMAddUserAccount>
  <WFMUserInfo v-if="wfmAccount" :user="wfmAccount.wfmUser" />
  <router-view />
</template>
<script setup>
import { authApi } from '@/api/axios'
import WFMUserInfo from '@/components/WFMUserInfo.vue'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import WFMAddUserAccount from './WFMAddUserAccount.vue'
import WFMUserActions from './WFMUserActions.vue'

const props = defineProps(['user'])
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const wfmAccount = ref()

const hasWfmAccount = ref(user.value?.wfmAccount ? true : false)
console.log(user)

onMounted(async () => {
  if (hasWfmAccount.value) {
    wfmAccount.value = await fetchWfmAccount()
  }
})
const fetchWfmAccount = async () => {
  let response = await authApi.get(`http://localhost:8000/v1/user/wfmAccount?fetch=true`)
  console.log(response)
  let responseWfmAccount = await response.data
  console.log(responseWfmAccount)
  return responseWfmAccount
}
</script>
