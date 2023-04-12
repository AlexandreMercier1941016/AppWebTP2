<template>
    <div>
        <fieldset class="filters">
            <span >Recherche par nom: <input v-model="searchQuery1" v-bind="searchQuery1" /></span>
            <!--TODO: mettre une liste deroulante avec foreach de movieGenre-->
            <select v-model="searchQueryGenre">
                <option v-for="genre in getMovieGenres" v-bind:value="genre.name" >{{ genre.name }}</option>
            </select>
            <span>Recherche par année: <input v-model="searchQueryYear"  v-bind="searchQueryYear" /></span>
            <button @click="searchQuery(searchQuery1,searchQueryGenre,searchQueryYear)">Envoyer</button>
        </fieldset>
    </div>
</template>

<script>  
import router from '../router';  
//TODO: changer la methode pour la bonne
import {getGenres} from '@/services/MovieAPI.js'
    export default {
        data(){
            return{
                movieGenre:Array,
                keyword: String,
                genre: String,
                year: String,
                searchQuery1:"",
                searchQueryGenre:"",
                searchQueryYear:""


            }
        },
        computed:{
            getMovieGenres(){
                console.log(this.movieGenre)
                return this.movieGenre
            }
        },
        methods: {  

            searchQuery(searchQuery,searchQueryGenre,searchQueryYear){
                if(searchQuery==null){
                    searchQuery=""
                }
                if(searchQueryGenre==null){
                    searchQueryGenre=""
                }
                if(searchQueryYear==null){
                    searchQueryYear=""
                }
                router.push({name: 'searchMovies', params: {genre: searchQueryGenre,year: searchQueryYear,keyword:searchQuery}})
            },
        },
        created(){
            //TODO: changer la methode pour la bonne
            const response=getGenres()
              this.movieGenre = response
              return this.movieGenre
        }
    }
</script>

<style scoped>

</style>