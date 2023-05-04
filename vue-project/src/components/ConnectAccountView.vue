<template>
    <div>
        <form id="rendered-form">
            <div class="rendered-form">
                <div class="formbuilder-text form-group field-username">
                    <label for="username" class="formbuilder-text-label">Nom d'utilisateur
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input type="email" class="form-control" name="username" maxlength="50" id="username" required="required" aria-required="true">
                </div>
                <div class="formbuilder-text form-group field-password">
                    <label for="password" class="formbuilder-text-label">Mot de passe
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input type="password" class="form-control" name="password" maxlength="50" id="password" required="required" aria-required="true">
                </div>
                <div class="formbuilder-button form-group field-button-1683049578105-0">
                    <button @click="getTokenFromLogin()" type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">Se connecter
                        <br>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import{getLoginToken}from '@/services/MovieAPI.js'
    export default {
        data(){
             username:document.getElementById("username");
             password:document.getElementById("password");
        },
        methods: {
            getTokenFromLogin() {
                getLoginToken(username,password)
            }
        }

    }
</script>

<style scoped>

</style>