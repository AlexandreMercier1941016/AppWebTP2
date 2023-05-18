<template>
  <header class="basic-grid">
    <SearchDetails></SearchDetails>
    <h1>Bienvenue !</h1>
    <LogoutDetails></LogoutDetails>
    <router-link v-if="isAdmin" to="/addMovie">Ajouter un film</router-link>
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchDetails from './components/SearchDetails.vue'
import LogoutDetails from './components/LogoutDetails.vue'
import { ref, onMounted } from 'vue';
import { isUserAdmin } from './services/auth.js';

export default {
  setup() {
    const isAdmin = ref(false);

    onMounted(async () => {
      isAdmin.value = isUserAdmin();
    });

    return {
      isAdmin
    };
  },
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
