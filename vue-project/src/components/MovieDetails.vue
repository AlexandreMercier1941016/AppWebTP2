<template>
    <div v-if="movie">
        <h2>{{movie.original_title}}</h2>
        <img :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" width="200" style="float:right">
        <h3>{{movie.overview}}</h3>
        <p>Ratings: {{movie.vote_average}}</p>
        <p>Length: {{movie.runtime}} minutes</p>
        <p>Release Date: {{movie.release_date}}</p>
        <p>Official Site: {{movie.homepage }}</p>
        <form>
            <fieldset>
                <span class="star-cb-group">
                <input type="radio" id="rating-5" name="rating" value="5" />
                <label for="rating-5">5</label>
                <input type="radio" id="rating-4" name="rating" value="4" checked="checked" />
                <label for="rating-4">4</label>
                <input type="radio" id="rating-3" name="rating" value="3" />
                <label for="rating-3">3</label>
                <input type="radio" id="rating-2" name="rating" value="2" />
                <label for="rating-2">2</label>
                <input type="radio" id="rating-1" name="rating" value="1" />
                <label for="rating-1">1</label>
                <input type="radio" id="rating-0" name="rating" value="0" class="star-cb-clear" />
                <label for="rating-0">0</label>
                </span>
                <button @click="postAppreciation(movie.id,getSelectedRadioButton())">
                    Évaluer: &gt;
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import { postAppreciation } from '../services/MovieAPI';

    export default {
        props: {
            movie: {
                type: Object,
            },
        },
    };
    function getSelectedRadioButton() {
        var radios = document.getElementsByName('rating');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    }
</script>

<style lang="css" scoped>
.star-cb-group {
  /* remove inline-block whitespace */
  font-size: 0;
  /* flip the order so we can use the + and ~ combinators */
  unicode-bidi: bidi-override;
  direction: rtl;
  /* the hidden clearer */
}
.star-cb-group * {
  font-size: 1rem;
}
.star-cb-group > input {
  display: none;
}
.star-cb-group > input + label {
  /* only enough room for the star */
  display: inline-block;
  overflow: hidden;
  text-indent: 9999px;
  width: 1em;
  white-space: nowrap;
  cursor: pointer;
}
.star-cb-group > input + label:before {
  display: inline-block;
  text-indent: -9999px;
  content: "☆";
  color: #888;
}
.star-cb-group > input:checked ~ label:before, .star-cb-group > input + label:hover ~ label:before, .star-cb-group > input + label:hover:before {
  content: "★";
  color: #e52;
  text-shadow: 0 0 1px #333;
}
.star-cb-group > .star-cb-clear + label {
  text-indent: -9999px;
  width: .5em;
  margin-left: -.5em;
}
.star-cb-group > .star-cb-clear + label:before {
  width: .5em;
}
.star-cb-group:hover > input + label:before {
  content: "☆";
  color: #888;
  text-shadow: none;
}
.star-cb-group:hover > input + label:hover ~ label:before, .star-cb-group:hover > input + label:hover:before {
  content: "★";
  color: #e52;
  text-shadow: 0 0 1px #333;
}
</style>