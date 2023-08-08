import Link from "next/link";
import Image from "next/image";

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string  
}

export default function video({video}: {video: Video}) {
  return (
    <Link href={`/watch?v=${video.filename}`}>
      <Image
        src={"/thumbnail.png"}
        alt="video"
        width={120}
        height={80}
        className="m-3"
      />
    </Link>
  );
}
