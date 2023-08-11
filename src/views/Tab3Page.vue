<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Classement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Qualifications</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-no-padding ion-padding-vertical">
          <ion-list v-if="levelOneList && levelOneList.length > 0">
            <ion-item v-for="(item, index) in levelOneList" :key="index">
              <ion-badge slot="start" class="ion-no-margin ion-margin-end" color="medium">{{ index + 1 }}</ion-badge>
              <ion-label>
                {{ item.username }}
              </ion-label>
              <ion-badge slot="end" class="ion-no-margin" color="primary">{{ item.currentMissionIndex }}</ion-badge>
            </ion-item>
          </ion-list>
          <div v-else-if="isLoadingLevelOne" class="ion-text-center ion-align-items-center">
            <ion-spinner></ion-spinner>
          </div>
          <div v-else>
            <h2 class="ion-text-center ion-align-items-center">Pas de classement</h2>
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Finale</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-no-padding ion-padding-vertical">
          <ion-list v-if="levelTwoList && levelTwoList.length > 0">
            <ion-item v-for="(item, index) in levelTwoList" :key="index">
              <ion-badge slot="start" class="ion-no-margin ion-margin-end" color="medium">{{ index + 1 }}</ion-badge>
              <ion-label>
                {{ item.username }}
              </ion-label>
              <ion-icon v-if="item.winner" slot="end" color="primary" :icon="trophy"></ion-icon>
              <ion-badge v-else slot="end" class="ion-no-margin" color="primary">{{ item.currentMissionIndex }}</ion-badge>
            </ion-item>
          </ion-list>
          <div v-else-if="isLoadingLevelTwo" class="ion-text-center ion-align-items-center">
            <ion-spinner></ion-spinner>
          </div>
          <div v-else>
            <h2 class="ion-text-center ion-align-items-center">Pas de classement</h2>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonBadge, IonLabel, IonCard, IonCardContent, 
  IonCardHeader, IonCardTitle, IonSpinner, IonIcon } from '@ionic/vue';
import RefresherComponent from "@/components/RefresherComponent.vue";
import { onMounted, ref } from 'vue';
import { getUsers } from '@/services/firebase';
import { trophy } from 'ionicons/icons';

// composables


// reactive data

const isLoadingLevelOne = ref(true);
const isLoadingLevelTwo = ref(true);
const levelOneList = ref<any[]>([])
const levelTwoList = ref<any[]>([])

// methods

onMounted(async () => {
  setTimeout(() => {
    isLoadingLevelOne.value = false;
    isLoadingLevelTwo.value = false;
  }, 5000);
  levelOneList.value = await getUsers(1)
  levelTwoList.value = await getUsers(2)
  
})

</script>
