import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "pcp-raw-videos";

const videoCollectionId = "videos";
type IVideo = {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  return;
});

export const generateuploadurl = onCall(
    {maxInstances: 1},
    async (request) => {
    // Check if the user is authentication
      if (!request.auth) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "The function must be called while authenticated."
        );
      }

      const auth = request.auth;
      const data = request.data;
      const bucket = storage.bucket(rawVideoBucketName);

      // Generate a unique filename for upload
      const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

      // Get a v4 signed URL for uploading file
      const [url] = await bucket.file(fileName).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      });

      return {url, fileName};
    }
);

export const getvideos = onCall({maxInstances: 1}, async () => {
  const querySnapshot =
    await firestore.collection(videoCollectionId).limit(10).get();
  return querySnapshot.docs.map((doc) => doc.data());
});

export const getvideometadata = onCall(
    {maxInstances: 1},
    async (request) => {
      const data = await firestore.collection(videoCollectionId)
          .where("id", "==", request.data.id).get();
      return data.docs[0].data();
    });

export const setvideometa = onCall({maxInstances: 1}, async (request) => {
  const data = request.data.meta as IVideo;
  return firestore
      .collection(videoCollectionId)
      .doc(data.id as string)
      .set(data, {merge: true});
});
