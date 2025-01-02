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
