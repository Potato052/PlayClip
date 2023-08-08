import Image from 'next/image'
import { getVideos } from './firebase/functions'
import Video from '@/components/video';

export default async function Home() {
  const videos = await getVideos();
  return (
    <main className="flex ml-3">
      {
        videos.map((video) => (
          <Video key={video.id} video={video} />
        ))
      }
    </main>
  )
}

export const revalidate = 60;