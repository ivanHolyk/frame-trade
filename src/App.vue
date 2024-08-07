<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useUserStore } from './stores/user';
const authStore = useAuthStore()
const userStore = useUserStore()

</script>

<template>
  <header>


    <nav class="navbar navbar-expand-lg" style="background-color: #42b883;" data-bs-theme="dark">

      <div class="container-fluid">
        <a class="navbar-brand" href="#">Frame-trade</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" activeClass="active">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link" activeClass="active">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/market" class="nav-link" activeClass="active">WFM</RouterLink>
            </li>

            <hr class="d-block d-lg-none d-xl-none d-xxl-none">
          </ul>
          <ul class="navbar-nav">
            <li v-if="authStore.token" class="nav-item">
              <RouterLink :to="`/user/${userStore.username}`" class="nav-link" activeClass="active">{{
                userStore.username }}</RouterLink>
            </li>
            <li v-if="authStore.token" class="nav-item">
              <RouterLink :to="`/user/${userStore.username}/orders`" class="nav-link" activeClass="active">Orders
              </RouterLink>
            </li>
            <li v-if="authStore.token" class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Inventory</a>
            </li>
            <li v-if="authStore.token" class="nav-item">
              <RouterLink to="/logout" class="nav-link" activeClass="active">Logout</RouterLink>
            </li>
          </ul>
        </div>



      </div>
    </nav>


  </header>
  <div class="container">
    <RouterView />
  </div>
</template>
<style>
.w-max-content {
  width: max-content !important
}

@media (min-width: 768px) {

  .vh-25-md {

    /* height: 25vh; */
  }
}
</style>