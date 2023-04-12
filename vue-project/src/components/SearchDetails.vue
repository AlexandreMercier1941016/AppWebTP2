<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
            <span>Recherche par nom: <input v-model="searchQuery1" /></span>
            <span>Recherche par genre: <input v-model="searchQueryGenre" /></span>
            <span>Recherche par année: <input v-model="searchQueryYear" /></span>
            <button @click="searchQuery(searchQuery1,searchQueryGenre,searchQueryYear)">Envoyer</button>
        </fieldset>
    </div>
</template>

<script>    
    export default {
        data(){
            return{
                keyword: String,
                genre: String,
                year: String
            }
        },
        methods: {  

            searchQuery(searchQuery,searchQueryGenre,searchQueryYear){
            this.$router.push({name: 'searchMovies', params: {genre: searchQueryGenre,year: searchQueryYear,keyword:searchQuery}})
          }
        }
    }
</script>

<style scoped>

</style>