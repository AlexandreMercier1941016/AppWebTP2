<template>
  <div>
    <MovieList :movies="movies" :img="img" :page-size="3"></MovieList>
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
        movies: [],
        img:''
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
