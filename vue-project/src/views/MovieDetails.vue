<script setup>
    import {getSingleMovie} from '@/services/MovieAPI.js';
import MovieDetailsVue from '../components/MovieDetails.vue';
    //<MovieDetailsVue :movie="movie"></MovieDetailsVue>
</script>

<script>
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
        created() {
            getSingleMovie(this.id).then(response => this.movie = response);
        },
    }
}
</script>

<style lang="scss" scoped>
</style>