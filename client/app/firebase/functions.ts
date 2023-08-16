import { getFunctions, httpsCallable } from "firebase/functions";
import IVideo from "../../interface/videoInterface";
import app from "./firebase";

const functions = getFunctions(app);

const generateUploadUrlFunction = httpsCallable(functions, "generateuploadurl");
const getVideosFunction = httpsCallable(functions, "getvideos");
const getVideoMetadataFunction = httpsCallable(functions, "getvideometadata");
const setVideoMetadataFunction = httpsCallable(functions, "setvideometa");

export async function uploadVideo(file: File) {
  const response: any = await generateUploadUrlFunction({
    fileExtension: file.name.split(".").pop(),
  });

  // Upload the file to the signed URL
  const uploadResult = await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return uploadResult;
}

export async function getVideos() {
  const response: any = await getVideosFunction();
  return response.data as IVideo[];
}

export async function getVideoMetadata(videoId: string) {
  const response: any = await getVideoMetadataFunction({ "id": videoId });
  return response.data as IVideo;
}

export async function setVideoMetadata(metadata: IVideo) {
  const response: any = await setVideoMetadataFunction({ "meta": metadata });
  return response.data as IVideo;
}