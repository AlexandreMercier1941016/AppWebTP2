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
                <div class="formbuilder-text form-group field-passwordConfirm">
                    <label for="passwordConfirm" class="formbuilder-text-label">Confirmation du mot de passe
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input type="password" class="form-control" name="passwordConfirm" maxlength="50" id="passwordConfirm" required="required" aria-required="true">
                </div>
                <div class="formbuilder-text form-group field-name">
                    <label for="name" class="formbuilder-text-label">Nom
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input type="text" class="form-control" name="name" maxlength="50" id="name" required="required" aria-required="true">
                </div>
                <div class="formbuilder-text form-group field-surname">
                    <label for="surname" class="formbuilder-text-label">Prénom
                        <br>
                        <span class="formbuilder-required">*</span>
                    </label>
                    <input type="text" class="form-control" name="surname" maxlength="50" id="surname" required="required" aria-required="true">
                </div>
                <div class="formbuilder-button form-group field-button-1683049578105-0">
                    <button type="button" class="btn-primary btn" name="button-1683049578105-0" style="primary" id="button-1683049578105-0">ENVOYER_OU_MODIFIER
                        <br>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>