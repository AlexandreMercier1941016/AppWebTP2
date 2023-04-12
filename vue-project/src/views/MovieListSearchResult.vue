<template>
    <div>
        <SearchDetails></SearchDetails>
    </div>
    <div>
      <MovieList :movies="movies" :img="img" :page-size="1000"></MovieList>
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/MovieList.vue'
  //TODO: mettre la bonne methode de MovieAPI
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
            //TODO: mettre la bonne methode pour le search avec les props
              const response=getFilteredMoviesByKeyWords(this.keywords,this.year,this.genre);
              this.movies = response
          }
      },
      created () { // aura lieu au chargement du component
        getFilteredMoviesByKeyWords(this.$route.query.keywords,this.$route.query.year,this.$route.query.genre).then(response => {
          this.movies = response})
          console.log(this.movies);
   },
  }
  </script>
  
  <style scoped>
  
  </style>
  