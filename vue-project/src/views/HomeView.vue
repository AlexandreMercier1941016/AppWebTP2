<template>
  <div>
    <MovieList :movies="movies" :page-size="10"></MovieList>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import {getWelcomePageMovies} from '@/services/MovieAPI.js'
    export default {
        name: 'App',
  components: {
    MovieList
  },
  data() {
    return {
        movies: []
    }
    },
    methods : {
        async fetchData() {
            const response=getWelcomePageMovies()
            this.movies = await response.JSON()
        }
    },
    created () { // aura lieu au chargement du component
        this.fetchData();
    },
}
</script>

<style scoped>

</style>
