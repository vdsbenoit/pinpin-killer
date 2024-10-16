<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Newbie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <refresher-component></refresher-component>
      <div class="logo">
        <img src="@/assets/img/logo.jpg" alt="Logo"/>
      </div>
      <div class="container ion-padding">
        <h2>Bienvenue dans le club des controleurs !</h2>
        <br>

        <form v-on:submit.prevent="zabart">
        <ion-list  id="login-form">
          <ion-item lines="full">
            <ion-input v-model="store.username" name="username" type="text" label="Choisis ton nom d'agent" label-placement="floating" required :clear-input="true"></ion-input>
          </ion-item>
          <br>
          <ion-button expand="block"  @click="zabart" :disabled="!store.username">
              <ion-spinner v-if="isZabarting"></ion-spinner>
              <span v-else>ZABART</span>
          </ion-button>
        </ion-list>
      </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonList, IonSpinner, IonInput, IonItem, IonLabel } from "@ionic/vue";
import { useRouter } from "vue-router";
import RefresherComponent from "@/components/RefresherComponent.vue";
import { ref } from "vue";
import { useStore } from "@/services/store";
import { errorPopup, textInputPopup, toastPopup } from "@/services/popup";
import { getUser, isUser, newUser } from "@/services/firebase";

const router = useRouter();
const store = useStore();

// reactive data

const username = ref("");
const isZabarting = ref(false);

// methods

const conflictHandler = async (pass: string) => {
  if (pass === "cheveux1993") {
    const userData = await getUser(store.username)
    store.username  = userData.username
    store.poolMissions = userData.poolMissions
    store.finalMissions = userData.finalMissions
    store.level = userData.level || 1
    store.currentMissionIndex = userData.currentMissionIndex|| 0
    store.winner = userData.winner || false
    store.newbie = false;
    router.push("/rules")
    toastPopup("Profil chargé")
  }
  else {
    if (pass) toastPopup("Mot de pass incorrect")
    store.username = ""
  }
}

const zabart = async () => {
  isZabarting.value = true
  if (await isUser(store.username)) {
    textInputPopup(
      `S'il s'agit de toi, demande à Lapin d'entrer son mot de passe pour charger le profil`, 
      conflictHandler, 
      `Le nom d'agent '${store.username}' est déjà pris.`
      ) 
  }
  else {
    const missions = store.initMissions()
    newUser(store.username, store.poolMissions, store.finalMissions, store.qrSalt)
      .then(() => {
      store.newbie = false;
        router.push("/rules") 
      })
      .catch((error) => {
        console.error(error)
        toastPopup("Une erreur s'est produite à la création de l'utilisateur") 
      })

  }
  isZabarting.value = false;
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
</style>
