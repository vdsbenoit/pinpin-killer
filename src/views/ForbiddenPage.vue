<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Forbidden</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="not-found">
        <strong class="capitalize">Tu n'as pas accès à l'app</strong>
        <p>Pour accéder à l'app, tu dois utiliser le code QR</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
</script>

<style scoped>

.not-found {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.not-found strong {
  font-size: 20px;
  line-height: 26px;
}

.not-found p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
}

.not-found a {
  text-decoration: none;
  cursor: pointer;
}
</style>