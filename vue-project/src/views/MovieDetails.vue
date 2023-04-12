<script setup>
    import {getSingleMovie} from '@/services/MovieAPI.js';
    import MovieDetailsVue from '../components/MovieDetails.vue';
    import SearchDetails from '../components/SearchDetails.vue'
</script>

<template>
    <div>
        <SearchDetails></SearchDetails>
    </div>
    <div>
        <MovieDetailsVue :movie="movie"></MovieDetailsVue>
    </div>
</template>

<script>
    export default {
    data() {
        return {
            movie: Object,
        };
    },
    props: {
        id: {
            type: Number,
        },
    },
    created() {
        getSingleMovie(this.id).then(response => this.movie = response);
    },
    components: { SearchDetails }
}
</script>

<style lang="css" scoped>

</style>