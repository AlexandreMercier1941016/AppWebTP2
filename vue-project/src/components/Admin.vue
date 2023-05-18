<template>
    <div v-if="isAdmin">
      <h1>Ajout d'un film</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="film.title" :counter="10" :rules="titleRules" label="Titre du film" required></v-text-field>
        
        <input type="file" @change="onFileChange">
  
        <v-text-field v-model="film.year" :rules="yearRules" label="Année de production" required></v-text-field>
  
        <v-text-field v-model="film.duration" :rules="durationRules" label="Durée en minutes" required></v-text-field>
  
        <v-select v-model="film.rating" :items="ratings" :rules="ratingRules" label="Classement" required></v-select>
  
        <v-text-field v-model="film.actors" :rules="actorRules" label="Acteurs" required></v-text-field>
  
        <v-textarea v-model="film.description" :rules="descriptionRules" label="Description du film" required></v-textarea>
  
        <v-btn :disabled="!valid" @click="submit">Ajouter</v-btn>
      </v-form>
    </div>
    <div v-else>
      <h1>Vous n'avez pas les droits d'accès à cette page.</h1>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { postFilm } from "@/services/MovieAPI";
  
  export default {
    name: "Admin",
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const film = ref({
        title: "",
        image: "",
        year: "",
        duration: "",
        rating: "",
        actors: "",
        description: ""
      });
  
      const isAdmin = computed(() => store.state.isAdmin);
  
      const valid = ref(false);
      const titleRules = [(v) => !!v || "Titre est requis"];
      const yearRules = [(v) => !!v || "Année est requis"];
      const durationRules = [(v) => !!v || "Durée est requis"];
      const ratingRules = [(v) => !!v || "Classement est requis"];
      const actorRules = [(v) => !!v || "Acteurs est requis"];
      const descriptionRules = [(v) => !!v || "Description est requis"];
  
      function onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        createImage(files[0]);
      }
  
      function createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          film.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
  
      async function submit() {
        try {
          if (!valid.value) {
            return;
          }
          const response = await postFilm(film.value);
          if (response.status === 200) {
            router.push("/"); // or some kind of confirmation page
          } else {
            // handle error
          }
        } catch (error) {
          console.error(error);
          // handle error
        }
      }
  
      return {
        isAdmin,
        film,
        valid,
        titleRules,
        yearRules,
        durationRules,
        ratingRules,
        actorRules,
        descriptionRules,
        onFileChange,
        submit
      };
    },
  };
  </script>
  