"use client";

import { useSearchParams } from "next/navigation";
import { getVideoMetadata } from "../firebase/functions";

export default async function Watch() {
  const videoPrefix = "https://storage.googleapis.com/pcp-processed-videos/";
  const videoSrc = useSearchParams().get("v");
  const videoMetadata = await getVideoMetadata(videoSrc?.slice(10, -4) || "");
  console.log(videoMetadata);

  return (
    <div>
      <h1>{videoMetadata.title}</h1>
      <h2>{videoMetadata.description}</h2>
      <video controls src={videoPrefix + videoSrc} />
    </div>
  );
}
