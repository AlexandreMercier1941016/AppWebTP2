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
            this.movies = response
        }
    },
    created () { // aura lieu au chargement du component
      getWelcomePageMovies().then(response => {
        this.movies = response})
 },
}
</script>

<style scoped>

</style>
