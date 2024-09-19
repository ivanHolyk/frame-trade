<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useUserStore } from './stores/user';
const authStore = useAuthStore()
const userStore = useUserStore()
import { ref } from 'vue'

const drawer = ref(null)
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>

          <RouterLink to="/" class="v-btn v-btn--text">Home</RouterLink>
        </v-list-item>
        <v-list-item>


          <RouterLink to="/about" class="v-btn v-btn--text">About</RouterLink>

        </v-list-item>

        <v-list-item>

          <RouterLink to="/market" class="v-btn v-btn--text">WFM</RouterLink>
        </v-list-item>
        <v-list-item>


          <RouterLink to="/item" class="v-btn v-btn--text">Items</RouterLink>
        </v-list-item>




        <template v-if="!authStore.token">
          <v-list-item>
            <RouterLink to="/login" class="v-btn v-btn--text">Log in</RouterLink>
          </v-list-item>
        </template>

        <template v-if="authStore.token">
          <v-list-item>
            <RouterLink :to="`/user/${userStore.username}`" class="v-btn v-btn--text">{{ userStore.username }}
            </RouterLink>
          </v-list-item>
          <v-list-item>
            <RouterLink :to="`/user/${userStore.username}/orders`" class="v-btn v-btn--text">Orders</RouterLink>
          </v-list-item>
          <v-list-item>
            <v-btn text disabled>Inventory</v-btn></v-list-item>
          <v-list-item>
            <RouterLink to="/logout" class="v-btn v-btn--text">Logout</RouterLink>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#42b883" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <RouterLink to="/" class="v-toolbar-title">Frame-trade</RouterLink>

      <v-spacer></v-spacer>

      <v-toolbar-items>

      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

  </v-app>
</template>

<style scoped>
.vh-25-md {
  height: 25vh;
}
</style>
