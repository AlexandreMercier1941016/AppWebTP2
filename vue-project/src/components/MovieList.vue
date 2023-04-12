<template>
    <div>
        <h2>{{ title }}</h2>
        <ul class="movie-grid">
            <li v-for="movie in filteredMovies" :key="movie.id"
                :title="JSON.stringify(movie)">
                <img :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" @click="onSelect(movie)">
                <div class="movie-info">
                <span class="name">{{ movie.title }}</span>
                <span class="description">{{ movie.overview }}</span>
                <span class="release_date">{{ movie.release_date }}</span>
                <button @click="onSelect(movie)">
                    consulterLeFilm &gt;
                </button>
              </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import MovieDetails from '@/components/MovieDetails.vue';
    const imgURL="https://image.tmdb.org/t/p/w500"
    export default {
        props: {
            movies: {
                type: Object,
                default: () => []
            },
            pageSize: {
                type: Number,
                required: false,
                default: 10
            }
        },
        data() {
            return {
                title: "Liste de films",
                filterName: '',
                sortVoteAverage:'vote_average',
                sortDate: 'modifiedDate',
                sortDir: 'asc',
                pageNumber: 1,
            }
        },
        components: {
            MovieDetails,
        },
        computed: {
          filteredMovies() {
            return this.movies.results/*.filter(el => el.name.match(filter))*/
          }
        },
        methods: {  
          sort:function(s) {
            //if s == current sort, reverse order
            if(s === this.sortName) {
              this.sortDir = this.sortDir==='asc'?'desc':'asc';
            }
            this.sortName = s;
          },
          nextPage() {
            this.pageNumber++;
            this.selectedmovie = null;
          },
          prevPage() {
            this.pageNumber--;
            this.selectedmovie = null;
          },
          onSelect(movie){
            this.$router.push({name: 'movie', params: {id: movie.id}})
          }
        }
    }
</script>

<style lang="css" scoped>

.movie-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.movie-item {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
}

.movie-poster {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.movie-info {
  display: flex;
  flex-direction: column;
}
</style>