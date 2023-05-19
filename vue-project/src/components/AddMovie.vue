<template>
    <div>
      <h1>Ajouter un film</h1>
      <form @submit.prevent="submitForm">
        <input v-model="movie.title" type="text" placeholder="Titre du film" required />
        <input v-model="movie.year" type="text" placeholder="Année de production" :maxlength="4" required />
        <input v-model="movie.duration" type="text" placeholder="Durée en minutes" required />
        <label for="rating">Classement :</label>
    <select v-model="movie.rating" id="rating" class="form-control">
      <option v-for="option in ratingOptions" :key="option" :value="option">{{ option }}</option>
    </select>
    <input v-model="actors" type="text" placeholder="Acteurs avec une virgule entre" required />
        <textarea v-model="movie.description" placeholder="Description du film" required></textarea>
        <input v-model="movie.language_id" type="text" placeholder="Id de la langue" required />

        <button type="submit">Ajouter</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import auth from '../services/auth.js';
  import { postFilm } from '../services/MovieAPI.js';
  
  export default {
    data() {
  return {
    movie: {
      title: '',
      year: '',
      duration: '',
      rating: '',
      description: '',
      language_id: '',
      actors: ''
    },
    ratingOptions: ["G", "PG", "PG-13", "R", "NC-17"],
    message: ''
  };
},
    methods: {
        async submitForm() {
    try {
        let actorsTab = this.actors.split(',');
        console.log("Token:" + auth.getToken());
        console.log("Actors:");
        console.log(actorsTab);
        const response = await postFilm(this.movie.title,this.movie.year,this.movie.duration,this.movie.description,this.movie.rating,this.movie.language_id,actorsTab,auth.getToken());
        if (response && response.data && response.data.success) {
            this.message = 'Le film a été ajouté correctement.';
            this.movie = {
                title: '',
                year: '',
                duration: '',
                rating: '',
                description: '',
                language_id: '',
                actors: ''
            };
        } else {
            this.message = "'Une erreur est survenue pendant l'ajout du film.'";
        }
    } catch (error) {
        console.error(error);
        this.message = "'Une erreur est survenue pendant l'ajout du film.'";
    }
}

}
  };
  </script>