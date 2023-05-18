import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
    state: () => ({ token: useLocalStorage('pinia/auth/login','user'),name: useLocalStorage('pinia/auth/login','username') }),
    getters: {
        getName: state => {
            return state.name
        },
        getToken: state => {
            return state.token
        },

    },
    actions: {
    setToken (token) {
  // Pour générer un id unique, on prend l'id le plus grand des items et on lui ajoute 1. S'il n'y a pas de items, on commence à 1.
  // Cette façon de faire pour générer un id convient dans cet exemple, mais ce n'est pas la façon de faire si l'application communique avec par exemple, un API REST. Dans ce cas, il serait préférable de laisser le serveur générer l'id.
        this.token=token
    },
    setName (name) {
        // Pour générer un id unique, on prend l'id le plus grand des items et on lui ajoute 1. S'il n'y a pas de items, on commence à 1.
        // Cette façon de faire pour générer un id convient dans cet exemple, mais ce n'est pas la façon de faire si l'application communique avec par exemple, un API REST. Dans ce cas, il serait préférable de laisser le serveur générer l'id.
        this.name=name
    }
  }
})