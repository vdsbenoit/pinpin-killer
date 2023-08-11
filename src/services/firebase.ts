import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import "firebase/firestore";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { UserPhoto } from './photoGallery';
import { Directory, Filesystem } from '@capacitor/filesystem';


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

const uploadPhotos = async (photos: UserPhoto[]) => {
  const storageRef = ref(storage, 'contraventions');
  // Find all the prefixes and items.
  const response = await listAll(storageRef)
  const serverFiles = response.items.map(item => item.name);
  photos.forEach(async (photo) => {
    if (!serverFiles.includes(photo.filepath)) {
      
      const targetRef = ref(storage, `contraventions/${photo.filepath}`)
      const file = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      console.log(file);
      uploadString(targetRef, file.data as string, 'base64').then((snapshot) => {
        console.log(`${photo.filepath} uploaded`); 
      });

    }
  })
    

  
}

export { isUser, newUser, getUser, uploadPhotos };
