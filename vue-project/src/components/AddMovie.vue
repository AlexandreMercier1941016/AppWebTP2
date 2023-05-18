<template>
    <div>
      <h1>Ajouter un film</h1>
      <form @submit.prevent="submitForm">
        <input v-model="movie.title" type="text" placeholder="Titre du film" required />
        <input v-model="movie.year" type="text" placeholder="Année de production" :maxlength="4" required />
        <input v-model="movie.duration" type="text" placeholder="Durée en minutes" required />
        <select v-model="movie.rating" required>
          <option v-for="rating in ratings" :key="rating" :value="rating">{{ rating }}</option>
        </select>
        <input v-model="movie.actors" type="text" placeholder="Acteurs" required />
        <textarea v-model="movie.description" placeholder="Description du film" required></textarea>
        <button type="submit">Ajouter</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import authService from '../services/authService';
  
  export default {
    data() {
      return {
        movie: {
          title: '',
          year: '',
          duration: '',
          rating: '',
          actors: '',
          description: ''
        },
        ratings: [],
        message: ''
      };
    },
    async created() {
      try {
        const response = await axios.get('http://your-api-url/api/ratings', { headers: authService.authHeader() });
        this.ratings = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://your-api-url/api/movies', this.movie, { headers: authService.authHeader() });
          if (response.data.success) {
            this.message = 'Film ajouté avec succès.';
            this.movie = { title: '', year: '', duration: '', rating: '', actors: '', description: '' };
          } else {
            this.message = "'Une erreur est survenue lors de l'ajout du film.'";
          }
        } catch (error) {
          console.error(error);
          this.message = "'Une erreur est survenue lors de l'ajout du film.'";
        }
      }
    }
  };
  </script>
  