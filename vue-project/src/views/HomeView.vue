<template>
  <div class="filters">
    <SearchDetails></SearchDetails>
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
    created () { // aura lieu au chargement du component
      getWelcomePageMovies().then(response => {
        this.movies = response})
 },
}
</script>

<style scoped>
.filters{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: left;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 10px;
}
</style>
