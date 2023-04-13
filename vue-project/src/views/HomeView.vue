<template>

  <div class="basic-grid">
    <SearchDetails></SearchDetails>
    <h1>Bienvenue sur notre chercheur magique de films !</h1>
  </div>

  <div>
    <MovieList :movies="movies" :img="img" :page-size="3"></MovieList>
  </div>

</template>

<script>
import MovieList from '@/components/MovieList.vue'
import {getWelcomePageMovies} from '@/services/MovieAPI.js'
import SearchDetails from '../components/SearchDetails.vue'
  export default {
    name: 'App',
    components: {
      MovieList,
      SearchDetails
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
    created () {
      getWelcomePageMovies().then(response => {
      this.movies = response})
    },
  }
</script>

<style scoped>

.basic-grid {
  display: grid;
  grid-template-rows: repeat(0, 0fr);
  text-align: center;
}

</style>
