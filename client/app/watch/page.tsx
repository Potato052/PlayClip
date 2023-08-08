'use client';

import { useSearchParams } from 'next/navigation'

export default function Watch() {
    const videoPrefix = 'https://storage.googleapis.com/pcp-processed-videos/';
    const videoSrc = useSearchParams().get('v');
    console.log(videoSrc);

    return (
      <div>
        <p>Watch Page</p>
        <video controls src={videoPrefix + videoSrc} />
      </div>
    );
  }