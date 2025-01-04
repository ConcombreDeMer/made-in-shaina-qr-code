<template>

     <div class="personne-form">

         <div class="pack">
             <FloatingLabelInput v-model="formData.firstName" label="Prénom" required />
             <FloatingLabelInput v-model="formData.lastName" label="Nom" required />
         </div>

         <div class="pack">
             <FloatingLabelInput v-model="formData.email" label="Email" type="email" required />
             <FloatingLabelInput v-model="formData.phone" label="Téléphone" type="tel" required />
         </div>

     </div>


</template>

<script>

import FloatingLabelInput from './FloatingLabelInput.vue';

export default{
    components: {
        FloatingLabelInput,
    },
    data(){
        return {
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
        };
    },
}


</script>


<style scoped>

.pack {
  display: flex;
  justify-content: space-between;
}

</style>