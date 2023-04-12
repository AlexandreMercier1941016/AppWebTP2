<template>
    <header>
        <div>
            <fieldset class="filters">
                <span >Recherche par nom: <input v-model="searchQuery1"  /></span>
                <select v-model="searchQueryGenre">
                    <option v-for="genre in movieGenres" :key="genre.id">{{ genre.name }}</option>
                </select>
                <span>Recherche par année: <input v-model="searchQueryYear" /></span>
                <button @click="searchQuery(searchQuery1,searchQueryGenre,searchQueryYear)">Envoyer</button>
            </fieldset>
        </div>
    </header>
</template>

<script>  
import router from '../router';  
import {getGenres} from '@/services/MovieAPI.js'

    export default {
        data(){
            return{
                movieGenres:[],
            }
        },
        methods: {  
            async fetchMovieGenres() {
                    const response = await getGenres();
                    this.movieGenres = response.genres;
            },
            searchQuery(searchQuery,searchQueryGenre,searchQueryYear){
                if(searchQuery==null){
                    searchQuery=""
                }
                if(searchQueryGenre==null){
                    searchQueryGenre=""
                }
                var regex = "[0-9][0-9][0-9][0-9]";
                if(searchQueryYear==null || !searchQueryYear.match(regex)){
                    searchQueryYear=""
                }
                
                //Il faut F5 pour que la 2eme recherche s'effectue
                router.push({name: 'searchMovies', query: {keywords: searchQuery,year: searchQueryYear,genre: searchQueryGenre}});
            },
        },
        created(){
            this.fetchMovieGenres();
        }
    }
</script>

<style scoped>

</style>