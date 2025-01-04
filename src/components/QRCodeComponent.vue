<template>
  <div v-if="qrCodeDataUrl">
    <img :src="qrCodeDataUrl" alt="QR Code" />
    <p>Le PDF est disponible ici :</p>
    <a :href="pdfUrl" target="_blank">Afficher le PDF</a>
  </div>
</template>

<script>
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { uploadPDF } from "../services/githubUploader";

export default {
  props: ["formData"],
  data() {
    return {
      qrCodeDataUrl: '', // URL du QR code généré
      pdfUrl: '', // URL du PDF
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.generatePDFAndQRCode(newData);
        }
      },
    },
  },
  methods: {
    async generatePDFAndQRCode(data) {
      try {
        // Générer le PDF avec les données du formulaire
        const doc = new jsPDF();
        doc.text(`Nom : ${data.name}`, 10, 10);
        doc.text(`Email : ${data.email}`, 10, 20);
        doc.text(`Message : ${data.message}`, 10, 30);

        // Sauvegarder le PDF comme Blob
        const pdfBlob = doc.output('blob');

        // Générer un nom de fichier unique pour le PDF
        const fileName = `form_${Date.now()}.pdf`;

        // Uploader le fichier PDF sur GitHub via la fonction uploadPDF
        await uploadPDF(pdfBlob, fileName);

        // L'URL GitHub Pages pour accéder au fichier PDF
        // Remplacer `username` par ton nom d'utilisateur GitHub et `repo_name` par le nom de ton dépôt
        const pdfUrl = `https://concombredemer.github.io/made-in-shaina-qr-code/pdfs/${fileName}`;
        
        // Mettre à jour l'URL du PDF
        this.pdfUrl = pdfUrl;

        // Générer l'URL du QR code avec l'URL brute du PDF
        this.qrCodeDataUrl = await QRCode.toDataURL(pdfUrl);

      } catch (error) {
        console.error("Erreur lors de la génération:", error);
      }
    },
  },
};
</script>
