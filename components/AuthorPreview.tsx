import Link from "next/link";
import { Media } from "../types/Common/media-type";
import Image from "next/image";

type AuthorPreviewProps = {
  name: string;
  photo: Media;
  jobTitle: string;
  bio: string;
  slug: string;
};

export default function AuthorPreview({ name, photo, jobTitle, bio, slug }: AuthorPreviewProps) {
  return (
    <div className="flex flex-col items-start gap-4 mb-12 md:flex-row">
      {photo && (
        <Link href={`/team/${slug}`}>
          <Image
            src={photo.fileUrl}
            width={100}
            height={100}
            className="rounded-full mr-4 w-28 h-28 object-cover shrink-0"
            alt={photo.name}
          />
        </Link>
      )}
      <div className="w-full">
        <h2 className="text-3xl leading-snug">
          <Link href={`/team/${slug}`} className="hover:underline">
            {name}
          </Link>
        </h2>
        <h5 className="bg-[#dfdfdf] px-2 py-1">{jobTitle}</h5>
        <p className="mt-4">{bio}</p>
      </div>
    </div>
  );
}
