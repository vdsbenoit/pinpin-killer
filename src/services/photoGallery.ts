import { ref, onMounted, watch, reactive } from 'vue';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';



export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
} 

export const lastPhoto = reactive<UserPhoto>({} as UserPhoto);

export const usePhotoGallery = () => {
  const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  const takePhoto = async (username: string, missionId: string) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: true,
      direction: CameraDirection.Front,
    });
    const fileName = username + missionId + Date.now() + '.jpeg';
    const savedFileImage = {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
    console.log(savedFileImage)
    lastPhoto.filepath = fileName
    lastPhoto.webviewPath = photo.webPath
  }

  const savePicture = async (photo: UserPhoto): Promise<UserPhoto> => {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webviewPath!);
    const blob = await response.blob();
    const base64Data = (await convertBlobToBase64(blob)) as string;
  
    const savedFile = await Filesystem.writeFile({
      path: photo.filepath,
      data: base64Data,
      directory: Directory.Data,
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: photo.filepath,
      webviewPath: photo.webviewPath,
    };
  };

  return {
    takePhoto,
    savePicture,
  };
};