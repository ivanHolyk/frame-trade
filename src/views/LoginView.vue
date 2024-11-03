<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            :disabled="!isLoadComplete"
            outlined
            dense
          />
          <v-text-field
            v-model="loginInfo.password"
            label="Password"
            type="password"
            :disabled="!isLoadComplete"
            outlined
            dense
          />

          <v-alert v-if="errorMessage" type="error" dense>
            {{ errorMessage.message }}
          </v-alert>

          <v-btn color="primary" block @click="login" :disabled="!isLoadComplete">
            <v-progress-circular v-if="!isLoadComplete" indeterminate color="white" size="20" />
            Log in
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const loginInfo = ref({})
const authStore = useAuthStore()

const errorMessage = ref()

const isLoadComplete = ref(true)
const login = async () => {
  errorMessage.value = undefined
  isLoadComplete.value = false
  try {
    const user = await authStore.login(loginInfo.value.email, loginInfo.value.password)
    isLoadComplete.value = true
    // router.push(`/user`)
    const userStore = useUserStore()
    router.push(`/user/${userStore.username}`)
    // router.go(-1)
  } catch (error) {
    errorMessage.value = error
  } finally {
    isLoadComplete.value = true
  }
}
</script>