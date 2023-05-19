<template>
  <header class="basic-grid">
    <SearchDetails></SearchDetails>
    <h1>Bienvenue !</h1>
    <router-link v-if="isAdmin" to="/addMovie">Ajouter un film</router-link>
    <LogoutDetails></LogoutDetails>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchDetails from './components/SearchDetails.vue'
import { ref, onMounted } from 'vue';
import auth from './services/auth.js';
import LogoutDetails from './components/NavigationDetails.vue'

export default {
  setup() {
    const isAdmin = ref(false);

    onMounted(async () => {
      isAdmin.value = auth.isUserAdmin();
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container{
  width: 100%;
}
</style>
