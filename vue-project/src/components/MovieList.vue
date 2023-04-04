<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
            Trier par: 
            <button @click="sort('vote_average')">Vote</button>
            <button @click="sort('release_date')">Date De Sortie</button>
            <button @click="sort('modifiedDate')">Date de Modification</button>
            <span>Recherche par nom: <input v-model="filterName" /></span>
        </fieldset>
        <!--<button @click="prevPage" :disabled="pageNumber===1">
          &lt; Précédent
        </button>
        Page {{ pageNumber }}
        <button @click="nextPage" :disabled="pageNumber >= pageCount">-
          Suivant &gt;
        </button>-->
        <ul class="movies">
            <li v-for="movie in sortedFilteredPaginatedMovies" :key="movie.id"
                v-bind:class='{selected: selectedMovie === movie }'
                :title="JSON.stringify(movie)">
                <img :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" @click="onSelect(movie)">
                <span class="name">{{ movie.title }}</span>
                <span class="description">{{ movie.overview }}</span>
                <span class="release_date">{{ movie.release_date }}</span>
                <button @click="onSelect(movie)" :disabled="pageNumber >= pageCount">
                    consulterLeFilm &gt;
                </button>
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
                type: Array,
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
                title: "MovieList",
                selectedmovie: null,
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
            console.log(this.movies.results)
            let filter = new RegExp(this.filterName, 'i')
            return this.movies.results/*.filter(el => el.name.match(filter))*/
          },
          sortedfilteredMovies() {
            return [...this.filteredMovies].sort((a,b) => {
              let modifier = 1;
              if(this.sortDir === 'desc') modifier = -1;
              if(a[this.sortName] < b[this.sortName]) return -1 * modifier;
              if(a[this.sortName] > b[this.sortName]) return 1 * modifier;
              return 0;
            })
          },
          sortedFilteredPaginatedMovies() {
            const start = (this.pageNumber-1) * this.pageSize,
                  end = start + this.pageSize;

            return this.sortedfilteredMovies.slice(start, end);
          },
          pageCount() {
            let l = this.filteredMovies.length,
              s = this.pageSize;
            return Math.floor(l / s);
          }
        },
		watch: {
          // reset pagination when filtering
          filterName() {
            this.pageNumber = 1;
          },
          // reset pagination when sorting
          sortName() {
            this.pageNumber = 1;
          },
          sortDir() {
            this.pageNumber = 1;
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

</style>