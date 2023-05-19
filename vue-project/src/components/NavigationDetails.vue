<template>
    <div>
        <p><a @click="onClickAction()">{{userText}}</a></p>
        <p><a @click="updateOrCreateUser()">{{this.accountStatus}}</a></p>
        <p><a @click="goHomeButton()">home</a></p>
    </div>
</template>

<script>

    import { useUserStore } from '../store/userStore.js';
    
    import {getUserInfo} from '../services/MovieAPI';
    import{logoutUser}from '@/services/MovieAPI.js'
    export default {
        data(){
            return{
                user:Object,
                userText:"se connecter",
                accountStatus:"S'inscrire"
            }
        },
        setup(){
           const store= useUserStore()
           return { store }
        },
        methods:{
            async showLoggedInText(){
                let data=await this.isLoggedIn()
                if(data){
                    this.userText= "se deconnecter"
                }else{
                    this.userText= "se connecter"
                }
            },
            showAccountUpdateInText(){
                if(this.isLoggedIn()){
                    this.accountStatus= "Modifier le compte";
                }else{
                    this.accountStatus= "S'inscrire"
                }
            },
            goHomeButton(){
                this.showAccountUpdateInText()
                this.showLoggedInText()
                this.$router.push({name:'home'})
            },

            async isLoggedIn(){
                    const user = await getUserInfo(this.store.getToken)
                    if(user.message=="Unauthenticated.")
                    {
                        return false;
                    }
                    else{ return true}
            },
            async onClickAction(){
                if(this.isLoggedIn()){
                    let value=await logoutUser(this.store.getToken)
                    this.showLoggedInText()
                    if(value!=204){
                        this.$router.push({name:'login'})
                    }
                }else{
                    this.$router.push({name:'login'})
                }
                this.showAccountUpdateInText()
                this.showLoggedInText()
            },
            updateOrCreateUser(){
                this.showAccountUpdateInText()
                this.showLoggedInText()
                this.$router.push({name:'account'}) 
            }
        },mounted(){
            this.showAccountUpdateInText()
            this.showLoggedInText()
        }
    }
</script>

<style scoped>

</style>