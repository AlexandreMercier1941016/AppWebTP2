<template>
  <header class="basic-grid">
    <SearchDetails></SearchDetails>
    <h1>Bienvenue !</h1>
    <LogoutDetails></LogoutDetails>
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchDetails from './components/SearchDetails.vue'
import LogoutDetails from './components/LogoutDetails.vue'

export default {
  components: {
    SearchDetails,
    LogoutDetails
  }
}
</script>

<style scoped>
.basic-grid {
  display: grid;
  grid-template-rows: repeat(0, 0fr);
  text-align: top;
}
</style>
