import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


const isUser = async (username: string) => {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
}

const newUser = async (username: string, poolMissions: string[], finalMissions: string[], salt: string) => {
  return await setDoc(doc(db, "users", username), {
    username: username,
    poolMissions: poolMissions,
    finalMissions: finalMissions,
    level: 1,
    currentMissionIndex: 0,
    winner: false,
    salt: salt
  });
}

const getUser = async (username: string) => {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (data) {
    return {
      username : data.username,
      poolMissions: data.poolMissions,
      finalMissions: data.finalMissions,
      level: data.level,
      currentMissionIndex: data.currentMissionIndex,
      winner: data.winner
    };
  }
  else {
    console.error(`User not found: ${username}`)
    return {}
  }
}

export { storage, isUser, newUser, getUser};
