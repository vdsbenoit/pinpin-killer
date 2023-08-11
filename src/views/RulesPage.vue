<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Instructions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="logo">
        <img src="@/assets/img/logo.jpg" alt="Logo"/>
      </div>
      <div class="container ion-padding">
          <h4>But</h4>
          <p>
            Ton objectif est de devenir le roi / la reine des fdp on mettant un maximum de contraventions autour de toi.
            Pour mettre une contraventions, tu dois réaliser des missions. 
            Une mission consiste à faire faire quelque chose à quelqu'un, peu importe la victime.
          </p>
          <h4>Règles</h4>
          <p>
            1. Si la victime se rend compte que tu essaies de lui foutre un PV, tu bois un shot.<br>
            2. Si ta mission est un succès, la victime boit un shot. Prends un selfie avec la victime pour valider le PV. <br>
            3. Un shot peut être remplacé par un demi afond.<br>
            4. L'agent doit avoir incité la victime à faire la mission.
            Si la victime effectue l'action de la mission d'elle-même, ça ne compte pas. 
            Par exemple, si ta mission est d'affoner une bière avec ta victime et que tu vois quelqu'un affoner une bière 
            alors que tu ne lui as pas demandé de le faire, ça ne comptera pas.
          </p>
          <h4>Remarques</h4>
          <p>
            Ne ferme pas cette page et assure toi que ton navigateur ne supprime pas le cache. Sinon tu perdras ta progression.<br>
            De temps en temps, va dans l'onglet "PVs" et upload ta progression. 
            Ca mettra à jour le classement et enverra tes PVs à maitre Lapin pour qu'il les ajoute à l'album souvenir. 
            Il faut un accès à internet pour faire cette opération.
          </p>
          <ion-button expand="block"  @click="router.push('/tabs')">
              OKAY capisce j'ai compris
          </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle} from "@ionic/vue";
import RefresherComponent from "@/components/RefresherComponent.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "@/services/store";

const router = useRouter();
const store = useStore();

// reactive data

const username = ref("");
const isZabarting = ref(false);

// methods



</script>

<style scoped>
h4 {
  color: var(--ion-color-primary);
  text-align: left;
}
p {
  line-height: 30px;
}
</style>
