<script setup>
import { useUserStore } from '../store/userStore.js';
</script>
<template>
    <div>
        <div v-if="!disable">
        <form id="rendered-form">
            <div class="rendered-form">
                <div class="formbuilder-text form-group field-username">
                    <label for="username" class="formbuilder-text-label">Nom d'utilisateur
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input v-model="username" type="email" class="form-control" name="username" maxlength="50" id="username" required="required" aria-required="true">
                </div>
                <div class="formbuilder-text form-group field-password">
                    <label for="password" class="formbuilder-text-label">Mot de passe
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input v-model="password" type="password" class="form-control" name="password" maxlength="50" id="password" required="required" aria-required="true">
                </div>
                <div class="formbuilder-button form-group field-button-1683049578105-0">
                    <button @click="getTokenFromLogin(username,password)" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">Se connecter
                        <br>
                    </button>
                </div>
            </div>
        </form>
        </div>
        {{errorMessage}}
    </div>
</template>

<script>
    import{getLoginToken}from '@/services/MovieAPI.js'
    import router from '../router';
    const store=useUserStore();
    export default {
        data(){
            return{
            errorMessage:""
            ,disable:false
            }
        }
        ,methods: {
            async getTokenFromLogin(username,password){
                let token= await getLoginToken(username,password)
                if(token==null||token==''){
                    this.errorMessage="l'utilisateur ou le mot de passe est invalide"
                    console.log("erreur lancé")
                }else{
                    store.setToken(token);
                    store.setName(username);
                    this.errorMessage="Connexion effectué avec succès!"
                    this.disable=true;
                    setTimeout(() => {  router.push({path:'movies'}); }, 4000);
                }
            }
        }
    }
</script>

<style scoped>

</style>