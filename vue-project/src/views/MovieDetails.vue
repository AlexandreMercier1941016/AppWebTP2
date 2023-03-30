<script setup>
    import {getSingleMovie} from '@/services/MovieAPI.js';
</script>
<template>
    <div v-if="movie">
        <h2>{{movie.original_title}}</h2>
        <img :src="movie.backdrop_path" width="200" style="float:right" />
        <h3>{{movie.homepage}}</h3>
        <p>Ratings: {{movie.vote_average}}</p>
        <p>Length: {{movie.runtime}}</p>
        <p>Released Date: {{movie.discontinued}}</p>
        <p>Official Site: {{movie.homepage }}</p>
    </div>
</template>

<script>
//67e6614f0a5371f8047de1bf746b514f
    export default {
        data() {
            return {
                movie: Object,
            }
        },
        props: {
            id: {
                type: Number,
            },
        },
        mounted() {
            getSingleMovie().then(response => this.movie = response);
        },
    }
</script>

<style lang="scss" scoped>
</style>