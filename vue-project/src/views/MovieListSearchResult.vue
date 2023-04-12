<template>
    <div>
      <MovieList :movies="movies" :img="img" :page-size="9999999"></MovieList>
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/MovieList.vue'
  //TODO: mettre la bonne methode de MovieAPI
  import {getWelcomePageMovies} from '@/services/MovieAPI.js'
export default {
          name: 'App',
    components: {
      MovieList
    },
    props:{
        keyword: String,
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
  