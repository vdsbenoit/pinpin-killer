import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import "firebase/firestore";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { UserPhoto } from './photoGallery';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Ref } from 'vue';


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

const updateUserData =async (username: string, level: number, currentMissionIndex: number, winner: boolean, salt: string) => {
  return await updateDoc(doc(db, "users", username), {
    username,
    level,
    currentMissionIndex,
    winner,
    salt    
  })
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

const uploadPhotos = async (photos: UserPhoto[], progress: Ref<Number>) => {
  const storageRef = ref(storage, 'contraventions');
  // Find all the prefixes and items.
  const response = await listAll(storageRef)
  const serverFiles = response.items.map(item => item.name);
  progress.value = 0
  const progressStep = 1 / photos.length
  photos.forEach(async (photo) => {
    if (!serverFiles.includes(photo.filepath)) {
      
      const targetRef = ref(storage, `contraventions/${photo.filepath}`)
      const file = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      console.log(file);
      uploadString(targetRef, file.data as string, 'base64').then((snapshot) => {
        progress.value = +progress.value + progressStep 
        console.log(`${photo.filepath} uploaded`); 
      });

    }
  })  
}

const getUsers = async (level: number) => {
  const q = query(collection(db, "users"), where("level", "==", level), orderBy("currentMissionIndex", "desc"));

  const querySnapshot = await getDocs(q);
  const users: any[] = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    users.push(doc.data())
    console.log(doc.id, " => ", doc.data());
  });
  return users 
}

export { isUser, newUser, updateUserData, getUser, uploadPhotos, getUsers };
