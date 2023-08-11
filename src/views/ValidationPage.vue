<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Valider PV</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="container ion-padding">
        <div>
          <ion-img :src="lastPhoto.webviewPath"></ion-img>
        </div>
          <h3>
            Es-tu certain.e que cette photo est valide ?
          </h3>
          <p>
            La photo doit être un selfie de ta victime et toi.<br>
            Si la photo ne valide pas ton PV, tu seras discalifié.
            Il ne sera pas possible de retourner en arrière une fois la photo validée.
          </p>
          <ion-button expand="block" color="medium" @click="router.replace({name: 'tab1'})">
            Annuler
          </ion-button>
          <ion-button expand="block" color="danger" @click="validation">
            Valider
          </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonImg } from "@ionic/vue";
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "@/services/store";
import { usePhotoGallery, lastPhoto } from "@/services/photoGallery";
import { toastPopup } from "@/services/popup";

// composables

const { savePicture } = usePhotoGallery();
const router = useRouter();
const store = useStore();

// reactive data

const username = ref("");
const isZabarting = ref(false);

// methods

const validation = async () => {
  const savedFileImage = await savePicture(lastPhoto);
  store.photos = [savedFileImage, ...store.photos];
  toastPopup("La contravention a été validée");
  store.nextMission()
  router.replace('/tabs')
}

</script>

<style scoped>

</style>
