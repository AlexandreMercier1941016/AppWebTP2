<template>
    <div v-if="movie">
        <h2>{{movie.original_title}}</h2>
        <img :src="movie.poster_path" width="200" style="float:right" />
        <h3>{{movie.overview}}</h3>
        <p>Ratings: {{movie.vote_average}}</p>
        <p>Length: {{movie.runtime}}</p>
        <p>Released Date: {{movie.release_date}}</p>
        <p>Official Site: {{movie.homepage }}</p>
    </div>
</template>

<script>
//67e6614f0a5371f8047de1bf746b514f
    export default {
        props: {
            movie: {
                type: Object,
                default: null
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>