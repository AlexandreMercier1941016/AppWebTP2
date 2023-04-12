<template>
    <div>
        <fieldset class="filters">
            <span >Recherche par nom: <input v-model="searchQuery1"  /></span>
            <!--TODO: mettre une liste deroulante avec foreach de movieGenre-->
            <select v-model="searchQueryGenre">
                <option v-for="genre in movieGenres" :key="genre.id">{{ genre.name }}</option>
            </select>
            <span>Recherche par année: <input v-model="searchQueryYear" /></span>
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
                movieGenres:[],
            }
        },
        methods: {  
            async fetchMovieGenres() {
                try {
                    const response = await getGenres();
                    this.movieGenres = response.genres;
                    console.log(this.movieGenres);
                } catch (error) {
                    console.error(error);
                }
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
                router.push({name: 'searchMovies', query: {keywords: searchQuery,year: searchQueryYear,genre: searchQueryGenre}})
            },
        },
        created(){
            //TODO: changer la methode pour la bonne
            this.fetchMovieGenres();
        }
    }
</script>
<style scoped>

</style>