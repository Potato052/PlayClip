import Link from "next/link";
import Image from "next/image";
import IVideo from "../interface/videoInterface";

export default function video({ video }: { video: IVideo }) {
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
