<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mission</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="logo">
        <img src="@/assets/img/logo.jpg" alt="Logo"/>
      </div>
      <ion-button expand="block"  @click="router.replace('/rules')" color="medium">
          Règles
      </ion-button>
      <ion-button expand="block"  @click="displayMission" color="warning">
          Voir mission en cours
      </ion-button>
      <ion-button expand="block"  @click="finishMission" color="success">
          Enregister PV
      </ion-button>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useStore } from '@/services/store';
import { useRouter } from 'vue-router';
import { infoPopup, toastPopup } from '@/services/popup';
import { usePhotoGallery } from '@/services/photoGallery';

// composables
const router = useRouter();
const store = useStore();
const { takePhoto } = usePhotoGallery();

// methods


const displayMission = () => {
  infoPopup(store.getCurrentMisson(), "Mission");
}

const finishMission = () => {
  const missionId = `L${store.level}M${store.currentMissionIndex + 1}`
  takePhoto(store.username, missionId)
    .then(() => {
      router.push('/validation') 
    })
    .catch((error: any) => {
      toastPopup("Une erreur est survenue") 
      console.error(error)
    })
   
}

</script>

<style scoped>
.logo {
  background-color: var(--ion-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: min(1%, 20px);
  width: 100%;
  height: 30%;
  margin-bottom: 20px;
  margin-top: 10px;
}
.logo img {
  max-width: 80%;
  max-height: 100%;
}
.container{
  text-align: center;
}
h1 {
  color: var(--ion-color-primary);
  font-size: 40px;
}
p {
  line-height: 30px;
}
ion-button {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;

}
</style>