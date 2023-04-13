<template>
    <div>
      <MovieList :movies="movies" :img="img" :page-size="1000"></MovieList>
    </div>
  </template>
  
<script>
  import MovieList from '@/components/MovieList.vue'
  import {getFilteredMoviesByKeyWords} from '@/services/MovieAPI.js'
  import SearchDetails from '../components/SearchDetails.vue'

  export default {
    name: 'App',
    components: {
      MovieList,
      SearchDetails
    },
    props:{
      keywords: String,
      genre: String,
      year: String
    },
    data() {
      return {
        movies: [],
        img:''
      }
    },
    methods : {
      async fetchData() {
        const response=await getFilteredMoviesByKeyWords(this.$route.query.keywords,this.$route.query.year,this.$route.query.genre);
        this.movies = response
      },
      toUpdate(){
        location.reload()
      }
    },
    created () {
      this.fetchData()
   },
   updated () {
      this.fetchData()
   },
  }
  </script>
  
  <style scoped>
  
  </style>
  