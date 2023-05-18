<template>
  <h2>{{ title }}</h2>
    <div v-if="movie">
        <h2>{{movie.original_title}}</h2>
        <!--img si poster path-->
        <img  v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" width="200" style="float:right">
        <!--img si il n'y a pas de poster_path-->
        <img v-else :src="'https://placehold.co/400x400'" style="float:right">
        <h3>{{movie.overview}}</h3>
        <p>Ratings: {{movie.vote_average}}</p>
        <p>Length: {{movie.runtime}} minutes</p>
        <p>Release Date: {{movie.release_date}}</p>
        <p>Official Site: {{movie.homepage }}</p>
        <div v-if="isAdmin">
          <p>retirer le film</p>
          <button @click="firstRemoveButton()">retirer le film</button>
          <div v-if="firstRemoveButtonPressed">
            <p>êtes-vous sur de vouloir retirer le film ?</p>
            <button @click="yesButtonRemoveFilm()">oui</button>
            <button @click="noButtonRemoveFilm()">non</button>
          </div>
        </div>
        <div v-if="isConnected">
          <h2>Commentaire :</h2>
          <form>
            <div class="formbuilder-text form-group field-passwordConfirm">
                <label for="passwordConfirm" class="formbuilder-text-label">Laisser un commentaire (facultatif)
                    <br>
                    <span class="formbuilder-required">*</span>
                </label>
                <input  v-model="commentaire" type="text" class="form-control" name="commentaire" maxlength="255" id="commentaire" aria-required="true">
            </div> 
            <fieldset class="rate">
              <input v-model="starValue" type="radio" id="rating10" name="review" :value="'5'" /><label for="rating10" title="5 stars"></label>
              <input v-model="starValue" type="radio" id="rating9" name="review" :value="'4.5'" /><label class="half" for="rating9" title="4 1/2 stars"></label>
              <input v-model="starValue" type="radio" id="rating8" name="review" :value="'4'" /><label for="rating8" title="4 stars"></label>
              <input v-model="starValue" type="radio" id="rating7" name="review" :value="'3.5'" /><label class="half" for="rating7" title="3 1/2 stars"></label>
              <input v-model="starValue" type="radio" id="rating6" name="review" :value="'3'" /><label for="rating6" title="3 stars"></label>
              <input v-model="starValue" type="radio" id="rating5" name="review" :value="'2.5'" /><label class="half" for="rating5" title="2 1/2 stars"></label>
              <input v-model="starValue" type="radio" id="rating4" name="review" :value="'2'" /><label for="rating4" title="2 stars"></label>
              <input v-model="starValue" type="radio" id="rating3" name="review" :value="'1.5'" /><label class="half" for="rating3" title="1 1/2 stars"></label>
              <input v-model="starValue" type="radio" id="rating2" name="review" :value="'1'" /><label for="rating2" title="1 star"></label>
              <input v-model="starValue" type="radio" id="rating1" name="review" :value="'0.5'" /><label class="half" for="rating1" title="1/2 star"></label>
          </fieldset>
          <button @click="submitReview()">{{commentButtonValue}}</button>
        </form>
        </div>
        <div>
          <h3>Commentaires</h3>
          <div v-for="comment in getAllMovieComment">
            <p>commentaire : {{ comment.commentaire }}</p>
            <p>nom : {{ comment.user_name}}</p>
            <p>rating : {{ comment.date }}</p>
          </div>
        </div>
    </div>
</template>

<script>
import { postAppreciation } from '../services/MovieAPI';
import {getUserInfo} from '../services/MovieAPI';
import { useUserStore } from '../store/userStore.js';
import {postMovieCritic}from '../services/MovieAPI';
import {removeMovieFromBd}from '../services/MovieAPI';
    export default {
        props: {
            movie: {
                type: Object,
            },
        },
        data() {
            return {
                title: "Détails du film",
                isAdmin:false,
                firstRemoveButtonPressed:false,
                isConnected:false,
                currentComment:Object,
                user:Object,
                commentaire:"",
                starValue:"",
                commentButtonValue:"envoyer"
            }
        },
        setup(){
           const store= useUserStore()
           return { store }
        },
        methods: {
          async submitAppreciation() {
            await postAppreciation(this.movie.id, this.getSelectedRadioButton());
          },
          async isUserAdmin(){
            const user= await getUserInfo(this.store.getToken)
            if(user.role_id==1){
              this.isAdmin=true
            }else{
              this.isAdmin=false
            }
          },
          firstRemoveButton(){
            this.firstRemoveButtonPressed=true;
          },
          async yesButtonRemoveFilm(){
            removeMovieFromBd(this.store.token,this.$route.query.id)
            this.$router.push({name:"home"})
            //method to remove movie here
          },
          noButtonRemoveFilm(){
            this.firstRemoveButtonPressed=false;
          },
          getAllMovieComment(){
            return [...this.movie.critiques].sort((a,b) => {
              let modifier = -1;
              if(a[this.date] < b[this.date]) return -1 * modifier;
              if(a[this.date] > b[this.date]) return 1 * modifier;
              return 0;
            })
          },
          async checkUserConnected(){
            const user= await getUserInfo(this.store.getToken)
            if(user.role_id==1 ||user.role_id==2){
              this.user=user
              this.isConnected=true
            }else{
              this.isConnected=false
            }
          },
          async submitReview(){
            const review= await postMovieCritic(this.store.token,this.user.id,this.user.email,parseFloat(this.starValue),this.commentaire,this.$route.query.id())
          },
          getCurrentComment(){
            for(co in getAllMovieComment()){
              if(co.user_id==this.user.id){
                this.commentButtonValue="modifier"
                this.commentaire=co.commentaire
                this.starValue=co.score
                break
              }
            }
            //get our review here
          }


      },
      beforeMount(){
        this.isUserAdmin()
        this.checkUserConnected()
      }
};
</script>

<style lang="css" scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
/* Source : https://codeconvey.com/css-star-rating-radio-buttons/ */
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

/* Ratings widget */
.rate {
    display: inline-block;
    border: 0;
}
/* Hide radio */
.rate > input {
    display: none;
}
/* Order correctly by floating highest to the right */
.rate > label {
    float: right;
}
/* The star of the show */
.rate > label:before {
    display: inline-block;
    font-size: 2rem;
    padding: .3rem .2rem;
    margin: 0;
    cursor: pointer;
    font-family: FontAwesome;
    content: "\f005 "; /* full star */
}

/* Half star trick */
.rate .half:before {
    content: "\f089 "; /* half star no outline */
    position: absolute;
    padding-right: 0;
}
/* Click + hover color */
input:checked ~ label, /* color current and previous stars on checked */
label:hover, label:hover ~ label { color: #73B100;  } /* color previous stars on hover */

/* Hover highlights */
input:checked + label:hover, input:checked ~ label:hover, /* highlight current and previous stars */
input:checked ~ label:hover ~ label, /* highlight previous selected stars for new rating */
label:hover ~ input:checked ~ label /* highlight previous selected stars */ { color: #A6E72D;  } 
</style>