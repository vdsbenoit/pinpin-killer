<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Classement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import RefresherComponent from "@/components/RefresherComponent.vue";

</script>
