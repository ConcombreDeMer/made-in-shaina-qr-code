<template>
    <div v-if="qrCodeDataUrl">
      <img :src="qrCodeDataUrl" alt="QR Code" />
      <p>Téléchargez le PDF ci-dessous :</p>
      <a :href="pdfUrl" download="info.pdf">Télécharger le PDF</a>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  import jsPDF from 'jspdf';
  
  export default {
    props: ['formData'],
    data() {
      return {
        qrCodeDataUrl: '',
        pdfUrl: '',
      };
    },
    watch: {
      formData: {
        immediate: true,
        handler(newData) {
          if (newData) {
            this.generateQRCodeAndPdf(newData);
          }
        },
      },
    },
    methods: {
      async generateQRCodeAndPdf(data) {
        try {
          // Générer le QR Code
          const qrCodeData = JSON.stringify(data);
          this.qrCodeDataUrl = await QRCode.toDataURL(qrCodeData);
  
          // Générer le PDF
          const doc = new jsPDF();
          doc.text(`Nom : ${data.name}`, 10, 10);
          doc.text(`Email : ${data.email}`, 10, 20);
          doc.text(`Message : ${data.message}`, 10, 30);
  
          // Ajouter le QR Code au PDF
          const qrImage = await QRCode.toDataURL(qrCodeData);
          doc.addImage(qrImage, 'JPEG', 10, 40, 50, 50);
  
          // Sauvegarder le PDF comme Blob
          const pdfBlob = doc.output('blob');
          this.pdfUrl = URL.createObjectURL(pdfBlob);
        } catch (error) {
          console.error('Erreur lors de la génération:', error);
        }
      },
    },
  };
  </script>
  