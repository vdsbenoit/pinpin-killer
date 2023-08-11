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
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue';
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useStore } from '@/services/store';
import { onMounted, ref, watch } from 'vue';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserPhoto } from '@/services/photoGallery';

// composables

const store = useStore();

// reactive data
const photos = ref<UserPhoto[]>([])

const loadSaved = async () => {
  const savedPhotos = store.photos

  for (const photo of savedPhotos) {
    console.log("read file", photo.filepath)
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
