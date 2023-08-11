<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>404</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="not-found">
        <strong class="capitalize">C'est page n'existe pas ou plus</strong>
        <p>Retour à <a  @click="router.go(-1)" >la page précédente</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

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