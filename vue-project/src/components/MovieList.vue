<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
            Trier par: 
            <button @click="sort('vote_average')">Nom</button>
            <button @click="sort('release_date')">Prix</button>
            <button @click="sort('modifiedDate')">Date</button>
            <span>Recherche par nom: <input v-model="filterName" /></span>
        </fieldset>
        <button @click="prevPage" :disabled="pageNumber===1">
          &lt; Précédent
        </button>
        Page {{ pageNumber }}
        <button @click="nextPage" :disabled="pageNumber >= pageCount">
          Suivant &gt;
        </button>
        <ul class="movies">
            <li v-for="movie in sortedFilteredPaginatedMovies" :key="movie.id"
                v-bind:class='{ discontinued: movie.discontinued, selected: selectedMovie === movie }'
                :title="JSON.stringify(movies)"
                @click="selectedMovie = movie">
                <span class="name">{{ movie.name }}</span>
                <span class="description">{{ movie.description }}</span>
                <span class="price">{{ movie.price }}</span>
            </li>
        </ul>
        <movie-details :selectedMovie="selectedMovie"></movie-details>
    </div>
</template>

<script>
    import MovieDetails from '@/components/MovieDetails.vue';

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
          filteredmovies() {
            let filter = new RegExp(this.filterName, 'i')
            return this.movies.filter(el => el.name.match(filter))
          },
          sortedFilteredmovies() {
            return [...this.filteredmovies].sort((a,b) => {
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

            return this.sortedFilteredmovies.slice(start, end);
          },
          pageCount() {
            let l = this.filteredmovies.length,
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
          }
        }
    }
</script>

<style lang="css" scoped>
.filters {
    padding: 10px
  }
  .movies {
    margin: 0;
    list-style-type: none;
    padding: 0;
  }
  .movies li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.8em;
    border-radius: 4px;
  }
  .movies li:hover {
    color: #607D8B;
    background-color: yellow;
    left: .1em;
  } 
  .movies li:hover .name,
  .movies li:hover .price {
    color: #607D8B;
    background-color: #FFD800;
    left: .1em;
  } 
  .movies li.selected {
    background-color: #0094FF;
    color: white;
  }
  .movies li.selected:hover {
    color: white;
  }
  .movies li.selected .name,
  .movies li.selected .price {
    background-color: #0026FF;
    color: white;
  }
  .movies .text {
    position: relative;
    top: -3px;
  }
  .movies .name {
    display: inline-block;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movies .price {
    float: right;
    width: 15%;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-left: .8em;
    border-radius: 0px 4px 4px 0px;
  }
  .movies .description {
    height: 1.8em;
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movies .discontinued, .movies .discontinued * {
    color: red !important;
  }
</style>