<template>
  <header class="basic-grid">
    <SearchDetails></SearchDetails>
    <h1>Bienvenue !</h1>
    <LogoutDetails></LogoutDetails>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchDetails from './components/SearchDetails.vue'
import LogoutDetails from './components/NavigationDetails.vue'

export default {
  components: {
    SearchDetails,
    LogoutDetails
  }
}
</script>

<style scoped>
.basic-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container{
  width: 100%;
}
</style>
