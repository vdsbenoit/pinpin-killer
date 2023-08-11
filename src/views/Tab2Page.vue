<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Contraventions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <div @click="downloadImage(photo)">
              <ion-img :src="photo.webviewPath"></ion-img>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button expand="block"  @click="upload" color="success" :disabled="isUploading">
        <ion-spinner v-if="isUploading"></ion-spinner>
        <span v-else>Uploader les PVs</span>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton, IonSpinner } from '@ionic/vue';
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useStore } from '@/services/store';
import { onMounted, ref, watch } from 'vue';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserPhoto } from '@/services/photoGallery';
import { confirmPopup, toastPopup } from '@/services/popup';
import { uploadPhotos } from '@/services/firebase';

// composables

const store = useStore();

// reactive data
const photos = ref<UserPhoto[]>([])
const isUploading = ref(false)

// methods

const downloadImage = (photo: UserPhoto) => {
  confirmPopup("Télécharger l'image ?", () => {
    // Create a new anchor element
    const anchor = document.createElement("a");
    anchor.href = photo.webviewPath || "";
    anchor.download = photo.filepath; // Set desired filename

    // Trigger a click event on the anchor to initiate download
    anchor.click();
  }) 
}

const upload = () => {
  isUploading.value = true
  uploadPhotos(store.photos)
    .then(() => {
      toastPopup("Les photos ont bien été uploadées")
      isUploading.value = false
    })
    .catch((error: any) => {
      toastPopup(`Erreur durant l'upload: ${error}`)
      console.error(error)
      isUploading.value = false
    })
}

const loadSaved = async () => {
  const savedPhotos = store.photos

  for (const photo of savedPhotos) {
    const file = await Filesystem.readFile({
      path: photo.filepath,
      directory: Directory.Data,
    });
    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
  }

  photos.value = savedPhotos;
};

onMounted(loadSaved);


</script>
<style scoped>
ion-img {
  -webkit-user-drag: none;
  pointer-events: none;
}
</style>