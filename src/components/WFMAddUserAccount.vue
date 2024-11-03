<template>
  wfm account
  <v-form @submit.prevent>
    <v-text-field
      v-model="wfmEmail"
      name="wfmAccountEmail"
      id="wfmAccountEmailInput"
      hint="Email"
      label="Email"
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="wfmPassword"
      name="wfmAccountPassword"
      id="wfmAccountPasswwordInput"
      hint="Password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-btn class="mt-2" @click="addWfmAccount" :loading="!isLoaded" block> Add wfm account </v-btn>
  </v-form>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { authApi } from '@/api/axios'

const isLoaded = ref(true)

const wfmEmail = ref()
const wfmPassword = ref()

const addWfmAccount = async () => {
  isLoaded.value = false

  try {
    let response = await authApi.post(`http://localhost:8000/v1/user/wfmAccount?fetch=true`, {
      email: wfmEmail.value,
      password: wfmPassword.value
    })
    console.log(response)
    let responseWfmAccount = await response.data
    console.log(responseWfmAccount)
    wfmAccount.value = responseWfmAccount
    hasWfmAccount.value = true
  } catch (error) {
    console.error(error)
  } finally {
    isLoaded.value = true
  }
}
</script>
