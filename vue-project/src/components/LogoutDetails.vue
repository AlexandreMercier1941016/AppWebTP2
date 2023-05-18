<template>
    <div>
        <p><a @click="onClickAction()">{{this.showLoggedInText()}}</a></p>
        <p><a @click="updateOrCreateUser()">{{this.showAccountUpdateInText()}}</a></p>
    </div>
</template>

<script>

    import { useUserStore } from '../store/userStore.js';
    import{logoutUser}from '@/services/MovieAPI.js'
    export default {
        data(){
            LoggedIn:String
        },
        setup(){
           const store= useUserStore()
           return { store }
        },
        methods:{
            showLoggedInText(){
                if(this.isLoggedIn()){
                    return "se déconnecter";
                }else{
                    return "se connecter"
                }
            },
            showAccountUpdateInText(){
                if(this.isLoggedIn()){
                    return "Modifier le compte";
                }else{
                    return "s'inscire"
                }
            },

            isLoggedIn(){
                if(this.store.getToken!="user"){
                    return true
                }else{
                    return false;
                }
            },
            async onClickAction(){
                let log=this.isLoggedIn()
                if(log){
                     let value=await logoutUser(this.store.getToken)
                     if(value==204){
                        this.store.setToken(null)
                        this.store.setName(null)
                     }
                }else{
                    this.$router.push({name:'login'})
                }
            },
            updateOrCreateUser(){
                this.$router.push({name:'account'}) 
            }
        }
    }
</script>

<style scoped>

</style>