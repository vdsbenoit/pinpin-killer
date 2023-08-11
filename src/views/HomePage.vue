<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="logo">
        <img src="@/assets/img/logo.jpg" alt="Logo"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useStore } from "@/services/store";
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
import RefresherComponent from "@/components/RefresherComponent.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const store = useStore();

onMounted(() => {
  getUrlQueryParams()
});

const getUrlQueryParams = async () => {    
  await router.isReady()
  if (route.query.salt) {
    store.qrSalt = `${route.query.salt}`
    console.log(`saved ${route.query.salt} in the store`)
    router.push("/tabs")
  } 
  else {
    router.push('/forbidden')
  }
};

</script>

<style scoped>
</style>