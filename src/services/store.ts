import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFinalMissions, getRandomPoolMissions } from './missions'
import { UserPhoto } from './photoGallery';

const SALT = "qBJMfXceG97uECGYPXyfAkWf8pxuNxsAx6qIRG3htFCW3JrumSmFnruV31LyGFBSbRa7xtAnlBrcZkUuanxhsAWcBmrtJYg2vdHrWdsTpcw9N3ayQhcrvgyLQZAHhgupfE4qBaiT4dcontVxrbZwVgkRCVa0uLO84wyvRp1RHkDsxN5A8Yd2pZpyk2PXaFO43oAEhrtpan1LFkoQ5DziGd51KfO8d91Dpg8lltwd8iIn1Sgt2HHeCzqdUzichqMiLc5NlSCrpj9KgnKD1Ll5udiSkp8ugITXxbrXTFJgr4lqbDScfkjA5euX1DSRb2FVSWSmVuJP3YK2ynVxjS7zuFNc6LU6o6Uq1NufYKNpPl2i696XnJQ12LmyyIcBgBihozsMo2ZEA3tAVYt3xcL9puPNglrNpA25H1hTcStBSdrqLWLTAsMGxUBQPfNwpwjBFpqSQk4xwj1TxNQTrECKhfX4t0FYE6QwQAIwNJrYmaGce3x2memyhO2qr2HlJm5m";

export const useStore = defineStore(
  'store', 
  () => {
    const qrSalt = ref('')
    const newbie = ref(true)
    const username = ref('')
    const level = ref(1);
    const currentMissionIndex = ref(0)
    const poolMissions = ref([""])
    const finalMissions = ref([""])
    const winner = ref(false)
    const photos = ref<UserPhoto[]>([]);

    const checkSalt = () => {
      return SALT === qrSalt.value;
    }

    const initMissions = () => {
      poolMissions.value = getRandomPoolMissions()
      finalMissions.value = getFinalMissions()
    }

    const nextMission = () => {
      if (currentMissionIndex.value < 9){
        currentMissionIndex.value++
        return 
      }
      if (level.value < 2) {
        level.value++
        currentMissionIndex.value = 0
        return
      }
      winner.value = true; 
    }

    const getCurrentMisson = () => {
      try {
        switch (level.value) {
          case 1:
            return poolMissions.value[currentMissionIndex.value];
          case 2:
            return finalMissions.value[currentMissionIndex.value];
          default:
            return `Error, cannot find a mission for level ${level}`
        }
      } catch (error) {
        console.log(error);
        return `Error, cannot find a mission for index ${currentMissionIndex}`
      }
      
    }

    const isWinner = () => {
      return winner.value
    }

    return { qrSalt, newbie, username, level, currentMissionIndex, poolMissions, finalMissions, winner, photos, checkSalt, initMissions, getCurrentMisson, isWinner}
  },
  { persist: true }
)