<template>
  <div>
    <movie-list :products="products" :page-size="10"></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import {getWelcomePageMovieList} from '@/services/MovieAPI.js'
    export default {
        name: 'App',
  components: {
    MovieList
  },
  data() {
    return {
        id: 1,
        products: null
    }
    },
    methods : {
        async fetchData() {
            const response = await getWelcomePageMovieList();
            this.products = await response.JSON()
        }
    },
    mounted () { // aura lieu au chargement du component
        this.fetchData();
    },
}
</script>

<style scoped>

</style>
