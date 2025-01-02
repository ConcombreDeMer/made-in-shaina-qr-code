<template>
    <div>
      <form @submit.prevent="generateQRCode">
        <label>
          Nom :
          <input v-model="formData.name" type="text" required />
        </label>
        <label>
          Email :
          <input v-model="formData.email" type="email" required />
        </label>
        <label>
          Message :
          <textarea v-model="formData.message" required></textarea>
        </label>
        <button type="submit">Générer QR Code</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      generateQRCode() {
        this.$emit('form-submitted', this.formData);
      },
    },
  };
  </script>
  