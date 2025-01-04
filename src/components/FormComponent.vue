<template>
  <div class="all">

    <h1>Créez votre porte clé</h1>

    <form @submit.prevent="handleSubmit">

      <div class="animal">
        <h2>Animal</h2>
        <FloatingLabelInput v-model="formData.name" label="Nom" required />
      </div>

      <div class="proprietaire">
        <h2>Propriétaire</h2>
        <PersonneForm v-model="formData" />
      </div>

      <div class="personnes">
        <h2>Personnes à contacter</h2>
        <div class="add-personne" @click="addPersonne()">
          <p>Ajouter une personne</p>
          <p>+</p>
        </div>
      </div>

      <div class="list-personnes">

        <div v-for="personne in listePersonne" :key="personne.id">
          <h3>Personne {{ personne }}</h3>
          <PersonneForm v-model="formData" />
        </div>

      </div>

      <div class="veterinaire">
        <h2>Vétérinaire</h2>
        <div class="pack">
          <FloatingLabelInput v-model="formData.vetName" label="Nom" required />
          <FloatingLabelInput v-model="formData.vetEmail" label="Email" type="email" required />
        </div>
        <div class="pack">
          <FloatingLabelInput v-model="formData.vetPhone" label="Téléphone" type="tel" required />
          <FloatingLabelInput v-model="formData.vetAddress" label="Adresse" required />
        </div>
      </div>

      <button class="submit" type="submit">Créer mon porte clé</button>
    </form>
  </div>
</template>

<script>
import FloatingLabelInput from './FloatingLabelInput.vue';
import PersonneForm from './PersonneForm.vue';

export default {

  components: {
    FloatingLabelInput,
    PersonneForm
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      listePersonne : 0,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('form-submitted', this.formData);
    },

    // quand je clique sur le bouton ajouter une personne ca a ajoute une personne
    addPersonne() {
      this.listePersonne += 1;
    },



  },
};
</script>


<style scoped>



.add-personne {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 2vw;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
  margin: 1vh 0;
}


.all {
  width: 50vw;
  padding: 1vh 2vw;
}

h1 {
  font-size: 5vh;
}

h2 {
  font-size: 3vh;
  font-weight: lighter;
}


label {
  font-size: 2vh;
  font-weight: lighter;
  background-color: #EFEFEF;
  padding: 1vh 1vw;
  margin: 1vh 0;
  display: flex;
  align-items: center;
  width: 45%;
  border-radius: 10px;
}

label:hover {
  cursor: text;
}

input {
  padding: 1vh;
  border: none;
  border-radius: 5px;
  background-color: #EFEFEF;
  font-size: 2vh;
}

/* retirer le style de l'input quand on ecrit dedans */
input:focus {
  outline: none;
}

.pack {
  display: flex;
  justify-content: space-between;
}


.submit {
  background-color: #6F7B47;
  display: block;
  padding: 1vh 2vw;
  border: none;
  border-radius: 10px;
  margin-top: 2vh;
  font-size: 2vh;
  font-weight: lighter;
  color: white;
  margin-left: auto;
  margin-right: auto;
}

.submit:hover {
  background-color: #5F6B37;
  cursor: pointer;
  transition: 0.3s;
}
</style>
