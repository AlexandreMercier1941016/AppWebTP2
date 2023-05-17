<template>
    <div>
        {{ checkIfUserConnectedOrNot() }}
            <form id="rendered-form">
                <div v-if="enable">
                    <div class="rendered-form">
                        <div class="formbuilder-text form-group field-username">
                            <label for="username" class="formbuilder-text-label">Nom Utilisateur
                                <br>
                                <span class="formbuilder-required">*</span>
                            </label>
                            
                            <input v-model="nomUtilisateur" type="email" class="form-control" name="username" maxlength="50" id="username" required="required" aria-required="true" placeholder="enter email here" >
                        </div>
                        <div v-if="!isLoggedIn" >
                            <div class="formbuilder-text form-group field-password">
                                <label for="password" class="formbuilder-text-label">mot de passe
                                    <br>
                                    <span class="formbuilder-required">*</span>
                                </label>
                                <input v-model="password" type="password" class="form-control" name="password" maxlength="50" id="password" required="required" aria-required="true">
                            </div>
                            <div class="formbuilder-text form-group field-passwordConfirm">
                                <label for="passwordConfirm" class="formbuilder-text-label">Confirmation de Mot De Passe 
                                    <br>
                                    <span class="formbuilder-required">*</span>
                                </label>
                                <input v-model="confirmPassword" type="password" class="form-control" name="passwordConfirm" maxlength="50" id="passwordConfirm" required="required" aria-required="true">
                            </div>
                        </div>
                        <div class="formbuilder-text form-group field-name">
                            <label for="name" class="formbuilder-text-label">Nom 
                                <br>
                                <span class="formbuilder-required">*</span>
                            </label>
                            <input v-model="Nom" type="text" class="form-control" name="name" maxlength="50" id="name" required="required" aria-required="true">
                        </div>
                        <div class="formbuilder-text form-group field-surname">
                            <label for="surname" class="formbuilder-text-label">Prenom 
                                <br>
                                <span class="formbuilder-required">*</span>
                            </label>
                            <input v-model="Prenom" type="text" class="form-control" name="surname" maxlength="50" id="surname" required="required" aria-required="true">
                        </div>
                        <div class="formbuilder-button form-group field-button-1683049578105-0">
                            <button @click="sendUser()" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">{{ isUserConnected() }}
                                <br>
                            </button>
                        </div>
                        <div v-if="isLoggedIn">
                            <div class="formbuilder-button form-group field-button-1683049578105-0">
                                <button @click="updatePassword()" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">Modifier le mot de passe
                                    <br>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--form pour changer le mot de passe-->
                <div v-if="changePassword">
                    <div class="formbuilder-text form-group field-password">
                        <label for="password" class="formbuilder-text-label">mot de passe
                            <br>
                            <span class="formbuilder-required">*</span>
                        </label>
                        <input v-model="password" type="password" class="form-control" name="password" maxlength="50" id="password" required="required" aria-required="true">
                    </div>
                    <div class="formbuilder-text form-group field-passwordConfirm">
                        <label for="passwordConfirm" class="formbuilder-text-label">Confirmation de Mot De Passe 
                            <br>
                            <span class="formbuilder-required">*</span>
                        </label>
                        <input v-model="confirmPassword" type="password" class="form-control" name="passwordConfirm" maxlength="50" id="passwordConfirm" required="required" aria-required="true">
                    </div> 
                    <div class="formbuilder-button form-group field-button-1683049578105-0">
                        <button @click="sendUser()" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">envoyer
                            <br>
                        </button>
                    </div>
                    <div class="formbuilder-button form-group field-button-1683049578105-0">
                        <button @click="updatePassword()" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">Modifier profil
                            <br>
                        </button>
                    </div>
                </div>
            </form>
        {{ errorMessage }}
    </div>
</template>

<script>
    import { useUserStore } from '../store/userStore.js';
    import{getUserInfo}from '@/services/MovieAPI.js'
    import{createUser}from '@/services/MovieAPI.js'
    import{updateCurrentUser}from '@/services/MovieAPI.js'
    import{updateCurrentUserPassword}from '@/services/MovieAPI.js'
    //missing import for update password
    export default {
        data(){
            return{
                nomUtilisateur:"",
                Nom:"",
                Prenom:"",
                password:"",
                confirmPassword:"",
                errorMessage:"",
                isLoggedIn:false,
                changePassword:false,
                enable:true
            }

        },setup(){
           
            const store= useUserStore()
            return { store }

        },methods:{
            async checkIfUserConnectedOrNot(){
                try {
                    const user= await getUserInfo(this.store.getToken)
                    this.isLoggedIn=true;

                } catch (error) {
                    console.log("erreur dans le create Account detail")
                }
                
            },
            isUserConnected(){
                if(this.isLoggedIn){
                    return "Modifier"
                }else{
                    return "S'inscrire"
                }
            },
            sendUser(){
                try {
                    this.validateFormInput()
                    if(this.isLoggedIn){
                        //modif here
                        updateCurrentUser(this.nomUtilisateur,this.Nom,this.Prenom,this.store.getToken)
                        this.errorMessage="utilisateur mis a jour !"
                    }else if(this.changePassword){
                        // update password here
                        if(this.password==this.confirmPassword){
                            updateCurrentUserPassword(this.password,this.store.getToken)
                        }
                        else{
                            this.errorMessage="les mots de passe ne sont pas pareil"
                        }
                    }
                    else{
                        //add here
                        createUser(this.nomUtilisateur,this.password,this.Prenom,this.Nom)
                        this.errorMessage="utilisateur créé !"
                        
                    }
                    this.enable=false;
                } catch (error) {
                    this.errorMessage=error
                }
            },
            validateFormInput(){
                if(this.nomUtilisateur.length>50||this.password.length>50||this.confirmPassword.length>50||this.Nom.length>50||
                    this.Prenom.length>50){
                        throw new Error("un des champs est plus grand que 50 caractères")
                    }
                if(this.password!=this.confirmPassword){
                    throw new Error("les deux mots de passe ne correspondes pas")
                }

            },
            updatePassword(){
                if(this.changePassword){
                    this.enable=true;
                this.changePassword=false;
                }else{
                    this.enable=false;
                    this.changePassword=true;
                }
            }
        }
        
    }
</script>

<style scoped>

</style>