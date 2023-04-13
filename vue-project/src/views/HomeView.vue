<template>
  <div>
    <MovieList :movies="movies" :img="img" :page-size="3"></MovieList>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import {getWelcomePageMovies} from '@/services/MovieAPI.js'

export default {
  name: 'HomeView',
  components: {
    MovieList
  },
  data() {
    return {
      movies: [],
      img: ''
    }
  },
  methods: {
    async fetchData() {
  const response = await getWelcomePageMovies();
  this.movies = response;
}

  },
  created() {
    this.fetchData();
  }
}
</script>
