<template style="margin-top: 1rem">
  <v-card class="pa-4" elevation="2">
    <v-card-title>
      <v-icon class="mr-2" color="primary">mdi-account-circle</v-icon>
      User Information
    </v-card-title>

    <v-card-text v-if="isUserLoaded">
      <!-- Display Username -->
      <v-row>
        <v-col cols="12" md="6">
          <v-icon class="mr-2" color="info">mdi-account</v-icon>
          <strong>Username:</strong> {{ user.displayUsername }}
        </v-col>
      </v-row>

      <!-- Display Email -->
      <v-row>
        <v-col cols="12" md="6">
          <v-icon class="mr-2" color="info">mdi-email</v-icon>
          <strong>Email:</strong> {{ user.email }}
        </v-col>
      </v-row>

      <!-- Display User ID -->
      <v-row>
        <v-col cols="12" md="6">
          <v-icon class="mr-2" color="info">mdi-card-account-details</v-icon>
          <strong>User ID:</strong> {{ user.id }}
        </v-col>
      </v-row>

      <!-- Display WFM Account Expiration -->
      <v-row v-if="hasWfmAccount">
        <v-col cols="12" md="6">
          <v-icon class="mr-2" color="warning">mdi-clock-outline</v-icon>
          <strong>WFM Account Expiration:</strong> {{ useTimeAgo(wfmAccountExpireDate) }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else> There is no user.</v-card-text>

    <v-card-actions v-if="isUserLoaded">
      <v-btn :to="{ name: 'wfmAccount' }">Show WFM account</v-btn>
    </v-card-actions>
    <RouterView />
  </v-card>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const isUserLoaded = computed(() => !!user.value)

import { computed, onMounted, ref } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import { RouterView } from 'vue-router'

// const props = defineProps(['user']);

const wfmAccountExpireDate = ref(user?.wfmAccount?.expireDate)

const hasWfmAccount = ref(user.wfmAccount ? true : false)

const username = userStore.username
</script>
