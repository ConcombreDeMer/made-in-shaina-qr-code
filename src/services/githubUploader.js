import axios from "axios";

const GITHUB_TOKEN = process.env.VUE_APP_TOKEN; // Remplacez par votre token
const REPO_OWNER = "concombredemer";
const REPO_NAME = "made-in-shaina-qr-code";
const BRANCH = "main";

export async function uploadPDF(blob, fileName) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const base64Data = fileReader.result.split(",")[1]; // Encode le PDF en base64
  
        try {
          const response = await axios.put(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/pdfs/${fileName}`,
            {
              message: `Ajout du fichier ${fileName}`,
              content: base64Data,
              branch: BRANCH,
            },
            {
              headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              },
            }
          );
  
          // Générer l'URL brute du fichier
          const rawUrl = response.data.content.html_url.replace('/blob/', '/raw/');
  
          // Retourner l'URL brute
          resolve(rawUrl);
        } catch (error) {
          reject(error);
        }
      };
  
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsDataURL(blob);
    });
  }
  