<template>
  <div id="app">
    <FormComponent @form-submitted="handleFormSubmitted" />
    <QRCodeComponent v-if="formData" :formData="formData" />
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import QRCodeComponent from './components/QRCodeComponent.vue';

export default {
  components: {
    FormComponent,
    QRCodeComponent,
  },
  data() {
    return {
      formData: null,
    };
  },
  methods: {
    handleFormSubmitted(data) {
      this.formData = data;
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  font: 16px 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
